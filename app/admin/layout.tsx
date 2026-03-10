"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Words", href: "/admin/words" },
    { name: "Categories", href: "/admin/categories" }, // future
    { name: "Users", href: "/admin/users" }, // future
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <h2 className="text-xl font-bold">Kutiit Admin</h2>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded ${
                  active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 text-gray-900">
          {children}
       </main>
    </div>
  );
}
