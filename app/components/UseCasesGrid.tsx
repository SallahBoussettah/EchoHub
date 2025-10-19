import {
  Palette,
  Code,
  MessageSquare,
  PenTool,
  Users,
  ArrowRight,
} from "lucide-react";

const useCases = [
  {
    icon: Palette,
    title: "Designers & Creatives",
    description:
      "Manage design projects, client feedback, and revisions all in one place.",
    painPoints: [
      "Scattered feedback across email, Slack, and Figma comments",
      "Lost design files and version confusion",
      "Unclear project status and next steps",
    ],
    solution:
      "Centralize all client feedback, organize design files by project, and use AI to summarize revision requests.",
    color: "var(--color-accent)",
    slug: "designers",
  },
  {
    icon: Code,
    title: "Developers & Engineers",
    description:
      "Track client requirements, technical specs, and project milestones efficiently.",
    painPoints: [
      "Requirements buried in long email threads",
      "Scope creep from unclear documentation",
      "Juggling multiple client projects simultaneously",
    ],
    solution:
      "Document requirements clearly, track scope changes, and keep all technical discussions organized by client.",
    color: "var(--color-accent-bright)",
    slug: "developers",
  },
  {
    icon: MessageSquare,
    title: "Consultants & Coaches",
    description:
      "Organize client sessions, action items, and progress tracking seamlessly.",
    painPoints: [
      "Session notes scattered across tools",
      "Forgetting client context between meetings",
      "Manual tracking of client progress",
    ],
    solution:
      "Keep session notes organized, use AI to summarize key insights, and track client progress over time.",
    color: "var(--color-accent)",
    slug: "consultants",
  },
  {
    icon: PenTool,
    title: "Writers & Content Creators",
    description:
      "Manage content calendars, client briefs, and revision cycles with ease.",
    painPoints: [
      "Content briefs lost in email",
      "Unclear feedback and revision requests",
      "Missed deadlines from poor organization",
    ],
    solution:
      "Store all briefs in client hubs, track content status, and use AI to extract clear action items from feedback.",
    color: "var(--color-accent-bright)",
    slug: "writers",
  },
  {
    icon: Users,
    title: "Agencies & Small Teams",
    description:
      "Collaborate on client work with shared workspaces and team permissions.",
    painPoints: [
      "Team members out of sync on client status",
      "Duplicate work from poor communication",
      "No single source of truth for client info",
    ],
    solution:
      "Share client hubs with your team, assign tasks, and keep everyone aligned with real-time updates.",
    color: "var(--color-accent)",
    slug: "agencies",
  },
];

export default function UseCasesGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: useCase.color }}
              >
                <useCase.icon
                  className="w-7 h-7 text-white"
                  strokeWidth={2.5}
                />
              </div>

              <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
                {useCase.title}
              </h3>

              <p className="text-[var(--color-muted-ink)] mb-6 leading-relaxed">
                {useCase.description}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[var(--color-ink)] mb-3">
                  Common Pain Points:
                </h4>
                <ul className="space-y-2">
                  {useCase.painPoints.map((point, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--color-muted-ink)] flex items-start gap-2"
                    >
                      <span className="text-[var(--color-accent)] mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[var(--color-line)]">
                <p className="text-sm text-[var(--color-ink)] font-medium mb-3">
                  How EchoHub Helps:
                </p>
                <p className="text-sm text-[var(--color-muted-ink)] leading-relaxed mb-4">
                  {useCase.solution}
                </p>
                <div className="inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
