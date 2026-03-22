"use client";

import { useEffect, useState } from "react";

export default function WhyPreserve() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const element = document.getElementById("why-preserve-section");
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="why-preserve-section"
      className={`
        mb-20 transition-all duration-700 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <h2 className="text-2xl font-semibold text-[--accent-green] mb-6">
        Why Preserve the Kalenjin Language?
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT BLOCK */}
        <div
          className={`
            transition-all duration-700 delay-150
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
          `}
        >
          <ul className="space-y-4 text-[--foreground] leading-relaxed">
            <li>• Language connects all Kalenjin communities.</li>
            <li>• Our stories and wisdom live in the language.</li>
            <li>• Many young people are losing fluency.</li>
          </ul>
        </div>

        {/* RIGHT BLOCK */}
        <div
          className={`
            transition-all duration-700 delay-300
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
          `}
        >
          <ul className="space-y-4 text-[--foreground] leading-relaxed">
            <li>• Some dialects are at risk.</li>
            <li>• Future generations deserve access to our language.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
