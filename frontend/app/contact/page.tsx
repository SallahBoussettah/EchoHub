import PublicNavbar from "../components/PublicNavbar";
import ContactHero from "../components/ContactHero";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export default function ContactPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <Footer />
      <FinalCTA />
    </main>
  );
}
