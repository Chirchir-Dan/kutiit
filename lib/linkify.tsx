import Link from "next/link";
import { findSlugForNandi } from "@/lib/dictionaryIndex";

export function linkify(text: string) {
  if (!text) return text;

  const tokens = text.split(/(\s+)/); // keep spaces

  return tokens.map((token, i) => {
    const clean = token.toLowerCase().replace(/[^a-zA-Z]/g, "");

    if (!clean) return token;

    // Nandi → word detail
    const nandiSlug = findSlugForNandi(clean);
    if (nandiSlug) {
      return (
        <Link key={i} href={`/word/${nandiSlug}`} className="hover:underline">
          {token}
        </Link>
      );
    }

    // English → search
    return (
      <Link key={i} href={`/dictionary?q=${clean}`} className="hover:underline">
        {token}
      </Link>
    );
  });
}
