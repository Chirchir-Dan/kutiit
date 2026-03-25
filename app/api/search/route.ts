import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const qRaw = searchParams.get("q") || "";
  const q = qRaw.trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ results: [], suggestions: [] });
  }

  const supabase = supabaseServer();

  const { data: words, error } = await supabase
    .from("words")
    .select(`
      id,
      entry,
      slug,
      meaning,
      part_of_speech,
      primary_singular,
      primary_plural,
      secondary_singular,
      secondary_plural,
      example_sentence,
      example_translation,
      notes,
      synonyms,
      antonyms
    `);

  if (error || !words) {
    return NextResponse.json({ results: [], suggestions: [] });
  }

  const safe = (v: any) => (v ? String(v).toLowerCase() : "");

  const headword = (w: any) => {
    if (w.part_of_speech === "noun") {
      return safe(w.primary_singular) || safe(w.secondary_singular);
    }
    return safe(w.entry);
  };

  // -------------------------------------------------------
  // SIMPLE RESULTS ENGINE — NO SUGGESTIONS
  // -------------------------------------------------------
  const results = words.filter((w) => {
    return (
      headword(w).includes(q) ||
      safe(w.primary_singular).includes(q) ||
      safe(w.primary_plural).includes(q) ||
      safe(w.secondary_singular).includes(q) ||
      safe(w.secondary_plural).includes(q) ||
      safe(w.meaning).includes(q) ||
      safe(w.synonyms).includes(q) ||
      safe(w.antonyms).includes(q) ||
      safe(w.example_sentence).includes(q) ||
      safe(w.example_translation).includes(q) ||
      safe(w.notes).includes(q)
    );
  });

  // If nothing found → tell UI to show "No entries found"
  if (results.length === 0) {
    return NextResponse.json({
      results: [],
      suggestions: [],
      notFound: true,
    });
  }

  return NextResponse.json({
    results,
    suggestions: [], // always empty
  });
}
