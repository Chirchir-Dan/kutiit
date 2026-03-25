import Reply from "@/app/components/community/Reply";

export default function PostPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-12">

      {/* Post Header */}
      <header className="space-y-2">
        <span className="text-[--accent-green] text-sm font-medium">
          Proverb
        </span>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Chepng’etuny tugul chebo kot
        </h1>

        <p className="text-[--foreground]/60 text-sm">
          Posted 2 days ago
        </p>
      </header>

      {/* Post Content */}
      <section className="space-y-4">
        <p className="text-[--foreground] leading-relaxed">
          This proverb teaches patience and the importance of allowing things to
          unfold in their natural time. It is often used to remind someone not to
          rush decisions or force outcomes.
        </p>

        <p className="text-[--foreground] leading-relaxed">
          It appears across several Kalenjin communities with slight variations,
          but the meaning remains consistent.
        </p>
      </section>

      {/* Interaction Bar */}
      <div className="flex items-center gap-6 text-[--foreground]/80 text-sm">
        <button className="hover:text-[--accent-green] transition">👍 12</button>
        <button className="hover:text-[--accent-green] transition">👎 1</button>
        <span>💬 4 replies</span>
      </div>

      {/* Replies */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Replies</h2>

        <Reply />
        <Reply />
        <Reply />
      </section>

      {/* Reply Form */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Add a Reply</h3>

        <textarea
          placeholder="Share your interpretation or context..."
          className="
            w-full h-32 p-4 rounded-md
            bg-black/30 border border-[--accent-green]/30
            text-white placeholder-[--foreground]/50
            focus:border-[--accent-green] focus:outline-none
          "
        />

        <button
          className="
            px-5 py-2 rounded-md
            bg-[--accent-green] text-black font-semibold
            hover:bg-[--accent-green]/80 transition
          "
        >
          Post Reply
        </button>
      </section>

    </main>
  );
}
