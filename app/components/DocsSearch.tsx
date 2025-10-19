"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export default function DocsSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search
    console.log("Search:", searchQuery);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Can't find what you're looking for?
          </h2>
          <p className="text-[var(--color-muted-ink)]">
            Search our documentation for specific topics
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-ink)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder:text-[var(--color-muted-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-lg"
          />
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-[var(--color-muted-ink)]">
            Popular searches:
          </span>
          {["AI summaries", "Client setup", "Billing", "Export data"].map(
            (term, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] text-sm text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
              >
                {term}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
