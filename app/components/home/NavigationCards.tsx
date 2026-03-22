"use client";

import { useState } from "react";

const cards = [
  {
    title: "Explore the Dictionary",
    description: "Browse words across all Kalenjin communities.",
    href: "/dictionary",
  },
  {
    title: "Proverbs & Wisdom",
    description: "Discover traditional sayings and teachings.",
    href: "/proverbs",
  },
  {
    title: "Categories",
    description: "Learn vocabulary by topic and theme.",
    href: "/categories",
  },
  {
    title: "Contribute",
    description: "Share a word, variation, or proverb.",
    href: "/contribute",
  },
];

export default function NavigationCards() {
  const [ripple, setRipple] = useState({ x: 0, y: 0, active: false });

  const triggerRipple = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });

    setTimeout(() => setRipple({ x: 0, y: 0, active: false }), 500);
  };

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-semibold text-[--accent-gold] mb-6">
        Explore Kutiit
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <a
            key={i}
            href={card.href}
            onClick={triggerRipple}
            className="
              relative overflow-hidden
              block p-6 rounded-lg border border-[--accent-green]
              bg-black/40 backdrop-blur-sm
              transition-all duration-300
              hover:scale-[1.03] hover:shadow-xl hover:border-[--accent-gold]
              active:scale-[0.98]
            "
          >
            {/* Ripple */}
            {ripple.active && (
              <span
                className="absolute bg-white/20 rounded-full animate-ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 200,
                  height: 200,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}

            <h3 className="text-xl font-semibold text-[--accent-gold]">
              {card.title}
            </h3>
            <p className="mt-2 text-[--foreground]">{card.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
