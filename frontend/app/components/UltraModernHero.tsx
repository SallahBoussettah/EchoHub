"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";

export default function UltraModernHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            ".hero-badge",
            ".hero-title",
            ".hero-subtitle",
            ".hero-cta",
            ".bento-item",
          ],
          {
            opacity: 1,
            y: 0,
          }
        );
      } else {
        const tl = gsap.timeline();

        tl.fromTo(
          ".hero-badge",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        )
          .fromTo(
            ".hero-title",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.3"
          )
          .fromTo(
            ".hero-subtitle",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            ".bento-item",
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.4"
          );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.8 0 0) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.8 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[var(--color-accent)]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[var(--color-accent-bright)]/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 py-20">
        {/* Badge */}
        <div className="hero-badge flex justify-center mb-10">
          <div className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] shadow-lg hover:shadow-xl hover:scale-105 hover:border-[var(--color-accent)] transition-all duration-300 cursor-pointer">
            <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="text-sm font-semibold text-[var(--color-ink)]">
              AI-Powered Workspace
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-accent)] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Hero Title - Ultra Large */}
        <h1
          className="hero-title text-center font-black leading-[0.9] tracking-[-0.05em] mb-8 relative"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
            fontFamily: "var(--font-display)",
          }}
        >
          <span className="block text-[var(--color-ink)]">One calm place</span>
          <span className="block text-[var(--color-muted-ink)]">
            for all your chaos
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle text-center max-w-3xl mx-auto mb-12 text-[var(--color-muted-ink)] leading-relaxed"
          style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)" }}
        >
          EchoHub unifies clients, projects, and proposals with AI summaries.
          <br className="hidden md:block" />
          Built for freelancers who value{" "}
          <span className="text-[var(--color-ink)] font-semibold">
            clarity and control
          </span>
          .
        </p>

        {/* CTAs */}
        <div className="hero-cta flex items-center justify-center gap-4 mb-24">
          <a
            href="#signup"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[var(--color-accent-bright)]"
          >
            <span>Start free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#demo"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-[var(--color-accent)]"
          >
            <span>Watch demo</span>
          </a>
        </div>

        {/* Ultra Modern Bento Grid */}
        <div className="grid grid-cols-12 gap-3 max-w-7xl mx-auto">
          {/* Large AI Feature - Spans 2 rows */}
          <div className="bento-item col-span-12 lg:col-span-7 row-span-2 group relative rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 overflow-hidden hover:shadow-2xl hover:border-[var(--color-accent)] transition-all duration-500 cursor-pointer">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Sparkles
                    className="w-7 h-7 text-[var(--color-bg)]"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-ink)]">
                    AI Summaries
                  </h3>
                  <p className="text-sm text-[var(--color-muted-ink)]">
                    Instant insights from chaos
                  </p>
                </div>
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-[var(--color-muted)] border border-[var(--color-line)] group-hover:scale-[1.02] transition-transform duration-500">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[var(--color-muted-ink)]">
                    Processing time
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-semibold">
                    FAST
                  </span>
                </div>
                <div className="text-5xl font-black text-[var(--color-ink)]">
                  3.2s
                </div>
                <p className="text-sm text-[var(--color-muted-ink)] mt-2">
                  Average summary generation
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bento-item col-span-12 lg:col-span-5 group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-2xl hover:border-[var(--color-accent)] transition-all duration-500 cursor-pointer">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
                <TrendingUp
                  className="w-5 h-5 text-[var(--color-bg)]"
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="font-bold text-lg text-[var(--color-ink)]">
                Client Timeline
              </h3>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Kickoff", color: "bg-[var(--color-accent)]" },
                { label: "Design", color: "bg-[var(--color-accent)]" },
                {
                  label: "Development",
                  color: "bg-[var(--color-accent)] animate-pulse",
                },
                { label: "Launch", color: "bg-[var(--color-line)]" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-muted)] transition-colors"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bento-item col-span-6 lg:col-span-3 group rounded-3xl bg-[var(--color-accent)] p-6 text-[var(--color-bg)] hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105">
            <Zap className="w-8 h-8 mb-3 opacity-90" strokeWidth={2.5} />
            <div className="text-4xl font-black mb-1">2.5hrs</div>
            <div className="text-sm opacity-90 font-medium">Saved weekly</div>
          </div>

          <div className="bento-item col-span-6 lg:col-span-2 group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-2xl hover:border-[var(--color-accent)] transition-all duration-500 cursor-pointer hover:scale-105">
            <div className="text-4xl font-black text-[var(--color-ink)] mb-1">
              94%
            </div>
            <div className="text-xs text-[var(--color-muted-ink)] font-medium">
              Acceptance rate
            </div>
          </div>

          {/* Scheduler Card */}
          <div className="bento-item col-span-12 lg:col-span-5 group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-2xl hover:border-[var(--color-accent)] transition-all duration-500 cursor-pointer">
            <h3 className="font-bold text-lg mb-2 text-[var(--color-ink)]">
              Smart Scheduler
            </h3>
            <p className="text-sm text-[var(--color-muted-ink)] mb-4">
              AI-powered deadline management
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-lg ${
                    i === 3
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-line)]"
                  }`}
                  style={{ height: `${20 + i * 10}px` }}
                />
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="bento-item col-span-12 lg:col-span-2 group rounded-3xl bg-[var(--color-accent)] p-6 text-[var(--color-bg)] hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105">
            <div className="text-3xl font-black mb-1">12</div>
            <div className="text-xs opacity-90 font-medium">
              Active projects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
