export default function ContributePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-10">

      <h1 className="text-3xl font-bold tracking-tight">Contribute</h1>

      <p className="text-[--foreground]/80 leading-relaxed">
        Share a proverb, saying, question, or story. Your contribution helps preserve
        Kalenjin knowledge for future generations.
      </p>

      <form className="space-y-6">

        {/* Category */}
        <div className="space-y-2">
          <label className="block font-medium">Category</label>
          <select
            className="
              w-full p-3 rounded-md bg-black/30 border border-[--accent-green]/30
              text-white focus:border-[--accent-green] focus:outline-none
            "
          >
            <option>Proverb</option>
            <option>Saying</option>
            <option>Question</option>
            <option>Story</option>
            
          </select>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="
              w-full p-3 rounded-md bg-black/30 border border-[--accent-green]/30
              text-white focus:border-[--accent-green] focus:outline-none
            "
            placeholder="Enter a short title..."
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="block font-medium">Content</label>
          <textarea
            className="
              w-full h-40 p-3 rounded-md bg-black/30 border border-[--accent-green]/30
              text-white focus:border-[--accent-green] focus:outline-none
            "
            placeholder="Write your proverb, explanation, question, or story..."
          />
        </div>

        {/* Submit */}
        <button
          className="
            px-6 py-3 rounded-md bg-[--accent-green] text-black font-semibold
            hover:bg-[--accent-green]/80 transition
          "
        >
          Submit
        </button>
      </form>
    </main>
  );
}
