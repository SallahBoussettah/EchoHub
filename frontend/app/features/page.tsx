import PublicNavbar from "../components/PublicNavbar";
import FeaturesPageHero from "../components/FeaturesPageHero";
import FeaturesGrid from "../components/FeaturesGrid";
import FeaturesComparison from "../components/FeaturesComparison";
import FeaturesRoadmap from "../components/FeaturesRoadmap";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export default function FeaturesPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />
      <FeaturesPageHero />
      <FeaturesGrid />
      <FeaturesComparison />
      <FeaturesRoadmap />
      <Footer />
      <FinalCTA />
    </main>
  );
}
