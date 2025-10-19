"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import {
  Users,
  Brain,
  FileText,
  Calendar,
  Inbox,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Client Hubs",
    description: "Dedicated spaces with timelines, notes, and files",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    icon: Brain,
    title: "AI Summaries",
    description: "Instant conversation and feedback analysis",
    color: "from-purple-500/10 to-purple-600/5",
    iconColor: "text-purple-600",
  },
  {
    icon: FileText,
    title: "Proposals",
    description: "Polished proposals in minutes",
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
  {
    icon: Calendar,
    title: "Smart Scheduler",
    description: "Intelligent deadline management",
    color: "from-green-500/10 to-green-600/5",
    iconColor: "text-green-600",
  },
  {
    icon: Inbox,
    title: "Inbox Sync",
    description: "Centralized communication hub",
    color: "from-red-500/10 to-red-600/5",
    iconColor: "text-red-600",
  },
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "Real-time project health insights",
    color: "from-indigo-500/10 to-indigo-600/5",
    iconColor: "text-indigo-600",
  },
];

export default function ModernFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".feature-card", { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          ".feature-card",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[oklch(0.85_0.08_240)] to-transparent rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[oklch(0.85_0.08_30)] to-transparent rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[var(--color-line)] mb-6">
            <span className="text-sm font-medium text-[var(--color-accent-ink)]">
              FEATURES
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
            Everything you need
            <br />
            to stay organized
          </h2>
          <p
            style={{ fontSize: "var(--step-2)" }}
            className="text-[var(--color-muted-ink)] max-w-2xl mx-auto"
          >
            Built for freelancers who want control, clarity, and focus
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`feature-card group relative p-8 rounded-3xl bg-gradient-to-br ${feature.color} backdrop-blur-xl border border-[var(--color-line)] hover:border-[var(--color-accent-ink)]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden`}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${feature.iconColor}`}
                    strokeWidth={2}
                  />
                </div>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: "var(--step-3)" }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{ fontSize: "var(--step-0)" }}
                  className="text-[var(--color-muted-ink)] leading-relaxed"
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
