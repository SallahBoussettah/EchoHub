"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export default function ModernShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDemo, setActiveDemo] = useState<"timeline" | "ai">("timeline");

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".showcase-content", { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          ".showcase-content",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 showcase-content">
          <div className="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[var(--color-line)] mb-6">
            <span className="text-sm font-medium text-[var(--color-accent-ink)]">
              LIVE DEMO
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
            See it in action
          </h2>
          <p
            style={{ fontSize: "var(--step-2)" }}
            className="text-[var(--color-muted-ink)] max-w-2xl mx-auto"
          >
            Interactive demos of EchoHub's most powerful features
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="flex justify-center gap-4 mb-12 showcase-content">
          <button
            onClick={() => setActiveDemo("timeline")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeDemo === "timeline"
                ? "bg-[var(--color-ink)] text-white shadow-xl scale-105"
                : "bg-white/80 backdrop-blur-xl border border-[var(--color-line)] hover:shadow-lg"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Timeline View
          </button>
          <button
            onClick={() => setActiveDemo("ai")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeDemo === "ai"
                ? "bg-[var(--color-ink)] text-white shadow-xl scale-105"
                : "bg-white/80 backdrop-blur-xl border border-[var(--color-line)] hover:shadow-lg"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            AI Summary
          </button>
        </div>

        {/* Demo Content */}
        <div className="max-w-5xl mx-auto showcase-content">
          {activeDemo === "timeline" ? (
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-[var(--color-line)] p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Client Hub Timeline</h3>
                  <p className="text-sm text-[var(--color-muted-ink)]">
                    Track every milestone
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    date: "Jan 15",
                    label: "Project kickoff",
                    status: "completed",
                  },
                  {
                    date: "Jan 22",
                    label: "Design review",
                    status: "completed",
                  },
                  {
                    date: "Feb 5",
                    label: "Development start",
                    status: "active",
                  },
                  { date: "Feb 20", label: "Beta launch", status: "upcoming" },
                ].map((milestone, i) => (
                  <div
                    key={i}
                    className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                      milestone.status === "active"
                        ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30"
                        : "bg-[var(--color-muted)] hover:bg-white hover:shadow-lg"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        milestone.status === "completed"
                          ? "bg-green-500"
                          : milestone.status === "active"
                          ? "bg-blue-500 animate-pulse"
                          : "bg-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{milestone.label}</div>
                      <div className="text-sm text-[var(--color-muted-ink)]">
                        {milestone.date}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[var(--color-muted-ink)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">AI Summary</h3>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      Instant insights
                    </p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-700 text-sm font-medium">
                  ✓ Summarized in 3.2s
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm">
                  <div className="text-sm text-[var(--color-muted-ink)] mb-2">
                    Raw Notes
                  </div>
                  <p className="text-sm leading-relaxed opacity-60">
                    Client called at 2pm. Wants to add a new feature to the
                    dashboard. Mentioned budget concerns but willing to discuss.
                    Follow up next week about timeline. Also asked about mobile
                    app - not urgent but interested for Q2.
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white shadow-lg">
                  <div className="text-sm font-semibold text-purple-600 mb-3">
                    AI Summary
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold mb-1">🎯 Action Items:</div>
                      <ul className="space-y-1 ml-4">
                        <li>
                          • Schedule follow-up call next week re: dashboard
                          feature
                        </li>
                        <li>• Prepare budget proposal for new feature</li>
                        <li>• Q2 mobile app discussion (low priority)</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">💰 Budget:</div>
                      <p className="ml-4">
                        Concerns raised, open to negotiation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
