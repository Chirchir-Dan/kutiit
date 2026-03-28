"use client";

import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { supabase } from "@/lib/supabase";

export default function ProverbsPage() {
  const [proverbs, setProverbs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [text, setText] = useState("");
  const [meaning, setMeaning] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load proverbs on mount
  useEffect(() => {
    loadProverbs();
  }, []);

  async function loadProverbs() {
    setLoading(true);

    const { data, error } = await supabase
      .from("proverbs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load error:", error);
      setErrorMsg("Could not load proverbs.");
      setLoading(false);
      return;
    }

    setProverbs(data || []);
    setLoading(false);
  }

  async function submitProverb() {
    setErrorMsg("");
    setSuccessMsg("");

    if (!text.trim()) {
      setErrorMsg("Please enter a proverb.");
      return;
    }

    const { error } = await supabase.from("proverbs").insert({
      text: text.trim(),
      meaning: meaning.trim(),
    });

    if (error) {
      console.error("Insert error:", error);
      setErrorMsg("Could not save. Check your database policies.");
      return;
    }

    setSuccessMsg("Saved!");
    setText("");
    setMeaning("");

    // Refresh list
    await loadProverbs();

    // Close modal after a short delay
    setTimeout(() => {
      setSuccessMsg("");
      setOpen(false);
    }, 600);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Proverbs</h1>

      <button
        onClick={() => {
          setErrorMsg("");
          setSuccessMsg("");
          setOpen(true);
        }}
        className="px-4 py-2 border rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        Add Proverb
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Add Proverb</h2>

        {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Proverb"
          className="w-full p-2 border rounded mb-3"
        />

        <textarea
          value={meaning}
          onChange={e => setMeaning(e.target.value)}
          placeholder="Meaning (optional)"
          className="w-full p-2 border rounded mb-3"
        />

        <button
          onClick={submitProverb}
          disabled={!text.trim()}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-40 hover:bg-neutral-800"
        >
          Submit
        </button>
      </Modal>

      <div className="mt-6 space-y-4">
        {loading && <p className="opacity-60">Loading…</p>}

        {!loading && proverbs.length === 0 && (
          <p className="opacity-60">No proverbs yet. Add one to begin.</p>
        )}

        {proverbs.map(p => (
          <a
            key={p.id}
            href={`/community/proverbs/${p.id}`}
            className="block p-4 border rounded hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
          >
            <p className="font-medium">{p.text}</p>
            {p.meaning && (
              <p className="text-sm opacity-70">{p.meaning}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
