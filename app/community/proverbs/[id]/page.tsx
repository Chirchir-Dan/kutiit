"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProverbDetail({ params }: { params: { id: string } }) {
  const [proverb, setProverb] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data: p, error: pErr } = await supabase
      .from("proverbs")
      .select("*")
      .eq("id", params.id)
      .single();

    if (pErr) {
      console.error("Load proverb error:", pErr);
      return;
    }

    setProverb(p);

    const { data: c, error: cErr } = await supabase
      .from("proverb_comments")
      .select("*")
      .eq("proverb_id", params.id)
      .order("created_at", { ascending: false });

    if (cErr) {
      console.error("Load comments error:", cErr);
      return;
    }

    setComments(c || []);
  }

  async function submitComment() {
    setErrorMsg("");

    if (!text.trim()) {
      setErrorMsg("Comment cannot be empty.");
      return;
    }

    const { error } = await supabase.from("proverb_comments").insert({
      proverb_id: params.id,
      text: text.trim(),
    });

    if (error) {
      console.error("Insert comment error:", error);
      setErrorMsg(error.message);
      return;
    }

    setText("");
    load();
  }

  if (!proverb) return <p>Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">{proverb.text}</h1>
      {proverb.meaning && (
        <p className="opacity-70 mb-6">{proverb.meaning}</p>
      )}

      <h2 className="text-xl font-semibold mb-3">Discussion</h2>

      {errorMsg && (
        <p className="text-red-600 mb-2">{errorMsg}</p>
      )}

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write a comment…"
        className="w-full p-2 border rounded mb-3"
      />

      <button
        onClick={submitComment}
        disabled={!text.trim()}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-40 hover:bg-neutral-800"
      >
        Post Comment
      </button>

      <div className="mt-6 space-y-3">
        {comments.map(c => (
          <div key={c.id} className="p-3 border rounded">
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}
