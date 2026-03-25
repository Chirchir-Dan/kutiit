"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Generate clean, SEO-friendly slugs
function slugify(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewWordPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    entry: "", // used for all non-nouns
    meaning: "",
    part_of_speech: "",
    example_sentence: "",
    example_translation: "",
    pronunciation: "",
    category: "",
    notes: "",
    synonyms: "",
    antonyms: "",
    audio_url: "",

    // Noun-only fields
    primary_singular: "",
    primary_plural: "",
    secondary_singular: "",
    secondary_plural: ""
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!form.part_of_speech.trim()) return alert("Part of speech is required.");
    if (!form.meaning.trim()) return alert("Meaning is required.");
    if (!form.category.trim()) return alert("Category is required.");

    // If NOT a noun → entry is required
    if (form.part_of_speech !== "noun" && !form.entry.trim()) {
      return alert("Entry is required for non-nouns.");
    }

    // If noun → at least one singular form must exist
    if (
      form.part_of_speech === "noun" &&
      !form.primary_singular.trim() &&
      !form.secondary_singular.trim()
    ) {
      return alert("At least one singular noun form is required.");
    }

    // Determine slug
    const slugSource =
      form.part_of_speech === "noun"
        ? form.primary_singular || form.secondary_singular
        : form.entry;

    const slug = slugify(slugSource);

    const { error } = await supabase.from("words").insert({
      ...form,
      slug,
      // If noun → entry should be NULL
      entry: form.part_of_speech === "noun" ? null : form.entry,
    });

    if (error) {
      console.error("Supabase error:", error);
      alert("Supabase error: " + error.message);
      return;
    }

    router.push("/admin/words");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Add New Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* PART OF SPEECH FIRST */}
        <div>
          <label className="block font-medium mb-1">Part of Speech</label>
          <select
            name="part_of_speech"
            value={form.part_of_speech}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select part of speech</option>
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="adjective">Adjective</option>
            <option value="adverb">Adverb</option>
            <option value="pronoun">Pronoun</option>
            <option value="preposition">Preposition</option>
            <option value="conjunction">Conjunction</option>
            <option value="interjection">Interjection</option>
            <option value="phrase">Phrase</option>
            <option value="idiom">Idiom</option>
          </select>
        </div>

        {/* ENTRY FIELD FOR NON-NOUNS */}
        {form.part_of_speech !== "noun" && (
          <div>
            <label className="block font-medium mb-1">Entry</label>
            <input
              name="entry"
              value={form.entry}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        )}

        {/* NOUN FORMS */}
        {form.part_of_speech === "noun" && (
          <div className="border p-4 rounded bg-gray-50">
            <h2 className="font-semibold mb-3">Noun Forms</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Primary Singular</label>
                <input
                  name="primary_singular"
                  value={form.primary_singular}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Primary Plural</label>
                <input
                  name="primary_plural"
                  value={form.primary_plural}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Secondary Singular</label>
                <input
                  name="secondary_singular"
                  value={form.secondary_singular}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Secondary Plural</label>
                <input
                  name="secondary_plural"
                  value={form.secondary_plural}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* MEANING */}
        <div>
          <label className="block font-medium mb-1">Meaning</label>
          <input
            name="meaning"
            value={form.meaning}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select category</option>
            <option value="people">People</option>
            <option value="animals">Animals</option>
            <option value="plants">Plants</option>
            <option value="body_parts">Body Parts</option>
            <option value="food">Food</option>
            <option value="household_items">Household Items</option>
            <option value="nature">Nature</option>
            <option value="weather">Weather</option>
            <option value="emotions">Emotions</option>
            <option value="greetings">Greetings</option>
            <option value="kinship">Kinship</option>
            <option value="verbs_of_motion">Verbs of Motion</option>
            <option value="occupations">Occupations</option>
            <option value="numbers">Numbers</option>
            <option value="colors">Colors</option>
            <option value="tools">Tools</option>
            <option value="clothing">Clothing</option>
            <option value="places">Places</option>
            <option value="time">Time</option>
            <option value="ceremonies">Ceremonies</option>
            <option value="farming">Farming</option>
            <option value="livestock">Livestock</option>
          </select>
        </div>

        {/* EXAMPLES */}
        <div>
          <label className="block font-medium mb-1">Example Sentence</label>
          <textarea
            name="example_sentence"
            value={form.example_sentence}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 h-28 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Example Translation</label>
          <textarea
            name="example_translation"
            value={form.example_translation}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 h-28 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* PRONUNCIATION */}
        <div>
          <label className="block font-medium mb-1">Pronunciation</label>
          <input
            name="pronunciation"
            value={form.pronunciation}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* AUDIO */}
        <div>
          <label className="block font-medium mb-1">Audio URL</label>
          <input
            name="audio_url"
            value={form.audio_url}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* SYNONYMS */}
        <div>
          <label className="block font-medium mb-1">Synonyms</label>
          <input
            name="synonyms"
            value={form.synonyms}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* ANTONYMS */}
        <div>
          <label className="block font-medium mb-1">Antonyms</label>
          <input
            name="antonyms"
            value={form.antonyms}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="block font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 h-28 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={
            !form.meaning.trim() ||
            !form.part_of_speech.trim() ||
            !form.category.trim()
          }
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}
