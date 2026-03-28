"use client";

import { ReactNode } from "react";

export default function Modal({ open, onClose, children }: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-xl w-full max-w-lg">
        {children}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 border rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
