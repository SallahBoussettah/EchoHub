import DocsLayout from "../../components/DocsLayout";
import { Zap, Lightbulb } from "lucide-react";

export default function ProductivityPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="productivity-tips"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Productivity Tips
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Maximize your efficiency with these tips and best practices for using
        EchoHub.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="keyboard-shortcuts"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Keyboard Shortcuts
          </h2>
          <div className="space-y-3">
            {[
              { shortcut: "Cmd/Ctrl + K", action: "Open search" },
              { shortcut: "Cmd/Ctrl + N", action: "New client" },
              { shortcut: "Cmd/Ctrl + P", action: "New project" },
              { shortcut: "Cmd/Ctrl + /", action: "Show shortcuts" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <span className="text-[var(--color-ink)]">{item.action}</span>
                <code className="px-3 py-1 rounded bg-[var(--color-bg)] text-[var(--color-accent)] text-sm font-mono">
                  {item.shortcut}
                </code>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="workflow-tips"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Workflow Tips
          </h2>
          <div className="space-y-4">
            {[
              "Review your dashboard every morning to prioritize tasks",
              "Use AI summaries before client meetings for quick updates",
              "Set up email notifications for approaching deadlines",
              "Archive completed projects to keep your workspace clean",
              "Use tags to categorize similar projects across clients",
            ].map((tip, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <p className="text-[var(--color-ink)]">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="p-6 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[var(--color-ink)] mb-1">
                Pro Tip
              </h3>
              <p className="text-sm text-[var(--color-muted-ink)]">
                Create a weekly review routine to update project statuses and
                generate AI summaries for all active work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
