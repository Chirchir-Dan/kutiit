import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req) {
  const supabase = supabaseServer();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return Response.json({ results: [], suggestions: [] });
  }

  // Main search
  const { data: results } = await supabase
    .from("words")
    .select("id, word, meaning, part_of_speech, example_sentence, example_translation, audio_url, category, notes, synonyms, antonyms, slug")
    .ilike("word", `%${q}%`)
    .order("word");

  // Typo suggestions using trigram similarity
  const { data: suggestions } = await supabase.rpc("word_suggestions", {
    search_term: q,
  });

  return Response.json({
    results: results || [],
    suggestions: suggestions || [],
  });
}
