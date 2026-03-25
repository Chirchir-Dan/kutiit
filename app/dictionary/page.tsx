"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { linkify } from "@/lib/linkify";

type Word = {
  id: string;
  entry: string | null;
  slug: string;
  meaning: string;
  part_of_speech: string;

  primary_singular?: string | null;
  primary_plural?: string | null;
  secondary_singular?: string | null;
  secondary_plural?: string | null;

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
  const [loading, setLoading] = useState(false);

  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  function getHeadword(w: Word, query: string) {
    const q = query.toLowerCase().trim();

    if (w.part_of_speech === "noun") {
      const forms = [
        w.primary_singular,
        w.primary_plural,
        w.secondary_singular,
        w.secondary_plural,
      ].filter(Boolean) as string[];

      const match = forms.find((f) => f.toLowerCase() === q);
      if (match) return match;

      return w.primary_singular || "(missing form)";
    }

    return w.entry || "(missing entry)";
  }

  function clickableText(word: string) {
    return (
      <button
        onClick={() => {
          setQuery(word);
          setSelectedWord(null);
        }}
        className="underline-offset-2 hover:underline"
      >
        {word}
      </button>
    );
  }

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setSelectedWord(null);
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

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Dictionary</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedWord(null);
        }}
        placeholder="Search a word or translation…"
        className="mt-6 w-full rounded-md px-3 py-2 border focus:outline-none"
      />
      
      {!loading && !selectedWord && results.length > 0 && (
        <ul className="mt-6 space-y-4">
          {results.map((w) => {
            const head = getHeadword(w, query);

            return (
              <li
                key={w.id}
                className="p-4 rounded-lg border shadow-sm cursor-pointer"
                onClick={() => setSelectedWord(w)}
              >
                <p className="text-lg font-medium">{head}</p>

                <p className="mt-1 text-sm">{linkify(w.meaning)}</p>

                {(w.example_sentence || w.example_translation) && (
                  <div className="mt-2 text-xs space-y-1">
                    {w.example_sentence && <p>{linkify(w.example_sentence)}</p>}
                    {w.example_translation && (
                      <p className="italic">{linkify(w.example_translation)}</p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )} 

      {selectedWord && (
        <div className="mt-10 p-6 border rounded-lg shadow-sm">

          {/* NEW HEADER: (Noun) teta — cow */}
          <h2 className="text-2xl font-semibold mb-6">
            ({selectedWord.part_of_speech}){" "}
            {getHeadword(selectedWord, query)} — {selectedWord.meaning}
          </h2>

          {/* CLEAN 2×2 TABLE — NO COLOR CLASSES */}
          {selectedWord.part_of_speech === "noun" && (
            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-3 py-2 text-left">Primary</th>
                    <th className="border px-3 py-2 text-left">Secondary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="border px-3 py-2 cursor-pointer"
                      onClick={() => setQuery(selectedWord.primary_singular!)}
                    >
                      {selectedWord.primary_singular}
                    </td>
                    <td
                      className="border px-3 py-2 cursor-pointer"
                      onClick={() => setQuery(selectedWord.secondary_singular!)}
                    >
                      {selectedWord.secondary_singular}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border px-3 py-2 cursor-pointer"
                      onClick={() => setQuery(selectedWord.primary_plural!)}
                    >
                      {selectedWord.primary_plural}
                    </td>
                    <td
                      className="border px-3 py-2 cursor-pointer"
                      onClick={() => setQuery(selectedWord.secondary_plural!)}
                    >
                      {selectedWord.secondary_plural}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* EXAMPLE */}
          {selectedWord.example_sentence && (
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Example</h3>
              <p className="italic">
                {linkify(selectedWord.example_sentence, clickableText)}
              </p>
              {selectedWord.example_translation && (
                <p className="mt-1">
                  {linkify(selectedWord.example_translation, clickableText)}
                </p>
              )}
            </div>
          )}

          {/* NOTES */}
          {selectedWord.notes && (
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Notes</h3>
              <p>{linkify(selectedWord.notes, clickableText)}</p>
            </div>
          )}

          {/* SYNONYMS */}
          {selectedWord.synonyms && (
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Synonyms</h3>
              <p>{linkify(selectedWord.synonyms, clickableText)}</p>
            </div>
          )}

          {/* ANTONYMS */}
          {selectedWord.antonyms && (
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Antonyms</h3>
              <p>{linkify(selectedWord.antonyms, clickableText)}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
