import { NextResponse } from "next/server";
import { supabaseBrowserClient } from "@/lib/supabaseClient";

// Levenshtein distance (optimized)
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

function normalize(str: string | null): string {
  if (!str) return "";
  return str.toLowerCase().replace(/[.,!?;:()]/g, "").trim();
}

function tokenize(str: string | null): string[] {
  if (!str) return [];
  return normalize(str).split(/\s+/).filter(Boolean);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = normalize(searchParams.get("q") || "");

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const { data: words, error } = await supabaseBrowserClient
    .from("words")
    .select("*");

  if (error || !words) {
    console.error("Supabase error:", error);
    return NextResponse.json({ results: []});
  }

  const scored: Array<{ word: any; score: number }> = [];

  for (const w of words) {
    let score = 0;

    const forms = [
      w.primary_singular,
      w.primary_plural,
      w.secondary_singular,
      w.secondary_plural,
      w.entry,
    ].map(normalize);

    const meaning = normalize(w.meaning);
    const notes = normalize(w.notes);
    const synonyms = normalize(w.synonyms);
    const antonyms = normalize(w.antonyms);

    const exampleTokens = [
      ...tokenize(w.example_sentence),
      ...tokenize(w.example_translation),
    ];

    const tokens = [
      ...forms,
      meaning,
      notes,
      synonyms,
      antonyms,
      ...exampleTokens,
    ].filter(Boolean);

    // 1. Exact match
    if (tokens.includes(q)) {
      score = 100;
    }

    // 2. Prefix match
    if (score < 100 && tokens.some(t => t.startsWith(q))) {
      score = 80;
    }

    // 3. Substring match
    if (score < 80 && tokens.some(t => t.includes(q))) {
      score = 60;
    }

    // 4. Fuzzy match (distance ≤ 2 instead of 3)
    if (score < 60) {
      for (const t of tokens) {
        const dist = levenshtein(q, t);
        if (dist <= 2) {
          score = 50 - dist;
          break;
        }
      }
    }

    if (score > 0) {
      scored.push({ word: w, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const results = scored.slice(0, 20).map(s => s.word);
  const suggestions = results.slice(0, 5);

  return NextResponse.json({
    results
  });
}
