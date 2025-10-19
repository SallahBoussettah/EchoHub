"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { clientsApi } from "../../lib/api";
import {
  Plus,
  Search,
  Filter,
  Users,
  Mail,
  Phone,
  Building2,
  MoreVertical,
  Trash2,
  Edit,
  Archive,
} from "lucide-react";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchClients();
  }, [statusFilter]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientsApi.getAll(
        statusFilter === "ALL" ? undefined : statusFilter
      );
      setClients(response.data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await clientsApi.create({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        website: formData.get("website"),
        notes: formData.get("notes"),
      });

      setShowAddModal(false);
      fetchClients();
    } catch (error) {
      console.error("Failed to create client:", error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      await clientsApi.delete(id);
      fetchClients();
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-4xl font-black text-[var(--color-ink)] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Clients
            </h1>
            <p className="text-lg text-[var(--color-muted-ink)]">
              Manage your client relationships
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Client</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-ink)]" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder:text-[var(--color-muted-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {/* Clients Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--color-muted-ink)]">Loading clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)]">
            <Users className="w-16 h-16 text-[var(--color-muted-ink)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
              No clients yet
            </h3>
            <p className="text-[var(--color-muted-ink)] mb-6">
              Get started by adding your first client
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Client</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-bright)] flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        client.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-600"
                          : client.status === "PAUSED"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-gray-500/10 text-gray-600"
                      }`}
                    >
                      {client.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClient(client.id);
                      }}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-[var(--color-muted-ink)] hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-ink)] mb-1">
                  {client.name}
                </h3>
                {client.company && (
                  <p className="text-sm text-[var(--color-muted-ink)] mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {client.company}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  {client.email && (
                    <p className="text-sm text-[var(--color-muted-ink)] flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {client.email}
                    </p>
                  )}
                  {client.phone && (
                    <p className="text-sm text-[var(--color-muted-ink)] flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {client.phone}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--color-line)] flex items-center justify-between">
                  <span className="text-sm text-[var(--color-muted-ink)]">
                    {client._count?.projects || 0} projects
                  </span>
                  <span className="text-xs text-[var(--color-muted-ink)]">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Client Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-[var(--color-surface)] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
                Add New Client
              </h2>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:bg-[var(--color-surface)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Add Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
