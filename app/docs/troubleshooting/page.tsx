import DocsLayout from "../../components/DocsLayout";
import { HelpCircle, AlertCircle, Lightbulb } from "lucide-react";

export default function TroubleshootingPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="troubleshooting"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Troubleshooting
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Common issues and solutions to help you get back on track quickly.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="common-issues"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Common Issues
          </h2>
          <div className="space-y-4">
            {[
              {
                issue: "Can't log in to my account",
                solution:
                  "Try resetting your password using the 'Forgot Password' link. If that doesn't work, contact support.",
              },
              {
                issue: "AI summary not generating",
                solution:
                  "Ensure you have enough content in your notes (at least 100 words). Check if you've reached your monthly limit.",
              },
              {
                issue: "Projects not showing up",
                solution:
                  "Check your filter settings. You may have filters applied that hide certain projects.",
              },
              {
                issue: "Email notifications not arriving",
                solution:
                  "Check your spam folder and verify your email settings in Account Settings.",
              },
              {
                issue: "Changes not saving",
                solution:
                  "Check your internet connection. Try refreshing the page and making the changes again.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[var(--color-ink)] mb-2">
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

        <section>
          <h2
            id="browser-issues"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Browser Issues
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            If you're experiencing issues, try these steps:
          </p>
          <ol className="space-y-3">
            {[
              "Clear your browser cache and cookies",
              "Update to the latest browser version",
              "Disable browser extensions temporarily",
              "Try using a different browser",
              "Check if JavaScript is enabled",
            ].map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
                <span className="text-[var(--color-ink)]">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2
            id="getting-help"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Getting Help
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            If you can't find a solution here, we're here to help:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Email Support",
                description: "support@echohub.com",
                action: "Send us an email",
              },
              {
                title: "Help Center",
                description: "Browse our knowledge base",
                action: "Visit help center",
              },
              {
                title: "Community Forum",
                description: "Ask questions and share tips",
                action: "Join the community",
              },
              {
                title: "Live Chat",
                description: "Chat with our support team",
                action: "Start a chat",
              },
            ].map((option, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)] mb-2">
                  {option.description}
                </p>
                <span className="text-[var(--color-accent)] text-sm font-medium">
                  {option.action} →
                </span>
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
                When contacting support, include screenshots and describe the
                steps you took before encountering the issue. This helps us
                resolve your problem faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
