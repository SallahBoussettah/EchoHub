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
          <p className="text-[var(--color-muted-ink)] mb-6">
            Configure your workspace preferences to match your workflow and
            style.
          </p>

          <h3
            id="theme"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Theme
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Choose between light and dark mode, or let EchoHub automatically
            switch based on your system preferences.
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                mode: "Light Mode",
                description: "Clean, bright interface perfect for daytime work",
              },
              {
                mode: "Dark Mode",
                description: "Easy on the eyes for late-night sessions",
              },
              {
                mode: "Auto",
                description: "Follows your system theme automatically",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.mode}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h3
            id="notifications"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Notifications
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Control when and how you receive notifications to stay informed
            without being overwhelmed.
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                type: "Email Notifications",
                description: "Receive updates via email for important events",
              },
              {
                type: "In-App Alerts",
                description: "Get notified within EchoHub while you work",
              },
              {
                type: "Push Notifications",
                description: "Mobile and desktop push notifications",
              },
              {
                type: "Digest Mode",
                description:
                  "Receive a daily or weekly summary instead of real-time alerts",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.type}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h3
            id="language"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Language
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            EchoHub supports multiple languages to help you work in your
            preferred language.
          </p>
          <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] mb-8">
            <p className="text-[var(--color-ink)] mb-2">
              <span className="font-semibold">Currently supported:</span>{" "}
              English, Spanish, French, German, Portuguese
            </p>
            <p className="text-sm text-[var(--color-muted-ink)]">
              More languages coming soon. Request your language in Settings →
              Feedback.
            </p>
          </div>

          <h3
            id="date-format"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Date Format
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Choose your preferred date format for consistency across the
            platform.
          </p>
          <div className="space-y-3">
            {[
              {
                format: "MM/DD/YYYY",
                example: "12/31/2024",
                region: "US format",
              },
              {
                format: "DD/MM/YYYY",
                example: "31/12/2024",
                region: "European format",
              },
              {
                format: "YYYY-MM-DD",
                example: "2024-12-31",
                region: "ISO format",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                      {item.format}
                    </h4>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      {item.region}
                    </p>
                  </div>
                  <code className="px-3 py-1 rounded bg-[var(--color-muted)] text-[var(--color-ink)] text-sm font-mono">
                    {item.example}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="security-settings"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4 mt-12"
          >
            Security Settings
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Protect your account with these security features:
          </p>
          <div className="space-y-3">
            {[
              {
                setting: "Password Management",
                description:
                  "Change your password regularly for better security",
              },
              {
                setting: "Two-Factor Authentication",
                description: "Add an extra layer of security (coming soon)",
              },
              {
                setting: "Active Sessions",
                description: "View and manage devices logged into your account",
              },
              {
                setting: "Login History",
                description: "Review recent login activity and locations",
              },
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
            id="billing-subscription"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4 mt-12"
          >
            Billing & Subscription
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Manage your subscription and payment methods:
          </p>
          <div className="space-y-3">
            {[
              {
                item: "Current Plan",
                description: "View your active subscription tier and features",
              },
              {
                item: "Payment Methods",
                description: "Add or update credit cards and payment options",
              },
              {
                item: "Billing History",
                description: "Download invoices and view past payments",
              },
              {
                item: "Upgrade/Downgrade",
                description: "Change your plan anytime with prorated billing",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.item}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
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
