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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[oklch(0.99_0.005_240)] to-[oklch(0.98_0.01_240)]"
    >
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.2 0 0) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.2 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient Orbs */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "6s", animationDelay: "1s" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 py-20">
        {/* Badge */}
        <div className="hero-badge flex justify-center mb-10">
          <div className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-2xl border border-black/5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <div className="absolute inset-0 bg-amber-400 blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              AI-Powered Workspace
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
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
          <span className="block text-black">One calm place</span>
          <span className="block text-black/70">for all your chaos</span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle text-center max-w-3xl mx-auto mb-12 text-black/60 leading-relaxed"
          style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)" }}
        >
          EchoHub unifies clients, projects, and proposals with AI summaries.
          <br className="hidden md:block" />
          Built for freelancers who value{" "}
          <span className="text-black font-semibold">clarity and control</span>.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex items-center justify-center gap-4 mb-24">
          <a
            href="#signup"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-black text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Start free</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#demo"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/90 backdrop-blur-2xl border border-black/10 font-semibold transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-105 hover:border-black/20"
          >
            <span>Watch demo</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </a>
        </div>

        {/* Ultra Modern Bento Grid */}
        <div className="grid grid-cols-12 gap-3 max-w-7xl mx-auto">
          {/* Large AI Feature - Spans 2 rows */}
          <div className="bento-item col-span-12 lg:col-span-7 row-span-2 group relative rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100/50 p-8 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">AI Summaries</h3>
                  <p className="text-sm text-black/60">
                    Instant insights from chaos
                  </p>
                </div>
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-black/5 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-black/60">
                    Processing time
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    FAST
                  </span>
                </div>
                <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  3.2s
                </div>
                <p className="text-sm text-black/60 mt-2">
                  Average summary generation
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bento-item col-span-12 lg:col-span-5 group rounded-3xl bg-white border border-black/5 p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-lg">Client Timeline</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Kickoff", color: "bg-green-500" },
                { label: "Design", color: "bg-blue-500" },
                { label: "Development", color: "bg-purple-500 animate-pulse" },
                { label: "Launch", color: "bg-gray-300" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bento-item col-span-6 lg:col-span-3 group rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 p-6 text-white hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105">
            <Zap className="w-8 h-8 mb-3 opacity-90" strokeWidth={2.5} />
            <div className="text-4xl font-black mb-1">2.5hrs</div>
            <div className="text-sm opacity-90 font-medium">Saved weekly</div>
          </div>

          <div className="bento-item col-span-6 lg:col-span-2 group rounded-3xl bg-white border border-black/5 p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105">
            <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
              94%
            </div>
            <div className="text-xs text-black/60 font-medium">
              Acceptance rate
            </div>
          </div>

          {/* Scheduler Card */}
          <div className="bento-item col-span-12 lg:col-span-5 group rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <h3 className="font-bold text-lg mb-2">Smart Scheduler</h3>
            <p className="text-sm text-black/60 mb-4">
              AI-powered deadline management
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-16 rounded-lg bg-gradient-to-t ${
                    i === 3
                      ? "from-blue-500 to-blue-400"
                      : "from-blue-200 to-blue-100"
                  }`}
                  style={{ height: `${20 + i * 10}px` }}
                />
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="bento-item col-span-12 lg:col-span-2 group rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 p-6 text-white hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105">
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
