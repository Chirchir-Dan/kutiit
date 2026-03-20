"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initial = "" }) {
  const [query, setQuery] = useState(initial);
  const router = useRouter();

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => {
        const value = e.target.value;
        setQuery(value);
        router.push(`/dictionary?q=${value}`);
      }}
      placeholder="Search a word or translation…"
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
    />
  );
}
