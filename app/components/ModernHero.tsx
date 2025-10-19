"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ModernHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        // Set everything to visible immediately if reduced motion
        gsap.set(
          [
            ".hero-badge",
            ".hero-title",
            ".hero-subtitle",
            ".hero-cta",
            ".bento-card",
          ],
          {
            opacity: 1,
            y: 0,
          }
        );
      } else {
        // Animate in sequence
        const tl = gsap.timeline();

        tl.fromTo(
          ".hero-badge",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        )
          .fromTo(
            ".hero-title",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            ".hero-subtitle",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.3"
          )
          .fromTo(
            ".bento-card",
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.3"
          );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.99_0.01_95)] via-[oklch(0.98_0.015_240)] to-[oklch(0.97_0.02_280)] opacity-60" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 py-32">
        {/* Badge */}
        <div className="hero-badge flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[var(--color-line)] shadow-lg">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-ink)]" />
            <span className="text-sm font-medium">AI-Powered Workspace</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1
          className="hero-title text-center font-bold leading-[0.95] tracking-[-0.04em] mb-6 bg-gradient-to-br from-[var(--color-ink)] to-[oklch(0.35_0.05_265)] bg-clip-text text-transparent"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontFamily: "var(--font-display)",
          }}
        >
          One calm place for
          <br />
          all your client chaos
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle text-center max-w-2xl mx-auto mb-12 text-[var(--color-muted-ink)]"
          style={{ fontSize: "var(--step-2)", lineHeight: "1.6" }}
        >
          EchoHub unifies clients, projects, and proposals with AI summaries
          <br className="hidden md:block" />
          and smart scheduling. Built for freelancers who value clarity.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex items-center justify-center gap-4 mb-20">
          <a
            href="#signup"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[var(--color-ink)] text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
          >
            Start free
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-[var(--color-line)] font-semibold transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1"
          >
            Watch demo
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
          {/* Large Feature Card */}
          <div className="bento-card col-span-12 md:col-span-8 row-span-2 card p-8 bg-gradient-to-br from-white to-[var(--color-muted)] hover:shadow-2xl transition-all duration-500 group cursor-pointer">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-accent-ink)] to-[oklch(0.5_0.12_30)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">AI Summaries</h3>
                  <p className="text-sm text-[var(--color-muted-ink)]">
                    Instant insights
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[oklch(0.96_0.01_95)] to-[oklch(0.94_0.02_240)] rounded-2xl p-6 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-[var(--color-ink)]">
                    3.2s
                  </div>
                  <div className="text-sm text-[var(--color-muted-ink)]">
                    Average summary time
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bento-card col-span-12 md:col-span-4 card p-6 bg-white hover:shadow-2xl transition-all duration-500 group cursor-pointer">
            <h3 className="font-semibold mb-4">Client Timeline</h3>
            <div className="space-y-3">
              {["Kickoff", "Design", "Development", "Launch"].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent-ink)]" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bento-card col-span-6 md:col-span-4 card p-6 bg-gradient-to-br from-[oklch(0.45_0.1_30)] to-[oklch(0.38_0.12_25)] text-white hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <div className="text-3xl font-bold mb-2">2.5hrs</div>
            <div className="text-sm opacity-90">Saved per week</div>
          </div>

          {/* Proposals Card */}
          <div className="bento-card col-span-6 md:col-span-4 card p-6 bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <div className="text-3xl font-bold mb-2 text-[var(--color-ink)]">
              94%
            </div>
            <div className="text-sm text-[var(--color-muted-ink)]">
              Proposal acceptance
            </div>
          </div>

          {/* Scheduler Card */}
          <div className="bento-card col-span-12 md:col-span-4 card p-6 bg-gradient-to-br from-[oklch(0.82_0.08_240)] to-[oklch(0.78_0.09_250)] text-[var(--color-ink)] hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <h3 className="font-semibold mb-2">Smart Scheduler</h3>
            <p className="text-sm opacity-80">Never miss a deadline</p>
          </div>
        </div>
      </div>
    </section>
  );
}
