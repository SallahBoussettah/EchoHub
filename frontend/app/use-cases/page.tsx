import PublicNavbar from "../components/PublicNavbar";
import UseCasesHero from "../components/UseCasesHero";
import UseCasesGrid from "../components/UseCasesGrid";
import UseCasesCTA from "../components/UseCasesCTA";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export default function UseCasesPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />
      <UseCasesHero />
      <UseCasesGrid />
      <UseCasesCTA />
      <Footer />
      <FinalCTA />
    </main>
  );
}
