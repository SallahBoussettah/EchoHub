import DocsLayout from "../../components/DocsLayout";
import { Sparkles, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";

export default function AIFeaturesPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-bright)] flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="ai-features"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          AI Features
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        EchoHub uses advanced AI to help you summarize client conversations,
        extract key insights, and stay organized effortlessly.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="how-ai-works"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            How AI Summaries Work
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-6">
            Our AI analyzes your project notes, client communications, and
            feedback to generate concise, actionable summaries. Here's what gets
            included:
          </p>
          <ul className="space-y-3">
            {[
              "Key decisions and action items",
              "Project status updates and milestones",
              "Client feedback and requirements",
              "Next steps and upcoming deadlines",
              "Important changes or revisions",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <CheckCircle2
                  className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <span className="text-[var(--color-ink)]">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2
            id="using-ai-summaries"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Using AI Summaries
          </h2>
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
              <h3 className="font-semibold text-[var(--color-ink)] mb-3">
                Step 1: Add Content
              </h3>
              <p className="text-[var(--color-muted-ink)] mb-3">
                Write detailed notes in your project or client hub. Include:
              </p>
              <ul className="text-sm text-[var(--color-muted-ink)] space-y-1">
                <li>• Meeting notes and discussions</li>
                <li>• Client feedback and requests</li>
                <li>• Project updates and progress</li>
                <li>• Any relevant communications</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
              <h3 className="font-semibold text-[var(--color-ink)] mb-3">
                Step 2: Generate Summary
              </h3>
              <p className="text-[var(--color-muted-ink)]">
                Click the "Generate AI Summary" button in any project or client
                hub. The AI will analyze all your content and create a concise
                summary in seconds.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
              <h3 className="font-semibold text-[var(--color-ink)] mb-3">
                Step 3: Review & Use
              </h3>
              <p className="text-[var(--color-muted-ink)]">
                Review the generated summary and use it for client updates,
                status reports, or your own reference. You can regenerate
                summaries anytime as your project evolves.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2
            id="best-practices"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Write Detailed Notes",
                description:
                  "The more context you provide, the better your AI summaries will be.",
              },
              {
                title: "Include Dates",
                description:
                  "Add timestamps to help the AI understand the chronology of events.",
              },
              {
                title: "Be Specific",
                description:
                  "Include specific details, numbers, and requirements for accuracy.",
              },
              {
                title: "Update Regularly",
                description:
                  "Regenerate summaries after major project updates or changes.",
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="usage-limits"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Usage Limits
          </h2>
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[var(--color-ink)]">
                  Free Plan
                </h3>
                <span className="text-sm bg-gray-500/10 text-gray-600 px-3 py-1 rounded-full">
                  Limited
                </span>
              </div>
              <p className="text-[var(--color-muted-ink)] mb-2">
                5 AI summaries per month
              </p>
              <p className="text-sm text-[var(--color-muted-ink)]">
                Perfect for trying out the feature and small projects.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-accent)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[var(--color-ink)]">
                  Pro Plan
                </h3>
                <span className="text-sm bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-1 rounded-full">
                  Recommended
                </span>
              </div>
              <p className="text-[var(--color-muted-ink)] mb-2">
                100 AI summaries per month
              </p>
              <p className="text-sm text-[var(--color-muted-ink)]">
                Ideal for active freelancers managing multiple clients.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2
            id="troubleshooting"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Troubleshooting
          </h2>
          <div className="space-y-4">
            {[
              {
                issue: "Summary seems incomplete",
                solution:
                  "Make sure you have enough content in your notes. AI works best with detailed information.",
              },
              {
                issue: "Hit monthly limit",
                solution:
                  "Upgrade to Pro for more summaries, or wait until next month for your limit to reset.",
              },
              {
                issue: "Summary not accurate",
                solution:
                  "Review your notes for clarity and regenerate. The AI improves with better input.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                      {item.issue}
                    </h4>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="p-6 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[var(--color-ink)] mb-1">
                Privacy Note
              </h3>
              <p className="text-sm text-[var(--color-muted-ink)]">
                Your data is never used to train AI models. All processing is
                secure and your information remains private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
