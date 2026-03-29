import "./global.css";
import NavBar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import type { ReactNode } from "react";
import { ToastProvider } from "@/app/components/Toast";

export const metadata = {
  title: "Kutiit — Nandi Dictionary",
  description: "A living, interconnected dictionary for the Nandi language.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[--background] text-[--foreground]">
        <ToastProvider>
          <NavBar />

          <main className="min-h-screen max-w-4xl mx-auto px-6 py-12">
            {children}
          </main>

          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
