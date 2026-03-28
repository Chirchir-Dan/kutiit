export default function SayingDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Saying #{params.id}</h1>
      <p>Saying content + discussion goes here.</p>
    </div>
  );
}
