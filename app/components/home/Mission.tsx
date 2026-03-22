export default function Mission() {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold tracking-tight">Our Mission</h2>

      <p className="mt-3   max-w-2xl">
        Kutiit exists to document, protect, and celebrate the Nandi language.
        Every word, phrase, and example sentence is part of a living archive —
        a resource for learners, families, and future generations.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-lg">Preserve</h3>
          <p className="mt-2 text-sm  ">
            Documenting vocabulary, expressions, and cultural meaning with care.
          </p>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-lg">Connect</h3>
          <p className="mt-2 text-sm  ">
            Every word is linked — meanings, examples, synonyms, categories.
          </p>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-lg">Teach</h3>
          <p className="mt-2 text-sm  ">
            A tool for learners, families, and future generations.
          </p>
        </div>
      </div>
    </section>
  );
}
