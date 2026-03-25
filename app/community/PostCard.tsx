import Link from "next/link";

export default function PostCard() {
  return (
    <div
      className="
        p-5 rounded-lg border border-[--accent-green]/30
        hover:border-[--accent-green] hover:bg-black/20
        transition
      "
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[--accent-green] font-medium">
          Category
        </span>
        <span className="text-xs text-[--foreground]/60">Date</span>
      </div>

      <h3 className="text-lg font-semibold text-white">Post Title</h3>

      <p className="mt-2 text-[--foreground]/80 line-clamp-2">
        This is a preview of the post content. It will show the first few lines
        of the proverb, question, or story.
      </p>

      <div className="mt-4 flex items-center gap-6 text-sm text-[--foreground]/70">
        <span>👍 0</span>
        <span>💬 0</span>
      </div>
    </div>
  );
}
