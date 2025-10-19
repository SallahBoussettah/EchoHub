import DocsLayout from "../../components/DocsLayout";
import { FileText, CheckCircle2, Lightbulb } from "lucide-react";

export default function ProposalsPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="proposals"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Proposals
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Create professional proposals from project briefs in minutes with
        AI-powered templates.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="creating-proposals"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Creating Proposals
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Transform your project briefs into polished proposals:
          </p>
          <ol className="space-y-4">
            {[
              "Navigate to a client hub or project",
              "Click 'Create Proposal' button",
              "Choose from pre-built templates or start from scratch",
              "AI auto-fills sections based on project details",
              "Customize pricing, timeline, and deliverables",
              "Preview and send directly to client",
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
            id="proposal-templates"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Proposal Templates
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Choose from industry-specific templates:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Web Design",
                description: "For website and UI/UX projects",
              },
              {
                title: "Development",
                description: "For software and app development",
              },
              {
                title: "Content Creation",
                description: "For writing and content projects",
              },
              {
                title: "Consulting",
                description: "For advisory and strategy work",
              },
              {
                title: "Marketing",
                description: "For marketing campaigns and SEO",
              },
              {
                title: "Custom",
                description: "Build your own template from scratch",
              },
            ].map((template, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {template.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {template.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            id="proposal-sections"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Proposal Sections
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Every proposal includes these key sections:
          </p>
          <div className="space-y-3">
            {[
              {
                section: "Executive Summary",
                description: "Brief overview of the project and your approach",
              },
              {
                section: "Scope of Work",
                description: "Detailed breakdown of deliverables and tasks",
              },
              {
                section: "Timeline",
                description: "Project phases and key milestones",
              },
              {
                section: "Pricing",
                description: "Transparent cost breakdown and payment terms",
              },
              {
                section: "Terms & Conditions",
                description: "Legal terms, revisions, and policies",
              },
              {
                section: "About You",
                description: "Your credentials and relevant experience",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                  {item.section}
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
            id="ai-assistance"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            AI Assistance
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Let AI help you write better proposals:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Auto-generate executive summaries from project notes",
              "Suggest pricing based on scope and industry standards",
              "Create timeline estimates from deliverables",
              "Improve writing clarity and professionalism",
              "Customize tone for different client types",
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
            id="sending-tracking"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Sending & Tracking
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Send proposals and track client engagement:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Email Delivery",
                description: "Send directly from EchoHub with custom message",
              },
              {
                title: "View Tracking",
                description: "See when clients open and view your proposal",
              },
              {
                title: "E-Signatures",
                description: "Collect client signatures digitally",
              },
              {
                title: "Version History",
                description: "Track changes and revisions over time",
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
                Save your best proposals as templates to speed up future
                proposal creation. Customize the template for each client to
                maintain a personal touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
