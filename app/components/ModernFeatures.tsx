"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsapClient";
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
    description:
      "Dedicated spaces for each client with timelines, notes, and shared files.",
  },
  {
    icon: Brain,
    title: "AI Summaries",
    description:
      "Instantly summarize conversations or feedback threads with AI.",
  },
  {
    icon: FileText,
    title: "Proposals",
    description: "Create polished proposals from project briefs in minutes.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduler",
    description: "Detects overlapping deadlines and suggests adjustments.",
  },
  {
    icon: Inbox,
    title: "Inbox Sync",
    description:
      "Connect Gmail or Outlook to centralize project communication.",
  },
  {
    icon: BarChart3,
    title: "Dashboard",
    description:
      "See overall project health and upcoming milestones at a glance.",
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
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] mb-6">
            <span className="text-sm font-medium text-[var(--color-accent)]">
              FEATURES
            </span>
          </div>
          <h2
            className="font-black mb-6 text-[var(--color-ink)]"
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
              className="feature-card group relative p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon
                    className="w-7 h-7 text-[var(--color-accent)]"
                    strokeWidth={2}
                  />
                </div>
                <h3
                  className="font-bold mb-3 text-[var(--color-ink)]"
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
