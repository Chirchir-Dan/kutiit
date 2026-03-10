"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Word = {
  id: number;
  word: string;
  meaning: string;
  slug: string;

  part_of_speech?: string | null;
  example_sentence?: string | null;
  example_translation?: string | null;
  audio_url?: string | null;
  category?: string | null;
  notes?: string | null;

  synonyms?: string[] | string | null;
  antonyms?: string[] | string | null;
};

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Word[]>([]);
  const [suggestions, setSuggestions] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    async function search() {
      try {
        setLoading(true);

        const res = await fetch(`/api/search?q=${query}`, { signal });
        if (!res.ok) return;

        const data = await res.json();

        if (!signal.aborted) {
          setResults(data.results);
          setSuggestions(data.suggestions);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    search();

    return () => controller.abort();
  }, [query]);

  return (
    <main className="space-y-8 text-gray-800">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Samburtap Nandi</h1>
        <p className="mt-2 text-lg text-gray-600">
          Search and explore Nandi words, meanings, and examples.
        </p>
      </div>

      {/* Search bar */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          placeholder="Search for a word..."
          className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Loading indicator */}
      {loading && <p className="text-gray-500">Searching…</p>}

      {/* Typo suggestions */}
      {!loading && suggestions.length > 0 && (
        <div className="text-gray-600">
          Did you mean:{" "}
          {suggestions.map((s, i) => (
            <Link
              key={i}
              href={`/word/${s.slug}`}
              className="text-blue-700 underline mr-2"
            >
              {s.word}
            </Link>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <ul className="space-y-6">
          {results.map((word) => (
            <li
              key={word.id}
              className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Word + POS */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/word/${word.slug}`}
                  className="text-2xl font-semibold text-blue-700 hover:underline"
                >
                  {word.word}
                </Link>

                {word.part_of_speech && (
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {word.part_of_speech}
                  </span>
                )}
              </div>

              {/* Meaning */}
              <p className="text-gray-800 mt-2">{word.meaning}</p>

              {/* Category */}
              {word.category && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {word.category}
                </p>
              )}

              {/* Example */}
              {(word.example_sentence || word.example_translation) && (
                <div className="mt-3 bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Example:</span>{" "}
                    {word.example_sentence}
                  </p>
                  {word.example_translation && (
                    <p className="text-sm text-gray-600 italic">
                      {word.example_translation}
                    </p>
                  )}
                </div>
              )}

              {/* Synonyms */}
              {word.synonyms && (
                <div className="mt-3">
                  <span className="font-semibold text-gray-700">
                    Synonyms:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(Array.isArray(word.synonyms)
                      ? word.synonyms
                      : word.synonyms.split(",")
                    ).map((syn, i) => (
                      <span
                        key={i}
                        className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded"
                      >
                        {syn.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Antonyms */}
              {word.antonyms && (
                <div className="mt-3">
                  <span className="font-semibold text-gray-700">
                    Antonyms:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(Array.isArray(word.antonyms)
                      ? word.antonyms
                      : word.antonyms.split(",")
                    ).map((ant, i) => (
                      <span
                        key={i}
                        className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded"
                      >
                        {ant.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {word.notes && (
                <p className="text-sm text-gray-600 mt-3">
                  <span className="font-semibold">Notes:</span> {word.notes}
                </p>
              )}

              {/* Audio */}
              {word.audio_url && (
                <audio controls className="mt-3 w-full">
                  <source src={word.audio_url} type="audio/mpeg" />
                </audio>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
