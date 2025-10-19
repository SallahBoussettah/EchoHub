"use client";
import { useState, useEffect, useRef } from "react";
import { Check, Zap } from "lucide-react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for trying out EchoHub",
    features: [
      "1 active client hub",
      "Basic timeline view",
      "5 AI summaries/month",
      "Email support",
    ],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 290 },
    description: "For serious freelancers",
    features: [
      "Unlimited client hubs",
      "Unlimited AI summaries",
      "Proposal generator",
      "Inbox sync (Gmail/Outlook)",
      "Smart scheduler",
      "Priority support",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Team",
    price: { monthly: 79, annual: 790 },
    description: "For growing agencies",
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "Collaborative boards",
      "Team analytics",
      "Custom branding",
      "Dedicated support",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export default function ModernPricing() {
  const [annual, setAnnual] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".pricing-card", { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          ".pricing-card",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.97_0.01_240)]/30 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[var(--color-line)] mb-6">
            <span className="text-sm font-medium text-[var(--color-accent-ink)]">
              PRICING
            </span>
          </div>
          <h2
            className="font-bold mb-6 bg-gradient-to-br from-[var(--color-ink)] to-[oklch(0.4_0.05_265)] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontFamily: "var(--font-display)",
              lineHeight: "1.1",
            }}
          >
            Simple, transparent pricing
          </h2>
          <p
            style={{ fontSize: "var(--step-2)" }}
            className="text-[var(--color-muted-ink)] mb-10"
          >
            Start free. Upgrade when you're ready.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-[var(--color-line)] shadow-lg">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                !annual
                  ? "bg-[var(--color-ink)] text-white shadow-lg"
                  : "text-[var(--color-muted-ink)] hover:text-[var(--color-ink)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                annual
                  ? "bg-[var(--color-ink)] text-white shadow-lg"
                  : "text-[var(--color-muted-ink)] hover:text-[var(--color-ink)]"
              }`}
            >
              Annual
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-700">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "bg-gradient-to-br from-[var(--color-ink)] to-[oklch(0.25_0.05_265)] text-white shadow-2xl scale-105"
                  : "bg-white/80 backdrop-blur-xl border border-[var(--color-line)] hover:shadow-2xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold shadow-lg flex items-center gap-1">
                  <Zap className="w-4 h-4" fill="currentColor" />
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3
                  className={`font-bold mb-2 ${
                    plan.popular ? "text-white" : "text-[var(--color-ink)]"
                  }`}
                  style={{ fontSize: "var(--step-4)" }}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular
                      ? "text-white/80"
                      : "text-[var(--color-muted-ink)]"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-bold ${
                      plan.popular ? "text-white" : "text-[var(--color-ink)]"
                    }`}
                    style={{ fontSize: "var(--step-6)" }}
                  >
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span
                    className={
                      plan.popular
                        ? "text-white/70"
                        : "text-[var(--color-muted-ink)]"
                    }
                  >
                    /{annual ? "year" : "month"}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? "text-green-300" : "text-green-600"
                      }`}
                      strokeWidth={3}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular
                          ? "text-white/90"
                          : "text-[var(--color-ink)]"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#signup"
                className={`block w-full text-center px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-white text-[var(--color-ink)] hover:shadow-2xl hover:scale-105"
                    : "bg-[var(--color-ink)] text-white hover:shadow-xl hover:scale-105"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
