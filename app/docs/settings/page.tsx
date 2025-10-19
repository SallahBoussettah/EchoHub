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
          <p className="text-[var(--color-muted-ink)] mb-6">
            Customize the look and feel of EchoHub to match your preferences and
            brand.
          </p>

          <h3
            id="theme-settings"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Theme Settings
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Choose your preferred color scheme for the interface.
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                theme: "Light Theme",
                description:
                  "Bright, clean interface ideal for well-lit environments",
                preview: "bg-white",
              },
              {
                theme: "Dark Theme",
                description: "Reduced eye strain for low-light conditions",
                preview: "bg-gray-900",
              },
              {
                theme: "System Default",
                description: "Automatically matches your device settings",
                preview: "bg-gradient-to-r from-white to-gray-900",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                      {item.theme}
                    </h4>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg ${item.preview} border border-[var(--color-line)]`}
                  />
                </div>
              </div>
            ))}
          </div>

          <h3
            id="accent-color"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Accent Color
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Personalize EchoHub with your brand color. This color appears on
            buttons, links, and highlights throughout the interface.
          </p>
          <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]" />
              <div>
                <p className="font-semibold text-[var(--color-ink)]">
                  Current Accent Color
                </p>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  Click to choose a new color
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {[
                "bg-blue-500",
                "bg-purple-500",
                "bg-green-500",
                "bg-orange-500",
                "bg-pink-500",
                "bg-red-500",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-lg ${color} cursor-pointer hover:scale-110 transition-transform`}
                />
              ))}
            </div>
          </div>

          <h3
            id="font-size"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Font Size
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Adjust the text size for better readability based on your
            preferences and screen size.
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                size: "Small",
                description: "Compact text, more content visible",
                scale: "90%",
              },
              {
                size: "Medium (Default)",
                description: "Balanced readability and content density",
                scale: "100%",
              },
              {
                size: "Large",
                description: "Easier to read, less content per screen",
                scale: "110%",
              },
              {
                size: "Extra Large",
                description: "Maximum readability for accessibility",
                scale: "125%",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                      {item.size}
                    </h4>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[var(--color-muted-ink)] text-sm font-mono">
                    {item.scale}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <h3
            id="compact-mode"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Compact Mode
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Reduce spacing and padding to fit more content on your screen.
            Perfect for users with smaller displays or those who prefer a denser
            layout.
          </p>
          <div className="space-y-3">
            {[
              {
                mode: "Standard Mode",
                description:
                  "Comfortable spacing with plenty of breathing room",
              },
              {
                mode: "Compact Mode",
                description: "Reduced padding to maximize screen real estate",
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
        </section>

        <section>
          <h2
            id="workspace-settings"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4 mt-12"
          >
            Workspace Settings
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Configure how your workspace behaves and displays information.
          </p>
          <div className="space-y-3">
            {[
              {
                setting: "Default View",
                description:
                  "Choose which page loads when you open EchoHub (Dashboard, Clients, or Projects)",
              },
              {
                setting: "Sidebar Behavior",
                description: "Keep sidebar expanded or collapsed by default",
              },
              {
                setting: "Quick Actions",
                description:
                  "Customize the quick action buttons in your toolbar",
              },
              {
                setting: "Keyboard Shortcuts",
                description:
                  "View and customize keyboard shortcuts for faster navigation",
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
            id="notifications"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4 mt-12"
          >
            Notifications
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-6">
            Control when and how you receive notifications to stay informed
            without being overwhelmed.
          </p>

          <h3
            id="notification-types"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Notification Types
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Choose which events trigger notifications:
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                type: "Project Deadline Reminders",
                description: "Get notified 24 hours before deadlines",
                channels: "Email & In-app",
              },
              {
                type: "Client Activity Updates",
                description: "When clients comment or provide feedback",
                channels: "Email & In-app",
              },
              {
                type: "AI Summary Completion",
                description: "When your AI summaries are ready",
                channels: "In-app only",
              },
              {
                type: "Weekly Progress Reports",
                description: "Summary of your week every Monday",
                channels: "Email only",
              },
              {
                type: "Payment Reminders",
                description: "When invoices are due or overdue",
                channels: "Email & In-app",
              },
              {
                type: "Team Mentions",
                description: "When someone mentions you in comments",
                channels: "Email & In-app",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div>
                  <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                    {item.type}
                  </h4>
                  <p className="text-sm text-[var(--color-muted-ink)]">
                    {item.description}
                  </p>
                </div>
                <div className="text-sm text-[var(--color-muted-ink)] text-right ml-4">
                  {item.channels}
                </div>
              </div>
            ))}
          </div>

          <h3
            id="notification-schedule"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Notification Schedule
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Set quiet hours to avoid notifications during specific times:
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                schedule: "Do Not Disturb",
                description:
                  "Pause all notifications during set hours (e.g., 10 PM - 8 AM)",
              },
              {
                schedule: "Weekend Mode",
                description: "Disable non-urgent notifications on weekends",
              },
              {
                schedule: "Working Hours",
                description:
                  "Only receive notifications during your work schedule",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.schedule}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h3
            id="notification-delivery"
            className="text-xl font-bold text-[var(--color-ink)] mb-4 mt-8"
          >
            Delivery Methods
          </h3>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Choose how you want to receive notifications:
          </p>
          <div className="space-y-3">
            {[
              {
                method: "Email Notifications",
                description: "Receive updates in your inbox",
                status: "Enabled",
              },
              {
                method: "In-App Notifications",
                description: "See alerts within EchoHub",
                status: "Enabled",
              },
              {
                method: "Browser Push",
                description: "Desktop notifications when EchoHub is closed",
                status: "Disabled",
              },
              {
                method: "Mobile Push",
                description:
                  "Notifications on your mobile device (requires app)",
                status: "Coming Soon",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div>
                  <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                    {item.method}
                  </h4>
                  <p className="text-sm text-[var(--color-muted-ink)]">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    item.status === "Enabled"
                      ? "bg-green-500/10 text-green-600"
                      : item.status === "Disabled"
                      ? "bg-gray-500/10 text-gray-600"
                      : "bg-blue-500/10 text-blue-600"
                  }`}
                >
                  {item.status}
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
