export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-gray-900">
      <h1 className="text-4xl font-semibold tracking-tight">
        Kutiit — Nandi Language Platform
      </h1>

      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        A clean and simple place to explore Nandi vocabulary, meanings,
        translations, and examples. Built with care, designed for clarity.
      </p>

      <div className="mt-10 space-x-4">
        <a
          href="/dictionary"
          className="px-5 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
        >
          Open Dictionary
        </a>

        <a
          href="/learn"
          className="px-5 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
        >
          Learning Materials
        </a>
      </div>
    </main>
  );
}
