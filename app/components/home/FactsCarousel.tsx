"use client";

import { useEffect, useState } from "react";

const facts = [
  "The Kalenjin communities number over 6.3 million people (2019 Census).",
  "Kalenjin is one of Kenya’s largest linguistic groups.",
  "The Kalenjin cluster includes Nandi, Kipsigis, Tugen, Keiyo, Marakwet, Pokot, Sabaot, and Terik.",
  "Some dialects, such as Terik, have very few speakers left.",
  "Urbanization is causing a decline in daily use among younger generations.",
];

export default function KeyFactsCarousel() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % facts.length);
        setFade(true);
      }, 400); // fade-out duration
    }, 5000); // calm rotation

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-center">
      <h2 className="text-2xl font-semibold text-[--accent-green] " >
        Key Facts About the Kalenjin Language
      </h2>

      <div className="relative h-24 flex items-center justify-center">
        <p
          className={`
            text-[--foreground] text-lg max-w-2xl leading-relaxed text-center
            transition-opacity duration-500
            ${fade ? "opacity-100" : "opacity-0"}
          `}
        >
          {facts[index]}
        </p>
      </div>
    </section>
  );
}
