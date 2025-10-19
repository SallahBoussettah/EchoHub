const comparisonData = [
  {
    feature: "Client organization",
    scattered: "Spreadsheets + folders",
    echohub: "Dedicated Client Hubs",
  },
  {
    feature: "Project tracking",
    scattered: "Trello + Notion + emails",
    echohub: "Unified timeline view",
  },
  {
    feature: "Communication",
    scattered: "Gmail + Slack + texts",
    echohub: "Centralized inbox (coming soon)",
  },
  {
    feature: "AI assistance",
    scattered: "Manual summaries",
    echohub: "Instant AI summaries",
  },
  {
    feature: "File management",
    scattered: "Google Drive + Dropbox",
    echohub: "Attached to clients/projects",
  },
  {
    feature: "Search",
    scattered: "Search each tool separately",
    echohub: "Search everything at once",
  },
];

export default function FeaturesComparison() {
  return (
    <section className="py-20 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One tool vs scattered chaos
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)]">
            See how EchoHub compares to juggling multiple tools
          </p>
        </div>

        <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-line)] overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-[var(--color-line)] bg-[var(--color-bg)]">
            <div className="font-semibold text-[var(--color-ink)]">Feature</div>
            <div className="font-semibold text-[var(--color-muted-ink)] text-center">
              Scattered Tools
            </div>
            <div className="font-semibold text-[var(--color-accent)] text-center">
              EchoHub
            </div>
          </div>

          {comparisonData.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 p-6 border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-muted)] transition-colors"
            >
              <div className="font-medium text-[var(--color-ink)]">
                {row.feature}
              </div>
              <div className="text-sm text-[var(--color-muted-ink)] text-center">
                {row.scattered}
              </div>
              <div className="text-sm font-semibold text-[var(--color-ink)] text-center">
                {row.echohub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
