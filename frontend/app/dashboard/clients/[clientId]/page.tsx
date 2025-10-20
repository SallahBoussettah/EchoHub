"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "../../../components/DashboardLayout";
import { clientsApi, projectsApi, notesApi, filesApi } from "../../../lib/api";
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
  const [confirmDelete, setConfirmDelete] = useState<{
    type: "project" | "note" | "file";
    id?: string;
  } | null>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const { toasts, removeToast, success, error } = useToast();

  useEffect(() => {
    fetchClient();
    fetchProjects();
    fetchNotes();
    fetchFiles();
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

  const fetchNotes = async () => {
    try {
      const response = await notesApi.getByClient(clientId);
      setNotes(response.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await filesApi.getByClient(clientId);
      setFiles(response.data);
    } catch (err) {
      console.error("Failed to fetch files:", err);
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
    if (!confirmDelete || confirmDelete.type !== "project" || !confirmDelete.id)
      return;

    try {
      await projectsApi.delete(confirmDelete.id);
      success("Project deleted successfully");
      fetchProjects();
    } catch (err) {
      error("Failed to delete project");
      console.error("Failed to delete project:", err);
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleAddNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await notesApi.create({
        content: formData.get("content") as string,
        clientId,
      });
      setShowAddNote(false);
      success("Note added successfully");
      fetchNotes();
    } catch (err) {
      error("Failed to add note");
      console.error("Failed to add note:", err);
    }
  };

  const handleUpdateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingNote) return;

    const formData = new FormData(e.currentTarget);

    try {
      await notesApi.update(editingNote.id, {
        content: formData.get("content") as string,
      });
      setEditingNote(null);
      success("Note updated successfully");
      fetchNotes();
    } catch (err) {
      error("Failed to update note");
      console.error("Failed to update note:", err);
    }
  };

  const handleDeleteNote = async () => {
    if (!confirmDelete || confirmDelete.type !== "note" || !confirmDelete.id)
      return;

    try {
      await notesApi.delete(confirmDelete.id);
      success("Note deleted successfully");
      fetchNotes();
    } catch (err) {
      error("Failed to delete note");
      console.error("Failed to delete note:", err);
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      error("File size must be less than 50MB");
      return;
    }

    setUploading(true);
    try {
      await filesApi.upload(file, clientId);
      success("File uploaded successfully");
      fetchFiles();
      e.target.value = "";
    } catch (err) {
      error("Failed to upload file");
      console.error("Failed to upload file:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileDownload = async (file: any) => {
    try {
      const response = await filesApi.download(file.id);
      const blob = new Blob([response.data], { type: file.mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      error("Failed to download file");
      console.error("Failed to download file:", err);
    }
  };

  const handleFileDelete = async () => {
    if (!confirmDelete || confirmDelete.type !== "file" || !confirmDelete.id)
      return;

    try {
      await filesApi.delete(confirmDelete.id);
      success("File deleted successfully");
      fetchFiles();
    } catch (err) {
      error("Failed to delete file");
      console.error("Failed to delete file:", err);
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
        <div className="border-b border-[var(--color-line)] mb-6 md:mb-8 -mx-4 md:mx-0 px-4 md:px-0">
          <div className="flex items-end gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
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
                className={`flex items-center gap-2 px-3 md:px-4 py-3 border-b-2 transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "border-transparent text-[var(--color-muted-ink)] hover:text-[var(--color-ink)]"
                }`}
              >
                <tab.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="font-semibold text-sm md:text-base">
                  {tab.label}
                </span>
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
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)]">
                Client Notes
              </h2>
              <button
                onClick={() => setShowAddNote(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add Note</span>
              </button>
            </div>

            {notes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-[var(--color-muted-ink)] mx-auto mb-3" />
                <p className="text-[var(--color-muted-ink)] mb-4">
                  No notes yet
                </p>
                <button
                  onClick={() => setShowAddNote(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add First Note</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((note: any) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-[var(--color-ink)] whitespace-pre-wrap">
                          {note.content}
                        </p>
                        <p className="text-xs text-[var(--color-muted-ink)] mt-2">
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingNote(note)}
                          className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 text-[var(--color-muted-ink)] hover:text-blue-600 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setConfirmDelete({ type: "note", id: note.id })
                          }
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-[var(--color-muted-ink)] hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "files" && (
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)]">
                Client Files
              </h2>
              <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <Plus className="w-5 h-5" />
                <span>{uploading ? "Uploading..." : "Upload File"}</span>
              </label>
            </div>

            {files.length === 0 ? (
              <div className="text-center py-8">
                <Paperclip className="w-12 h-12 text-[var(--color-muted-ink)] mx-auto mb-3" />
                <p className="text-[var(--color-muted-ink)] mb-4">
                  No files uploaded yet
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <Plus className="w-5 h-5" />
                  <span>Upload First File</span>
                </label>
              </div>
            ) : (
              <div className="space-y-3">
                {files.map((file: any) => (
                  <div
                    key={file.id}
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Paperclip className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[var(--color-ink)] font-medium truncate">
                            {file.originalName}
                          </p>
                          <p className="text-xs text-[var(--color-muted-ink)]">
                            {(file.size / 1024).toFixed(2)} KB •{" "}
                            {new Date(file.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleFileDownload(file)}
                          className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 text-[var(--color-muted-ink)] hover:text-blue-600 transition-all"
                          title="Download"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            setConfirmDelete({ type: "file", id: file.id })
                          }
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-[var(--color-muted-ink)] hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

        {/* Add Note Modal */}
        {showAddNote && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-[var(--color-surface)] rounded-3xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
                Add Note
              </h2>
              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Note Content *
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={6}
                    placeholder="Write your note here..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddNote(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:bg-[var(--color-surface)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Add Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Note Modal */}
        {editingNote && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-[var(--color-surface)] rounded-3xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
                Edit Note
              </h2>
              <form onSubmit={handleUpdateNote} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Note Content *
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={6}
                    defaultValue={editingNote.content}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingNote(null)}
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
