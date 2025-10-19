"use client";
import { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import PricingPageHero from "../components/PricingPageHero";
import PricingCards from "../components/PricingCards";
import PricingFAQ from "../components/PricingFAQ";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />
      <PricingPageHero billingCycle={billingCycle} onToggle={setBillingCycle} />
      <PricingCards billingCycle={billingCycle} />
      <PricingFAQ />
      <Footer />
      <FinalCTA />
    </main>
  );
}
