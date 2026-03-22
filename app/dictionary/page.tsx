"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { linkify } from "@/lib/linkify";

type Word = {
  id: number;
  word: string;
  slug: string;
  meaning: string;
  example_sentence?: string | null;
  example_translation?: string | null;
  notes?: string | null;
  synonyms?: string | null;
  antonyms?: string | null;
};

const DEBOUNCE_MS = 250;

export default function DictionaryPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Word[]>([]);
  const [suggestions, setSuggestions] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  // ⭐ Sync internal state with URL (?q=...)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // ⭐ Fetch results whenever query changes
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    let fetchStarted = false;

    const timeout = setTimeout(async () => {
      try {
        fetchStarted = true;
        setLoading(true);

        const res = await fetch(`/api/search?q=${q}`, {
          signal: controller.signal,
        });

        if (!res.ok) return;

        const data = await res.json();
        setResults(data.results);
        setSuggestions(data.suggestions);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timeout);
      if (fetchStarted) controller.abort();
    };
  }, [query]);

  const showSuggestions =
    !loading &&
    suggestions.length > 0 &&
    results.length > 0 &&
    results[0].word.toLowerCase() !== query.toLowerCase();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10  ">
      <h1 className="text-3xl font-semibold tracking-tight">Dictionary</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a word or translation…"
        className="mt-6 w-full border border-red-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
      />

      {showSuggestions && (
        <p className="mt-4 text-sm  ">
          Did you mean:{" "}
          {suggestions.map((s: Word, i: number) => (
            <Link
              key={i}
              href={`/dictionary?q=${s.word}`}
              className="hover:underline mr-2"
            >
              {s.word}
            </Link>
          ))}
        </p>
      )}

      {!loading && results.length > 0 && (
        <ul className="mt-6 space-y-4">
          {results.map((w: Word) => (
            <li
              key={w.id}
              className="border border-gray-200 rounded-md p-4 bg-white"
            >
              {/* Word */}
              <Link
                href={`/word/${w.slug}`}
                className="text-lg font-medium hover:underline"
              >
                {w.word}
              </Link>

              {/* Meaning */}
              <p className="mt-1 text-sm  ">
                {linkify(w.meaning)}
              </p>

              {/* Examples */}
              {(w.example_sentence || w.example_translation) && (
                <div className="mt-2 text-xs   space-y-1">
                  {w.example_sentence && <p>{linkify(w.example_sentence)}</p>}
                  {w.example_translation && (
                    <p className="italic text-gray-600">
                      {linkify(w.example_translation)}
                    </p>
                  )}
                </div>
              )}

              {/* Synonyms */}
              {w.synonyms && (
                <p className="mt-2 text-xs  ">
                  <span className="font-medium">Synonyms:</span>{" "}
                  {linkify(w.synonyms)}
                </p>
              )}

              {/* Antonyms */}
              {w.antonyms && (
                <p className="mt-1 text-xs  ">
                  <span className="font-medium">Antonyms:</span>{" "}
                  {linkify(w.antonyms)}
                </p>
              )}

              {/* Notes */}
              {w.notes && (
                <p className="mt-2 text-xs   italic">
                  {linkify(w.notes)}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
