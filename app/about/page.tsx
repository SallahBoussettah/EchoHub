import PublicNavbar from "../components/PublicNavbar";
import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";
import AboutValues from "../components/AboutValues";
import AboutCTA from "../components/AboutCTA";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export default function AboutPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCTA />
      <Footer />
      <FinalCTA />
    </main>
  );
}
