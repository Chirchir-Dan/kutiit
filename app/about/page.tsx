export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-16">

      {/* Title */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight">About Kutiit</h1>
        <p className="mt-4 text-lg leading-relaxed text-[--foreground]">
          Kutiit is a modern, interconnected platform built to preserve and celebrate
          the languages, wisdom, and cultural knowledge of the Kalenjin communities.
          It is a living project, one that grows as our people contribute insight,
          stories, and understanding.
        </p>
      </header>

      {/* Why We Built This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Why We Built This</h2>

        <p className="leading-relaxed text-[--foreground]">
          Across Kenya and beyond, many indigenous languages face the risk of fading
          as younger generations grow up in multilingual environments. The Kalenjin
          languages carry stories, humor, identity, and cultural wisdom, and they
          deserve a strong digital presence.
        </p>

        <p className="leading-relaxed text-[--foreground]">
          Kutiit was created to make learning and exploring these languages simple,
          accessible, and enjoyable. Whether you are reconnecting with your roots,
          teaching your children, or learning for the first time, this platform is
          here to support you.
        </p>
      </section>

      {/* Our Vision */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Our Vision</h2>

        <p className="leading-relaxed text-[--foreground]">
          We envision a future where the Kalenjin languages thrive, not only in
          homes and communities, but also in classrooms, digital spaces, and creative
          expression. Kutiit aims to be a foundation for that future.
        </p>

        <p className="leading-relaxed text-[--foreground]">
          By documenting vocabulary, examples, cultural notes, proverbs, and
          relationships between words, we hope to build a resource that is both
          linguistically rich and easy to use.
        </p>
      </section>

      {/* What Kutiit Offers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">What Kutiit Offers</h2>

        <p className="leading-relaxed text-[--foreground]">
          Kutiit is built around two pillars:
        </p>

        <ul className="space-y-3 text-[--foreground] leading-relaxed">
          <li>
            <strong className="text-[--accent-green]">The Dictionary:</strong>{" "}
            A structured, searchable collection of vocabulary across all Kalenjin
            communities, including meanings, examples, notes, and dialect variations.
          </li>

          <li>
            <strong className="text-[--accent-green]">The Community:</strong>{" "}
            An open space where speakers can share proverbs, sayings, stories,
            interpretations, and cultural insights. Every contribution helps preserve
            knowledge for future generations.
          </li>
        </ul>
      </section>

      {/* Who We Are */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Who We Are</h2>

        <p className="leading-relaxed text-[--foreground]">
          Kutiit is built by people who care deeply about language, culture, and
          community. We are developers, learners, and speakers from across the
          Kalenjin communities who believe that technology can help preserve what
          matters most.
        </p>

        <p className="leading-relaxed text-[--foreground]">
          This project is not owned by an institution, it is a community effort.
          If you would like to contribute, share feedback, or help expand the
          platform, we welcome you.
        </p>
      </section>

  
    </main>
  );
}
