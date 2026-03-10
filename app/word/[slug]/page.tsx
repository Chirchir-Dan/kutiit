import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

async function getWord(slug: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("words")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export default async function WordDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params; // FIX: await params

  const word = await getWord(slug);

  if (!word) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Word not found</h1>
        <p className="text-gray-700 mb-4">
          We couldn’t find this word in the dictionary.
        </p>

        <Link href="/search" className="text-blue-600 underline">
          Go back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-baseline gap-3">
        <h1 className="text-3xl font-bold text-gray-900">{word.word}</h1>
        <span className="text-lg text-gray-600">{word.part_of_speech}</span>
      </div>

      <p className="text-xl text-gray-800 mt-3">{word.meaning}</p>

      {word.pronunciation && (
        <p className="text-gray-600 mt-2">/{word.pronunciation}/</p>
      )}

      {word.audio_url && (
        <audio controls className="mt-3">
          <source src={word.audio_url} />
        </audio>
      )}

      {word.example_sentence && (
        <div className="mt-6">
          <p className="italic text-gray-700">
            “{word.example_sentence}”
          </p>
          {word.example_translation && (
            <p className="text-gray-600 ml-4">
              → {word.example_translation}
            </p>
          )}
        </div>
      )}

      {word.synonyms && (
        <div className="mt-6">
          <h2 className="font-semibold text-gray-900">Synonyms</h2>
          <p className="text-gray-700">{word.synonyms}</p>
        </div>
      )}

      {word.antonyms && (
        <div className="mt-4">
          <h2 className="font-semibold text-gray-900">Antonyms</h2>
          <p className="text-gray-700">{word.antonyms}</p>
        </div>
      )}

      {word.notes && (
        <div className="mt-4">
          <h2 className="font-semibold text-gray-900">Notes</h2>
          <p className="text-gray-700">{word.notes}</p>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        Category: {word.category}
      </div>

      <div className="mt-8">
        <Link href="/search" className="text-blue-600 underline">
          Back to search
        </Link>
      </div>
    </div>
  );
}
