"use client";

import { useState } from "react";
import Link from "next/link";

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed top-[80px] left-4 z-40
          px-3 py-2 rounded-md
          bg-green-700 backdrop-blur-sm
          border border-[--accent-green]/40
          text-white 
          text-bold
          hover:bg-black/60 transition
        "
      >
        Menu
      </button>

      {/* Overlay (click to close) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in Sidebar */}
      <aside
        className={`
          fixed top-[72px] left-0 z-50
          w-64
          bg-[#111]
          border-r border-[--accent-green]/40
          p-6 space-y-4
          text-white
          h-auto
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2 className="text-lg font-semibold text-[--accent-green] mb-4">
          Community
        </h2>

        <nav className="space-y-3">
          <Link href="/community" className="block hover:text-[--accent-green] transition">
            All Posts
          </Link>
          <Link href="/community/proverbs" className="block hover:text-[--accent-green] transition">
            Proverbs
          </Link>
          <Link href="/community/sayings" className="block hover:text-[--accent-green] transition">
            Sayings
          </Link>
          <Link href="/community/questions" className="block hover:text-[--accent-green] transition">
            Questions
          </Link>
          <Link href="/community/stories" className="block hover:text-[--accent-green] transition">
            Stories
          </Link>
          <Link href="/community/popular" className="block hover:text-[--accent-green] transition">
            Popular
          </Link>
          <Link href="/community/new" className="block hover:text-[--accent-green] transition">
            New
          </Link>
          <Link href="/community/contribute" className="block hover:text-[--accent-green] transition">
            Contribute
          </Link>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="px-6 py-10">{children}</main>
    </div>
  );
}
