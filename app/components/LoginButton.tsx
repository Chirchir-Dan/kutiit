"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";

export default function LoginButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-gray-100 hover:text-green-400 text-sm font-medium px-3 py-2"
      >
        Login
      </button>

      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
