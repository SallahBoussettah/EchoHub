import UltraModernHero from "./components/UltraModernHero";
import UltraModernShowcase from "./components/UltraModernShowcase";
import ModernFeatures from "./components/ModernFeatures";
import ModernPricing from "./components/ModernPricing";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative bg-white">
      <UltraModernHero />
      <UltraModernShowcase />
      <ModernFeatures />
      <ModernPricing />
      <FAQ />
      <Footer />
      <FinalCTA />
    </main>
  );
}
