// lib/dictionaryIndex.ts

let index: Record<string, string> = {};            // nandi → slug
let reverseIndex: Record<string, string[]> = {};   // english → [slugs]

export function setDictionaryIndex(
  words: { word: string; meaning: string | null; slug: string }[]
) {
  index = {};
  reverseIndex = {};

  for (const w of words) {
    if (!w) continue;

    // Nandi word
    const nandi = (w.word || "").toLowerCase().trim();
    if (nandi) index[nandi] = w.slug;

    // English meaning
    const meaning = (w.meaning || "").toLowerCase();

    // Tokenize English meaning
    const tokens = meaning
      .split(/[^a-zA-Z]+/) // split on non-letters
      .map((t) => t.trim())
      .filter(Boolean);

    for (const t of tokens) {
      if (!reverseIndex[t]) reverseIndex[t] = [];
      reverseIndex[t].push(w.slug);
    }
  }
}

export function findSlugForNandi(word: string) {
  return index[word.toLowerCase()] || null;
}

export function findSlugsForEnglish(word: string) {
  return reverseIndex[word.toLowerCase()] || [];
}
