import Hero from "@/app/components/home/Hero";
import FactsCarousel from "@/app/components/home/FactsCarousel";
import CommunityInvite from "@/app/components/home/CommunityInvite";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20 text-center">
      <Hero />
      <FactsCarousel />
      <CommunityInvite />
    </main>
  );
}
