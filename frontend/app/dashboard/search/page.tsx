"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "../../components/DashboardLayout";
import { searchApi } from "../../lib/api";
import {
  Search,
  Users,
  FolderKanban,
  FileText,
  Building2,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "clients" | "projects"
  >("all");

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults(null);
      return;
    }

    setLoading(true);
    try {
      const response = await searchApi.searchAll(searchQuery);
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
      performSearch(query);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600 bg-green-50 dark:bg-green-950/20";
      case "IN_PROGRESS":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950/20";
      case "REVIEW":
        return "text-purple-600 bg-purple-50 dark:bg-purple-950/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-950/20";
    }
  };

  const filteredResults = results
    ? {
        clients:
          activeFilter === "all" || activeFilter === "clients"
            ? results.clients
            : [],
        projects:
          activeFilter === "all" || activeFilter === "projects"
            ? results.projects
            : [],
        notes: activeFilter === "all" ? results.notes : [],
      }
    : null;

  const totalFiltered = filteredResults
    ? filteredResults.clients.length +
      filteredResults.projects.length +
      filteredResults.notes.length
    : 0;

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-black text-[var(--color-ink)] mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Search
          </h1>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Find clients, projects, and notes
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-3xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-ink)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for clients, projects, or notes..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] text-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              autoFocus
            />
          </div>
        </form>

        {/* Filters */}
        {results && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-bg)]"
              }`}
            >
              All ({results.total})
            </button>
            <button
              onClick={() => setActiveFilter("clients")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeFilter === "clients"
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-bg)]"
              }`}
            >
              Clients ({results.clients.length})
            </button>
            <button
              onClick={() => setActiveFilter("projects")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeFilter === "projects"
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-bg)]"
              }`}
            >
              Projects ({results.projects.length})
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--color-muted-ink)]">Searching...</p>
          </div>
        )}

        {/* No Query */}
        {!query && !results && !loading && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-[var(--color-muted-ink)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
              Start searching
            </h3>
            <p className="text-[var(--color-muted-ink)]">
              Enter at least 2 characters to search
            </p>
          </div>
        )}

        {/* No Results */}
        {!loading && results && totalFiltered === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-[var(--color-muted-ink)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
              No results found
            </h3>
            <p className="text-[var(--color-muted-ink)]">
              Try different keywords or filters
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && filteredResults && totalFiltered > 0 && (
          <div className="space-y-8">
            {/* Clients */}
            {filteredResults.clients.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[var(--color-accent)]" />
                  <h2 className="text-xl font-bold text-[var(--color-ink)]">
                    Clients ({filteredResults.clients.length})
                  </h2>
                </div>
                <div className="grid gap-4">
                  {filteredResults.clients.map((client: any) => (
                    <Link
                      key={client.id}
                      href={`/dashboard/clients/${client.id}`}
                      className="block rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                            {client.name}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-[var(--color-muted-ink)]">
                            {client.company && (
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                <span>{client.company}</span>
                              </div>
                            )}
                            {client.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>{client.email}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <FolderKanban className="w-4 h-4" />
                              <span>{client._count.projects} projects</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {filteredResults.projects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FolderKanban className="w-5 h-5 text-[var(--color-accent)]" />
                  <h2 className="text-xl font-bold text-[var(--color-ink)]">
                    Projects ({filteredResults.projects.length})
                  </h2>
                </div>
                <div className="grid gap-4">
                  {filteredResults.projects.map((project: any) => (
                    <Link
                      key={project.id}
                      href={`/dashboard/clients/${project.client.id}/projects/${project.id}`}
                      className="block rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-[var(--color-muted-ink)] mb-2">
                            Client: {project.client.name}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status.replace("_", " ")}
                        </span>
                      </div>
                      {project.description && (
                        <p className="text-sm text-[var(--color-muted-ink)] mb-3 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-[var(--color-muted-ink)]">
                        {project.deadline && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(project.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        <span>{project._count.milestones} milestones</span>
                        <span>{project._count.notes} notes</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {filteredResults.notes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[var(--color-accent)]" />
                  <h2 className="text-xl font-bold text-[var(--color-ink)]">
                    Notes ({filteredResults.notes.length})
                  </h2>
                </div>
                <div className="grid gap-4">
                  {filteredResults.notes.map((note: any) => (
                    <Link
                      key={note.id}
                      href={
                        note.project
                          ? `/dashboard/clients/${note.project.clientId}/projects/${note.project.id}`
                          : `/dashboard/clients/${note.client.id}`
                      }
                      className="block rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-all group"
                    >
                      <div className="mb-2">
                        <p className="text-sm text-[var(--color-muted-ink)]">
                          {note.project
                            ? `Project: ${note.project.title}`
                            : `Client: ${note.client.name}`}
                        </p>
                      </div>
                      <p className="text-[var(--color-ink)] line-clamp-3">
                        {note.content}
                      </p>
                      <p className="text-xs text-[var(--color-muted-ink)] mt-2">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="p-8 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[var(--color-muted-ink)]">Loading search...</p>
            </div>
          </div>
        </DashboardLayout>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
