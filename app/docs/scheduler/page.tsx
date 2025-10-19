import DocsLayout from "../../components/DocsLayout";
import { Calendar, CheckCircle2, Lightbulb, AlertCircle } from "lucide-react";

export default function SchedulerPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="smart-scheduler"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Smart Scheduler
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        AI-powered deadline management that detects conflicts and suggests
        optimal scheduling.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="how-it-works"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            How It Works
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            The Smart Scheduler analyzes your workload and automatically:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Detects overlapping deadlines across projects",
              "Identifies potential scheduling conflicts",
              "Suggests optimal task sequencing",
              "Recommends buffer time between deliverables",
              "Alerts you to unrealistic timelines",
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
            id="conflict-detection"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Conflict Detection
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Get notified when deadlines overlap:
          </p>
          <div className="space-y-4">
            {[
              {
                type: "High Priority Conflict",
                description: "Two major deliverables due on the same day",
                color: "bg-red-500",
              },
              {
                type: "Medium Priority Conflict",
                description: "Overlapping project phases with tight timelines",
                color: "bg-yellow-500",
              },
              {
                type: "Low Priority Conflict",
                description: "Minor tasks scheduled close together",
                color: "bg-blue-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className={`w-5 h-5 flex-shrink-0 mt-0.5`}
                    style={{ color: item.color.replace("bg-", "") }}
                  />
                  <div>
                    <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                      {item.type}
                    </h4>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="smart-suggestions"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Smart Suggestions
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            The scheduler provides actionable recommendations:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Reschedule Tasks",
                description: "Move non-urgent tasks to less busy periods",
              },
              {
                title: "Extend Deadlines",
                description: "Suggest realistic timeline adjustments",
              },
              {
                title: "Delegate Work",
                description: "Identify tasks that could be outsourced",
              },
              {
                title: "Add Buffer Time",
                description: "Recommend breaks between major deliverables",
              },
            ].map((suggestion, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {suggestion.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="calendar-views"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Calendar Views
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Visualize your schedule in multiple ways:
          </p>
          <div className="space-y-3">
            {[
              {
                view: "Day View",
                description: "Hourly breakdown of tasks and meetings",
              },
              {
                view: "Week View",
                description: "See your entire week at a glance",
              },
              {
                view: "Month View",
                description: "Long-term planning and milestone tracking",
              },
              {
                view: "Timeline View",
                description: "Gantt-style project timeline visualization",
              },
            ].map((view, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {view.view}
                </h4>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {view.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="integrations"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Calendar Integrations
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Sync with your existing calendar apps:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {["Google Calendar", "Apple Calendar", "Outlook Calendar"].map(
              (integration, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-center hover:border-[var(--color-accent)] transition-all cursor-pointer"
                >
                  <p className="font-semibold text-[var(--color-ink)]">
                    {integration}
                  </p>
                </div>
              )
            )}
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
                Enable calendar sync to automatically block time for EchoHub
                tasks in your personal calendar, preventing double-booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
