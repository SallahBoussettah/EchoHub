import DocsLayout from "../../components/DocsLayout";
import { Users, CheckCircle2, Lightbulb } from "lucide-react";

export default function AccountSetupPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="account-setup"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Account Setup
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Set up your EchoHub account and configure your profile to get the most
        out of the platform.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="creating-account"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Creating Your Account
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Getting started with EchoHub is quick and easy:
          </p>
          <ol className="space-y-4">
            {[
              "Visit the EchoHub homepage and click 'Sign Up'",
              "Choose to sign up with email or Google account",
              "Verify your email address",
              "Complete your profile information",
              "Start adding clients and projects",
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
            id="profile-settings"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Profile Settings
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Customize your profile to reflect your business:
          </p>
          <div className="space-y-3">
            {[
              {
                field: "Business Name",
                description: "Your company or freelance business name",
              },
              {
                field: "Display Name",
                description: "How you want to appear to clients",
              },
              { field: "Email", description: "Your primary contact email" },
              { field: "Phone", description: "Optional contact number" },
              {
                field: "Time Zone",
                description: "For accurate deadline tracking",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.field}
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
            id="preferences"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Preferences
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Configure your workspace preferences:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Theme", description: "Choose light or dark mode" },
              {
                title: "Notifications",
                description: "Email and in-app alerts",
              },
              { title: "Language", description: "Interface language" },
              { title: "Date Format", description: "MM/DD/YYYY or DD/MM/YYYY" },
            ].map((pref, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {pref.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {pref.description}
                </p>
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
                Complete your profile fully to make the best impression when
                sharing project updates with clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
