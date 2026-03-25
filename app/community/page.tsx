export default function CommunityPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-16">

      {/* Title */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="mt-4 text-lg leading-relaxed text-[--foreground]">
          The Kutiit Community is an open space where speakers from all Kalenjin
          communities can share proverbs, sayings, stories, interpretations, and
          cultural insights. Every contribution helps preserve knowledge for future
          generations.
        </p>
      </header>

      {/* What You Can Share */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">What You Can Share</h2>

        <ul className="space-y-3 text-[--foreground] leading-relaxed">
          <li>• Proverbs and their meanings</li>
          <li>• Sayings, expressions, and idioms</li>
          <li>• Cultural stories or explanations</li>
          <li>• Questions about meaning or usage</li>
          <li>• Variations across Kalenjin dialects</li>
        </ul>

        <p className="text-[--foreground] leading-relaxed">
          Posts can receive replies, interpretations, clarifications, and cultural
          context from others, creating a living archive of shared knowledge.
        </p>
      </section>

      {/* How the Community Works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">How the Community Works</h2>

        <ul className="space-y-3 text-[--foreground] leading-relaxed">
          <li>• Anyone can post a proverb, saying, or question</li>
          <li>• Others can reply with interpretations or context</li>
          <li>• Posts and replies can be liked or disliked</li>
          <li>• Discussions form threads that grow over time</li>
          <li>• The most helpful contributions rise to the top</li>
        </ul>

        <p className="text-[--foreground] leading-relaxed">
          This space is moderated by the community itself through thoughtful
          contributions and respectful discussion.
        </p>
      </section>

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Get in Touch</h2>
        <p className="text-[--foreground] leading-relaxed">
          If you'd like to collaborate, share feedback, or help shape the future of
          Kutiit:
        </p>
        <p className="font-medium text-[--accent-green]">
          community@kutiit.org
        </p>
      </section>
    </main>
  );
}
