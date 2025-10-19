import DocsLayout from "../../components/DocsLayout";
import { BarChart3, CheckCircle2, Lightbulb } from "lucide-react";

export default function DashboardPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="dashboard"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Dashboard
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Get a bird's-eye view of your entire workspace with real-time insights
        and analytics.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="overview"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Dashboard Overview
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Your dashboard shows everything you need at a glance:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Active projects and their current status",
              "Upcoming deadlines and milestones",
              "Recent client activity and communications",
              "Project health indicators",
              "Time tracking and productivity metrics",
              "Revenue and financial overview",
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
            id="widgets"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Dashboard Widgets
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Customize your dashboard with these widgets:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                widget: "Project Status",
                description:
                  "Visual breakdown of active, paused, and completed projects",
              },
              {
                widget: "Upcoming Deadlines",
                description: "Timeline of all approaching due dates",
              },
              {
                widget: "Client Activity",
                description:
                  "Recent messages, feedback, and updates from clients",
              },
              {
                widget: "Revenue Tracker",
                description:
                  "Monthly income, pending invoices, and payment status",
              },
              {
                widget: "Time Spent",
                description: "Hours logged per project and client",
              },
              {
                widget: "Task Completion",
                description: "Progress bars showing task completion rates",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {item.widget}
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
            id="project-health"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Project Health Indicators
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Quickly identify projects that need attention:
          </p>
          <div className="space-y-3">
            {[
              {
                status: "On Track",
                color: "bg-green-500",
                description: "Project is progressing as planned",
              },
              {
                status: "At Risk",
                color: "bg-yellow-500",
                description: "Potential delays or issues detected",
              },
              {
                status: "Behind Schedule",
                color: "bg-red-500",
                description:
                  "Project is past deadline or significantly delayed",
              },
              {
                status: "Awaiting Client",
                color: "bg-blue-500",
                description: "Waiting for client feedback or approval",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <div>
                  <h4 className="font-semibold text-[var(--color-ink)]">
                    {item.status}
                  </h4>
                  <p className="text-sm text-[var(--color-muted-ink)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="quick-actions"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Quick Actions
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Take action directly from your dashboard:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Create new client",
              "Start new project",
              "Generate AI summary",
              "Send proposal",
              "Log time",
              "Add task",
            ].map((action, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all cursor-pointer text-center"
              >
                <p className="font-semibold text-[var(--color-ink)]">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="analytics"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Analytics & Insights
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Track your performance over time:
          </p>
          <div className="space-y-3">
            {[
              {
                metric: "Project Completion Rate",
                description: "Percentage of projects delivered on time",
              },
              {
                metric: "Average Project Duration",
                description: "Typical time from start to completion",
              },
              {
                metric: "Client Satisfaction",
                description: "Based on feedback and repeat business",
              },
              {
                metric: "Revenue Trends",
                description: "Monthly income growth and projections",
              },
              {
                metric: "Productivity Score",
                description: "Tasks completed vs. time spent",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.metric}
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
            id="customization"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Customizing Your Dashboard
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Make your dashboard work for you:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Drag & Drop",
                description: "Rearrange widgets to your preference",
              },
              {
                title: "Show/Hide Widgets",
                description: "Display only what matters to you",
              },
              {
                title: "Custom Filters",
                description: "Filter by client, project type, or date range",
              },
              {
                title: "Save Views",
                description: "Create multiple dashboard layouts",
              },
            ].map((option, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {option.description}
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
                Start your day by reviewing your dashboard. Focus on "At Risk"
                projects first to prevent delays and keep clients happy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
