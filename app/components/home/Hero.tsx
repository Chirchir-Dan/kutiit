"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`
        mb-20 transition-all duration-700 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-[--accent-green] leading-tight">
        Kutiit: A Digital Home for the Kalenjin Language and Culture
      </h1>

      <p className="mt-4 text-lg max-w-2xl text-[--foreground] ">
        Preserving our words, stories, and identity.
      </p>
    </section>
  );
}
