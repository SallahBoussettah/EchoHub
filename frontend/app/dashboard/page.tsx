"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { clientsApi } from "../lib/api";
import {
  Users,
  FolderKanban,
  AlertCircle,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientsApi.getAll();
      setClients(response.data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalClients: clients.length,
    activeProjects: clients.reduce(
      (sum, client) => sum + (client._count?.projects || 0),
      0
    ),
    overdueProjects: 0, // Will be calculated when we have projects with deadlines
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
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Here's what's happening with your clients and projects
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/clients"
            className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--color-muted-ink)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all" />
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
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-3xl font-black text-[var(--color-ink)] mb-1">
              {stats.overdueProjects}
            </h3>
            <p className="text-sm text-[var(--color-muted-ink)]">
              Overdue Items
            </p>
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
                      <h3 className="font-semibold text-[var(--color-ink)] truncate group-hover:text-[var(--color-accent)] transition-colors">
                        {client.name}
                      </h3>
                      {client.company && (
                        <p className="text-xs text-[var(--color-muted-ink)] truncate">
                          {client.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[var(--color-muted-ink)]">
                    <span>{client._count?.projects || 0} projects</span>
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        client.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-gray-500/10 text-gray-600"
                      }`}
                    >
                      {client.status}
                    </span>
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
