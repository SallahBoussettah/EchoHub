import PublicNavbar from "../components/PublicNavbar";
import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";
import AboutValues from "../components/AboutValues";
import AboutRoadmap from "../components/AboutRoadmap";
import AboutCommunity from "../components/AboutCommunity";
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
      <AboutRoadmap />
      <AboutCommunity />
      <AboutCTA />
      <Footer />
      <FinalCTA />
    </main>
  );
}
