export default function Hero() {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        Kutiit — The Living Nandi Dictionary
      </h1>

      <p className="mt-4 text-lg  max-w-2xl mx-auto">
        A modern, interconnected home for the Nandi language.  
        Built to preserve, celebrate, and pass it on to future generations.
      </p>

      <div className="mt-8">
        <a
          href="/dictionary"
          className="inline-block bg-green-300 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition"
        >
          Start Exploring
        </a>
      </div>
    </section>
  );
}
