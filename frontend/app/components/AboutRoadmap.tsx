import { Calendar, Sparkles, Users } from "lucide-react";

const roadmapItems = [
  {
    quarter: "Q2 2025",
    title: "Email & Calendar Integration",
    description:
      "Connect Gmail, Outlook, and Google Calendar to centralize all client communications and scheduling.",
    icon: Calendar,
  },
  {
    quarter: "Q3 2025",
    title: "Advanced AI Features",
    description:
      "Sentiment analysis, follow-up suggestions, and automated task extraction from conversations.",
    icon: Sparkles,
  },
  {
    quarter: "Q4 2025",
    title: "Team Collaboration",
    description:
      "Shared workspaces, role-based permissions, and real-time collaborative editing for agencies.",
    icon: Users,
  },
];

export default function AboutRoadmap() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What's next
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Our roadmap is shaped by your feedback
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-500"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 mb-6">
                <span className="text-xs font-semibold text-[var(--color-accent)]">
                  {item.quarter}
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--color-muted-ink)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
