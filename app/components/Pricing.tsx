"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    features: [
      "1 active client hub",
      "Basic timeline view",
      "5 AI summaries/month",
      "Email support",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 290 },
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
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "Collaborative boards",
      "Team analytics",
      "Custom branding",
      "Dedicated support",
    ],
    cta: "Contact sales",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-24 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: "var(--step-5)",
              fontFamily: "var(--font-display)",
            }}
          >
            Simple, transparent pricing
          </h2>
          <p
            style={{ fontSize: "var(--step-1)" }}
            className="text-[var(--color-muted-ink)] mb-8"
          >
            Start free. Upgrade when you're ready.
          </p>

          <div className="inline-flex items-center gap-3 p-1 rounded-[var(--r-md)] bg-white border border-[var(--color-line)]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-[var(--r-sm)] transition-all ${
                !annual ? "bg-[var(--color-ink)] text-[var(--color-bg)]" : ""
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-[var(--r-sm)] transition-all ${
                annual ? "bg-[var(--color-ink)] text-[var(--color-bg)]" : ""
              }`}
            >
              Annual <span className="text-[var(--step--1)]">(Save 17%)</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`card p-8 ${
                plan.popular ? "ring-2 ring-[var(--color-accent-ink)]" : ""
              }`}
            >
              {plan.popular && (
                <div className="text-[var(--step--1)] text-[var(--color-accent-ink)] font-semibold mb-2">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-[var(--step-3)] font-bold mb-2">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-[var(--step-5)] font-bold">
                  ${annual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className="text-[var(--color-muted-ink)]">
                  /{annual ? "year" : "month"}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[var(--color-accent-ink)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--step-0)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#signup"
                className={
                  plan.popular ? "btn-primary w-full" : "btn-ghost w-full"
                }
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
