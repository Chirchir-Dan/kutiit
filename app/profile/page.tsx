"use client";

import { useEffect, useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabaseBrowserClient.auth.getUser().then(({ data }) => {
      const u = data.user;
      setUser(u ?? null);

      if (u) {
        setFullName(u.user_metadata.full_name || u.user_metadata.name || "");
        setAvatarUrl(u.user_metadata.avatar_url || "");
      }
    });
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

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

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabaseBrowserClient.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: avatarUrl,
      },
    });

    setSaving(false);
    if (error) return;

    // Notify navbar
    window.dispatchEvent(new Event("profile-updated"));

    // Redirect
    router.push("/profile");
  };

  const logout = async () => {
    await supabaseBrowserClient.auth.signOut();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-green-400">Profile</h1>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-20 px-6 text-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-green-400">Your Profile</h1>

      <div className="bg-black border border-red-600 rounded-lg p-6 space-y-6">

        {/* Avatar */}
        <div className="space-y-2">
          <img
            src={avatarUrl || "/default-avatar.png"}
            className="w-24 h-24 rounded-full border border-green-600 object-cover"
          />

          <label className="block text-sm text-gray-400">Change Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="text-sm text-gray-300"
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
            className="w-full bg-black border border-red-600 rounded px-3 py-2 text-gray-400 cursor-not-allowed"
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
      </div>
    </div>
  );
}
