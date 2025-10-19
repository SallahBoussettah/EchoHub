import { Mail, FileText, Calendar, Clock } from "lucide-react";

const upcomingFeatures = [
  {
    icon: Mail,
    title: "Email Integration",
    description:
      "Connect Gmail and Outlook to centralize client communications",
    timeline: "Q2 2025",
  },
  {
    icon: FileText,
    title: "Proposal Generator",
    description:
      "Create polished proposals from project briefs with AI assistance",
    timeline: "Q2 2025",
  },
  {
    icon: Calendar,
    title: "Calendar Sync",
    description:
      "Integrate with Google Calendar and Outlook for smart scheduling",
    timeline: "Q3 2025",
  },
];

export default function FeaturesRoadmap() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What's coming next
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)]">
            We're constantly improving based on your feedback
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {upcomingFeatures.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:border-[var(--color-accent)] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-muted)] flex items-center justify-center mb-4">
                <item.icon
                  className="w-6 h-6 text-[var(--color-accent)]"
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--color-muted-ink)] mb-4 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                <Clock className="w-3 h-3 text-[var(--color-accent)]" />
                <span className="text-xs font-semibold text-[var(--color-accent)]">
                  {item.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
