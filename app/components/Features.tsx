"use client";
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

export default function Features() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: "var(--step-5)",
              fontFamily: "var(--font-display)",
            }}
          >
            Everything you need
          </h2>
          <p
            style={{ fontSize: "var(--step-1)" }}
            className="text-[var(--color-muted-ink)] max-w-2xl mx-auto"
          >
            Built for freelancers who want control, clarity, and focus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-300)]"
            >
              <feature.icon
                className="w-10 h-10 text-[var(--color-accent-ink)] mb-4"
                strokeWidth={1.5}
              />
              <h3
                className="font-semibold mb-2"
                style={{ fontSize: "var(--step-2)" }}
              >
                {feature.title}
              </h3>
              <p
                style={{ fontSize: "var(--step-0)" }}
                className="text-[var(--color-muted-ink)]"
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
