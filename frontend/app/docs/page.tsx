import DocsLayout from "../components/DocsLayout";
import { Rocket, Lightbulb, CheckCircle2 } from "lucide-react";

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Rocket className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="getting-started"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Getting Started
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8 leading-relaxed">
        Welcome to EchoHub! This guide will help you get started with managing
        your clients and projects in minutes.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="quick-start"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Quick Start
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-6">
            Follow these steps to get up and running with EchoHub:
          </p>
          <ol className="space-y-4">
            {[
              {
                title: "Create your free account",
                description: "Sign up with your email or Google account",
              },
              {
                title: "Set up your profile",
                description: "Add your business information and preferences",
              },
              {
                title: "Add your first client",
                description: "Create a client hub with contact details",
              },
              {
                title: "Create your first project",
                description: "Set up a project with deadlines and milestones",
              },
              {
                title: "Try AI summaries",
                description: "Generate your first AI-powered project summary",
              },
            ].map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-ink)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted-ink)]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2
            id="key-features"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Client Hubs",
                description:
                  "Organize everything about each client in one place",
                href: "/docs/client-management",
              },
              {
                title: "AI Summaries",
                description: "Get instant summaries of your project notes",
                href: "/docs/ai-features",
              },
              {
                title: "Proposals",
                description: "Create polished proposals from briefs in minutes",
                href: "/docs/proposals",
              },
              {
                title: "Smart Scheduler",
                description: "AI detects conflicts and suggests adjustments",
                href: "/docs/scheduler",
              },
              {
                title: "Inbox Sync",
                description:
                  "Connect Gmail or Outlook to centralize communication",
                href: "/docs/inbox-sync",
              },
              {
                title: "Dashboard",
                description: "See project health and milestones at a glance",
                href: "/docs/dashboard",
              },
            ].map((feature, index) => (
              <a
                key={index}
                href={feature.href}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all group"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {feature.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="whats-next"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            What's Next?
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Account Setup",
                description: "Complete your business profile",
                href: "/docs/account-setup",
              },
              {
                title: "Client Management",
                description: "Learn how to organize your clients",
                href: "/docs/client-management",
              },
              {
                title: "AI Features",
                description: "Master AI summaries and insights",
                href: "/docs/ai-features",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      {item.description}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-muted-ink)] group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="p-6 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[var(--color-ink)] mb-1">
                Need Help?
              </h3>
              <p className="text-sm text-[var(--color-muted-ink)] mb-3">
                If you get stuck or have questions, we're here to help!
              </p>
              <a
                href="/contact"
                className="text-[var(--color-accent)] hover:underline font-semibold text-sm"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
