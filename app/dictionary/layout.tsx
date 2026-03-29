import { ReactNode } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import { setDictionaryIndex } from "@/lib/dictionaryIndex";

export default async function DictionaryLayout({ children }: { children: ReactNode }) {
  const supabase = await supabaseServer(); // ← FIXED

  const { data: words } = await supabase
    .from("words")
    .select("word, meaning, slug");

  if (words) {
    setDictionaryIndex(words);
  }

  return <>{children}</>;
}
