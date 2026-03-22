import Hero from "@/app/components/home/Hero";
import Mission from "@/app/components/home/Mission";
import WhyPreserve from "@/app/components/home/WhyPreserve";
import NavigationCards from "@/app/components/home/NavigationCards";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Hero />
      <Mission />
      <WhyPreserve />
      <NavigationCards />

    
    </main>
  );
}
