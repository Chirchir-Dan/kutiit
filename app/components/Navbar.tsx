"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "border-b-2 border-red-600 text-green-400" : "text-white";

  // Load user + listen for auth changes
  useEffect(() => {
    supabaseBrowserClient.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: listener } = supabaseBrowserClient.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Listen for profile updates
  useEffect(() => {
    function refreshUser() {
      supabaseBrowserClient.auth.getUser().then(({ data }) => {
        setUser(data.user ?? null);
      });
    }

    window.addEventListener("profile-updated", refreshUser);
    return () => window.removeEventListener("profile-updated", refreshUser);
  }, []);

  return (
    <>
      <nav className="bg-black border-b border-red-600">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
            style={{ color: "#03d418" }}
          >
            Kutiit
          </Link>

          <div className="flex items-center space-x-4">

            {/* Navigation links with active underline */}
            <Link href="/dictionary" className={`px-3 py-2 text-sm hover:text-green-400 ${isActive("/dictionary")}`}>
              Dictionary
            </Link>

            <Link href="/about" className={`px-3 py-2 text-sm hover:text-green-400 ${isActive("/about")}`}>
              About
            </Link>

            <Link href="/community" className={`px-3 py-2 text-sm hover:text-green-400 ${isActive("/community")}`}>
              Community
            </Link>

            <Link href="/contact" className={`px-3 py-2 text-sm hover:text-green-400 ${isActive("/contact")}`}>
              Contact
            </Link>

            {/* Auth-aware UI */}
            {!user ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-3 py-2 text-sm text-green-400 hover:text-green-300"
              >
                Login
              </button>
            ) : (
              <img
                src={user.user_metadata.avatar_url || "/default-avatar.jpg"}
                onClick={() => setProfileOpen(true)}
                className="w-8 h-8 rounded-full border border-green-600 object-cover cursor-pointer hover:opacity-80 transition"
              />
            )}

            {/* Donate button */}
            <Link
              href="/donate"
              className={`ml-2 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 ${isActive("/donate")}`}
            >
              Donate
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {authOpen && (
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      )}

      {/* Profile Modal */}
      {profileOpen && (
        <ProfileModal onClose={() => setProfileOpen(false)} />
      )}
    </>
  );
}
