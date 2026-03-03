"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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
    antonyms:"",
    audio_url:""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("words").insert(form);

    if (error) {
      console.error("Supabase error:", error);
      alert("Superbase error: " + error.message);
      return;
    }

    router.push("/admin/words");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Word</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
           <div key={key}>
             <label className="block font-medium mb-1 capitalize">
               {key.replace("_", " ")}
             </label>
              
              {key === "part_of_speech" ? (
                 <select
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
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
                ) : key === "category" ? (
                    <select name={key} value={form[key]} onChange={handleChange} className="w-full border p-2 rounded" >
                      <option value="">Select category</option>
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
                ) : key === "notes" || key.includes("example") ? (
                 <textarea
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                /> ) : (
                  <input
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                )}
            </div>
        ))}

        <button
           type="submit"
           disabled={
               !form.word.trim() ||
               !form.meaning.trim() ||
               !form.part_of_speech.trim()
            }
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400" 
        >
          Save Word 
        </button>
      </form>
    </div>
  );
}
