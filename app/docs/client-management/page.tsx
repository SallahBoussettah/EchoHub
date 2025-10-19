import DocsLayout from "../../components/DocsLayout";
import { Users, CheckCircle2, Lightbulb } from "lucide-react";

export default function ClientManagementPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="client-management"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Client Management
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Learn how to effectively organize and manage your client database to
        streamline your workflow.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="creating-client-hubs"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Creating Client Hubs
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Client Hubs are the heart of EchoHub. Each hub contains everything
            related to a specific client:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Contact information and business details",
              "All projects and their timelines",
              "Notes and communication history",
              "File attachments and documents",
              "Activity timeline and updates",
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
            id="required-information"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Required Client Information
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            When adding a new client, make sure to include:
          </p>
          <div className="space-y-3">
            {[
              {
                field: "Client Name",
                description: "Individual name or business name",
                required: true,
              },
              {
                field: "Email Address",
                description: "Primary contact email",
                required: true,
              },
              {
                field: "Phone Number",
                description: "Business or personal phone",
                required: false,
              },
              {
                field: "Company",
                description: "Business name if different from client name",
                required: false,
              },
              {
                field: "Address",
                description: "Business or billing address",
                required: false,
              },
            ].map((field, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-[var(--color-ink)]">
                    {field.field}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      field.required
                        ? "bg-red-500/10 text-red-600"
                        : "bg-gray-500/10 text-gray-600"
                    }`}
                  >
                    {field.required ? "Required" : "Optional"}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="managing-status"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Managing Client Status
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Keep track of your client relationships with status indicators:
          </p>
          <div className="space-y-3">
            {[
              {
                status: "Active",
                color: "bg-green-500",
                description: "Currently working on projects",
              },
              {
                status: "Paused",
                color: "bg-yellow-500",
                description: "Temporarily on hold",
              },
              {
                status: "Completed",
                color: "bg-blue-500",
                description: "All projects finished",
              },
              {
                status: "Archived",
                color: "bg-gray-500",
                description: "No longer active, kept for records",
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
          <h3
            id="best-practices"
            className="text-xl font-bold text-[var(--color-ink)] mb-4"
          >
            Best Practices
          </h3>
          <div className="space-y-4">
            {[
              "Keep client information up-to-date for accurate communication",
              "Use descriptive project names to easily identify work",
              "Regularly update project status to track progress",
              "Archive completed clients to keep your active list clean",
              "Use the search function to quickly find specific clients",
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
                Pro Tip
              </h3>
              <p className="text-sm text-[var(--color-muted-ink)]">
                Use the bulk actions feature to update multiple clients at once,
                saving you time when managing large client lists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
