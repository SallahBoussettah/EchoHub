"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import {
  Check,
  Sparkles,
  Zap,
  Users,
  Building2,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: Sparkles,
    price: { monthly: 0, annual: 0 },
    description: "Perfect for trying out EchoHub",
    features: [
      "3 active clients",
      "5 projects per client",
      "5 AI summaries per month",
      "100MB file storage",
      "Email support",
      "Basic search",
    ],
    cta: "Start Free",
    ctaLink: "/signup",
    popular: false,
    color: "var(--color-muted-ink)",
  },
  {
    name: "Pro",
    icon: Zap,
    price: { monthly: 20, annual: 200 },
    description: "For serious freelancers",
    features: [
      "Unlimited clients",
      "Unlimited projects",
      "100 AI summaries per month",
      "10GB file storage",
      "Priority email support",
      "Advanced search",
      "Early access to new features",
      "Custom branding (coming soon)",
    ],
    cta: "Start Pro Trial",
    ctaLink: "/signup?plan=pro",
    popular: true,
    color: "var(--color-accent)",
  },
  {
    name: "Team",
    icon: Users,
    price: { monthly: 79, annual: 790 },
    description: "For agencies and small teams",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Shared workspaces",
      "Role-based permissions",
      "Team activity feed",
      "Collaborative editing",
      "Priority support",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
    popular: false,
    color: "var(--color-accent-bright)",
  },
];

interface PricingCardsProps {
  billingCycle: "monthly" | "annual";
}

export default function PricingCards({ billingCycle }: PricingCardsProps) {
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pricingRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".pricing-card",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pricingRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, pricingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={pricingRef} className="pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative rounded-3xl bg-[var(--color-surface)] border p-8 transition-all duration-500 hover:shadow-2xl ${
                plan.popular
                  ? "border-[var(--color-accent)] shadow-xl scale-105"
                  : "border-[var(--color-line)] hover:border-[var(--color-accent)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: plan.color }}
              >
                <plan.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>

              <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-2">
                {plan.name}
              </h3>

              <p className="text-sm text-[var(--color-muted-ink)] mb-6">
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[var(--color-ink)]">
                    ${plan.price[billingCycle]}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-[var(--color-muted-ink)]">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  )}
                </div>
                {billingCycle === "annual" && plan.price.annual > 0 && (
                  <p className="text-sm text-[var(--color-muted-ink)] mt-1">
                    ${(plan.price.annual / 12).toFixed(0)}/month billed annually
                  </p>
                )}
              </div>

              <a
                href={plan.ctaLink}
                className={`block w-full py-3 rounded-xl font-semibold text-center transition-all mb-8 ${
                  plan.popular
                    ? "bg-[var(--color-accent)] text-white hover:brightness-110 hover:-translate-y-0.5 shadow-lg"
                    : "bg-[var(--color-muted)] text-[var(--color-ink)] hover:bg-[var(--color-surface)] border border-[var(--color-line)]"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-[var(--color-muted-ink)]"
                  >
                    <Check
                      className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-muted)] border border-[var(--color-line)] p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-1">
                  Enterprise
                </h3>
                <p className="text-[var(--color-muted-ink)]">
                  Custom solutions for large teams and agencies
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg whitespace-nowrap"
            >
              <span>Contact Sales</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
