import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  if (!query) {
    return NextResponse.json({ results: [], suggestions: [] });
  }

  const supabase = supabaseServer();

  // Fetch all words (you can optimize later)
  const { data: words } = await supabase
    .from("words")
    .select("id, word, slug, notes, synonyms, antonyms, meaning, example_sentence, example_translation");

  if (!words) {
    return NextResponse.json({ results: [], suggestions: [] });
  }

  // -----------------------------
  // 1. RESULTS (Nandi + English)
  // -----------------------------
  const results = words.filter((w) => {
    const nandi = w.word.toLowerCase();
    const meaning = w.meaning?.toLowerCase() || "";
    const exTrans = w.example_translation?.toLowerCase() || "";

    return (
      nandi.includes(query) ||
      meaning.includes(query) ||
      exTrans.includes(query)
    );
  });

  // -----------------------------
  // 2. SUGGESTIONS (Nandi + English)
  // -----------------------------
  const nandiSuggestions = words.filter((w) =>
    w.word.toLowerCase().startsWith(query)
  );

  const englishSuggestions = words.filter((w) =>
    (w.meaning || "").toLowerCase().startsWith(query)
  );

  const translationSuggestions = words.filter((w) =>
    (w.example_translation || "").toLowerCase().startsWith(query)
  );

  // Combine + dedupe
  const suggestions = [
    ...nandiSuggestions,
    ...englishSuggestions,
    ...translationSuggestions,
  ].filter(
    (w, i, arr) => arr.findIndex((x) => x.slug === w.slug) === i
  );

  return NextResponse.json({
    results,
    suggestions: suggestions.slice(0, 5),
  });
}
