"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import { Sparkles, Calendar, Play, Check } from "lucide-react";

export default function UltraModernShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDemo, setActiveDemo] = useState<"timeline" | "ai">("ai");

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
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-[oklch(0.99_0.005_240)]"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 showcase-content">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 mb-6">
            <Play className="w-4 h-4 text-purple-600" fill="currentColor" />
            <span className="text-sm font-semibold text-purple-900">
              LIVE DEMO
            </span>
          </div>
          <h2
            className="font-black mb-6 leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontFamily: "var(--font-display)",
            }}
          >
            <span className="bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
              See it in action
            </span>
          </h2>
          <p
            style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)" }}
            className="text-black/60 max-w-2xl mx-auto"
          >
            Interactive demos of EchoHub's most powerful features
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="flex justify-center gap-3 mb-12 showcase-content">
          <button
            onClick={() => setActiveDemo("ai")}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 ${
              activeDemo === "ai"
                ? "bg-black text-white shadow-2xl scale-105"
                : "bg-white border border-black/10 hover:border-black/20 hover:shadow-lg"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            AI Summary
          </button>
          <button
            onClick={() => setActiveDemo("timeline")}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 ${
              activeDemo === "timeline"
                ? "bg-black text-white shadow-2xl scale-105"
                : "bg-white border border-black/10 hover:border-black/20 hover:shadow-lg"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Timeline View
          </button>
        </div>

        {/* Demo Content */}
        <div className="max-w-6xl mx-auto showcase-content">
          {activeDemo === "ai" ? (
            <div className="rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100/50 p-10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Sparkles
                      className="w-8 h-8 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">AI Summary</h3>
                    <p className="text-sm text-black/60">
                      Transform chaos into clarity
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200">
                  <Check className="w-4 h-4 text-green-700" strokeWidth={3} />
                  <span className="text-sm font-semibold text-green-700">
                    3.2s
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Raw Notes */}
                <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/5">
                  <div className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-3">
                    Raw Notes
                  </div>
                  <p className="text-sm leading-relaxed text-black/50">
                    Client called at 2pm. Wants to add a new feature to the
                    dashboard. Mentioned budget concerns but willing to discuss.
                    Follow up next week about timeline. Also asked about mobile
                    app - not urgent but interested for Q2.
                  </p>
                </div>

                {/* Arrow Animation */}
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* AI Summary */}
                <div className="p-6 rounded-2xl bg-white shadow-xl border border-purple-100">
                  <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-4">
                    AI Summary
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="font-bold mb-2 flex items-center gap-2">
                        <span className="text-lg">🎯</span>
                        Action Items
                      </div>
                      <ul className="space-y-2 ml-6">
                        <li className="flex items-start gap-2">
                          <Check
                            className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                            strokeWidth={3}
                          />
                          <span>
                            Schedule follow-up call next week re: dashboard
                            feature
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check
                            className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                            strokeWidth={3}
                          />
                          <span>Prepare budget proposal for new feature</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check
                            className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                            strokeWidth={3}
                          />
                          <span>Q2 mobile app discussion (low priority)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-black/5">
                      <div className="font-bold mb-2 flex items-center gap-2">
                        <span className="text-lg">💰</span>
                        Budget
                      </div>
                      <p className="ml-6 text-black/70">
                        Concerns raised, open to negotiation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-black/5 p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Client Hub Timeline</h3>
                  <p className="text-sm text-black/60">
                    Track every milestone with precision
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    date: "Jan 15",
                    label: "Project kickoff",
                    status: "completed",
                    color: "green",
                  },
                  {
                    date: "Jan 22",
                    label: "Design review",
                    status: "completed",
                    color: "green",
                  },
                  {
                    date: "Feb 5",
                    label: "Development start",
                    status: "active",
                    color: "blue",
                  },
                  {
                    date: "Feb 20",
                    label: "Beta launch",
                    status: "upcoming",
                    color: "gray",
                  },
                ].map((milestone, i) => (
                  <div
                    key={i}
                    className={`group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                      milestone.status === "active"
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg"
                        : "bg-[oklch(0.99_0.005_240)] hover:bg-white hover:shadow-lg border border-transparent hover:border-black/5"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        milestone.color === "green"
                          ? "bg-green-500"
                          : milestone.color === "blue"
                          ? "bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50"
                          : "bg-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">
                        {milestone.label}
                      </div>
                      <div className="text-sm text-black/50">
                        {milestone.date}
                      </div>
                    </div>
                    {milestone.status === "completed" && (
                      <Check
                        className="w-5 h-5 text-green-600"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
