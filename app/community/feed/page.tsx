import PostCard from "@/app/components/community/PostCard";

export default function CommunityFeedPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">

      <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>

      {/* Empty state for now */}
      <div className="text-[--foreground]/70 text-center py-20">
        <p className="text-lg">Posts will appear here once the community is active.</p>
        <p className="mt-2">You can contribute by sharing a proverb, saying, question, or story.</p>
      </div>

    </main>
  );
}
