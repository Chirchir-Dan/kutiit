"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `px-3 py-2 text-sm font-medium transition-colors duration-150
     ${
       pathname === path
         ? "text-green-500 border-b-2 border-red-600"
         : "text-gray-100 hover:text-green-400"
     }`;

  return (
    <nav className="bg-black border-b border-red-600">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-green-400"
        >
          Kutiit
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link href="/dictionary" className={linkClasses("/dictionary")}>
            Dictionary
          </Link>

          <Link href="/about" className={linkClasses("/about")}>
            About
          </Link>

          <Link href="/community" className={linkClasses("/community")}>
            Community
          </Link>

          <Link href="/contact" className={linkClasses("/contact")}>
            Contact
          </Link>

          {/* Donate Button */}
          <Link
            href="/donate"
            className="ml-2 px-4 py-2 text-sm font-medium
                       bg-green-600 text-white rounded-md text-bold
                       hover:bg-green-700 transition-colors duration-150"
          >
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
}
