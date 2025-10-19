import DocsLayout from "../../components/DocsLayout";
import { Shield, Lightbulb } from "lucide-react";

export default function SecurityPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="security-privacy"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Security & Privacy
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Learn how EchoHub protects your data and maintains your privacy.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="data-security"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Data Security
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Your data is protected with industry-standard security measures:
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Encryption",
                description: "All data is encrypted in transit and at rest",
              },
              {
                title: "Secure Servers",
                description: "Hosted on secure, monitored infrastructure",
              },
              {
                title: "Regular Backups",
                description: "Automatic daily backups of all your data",
              },
              {
                title: "Access Control",
                description: "Only you can access your account data",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.title}
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
            id="privacy"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Privacy
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            We respect your privacy and never share your data:
          </p>
          <ul className="space-y-2">
            {[
              "Your data is never sold to third parties",
              "AI processing is secure and private",
              "No data is used to train AI models",
              "You can export or delete your data anytime",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <span className="text-[var(--color-ink)]">• {item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2
            id="best-practices"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Security Best Practices
          </h2>
          <div className="space-y-4">
            {[
              "Use a strong, unique password for your account",
              "Enable two-factor authentication (coming soon)",
              "Log out from shared or public computers",
              "Review account activity regularly",
              "Report any suspicious activity immediately",
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
                Questions?
              </h3>
              <p className="text-sm text-[var(--color-muted-ink)] mb-2">
                If you have security concerns or questions, please contact our
                security team.
              </p>
              <a
                href="mailto:security@echohub.com"
                className="text-[var(--color-accent)] hover:underline font-semibold text-sm"
              >
                security@echohub.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
