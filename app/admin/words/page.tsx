"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function WordsListPage() {
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWords() {
      const { data, error } = await supabase
        .from("words")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching words:", error);
      } else {
        setWords(data);
      }

      setLoading(false);
    }

    fetchWords();
  }, []);

  if (loading) {
    return <p className="p-4">Loading words...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Words</h1>

      <Link
        href="/admin/words/new/"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add New Word
      </Link>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Word</th>
            <th className="border p-2">Meaning</th>
            <th className="border p-2">Part of Speech</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Created</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {words.map((w) => (
            <tr key={w.id}>
              <td className="border p-2">{w.word}</td>
              <td className="border p-2">{w.meaning}</td>
              <td className="border p-2">{w.part_of_speech}</td>
              <td className="border p-2">{w.category}</td>
              <td className="border p-2">
                {new Date(w.created_at).toLocaleDateString()}
              </td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/admin/words/edit/${w.id}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>

                <button
                  onClick={async () => {
                    if (!confirm("Delete this word?")) return;

                    const { error } = await supabase
                      .from("words")
                      .delete()
                      .eq("id", w.id);
                    
                    console.log("Delete errir:", error);                        
                    if (error) {
                        console.error("DELETE ERROR:", error);
                        alert(error.message);
                    } else {
                      setWords(words.filter((item) => item.id !== w.id));
                    }
                  }}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
