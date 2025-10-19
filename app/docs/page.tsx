import PublicNavbar from "../components/PublicNavbar";
import DocsHero from "../components/DocsHero";
import DocsGrid from "../components/DocsGrid";
import DocsSearch from "../components/DocsSearch";
import DocsQuickLinks from "../components/DocsQuickLinks";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export default function DocsPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />
      <DocsHero />
      <DocsGrid />
      <DocsSearch />
      <DocsQuickLinks />
      <Footer />
      <FinalCTA />
    </main>
  );
}
