"use client";

import { useEffect, useRef, useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [viewAvatarOpen, setViewAvatarOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabaseBrowserClient.auth.getUser().then(({ data }) => {
      const u = data.user;
      setUser(u ?? null);

      if (u) {
        setFullName(u.user_metadata.full_name || u.user_metadata.name || "");
        setAvatarUrl(u.user_metadata.avatar_url || null);
      }
    });
  }, []);

  const openFilePicker = () => {
    fileInputRef.current?.click();
    setAvatarMenuOpen(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 1_000_000) {
      alert("Please choose an image smaller than 1MB.");
      return;
    }

    const ext = file.name.split(".").pop();
    const fileName = `${user.id}.${ext}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabaseBrowserClient.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    const { data: publicUrlData } = supabaseBrowserClient.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const newUrl = publicUrlData.publicUrl;
    setAvatarUrl(newUrl);
  };

  const removeAvatar = () => {
    setAvatarUrl(null);
    setAvatarMenuOpen(false);
  };

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabaseBrowserClient.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: avatarUrl || null,
      },
    });

    setSaving(false);
    if (error) {
      console.error(error);
      return;
    }

    window.dispatchEvent(new Event("profile-updated"));
    onClose();
  };

  const logout = async () => {
    await supabaseBrowserClient.auth.signOut();
    window.location.href = "/";
  };

  const deleteAccount = async () => {
    if (!user) return;

    const session = await supabaseBrowserClient.auth.getSession();
    const token = session.data.session?.access_token;

    if (!token) {
      alert("You must be logged in.");
      return;
    }

    const res = await fetch("/api/delete-account", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert("Could not delete account. Please try again.");
      return;
    }

    await supabaseBrowserClient.auth.signOut();
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-black border border-red-600 rounded-lg p-6 w-full max-w-md relative">

          <button
            onClick={onClose}
            className="absolute top-2 right-2 hover:text-red-400"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-6 text-green-400">Your Profile</h2>

          <div className="space-y-6">

            {/* Avatar */}
            <div className="flex flex-col items-center space-y-2 relative">
              <img
                src={avatarUrl ? avatarUrl : "/default-avatar.jpg"}
                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                className="w-24 h-24 rounded-full border border-green-600 object-cover cursor-pointer hover:opacity-80 transition"
              />

              {avatarMenuOpen && (
                <div className="absolute top-28 bg-black border border-red-600 rounded-md shadow-lg w-40 py-2 z-50">
                  <button
                    onClick={() => {
                      setViewAvatarOpen(true);
                      setAvatarMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-600/20"
                  >
                    View Avatar
                  </button>

                  <button
                    onClick={openFilePicker}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-600/20"
                  >
                    Change Avatar
                  </button>

                  <button
                    onClick={removeAvatar}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-600/20"
                  >
                    Remove Avatar
                  </button>

                  <button
                    onClick={() => setAvatarMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-600/20"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-black border border-green-600 rounded px-3 py-2 text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="text"
                value={user.email ?? ""}
                disabled
                className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-gray-400 cursor-not-allowed"
              />
            </div>

            {/* Save */}
            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>

            {/* Delete Account */}
            <button
              onClick={() => setDeleteConfirmOpen(true)}
              className="w-full py-2 text-red-500 hover:text-red-400 text-sm mt-2"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* View Avatar Modal */}
      {viewAvatarOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative flex flex-col items-center">
            <img
              src={avatarUrl ? avatarUrl : "/default-avatar.jpg"}
              className="w-[300px] h-[300px] object-cover rounded-full border border-green-600 shadow-xl"
            />

            <button
              onClick={() => setViewAvatarOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-red-400 text-3xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black border border-red-600 p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-red-400 mb-4">Delete Account?</h2>

            <p className="text-sm text-gray-300 mb-4">
              This action is permanent and cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={deleteAccount}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
