"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "../../../components/DashboardLayout";
import { clientsApi, projectsApi } from "../../../lib/api";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Globe,
  Edit,
  Plus,
  FolderKanban,
  FileText,
  Paperclip,
  Clock,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Toast from "../../../components/Toast";
import ConfirmModal from "../../../components/ConfirmModal";
import { useToast } from "../../../hooks/useToast";

type Tab = "overview" | "projects" | "notes" | "files" | "timeline";

export default function ClientHubPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  const [client, setClient] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const { toasts, removeToast, success, error } = useToast();

  useEffect(() => {
    fetchClient();
    fetchProjects();
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const response = await clientsApi.getOne(clientId);
      setClient(response.data);
    } catch (error) {
      console.error("Failed to fetch client:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.getAllByClient(clientId);
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await projectsApi.create(clientId, {
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status") || "NOT_STARTED",
        deadline: formData.get("deadline") || null,
      });

      setShowAddProject(false);
      success("Project created successfully");
      fetchProjects();
    } catch (err) {
      error("Failed to create project");
      console.error("Failed to create project:", err);
    }
  };

  const handleDeleteProject = async () => {
    if (!confirmDelete) return;

    try {
      await projectsApi.delete(confirmDelete);
      success("Project deleted successfully");
      fetchProjects();
    } catch (err) {
      error("Failed to delete project");
      console.error("Failed to delete project:", err);
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleEditClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await clientsApi.update(clientId, {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        website: formData.get("website"),
        notes: formData.get("notes"),
        status: formData.get("status"),
      });

      setShowEditClient(false);
      success("Client updated successfully");
      fetchClient();
    } catch (err) {
      error("Failed to update client");
      console.error("Failed to update client:", err);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--color-muted-ink)]">Loading client...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!client) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <p>Client not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NOT_STARTED":
        return "bg-gray-500/10 text-gray-600";
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-600";
      case "REVIEW":
        return "bg-yellow-500/10 text-yellow-600";
      case "COMPLETED":
        return "bg-green-500/10 text-green-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Toast Notifications */}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}

        {/* Confirm Delete Modal */}
        {confirmDelete && (
          <ConfirmModal
            title="Delete Project"
            message="Are you sure you want to delete this project? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleDeleteProject}
            onCancel={() => setConfirmDelete(null)}
            type="danger"
          />
        )}

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/clients"
            className="inline-flex items-center gap-2 text-[var(--color-muted-ink)] hover:text-[var(--color-accent)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Clients</span>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1
                className="text-4xl font-black text-[var(--color-ink)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {client.name}
              </h1>
              {client.company && (
                <p className="text-lg text-[var(--color-muted-ink)] flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {client.company}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                  client.status === "ACTIVE"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-gray-500/10 text-gray-600"
                }`}
              >
                {client.status}
              </span>
              <button
                onClick={() => setShowEditClient(true)}
                className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all"
              >
                <Edit className="w-5 h-5 text-[var(--color-muted-ink)]" />
              </button>
            </div>
          </div>
        </div>

        {/* Client Details Card */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {client.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                <div>
                  <p className="text-xs text-[var(--color-muted-ink)] mb-1">
                    Email
                  </p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {client.email}
                  </p>
                </div>
              </div>
            )}
            {client.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--color-accent)]" />
                <div>
                  <p className="text-xs text-[var(--color-muted-ink)] mb-1">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {client.phone}
                  </p>
                </div>
              </div>
            )}
            {client.website && (
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[var(--color-accent)]" />
                <div>
                  <p className="text-xs text-[var(--color-muted-ink)] mb-1">
                    Website
                  </p>
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    {client.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--color-line)] mb-8">
          <div className="flex gap-6">
            {[
              { id: "overview", label: "Overview", icon: FolderKanban },
              { id: "projects", label: "Projects", icon: FolderKanban },
              { id: "notes", label: "Notes", icon: FileText },
              { id: "files", label: "Files", icon: Paperclip },
              { id: "timeline", label: "Timeline", icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "border-transparent text-[var(--color-muted-ink)] hover:text-[var(--color-ink)]"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
                <h3 className="text-3xl font-black text-[var(--color-ink)] mb-1">
                  {projects.length}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  Total Projects
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
                <h3 className="text-3xl font-black text-[var(--color-ink)] mb-1">
                  {client._count?.clientNotes || 0}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">Notes</p>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
                <h3 className="text-3xl font-black text-[var(--color-ink)] mb-1">
                  {client._count?.files || 0}
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">Files</p>
              </div>
            </div>

            {client.notes && (
              <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
                <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">
                  Quick Notes
                </h3>
                <p className="text-[var(--color-muted-ink)] whitespace-pre-wrap">
                  {client.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-ink)]">
                Projects
              </h2>
              <button
                onClick={() => setShowAddProject(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add Project</span>
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)]">
                <FolderKanban className="w-16 h-16 text-[var(--color-muted-ink)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
                  No projects yet
                </h3>
                <p className="text-[var(--color-muted-ink)] mb-6">
                  Create your first project for this client
                </p>
                <button
                  onClick={() => setShowAddProject(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Project</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:shadow-lg transition-all group relative"
                  >
                    <Link
                      href={`/dashboard/clients/${clientId}/projects/${project.id}`}
                      className="block p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      {project.description && (
                        <p className="text-sm text-[var(--color-muted-ink)] mb-4 line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status.replace("_", " ")}
                        </span>
                        {project.deadline && (
                          <span className="text-xs text-[var(--color-muted-ink)]">
                            Due:{" "}
                            {new Date(project.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-[var(--color-muted-ink)]">
                        <span>
                          {project.milestones?.length || 0} milestones
                        </span>
                        <span>{project._count?.notes || 0} notes</span>
                        <span>{project._count?.files || 0} files</span>
                      </div>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setConfirmDelete(project.id);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-[var(--color-muted-ink)] hover:text-red-600 transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="text-center py-12 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)]">
            <FileText className="w-16 h-16 text-[var(--color-muted-ink)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
              Notes Coming Soon
            </h3>
            <p className="text-[var(--color-muted-ink)]">
              Rich text notes will be available soon
            </p>
          </div>
        )}

        {activeTab === "files" && (
          <div className="text-center py-12 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)]">
            <Paperclip className="w-16 h-16 text-[var(--color-muted-ink)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
              Files Coming Soon
            </h3>
            <p className="text-[var(--color-muted-ink)]">
              File uploads will be available soon
            </p>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="text-center py-12 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)]">
            <Clock className="w-16 h-16 text-[var(--color-muted-ink)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
              Timeline Coming Soon
            </h3>
            <p className="text-[var(--color-muted-ink)]">
              Activity timeline will be available soon
            </p>
          </div>
        )}

        {/* Edit Client Modal */}
        {showEditClient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-[var(--color-surface)] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
                Edit Client
              </h2>
              <form onSubmit={handleEditClient} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={client.name}
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
                      defaultValue={client.email || ""}
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
                      defaultValue={client.phone || ""}
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
                      defaultValue={client.company || ""}
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
                      defaultValue={client.website || ""}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={client.status}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="PAUSED">Paused</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    defaultValue={client.notes || ""}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditClient(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:bg-[var(--color-surface)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Project Modal */}
        {showAddProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-[var(--color-surface)] rounded-3xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
                Add New Project
              </h2>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    >
                      <option value="NOT_STARTED">Not Started</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="REVIEW">Review</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddProject(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:bg-[var(--color-surface)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Add Project
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
