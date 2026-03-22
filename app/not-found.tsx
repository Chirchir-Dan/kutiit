export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-gray-700">
        The page you’re looking for doesn’t exist.
      </p>

      <a
        href="/"
        className="mt-6 inline-block px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
      >
        Go Home
      </a>
    </main>
  );
}
