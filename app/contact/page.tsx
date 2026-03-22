export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16  ">

      <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>

      <p className="mt-4 text-lg  ">
        We’d love to hear from you. Whether you have feedback, suggestions,
        corrections, or ideas for improving Kutiit, your voice matters.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Email</h2>
        <p className="mt-2  ">
          You can reach us anytime at:
        </p>
        <p className="mt-1 font-medium  ">
          hello@kutiit.org
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Community</h2>
        <p className="mt-2 ">
          If you'd like to contribute words, examples, or cultural notes,
          we welcome your participation. Kutiit is a community‑driven project.
        </p>
      </section>

      <footer className="mt-20 border-t pt-6 text-center text-sm  ">
        <p>Made with love for the Nandi community.</p>
      </footer>
    </main>
  );
}
