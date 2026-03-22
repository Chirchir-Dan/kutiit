"use client";

import { useEffect, useState } from "react";

export default function Mission() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const element = document.getElementById("mission-section");
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="mission-section"
      className={`
        mb-20 transition-all duration-700 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <h2 className="text-2xl font-semibold text-[--accent-green] mb-4">
        Our Mission
      </h2>

      <ul className="space-y-3 max-w-2xl">
        {[
          "Document Kalenjin vocabulary across all communities.",
          "Highlight dialect variations with accuracy and respect.",
          "Preserve cultural knowledge, proverbs, and expressions.",
          "Support learners, researchers, and future generations.",
          "Build a digital home where every Kalenjin speaker feels represented.",
        ].map((item, i) => (
          <li
            key={i}
            className={`
              transition-all duration-700 delay-${i * 150}
              ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
            `}
          >
            • {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
