// app/layout.tsx

import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Kutiit",
  description: "Nandi Dictionary & Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />

        <main className="max-w-5xl mx-auto px-6 py-10">
          <div className="bg-white shadow rounded p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
