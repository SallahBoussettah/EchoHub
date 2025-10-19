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
            id="advanced-features"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4 mt-12"
          >
            Advanced AI Features
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Unlock more powerful AI capabilities with these advanced features.
          </p>

          <h3
            id="custom-prompts"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Custom AI Prompts
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Tailor AI summaries to your specific needs with custom prompts.
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                prompt: "Executive Summary",
                description:
                  "High-level overview for stakeholders and decision-makers",
              },
              {
                prompt: "Technical Details",
                description:
                  "Focus on technical specifications and implementation details",
              },
              {
                prompt: "Action Items",
                description:
                  "Extract only tasks and next steps from conversations",
              },
              {
                prompt: "Client-Facing",
                description:
                  "Generate summaries suitable for sharing with clients",
              },
              {
                prompt: "Custom Template",
                description:
                  "Create your own prompt template for recurring needs",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.prompt}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h3
            id="ai-insights"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            AI Insights
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Get intelligent insights about your projects and client
            relationships.
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                insight: "Sentiment Analysis",
                description:
                  "Understand client satisfaction from communication tone",
              },
              {
                insight: "Risk Detection",
                description: "Identify potential project risks early",
              },
              {
                insight: "Trend Analysis",
                description: "Spot patterns in client requests and feedback",
              },
              {
                insight: "Priority Suggestions",
                description: "AI recommends which tasks to tackle first",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.insight}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h3
            id="batch-processing"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Batch Processing
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Generate summaries for multiple projects at once to save time.
          </p>
          <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
            <h4 className="font-semibold text-[var(--color-ink)] mb-2">
              How to Use Batch Processing
            </h4>
            <ol className="space-y-2 text-sm text-[var(--color-muted-ink)]">
              <li>1. Select multiple projects from your dashboard</li>
              <li>2. Click "Batch Generate Summaries"</li>
              <li>3. Choose your summary template</li>
              <li>4. AI processes all projects in the background</li>
              <li>5. Get notified when all summaries are ready</li>
            </ol>
          </div>
        </section>

        <section>
          <h2
            id="ai-quality"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4 mt-12"
          >
            Improving AI Quality
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Get better results by following these guidelines.
          </p>
          <div className="space-y-3">
            {[
              {
                tip: "Provide Context",
                description:
                  "Include background information and project goals in your notes",
              },
              {
                tip: "Use Clear Language",
                description: "Write in complete sentences with proper grammar",
              },
              {
                tip: "Structure Your Notes",
                description:
                  "Use headings, bullet points, and sections for organization",
              },
              {
                tip: "Include Dates",
                description: "Add timestamps to help AI understand chronology",
              },
              {
                tip: "Be Specific",
                description: "Include numbers, names, and concrete details",
              },
              {
                tip: "Regular Updates",
                description: "Keep notes current for more accurate summaries",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.tip}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3
            id="troubleshooting"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-12"
          >
            Troubleshooting
          </h3>
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
              {
                issue: "Processing takes too long",
                solution:
                  "Large documents may take 30-60 seconds. If it takes longer, try refreshing the page.",
              },
              {
                issue: "Can't find generated summary",
                solution:
                  "Check the 'AI Summaries' tab in your project. Summaries are saved automatically.",
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
