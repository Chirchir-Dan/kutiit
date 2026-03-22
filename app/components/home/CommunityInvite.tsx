export default function CommunityInvite() {
  return (
    <section className="text-center space-y-12">
      
      {/* Community Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-[--accent-green]">
          The Community Section
        </h2>

        <p className="max-w-xl mx-auto text-[--foreground] leading-relaxed">
          A shared space for proverbs, sayings, stories, and cultural insights.
          Here, speakers from all Kalenjin communities contribute knowledge that
          helps preserve our heritage for future generations.
        </p>
      </div>

      {/* Dictionary Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-[--accent-green]">
          The Dictionary Section
        </h2>

        <p className="max-w-xl mx-auto text-[--foreground] leading-relaxed">
          Explore vocabulary entries across the Kalenjin languages. Each entry
          includes meanings, examples, notes, and dialect variations where
          available.
        </p>
      </div>

    </section>
  );
}
