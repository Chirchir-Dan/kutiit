"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function EditWordPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [word, setWord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWord() {
      const { data, error } = await supabase
        .from("words")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      setWord(data);
      setLoading(false);
    }

    loadWord();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!word) return <p className="p-4">Word not found.</p>;

  async function save() {
    const { error } = await supabase
      .from("words")
      .update(word)
      .eq("id", id);

    if (error) {
      alert("Error updating word");
      console.error(error);
    } else {
      router.push("/admin/words");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Word</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        className="space-y-4"
      >
        {Object.entries(word).map(([key, value]) => {
          if (key === "id" || key === "created_at") return null;

          const displayValue: string = Array.isArray(value)
            ? value.join(", ")
            : value != null && value != undefined
            ? String(value)
            : "";

          return (
            <div key={key}>
              <label className="block font-medium mb-1">{key}</label>
              <input
                type="text"
                value={displayValue}
                onChange={(e) =>
                  setWord({
                    ...word,
                    [key]: Array.isArray(value)
                      ? e.target.value.split(",").map((s) => s.trim())
                      : e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          );
        })}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
