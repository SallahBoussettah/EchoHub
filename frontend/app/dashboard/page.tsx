"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { clientsApi, projectsApi } from "../lib/api";
import {
  Users,
  FolderKanban,
  AlertCircle,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clientsRes, projectsRes] = await Promise.all([
        clientsApi.getAll(),
        projectsApi.getAll(),
      ]);
      setClients(clientsRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const stats = {
    totalClients: clients.length,
    activeProjects: projects.filter((p) => p.status === "IN_PROGRESS").length,
    completedProjects: projects.filter((p) => p.status === "COMPLETED").length,
    overdueProjects: projects.filter((p) => {
      if (!p.deadline) return false;
      return new Date(p.deadline) < new Date() && p.status !== "COMPLETED";
    }).length,
  };

  // Upcoming deadlines (next 7 days)
  const upcomingDeadlines = projects
    .filter((p) => {
      if (!p.deadline || p.status === "COMPLETED") return false;
      const deadline = new Date(p.deadline);
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      return deadline >= today && deadline <= nextWeek;
    })
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    )
    .slice(0, 5);

  // Recent projects
  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

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

  const getDaysUntil = (date: string) => {
    const deadline = new Date(date);
    const today = new Date();
    const diff = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff < 0) return `${Math.abs(diff)} days overdue`;
    return `${diff} days`;
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-black text-[var(--color-ink)] mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Dashboard
          </h1>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Welcome back! Here's what's happening.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/dashboard/clients"
            className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-3xl font-black text-[var(--color-ink)] mb-1">
              {loading ? "..." : stats.totalClients}
            </h3>
            <p className="text-sm text-[var(--color-muted-ink)]">
              Total Clients
            </p>
          </Link>

          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-3xl font-black text-[var(--color-ink)] mb-1">
              {loading ? "..." : stats.activeProjects}
            </h3>
            <p className="text-sm text-[var(--color-muted-ink)]">
              Active Projects
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-3xl font-black text-[var(--color-ink)] mb-1">
              {loading ? "..." : stats.completedProjects}
            </h3>
            <p className="text-sm text-[var(--color-muted-ink)]">Completed</p>
          </div>

          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-3xl font-black text-[var(--color-ink)] mb-1">
              {loading ? "..." : stats.overdueProjects}
            </h3>
            <p className="text-sm text-[var(--color-muted-ink)]">Overdue</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Deadlines */}
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
              <h2 className="text-xl font-bold text-[var(--color-ink)]">
                Upcoming Deadlines
              </h2>
            </div>
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  Loading...
                </p>
              </div>
            ) : upcomingDeadlines.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-[var(--color-muted-ink)] mx-auto mb-4" />
                <p className="text-[var(--color-muted-ink)]">
                  No upcoming deadlines
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map((project) => (
                  <Link
                    key={project.id}
                    href={`/dashboard/clients/${project.clientId}/projects/${project.id}`}
                    className="block p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                        {project.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                          new Date(project.deadline) < new Date()
                            ? "bg-red-50 dark:bg-red-950/20 text-red-600"
                            : "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600"
                        }`}
                      >
                        {getDaysUntil(project.deadline)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted-ink)]">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(project.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Projects */}
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <FolderKanban className="w-5 h-5 text-[var(--color-accent)]" />
              <h2 className="text-xl font-bold text-[var(--color-ink)]">
                Recent Projects
              </h2>
            </div>
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  Loading...
                </p>
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <FolderKanban className="w-12 h-12 text-[var(--color-muted-ink)] mx-auto mb-4" />
                <p className="text-[var(--color-muted-ink)]">No projects yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/dashboard/clients/${project.clientId}/projects/${project.id}`}
                    className="block p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                        {project.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-lg font-semibold ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-ink)]">
                      {project.client?.name || "Unknown Client"}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[var(--color-accent)]" />
              <h2 className="text-xl font-bold text-[var(--color-ink)]">
                Recent Clients
              </h2>
            </div>
            <Link
              href="/dashboard/clients"
              className="text-sm text-[var(--color-accent)] hover:underline font-semibold"
            >
              View all →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-[var(--color-muted-ink)]">
                Loading clients...
              </p>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-[var(--color-muted-ink)] mx-auto mb-4" />
              <p className="text-[var(--color-muted-ink)] mb-4">
                No clients yet
              </p>
              <Link
                href="/dashboard/clients"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
              >
                Add Your First Client
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.slice(0, 6).map((client) => (
                <Link
                  key={client.id}
                  href={`/dashboard/clients/${client.id}`}
                  className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-bright)] flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                        {client.name}
                      </h3>
                      {client.company && (
                        <p className="text-xs text-[var(--color-muted-ink)] truncate">
                          {client.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-muted-ink)]">
                    <FolderKanban className="w-3 h-3" />
                    <span>{client._count?.projects || 0} projects</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
