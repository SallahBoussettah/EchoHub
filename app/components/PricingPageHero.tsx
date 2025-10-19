"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import { Sparkles } from "lucide-react";

interface PricingPageHeroProps {
  billingCycle: "monthly" | "annual";
  onToggle: (cycle: "monthly" | "annual") => void;
}

export default function PricingPageHero({
  billingCycle,
  onToggle,
}: PricingPageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".pricing-hero-content",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="pricing-hero-content text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] mb-8">
            <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="text-sm font-semibold text-[var(--color-ink)]">
              Simple, transparent pricing
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl font-black leading-[1.1] tracking-[-0.03em] mb-6 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start free,
            <br />
            <span className="text-[var(--color-muted-ink)]">
              scale as you grow
            </span>
          </h1>

          <p className="text-xl text-[var(--color-muted-ink)] max-w-3xl mx-auto leading-relaxed mb-12">
            No hidden fees. No surprises. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)]">
            <button
              onClick={() => onToggle("monthly")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                billingCycle === "monthly"
                  ? "bg-[var(--color-accent)] text-white shadow-lg"
                  : "text-[var(--color-muted-ink)] hover:text-[var(--color-ink)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => onToggle("annual")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                billingCycle === "annual"
                  ? "bg-[var(--color-accent)] text-white shadow-lg"
                  : "text-[var(--color-muted-ink)] hover:text-[var(--color-ink)]"
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
