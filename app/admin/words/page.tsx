"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function WordsListPage() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWords() {
      const { data, error } = await supabase
        .from("words")
        .select("*")
        .order("word", { ascending: true });

      if (error) {
        console.error("Error loading words:", error);
      } else {
        setWords(data);
      }

      setLoading(false);
    }

    loadWords();
  }, []);

  if (loading) {
    return <div className="p-6">Loading words…</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Words</h1>
        <Link
          href="/admin/words/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Word
        </Link>
      </div>

      {words.length === 0 ? (
        <p>No words found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Word</th>
              <th className="text-left p-2">Meaning</th>
              <th className="text-left p-2">Part of Speech</th>
              <th className="text-left p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {words.map((w) => (
              <tr key={w.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{w.word}</td>
                <td className="p-2">{w.meaning}</td>
                <td className="p-2">{w.part_of_speech}</td>
                <td className="p-2">{w.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
