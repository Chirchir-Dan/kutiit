export default function Reply() {
  return (
    <div
      className="
        p-4 rounded-lg border border-[--accent-green]/20
        bg-black/20
      "
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[--accent-green] font-medium">
          Anonymous
        </span>
        <span className="text-xs text-[--foreground]/60">1 day ago</span>
      </div>

      <p className="text-[--foreground] leading-relaxed">
        This proverb was commonly used by elders in my village. It reminds people
        not to rush important decisions.
      </p>

      <div className="mt-3 flex items-center gap-4 text-sm text-[--foreground]/70">
        <button className="hover:text-[--accent-green] transition">👍 3</button>
        <button className="hover:text-[--accent-green] transition">👎 0</button>
      </div>
    </div>
  );
}
