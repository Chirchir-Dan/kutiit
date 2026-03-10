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
    <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Words</h1>

        <Link
          href="/admin/words/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add New Word
        </Link>
      </div>

      {words.length === 0 ? (
        <p>No words found.</p>
      ) : (
        <div className="space-y-6">
          {words.map((w) => (
            <div
              key={w.id}
              className="border-b pb-5 pt-2 hover:bg-gray-50 px-4 rounded transition"
            >
              {/* Top row: Word + POS + Actions */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-baseline gap-3">

                    {/* CLICKABLE WORD */}
                    <Link href={`/word/${w.slug}`}>
                      <h2 className="text-xl font-bold text-blue-700 hover:underline">
                        {w.word}
                      </h2>
                    </Link>

                    <span className="text-sm text-gray-600">
                      {w.part_of_speech}
                    </span>
                  </div>

                  <p className="text-gray-800 mt-1">{w.meaning}</p>
                </div>

                {/* Actions */}
                <div className="text-right space-x-3">
                  <Link
                    href={`/admin/words/edit/${w.id}`}
                    className="text-blue-600 hover:underline"
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

                      if (error) {
                        console.error("DELETE ERROR:", error);
                        alert(error.message);
                      } else {
                        setWords(words.filter((item) => item.id !== w.id));
                      }
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Example sentence */}
              {w.example_sentence && (
                <div className="mt-3">
                  <p className="text-gray-700 italic">
                    “{w.example_sentence}”
                  </p>
                  {w.example_translation && (
                    <p className="text-gray-600 ml-4">
                      → {w.example_translation}
                    </p>
                  )}
                </div>
              )}

              {/* Category + Created date */}
              <div className="mt-3 text-sm text-gray-500 flex gap-6">
                <span>Category: {w.category}</span>
                <span>
                  Added: {new Date(w.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
