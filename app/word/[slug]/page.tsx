import { supabaseServer } from "@/lib/supabaseServer";
import { linkify } from "@/lib/linkify";
import SearchBar from "@/app/components/SearchBar";

export default async function WordDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  // Next.js 14+ requires awaiting params in async server components
  const { slug } = await props.params;

  const supabase = supabaseServer();

  const { data: word } = await supabase
    .from("words")
    .select(
      "id, word, slug, meaning, example_sentence, example_translation, notes, synonyms, antonyms"
    )
    .eq("slug", slug)
    .single();

  if (!word) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <SearchBar />
        <p className="mt-10 text-gray-600">Word not found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900">
      {/* Persistent search bar */}
      <SearchBar />

      {/* Word */}
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">
        {word.word}
      </h1>

      {/* Meaning */}
      <p className="mt-3 text-lg text-gray-800">
        {linkify(word.meaning)}
      </p>

      {/* Examples */}
      {(word.example_sentence || word.example_translation) && (
        <div className="mt-4 text-sm text-gray-700 space-y-1">
          {word.example_sentence && <p>{linkify(word.example_sentence)}</p>}
          {word.example_translation && (
            <p className="italic text-gray-600">
              {linkify(word.example_translation)}
            </p>
          )}
        </div>
      )}

      {/* Synonyms */}
      {word.synonyms && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800">Synonyms</h3>
          <p className="text-sm text-gray-700">{linkify(word.synonyms)}</p>
        </div>
      )}

      {/* Antonyms */}
      {word.antonyms && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-800">Antonyms</h3>
          <p className="text-sm text-gray-700">{linkify(word.antonyms)}</p>
        </div>
      )}

      {/* Notes */}
      {word.notes && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800">Notes</h3>
          <p className="text-sm text-gray-600 italic">{linkify(word.notes)}</p>
        </div>
      )}
    </main>
  );
}
