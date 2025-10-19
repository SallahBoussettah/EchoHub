import PublicNavbar from "../components/PublicNavbar";
import BlogHero from "../components/BlogHero";
import BlogGrid from "../components/BlogGrid";
import BlogNewsletter from "../components/BlogNewsletter";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export default function BlogPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />
      <BlogHero />
      <BlogGrid />
      <BlogNewsletter />
      <Footer />
      <FinalCTA />
    </main>
  );
}
