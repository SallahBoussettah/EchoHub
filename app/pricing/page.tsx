"use client";
import { useState, useEffect, useRef } from "react";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import {
  Check,
  Sparkles,
  Users,
  Building2,
  ArrowRight,
  HelpCircle,
  Zap,
} from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

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
    }, heroRef);

    return () => ctx.revert();
  }, []);

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

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
    },
    {
      question: "What happens when I hit my AI summary limit?",
      answer:
        "You'll receive a notification when you're close to your limit. On the Free plan, you'll need to wait until next month or upgrade. Pro users get 100 summaries/month.",
    },
    {
      question: "Is there a free trial for Pro?",
      answer:
        "Yes! Pro comes with a 14-day free trial. No credit card required. You can cancel anytime during the trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. Annual plans can also be paid via invoice.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund you in full.",
    },
    {
      question: "Do you offer discounts for students or nonprofits?",
      answer:
        "Yes! We offer 50% off Pro plans for students and registered nonprofits. Contact us with proof of eligibility.",
    },
  ];

  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />

      {/* Hero Section */}
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
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[var(--color-accent)] text-white shadow-lg"
                    : "text-[var(--color-muted-ink)] hover:text-[var(--color-ink)]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
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

      {/* Pricing Cards */}
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
                      ${(plan.price.annual / 12).toFixed(0)}/month billed
                      annually
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

      {/* FAQ Section */}
      <section className="py-20 bg-[var(--color-muted)]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Frequently asked questions
            </h2>
            <p className="text-lg text-[var(--color-muted-ink)]">
              Everything you need to know about pricing
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] overflow-hidden hover:border-[var(--color-accent)] transition-all"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-[var(--color-ink)] pr-4">
                    {faq.question}
                  </span>
                  <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-[var(--color-muted-ink)] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--color-muted-ink)] mb-4">
              Still have questions?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold hover:underline"
            >
              Contact our team
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FinalCTA />
    </main>
  );
}
