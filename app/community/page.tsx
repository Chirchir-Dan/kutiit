export default function CommunityPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 ">

      <h1 className="text-3xl font-bold tracking-tight">Community</h1>

      <p className="mt-4 text-lg  ">
        Kutiit is a community‑driven project. Every contribution — a word,
        a correction, an example sentence, a cultural note — helps strengthen
        the Nandi language for future generations.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">How You Can Help</h2>

        <ul className="mt-4 space-y-3  ">
          <li>• Suggest new words or phrases</li>
          <li>• Provide example sentences</li>
          <li>• Share cultural notes or context</li>
          <li>• Help verify meanings and translations</li>
          <li>• Spread the word about Kutiit</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Get in Touch</h2>
        <p className="mt-3  ">
          If you'd like to contribute or collaborate:
        </p>
        <p className="mt-2 font-medium  ">
          community@kutiit.org
        </p>
      </section>

      <footer className="mt-20 border-t pt-6 text-center text-sm  ">
        <p>Together, we keep our language alive.</p>
      </footer>
    </main>
  );
}
