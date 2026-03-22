"use client";


//import "./globals.css";
import NavBar from "@/app/components/Navbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "Kutiit — Nandi Dictionary",
  description: "A living, interconnected dictionary for the Nandi language.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <NavBar />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
