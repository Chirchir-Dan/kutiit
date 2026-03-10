// app/components/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Kutiit
        </Link>

        <div className="flex gap-6 text-gray-700">
          <Link href="/dictionary" className="hover:text-blue-700">
            Dictionary
          </Link>

          <Link href="/learn" className="hover:text-blue-700">
            Learn
          </Link>

          <Link href="/admin" className="hover:text-blue-700">
            Admin
          </Link>

          <Link href="/about" className="hover:text-blue-700">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
