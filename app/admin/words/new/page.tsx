"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Generate clean, SEO-friendly slugs
function slugify(str: string) {
  return str
    .normalize("NFD")                 // split accents
    .replace(/[\u0300-\u036f]/g, "")  // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")      // replace spaces & symbols with hyphens
    .replace(/^-+|-+$/g, "");         // trim hyphens
}

export default function NewWordPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    word: "",
    meaning: "",
    part_of_speech: "",
    example_sentence: "",
    example_translation: "",
    pronunciation: "",
    category: "",
    notes: "",
    synonyms: "",
    antonyms: "",
    audio_url: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.word.trim()) return alert("Word is required.");
    if (!form.meaning.trim()) return alert("Meaning is required.");
    if (!form.part_of_speech.trim()) return alert("Part of speech is required.");
    if (!form.category.trim()) return alert("Category is required.");

    const slug = slugify(form.word)
    const { error } = await supabase.from("words").insert({
      ...form,
      slug,
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
      <h1 className="text-2xl font-bold mb-6">Add New Word</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block font-medium mb-1 capitalize">
              {key.replace("_", " ")}
            </label>

            {/* Part of Speech Dropdown */}
            {key === "part_of_speech" ? (
              <select
                name={key}
                value={form[key]}
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

            /* Category Dropdown */
            ) : key === "category" ? (
              <select
                name={key}
                value={form[key]}
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

            /* Textareas */
            ) : key === "notes" || key.includes("example") ? (
              <textarea
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 h-28 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

            /* Default Input */
            ) : (
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded bg-white text-gray-900 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={
            !form.word.trim() ||
            !form.meaning.trim() ||
            !form.part_of_speech.trim() ||
            !form.category.trim()
          }
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Save Word
        </button>
      </form>
    </div>
  );
}
