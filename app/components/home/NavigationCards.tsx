export default function NavigationCards() {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold tracking-tight">Explore</h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a
          href="/dictionary"
          className="block p-6 border rounded-lg bg-white shadow-sm hover:shadow transition"
        >
          <h3 className="font-semibold text-lg">Dictionary</h3>
          <p className="mt-2 text-sm  ">
            Search words, meanings, examples, synonyms, and more.
          </p>
        </a>

        <a
          href="/about"
          className="block p-6 border rounded-lg bg-white shadow-sm hover:shadow transition"
        >
          <h3 className="font-semibold text-lg">About Us</h3>
          <p className="mt-2 text-sm  ">
            Learn about the story behind Kutiit and our mission.
          </p>
        </a>

        <a
          href="/why-language-matters"
          className="block p-6 border rounded-lg bg-white shadow-sm hover:shadow transition"
        >
          <h3 className="font-semibold text-lg">Why Nandi Matters</h3>
          <p className="mt-2 text-sm  ">
            Understand the cultural importance of preserving our language.
          </p>
        </a>

        <a
          href="/community"
          className="block p-6 border rounded-lg bg-green-400 shadow-sm hover:shadow transition"
        >
          <h3 className="font-semibold text-lg">Community</h3>
          <p className="mt-2 text-sm  ">
            Join the effort to document and celebrate Nandi.
          </p>
        </a>
      </div>
    </section>
  );
}
