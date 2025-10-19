import DocsLayout from "../../components/DocsLayout";
import { FileText, CheckCircle2, Lightbulb } from "lucide-react";

export default function ProjectsPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="projects-tasks"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Projects & Tasks
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Organize your work with projects and tasks to stay on top of deadlines
        and deliverables.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="creating-projects"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Creating Projects
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Projects help you organize work for each client:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Navigate to a client hub",
              "Click 'New Project' button",
              "Add project name and description",
              "Set start and end dates",
              "Add project notes and requirements",
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
            id="project-status"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Project Status
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Track progress with status indicators:
          </p>
          <div className="space-y-3">
            {[
              {
                status: "Planning",
                color: "bg-blue-500",
                description: "Initial planning phase",
              },
              {
                status: "In Progress",
                color: "bg-yellow-500",
                description: "Actively working",
              },
              {
                status: "Review",
                color: "bg-purple-500",
                description: "Awaiting client feedback",
              },
              {
                status: "Completed",
                color: "bg-green-500",
                description: "Project finished",
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
            id="managing-tasks"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Managing Tasks
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Break down projects into manageable tasks:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Create Tasks",
                description: "Add individual tasks within projects",
              },
              {
                title: "Set Priorities",
                description: "Mark tasks as high, medium, or low priority",
              },
              {
                title: "Add Deadlines",
                description: "Set due dates for each task",
              },
              {
                title: "Track Progress",
                description: "Check off completed tasks",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {feature.description}
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
                Use project templates to quickly set up recurring project types
                with pre-defined tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
