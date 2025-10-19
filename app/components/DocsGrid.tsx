import {
  Rocket,
  Users,
  Sparkles,
  FileText,
  Settings,
  HelpCircle,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

const docCategories = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Quick start guide to set up your first client hub",
    articles: [
      "Creating your account",
      "Setting up your first client",
      "Adding projects and notes",
      "Understanding the dashboard",
    ],
    link: "/docs/getting-started",
    color: "var(--color-accent)",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Learn how to organize and manage your clients effectively",
    articles: [
      "Client hub overview",
      "Project timeline tracking",
      "File management best practices",
      "Activity logs and history",
    ],
    link: "/docs/client-management",
    color: "var(--color-accent-bright)",
  },
  {
    icon: Sparkles,
    title: "AI Features",
    description: "Master AI summaries and automation to save time",
    articles: [
      "How AI summaries work",
      "Best practices for summarization",
      "Understanding AI insights",
      "Managing AI usage limits",
    ],
    link: "/docs/ai-features",
    color: "var(--color-accent)",
  },
  {
    icon: FileText,
    title: "Projects & Tasks",
    description: "Track deliverables and manage project workflows",
    articles: [
      "Creating and organizing projects",
      "Setting deadlines and milestones",
      "Project status management",
      "Notes and documentation",
    ],
    link: "/docs/projects",
    color: "var(--color-accent-bright)",
  },
  {
    icon: Zap,
    title: "Productivity Tips",
    description: "Workflows and strategies to maximize efficiency",
    articles: [
      "Daily workflow optimization",
      "Search and filter techniques",
      "Keyboard shortcuts",
      "Time-saving automations",
    ],
    link: "/docs/productivity",
    color: "var(--color-accent)",
  },
  {
    icon: Settings,
    title: "Account & Settings",
    description: "Manage your account, billing, and preferences",
    articles: [
      "Profile and preferences",
      "Billing and subscriptions",
      "Notification settings",
      "Data export and backup",
    ],
    link: "/docs/settings",
    color: "var(--color-accent-bright)",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "How we protect your data and ensure privacy",
    articles: [
      "Data encryption",
      "Privacy policy overview",
      "Two-factor authentication",
      "GDPR compliance",
    ],
    link: "/docs/security",
    color: "var(--color-accent)",
  },
  {
    icon: HelpCircle,
    title: "Troubleshooting",
    description: "Common issues and how to resolve them",
    articles: [
      "Login and access issues",
      "File upload problems",
      "AI summary errors",
      "Performance optimization",
    ],
    link: "/docs/troubleshooting",
    color: "var(--color-accent-bright)",
  },
];

export default function DocsGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docCategories.map((category, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: category.color }}
              >
                <category.icon
                  className="w-7 h-7 text-white"
                  strokeWidth={2.5}
                />
              </div>

              <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
                {category.title}
              </h3>

              <p className="text-[var(--color-muted-ink)] mb-6 leading-relaxed">
                {category.description}
              </p>

              <ul className="space-y-2 mb-6">
                {category.articles.map((article, i) => (
                  <li
                    key={i}
                    className="text-sm text-[var(--color-muted-ink)] flex items-start gap-2"
                  >
                    <span className="text-[var(--color-accent)] mt-1">→</span>
                    <span>{article}</span>
                  </li>
                ))}
              </ul>

              <a
                href={category.link}
                className="inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold text-sm group-hover:gap-3 transition-all"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
