import DocsLayout from "../../components/DocsLayout";
import { Inbox, CheckCircle2, Lightbulb, Mail } from "lucide-react";

export default function InboxSyncPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Inbox className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="inbox-sync"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Inbox Sync
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Connect Gmail or Outlook to centralize all project communication in one
        place.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="connecting-email"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Connecting Your Email
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Set up inbox sync in just a few steps:
          </p>
          <ol className="space-y-4">
            {[
              "Go to Settings → Integrations",
              "Click 'Connect Email Account'",
              "Choose Gmail or Outlook",
              "Authorize EchoHub to access your email",
              "Select which folders to sync",
              "Start seeing emails in your client hubs",
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
            id="how-it-works"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            How It Works
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Inbox Sync automatically organizes your emails:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Matches emails to clients based on sender address",
              "Attaches relevant emails to project threads",
              "Extracts action items and deadlines from messages",
              "Flags important client communications",
              "Syncs attachments to project files",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-[var(--color-muted-ink)]"
              >
                <CheckCircle2
                  className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2
            id="smart-filtering"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Smart Filtering
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Control which emails appear in EchoHub:
          </p>
          <div className="space-y-3">
            {[
              {
                filter: "Client Emails Only",
                description: "Show only emails from known clients",
              },
              {
                filter: "Project-Related",
                description: "Filter by project keywords and tags",
              },
              {
                filter: "Important Messages",
                description: "Prioritize starred or flagged emails",
              },
              {
                filter: "Exclude Newsletters",
                description: "Automatically hide promotional content",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.filter}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="email-actions"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Email Actions
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Take action on emails directly from EchoHub:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                action: "Reply",
                description: "Respond to emails without leaving EchoHub",
              },
              {
                action: "Forward",
                description: "Share emails with team members",
              },
              {
                action: "Archive",
                description: "Clean up your inbox after handling",
              },
              {
                action: "Create Task",
                description: "Turn emails into actionable tasks",
              },
              {
                action: "Add to Notes",
                description: "Save important details to project notes",
              },
              {
                action: "Schedule Follow-up",
                description: "Set reminders for unanswered emails",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {item.action}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="supported-providers"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Supported Email Providers
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                provider: "Gmail",
                features: [
                  "Full inbox sync",
                  "Label support",
                  "Thread grouping",
                ],
              },
              {
                provider: "Outlook",
                features: [
                  "Calendar integration",
                  "Folder sync",
                  "Contact sync",
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                  <h3 className="font-semibold text-[var(--color-ink)]">
                    {item.provider}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--color-muted-ink)] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="privacy-security"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Privacy & Security
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Your email data is protected:
          </p>
          <div className="space-y-3">
            {[
              "OAuth 2.0 secure authentication",
              "Read-only access by default",
              "Encrypted data transmission",
              "No email content stored on our servers",
              "Disconnect anytime from settings",
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <p className="text-[var(--color-ink)]">{item}</p>
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
                Use email filters to automatically tag incoming client emails
                with project names, making them easier to find in EchoHub.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
