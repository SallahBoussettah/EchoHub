"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import {
  Sparkles,
  Users,
  FileText,
  Search,
  Mail,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Client Hubs",
    description:
      "Dedicated spaces for each client with timelines, notes, and shared files. Everything about a client in one organized place.",
    benefits: [
      "Centralized client information",
      "Project timeline tracking",
      "File attachments and notes",
      "Activity history log",
    ],
    color: "var(--color-accent)",
  },
  {
    icon: Sparkles,
    title: "AI Summaries",
    description:
      "Instantly summarize conversations, feedback threads, and project notes. Get clarity in seconds, not hours.",
    benefits: [
      "3-second summary generation",
      "Context-aware insights",
      "Multi-language support",
      "Smart bullet points",
    ],
    color: "var(--color-accent-bright)",
  },
  {
    icon: FileText,
    title: "Project Management",
    description:
      "Track deliverables with simple, focused project tools. No complexity, just what freelancers actually need.",
    benefits: [
      "Milestone checklists",
      "Deadline tracking",
      "Status management",
      "Rich text notes",
    ],
    color: "var(--color-accent)",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Find anything instantly across all clients, projects, and notes. Never lose track of important information again.",
    benefits: [
      "Full-text search",
      "Instant results",
      "Filter by client or project",
      "Search history",
    ],
    color: "var(--color-accent-bright)",
  },
  {
    icon: Mail,
    title: "Smart Notifications",
    description:
      "Stay on top of deadlines without the noise. Get timely reminders that actually help, not distract.",
    benefits: [
      "Deadline reminders",
      "Weekly summaries",
      "Overdue alerts",
      "Customizable preferences",
    ],
    color: "var(--color-accent)",
  },
  {
    icon: BarChart3,
    title: "Dashboard Overview",
    description:
      "See what matters at a glance. Active clients, upcoming deadlines, and recent activity in one clean view.",
    benefits: [
      "Quick stats overview",
      "Upcoming deadlines",
      "Activity feed",
      "Client status cards",
    ],
    color: "var(--color-accent-bright)",
  },
];

export default function FeaturesGrid() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!featuresRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".feature-card",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={featuresRef} className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:shadow-2xl hover:border-[var(--color-accent)] transition-all duration-500 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: feature.color }}
              >
                <feature.icon
                  className="w-7 h-7 text-white"
                  strokeWidth={2.5}
                />
              </div>

              <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
                {feature.title}
              </h3>

              <p className="text-[var(--color-muted-ink)] mb-6 leading-relaxed">
                {feature.description}
              </p>

              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-[var(--color-muted-ink)]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0"
                      strokeWidth={2.5}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
