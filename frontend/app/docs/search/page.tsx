import DocsLayout from "../../components/DocsLayout";
import { Search, Lightbulb } from "lucide-react";

export default function SearchPage() {
  return (
    <DocsLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
          <Search className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h1
          id="search-organization"
          className="text-4xl font-black text-[var(--color-ink)]"
        >
          Search & Organization
        </h1>
      </div>

      <p className="text-lg text-[var(--color-muted-ink)] mb-8">
        Find anything quickly with powerful search and smart organization
        features.
      </p>

      <div className="space-y-8">
        <section>
          <h2
            id="global-search"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Global Search
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Search across all your clients, projects, and notes instantly. Use
            the search bar at the top of any page to find what you need.
          </p>
        </section>

        <section>
          <h2
            id="filters"
            className="text-2xl font-bold text-[var(--color-ink)] mb-4"
          >
            Filters & Sorting
          </h2>
          <p className="text-[var(--color-muted-ink)] mb-4">
            Organize your workspace with powerful filters:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "By Status",
                description: "Filter by active, paused, or completed",
              },
              {
                title: "By Date",
                description: "Sort by creation or modification date",
              },
              {
                title: "By Client",
                description: "View all projects for specific clients",
              },
              {
                title: "By Priority",
                description: "Focus on high-priority items",
              },
            ].map((filter, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                  {filter.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  {filter.description}
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
                Use keyboard shortcut Cmd/Ctrl + K to quickly access the search
                bar from anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
