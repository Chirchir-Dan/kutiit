import type { JSX } from "react";

export function linkify(
  text: string,
  wrap?: (word: string) => JSX.Element
) {
  if (!text) return text;

  const tokens = text.split(/(\s+|[.,!?;:()])/g);

  return tokens.map((token, i) => {
    if (/^\s+$/.test(token) || /^[.,!?;:()]+$/.test(token)) {
      return token;
    }

    if (wrap) {
      return <span key={i}>{wrap(token)}</span>;
    }

    return token;
  });
}
