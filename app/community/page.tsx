export default function CommunityHome() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Community</h1>

      <ul className="space-y-3 text-lg">
        <li><a href="/community/proverbs" className="underline">Proverbs</a></li>
        <li><a href="/community/sayings" className="underline">Sayings</a></li>
        <li><a href="/community/stories" className="underline">Stories</a></li>
        <li><a href="/community/riddles" className="underline">Riddles</a></li>
        <li><a href="/community/posts" className="underline">General Posts</a></li>
      </ul>
    </div>
  );
}
