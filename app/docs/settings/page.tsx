import DocsLayout from "../../components/DocsLayout";
import { Settings, Lightbulb } from "lucide-react";

export default function SettingsPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="settings"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Settings
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Customize your EchoHub experience with these settings and preferences.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="account-settings"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Account Settings
          </h2>
          <div className="space-y-3">
            {[
              {
                setting: "Profile Information",
                description: "Update your name, email, and business details",
              },
              {
                setting: "Password",
                description: "Change your account password",
              },
              {
                setting: "Email Preferences",
                description: "Manage notification settings",
              },
              { setting: "Time Zone", description: "Set your local time zone" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.setting}
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
            id="appearance"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Appearance
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Theme", description: "Choose light or dark mode" },
              {
                title: "Accent Color",
                description: "Customize your brand color",
              },
              {
                title: "Font Size",
                description: "Adjust text size for readability",
              },
              {
                title: "Compact Mode",
                description: "Show more content on screen",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {item.title}
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
            id="notifications"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Notifications
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Control when and how you receive notifications:
          </p>
          <div className="space-y-3">
            {[
              "Project deadline reminders",
              "Client activity updates",
              "AI summary completion",
              "Weekly progress reports",
            ].map((notification, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <span className="text-[var(--color-ink)]">{notification}</span>
                <div className="text-sm text-[var(--color-muted-ink)]">
                  Email & In-app
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
                Pro Tip
              </h3>
              <p className="text-sm text-[var(--color-muted-ink)]">
                Enable deadline reminders to get notified 24 hours before any
                project is due.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
