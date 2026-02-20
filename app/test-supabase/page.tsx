import { supabase } from "@/lib/supabase";

export default async function TestSupabase() {
  const { data, error } = await supabase
    .from("words")
    .select("*");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Supabase Test</h1>

      {error && (
        <p className="text-red-600 mt-4">
          Error: {error.message}
        </p>
      )}

      {data && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
