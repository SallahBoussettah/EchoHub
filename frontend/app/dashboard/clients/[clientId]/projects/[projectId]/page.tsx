"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "../../../../../components/DashboardLayout";
import { projectsApi, aiApi, notesApi, filesApi } from "../../../../../lib/api";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  Circle,
  Sparkles,
  FileText,
  Paperclip,
  X,
} from "lucide-react";
import Link from "next/link";
import Toast from "../../../../../components/Toast";
import ConfirmModal from "../../../../../components/ConfirmModal";
import { useToast } from "../../../../../hooks/useToast";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const clientId = params.clientId as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    type: "project" | "milestone" | "note" | "file";
    id?: string;
  } | null>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const { toasts, removeToast, success, error } = useToast();

  useEffect(() => {
    fetchProject();
    fetchNotes();
    fetchFiles();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await projectsApi.getOne(projectId);
      setProject(response.data);
    } catch (err) {
      console.error("Failed to fetch project:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await notesApi.getByProject(projectId);
      setNotes(response.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await filesApi.getByProject(projectId);
      setFiles(response.data);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      error("File size must be less than 50MB");
      return;
    }

    setUploading(true);
    try {
      await filesApi.upload(file, undefined, projectId);
      success("File uploaded successfully");
      fetchFiles();
      // Reset input
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

  const handleAddMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await projectsApi.createMilestone(projectId, {
        title: formData.get("title"),
        description: formData.get("description"),
      });

      setShowAddMilestone(false);
      success("Milestone added successfully");
      fetchProject();
    } catch (err) {
      error("Failed to create milestone");
      console.error("Failed to create milestone:", err);
    }
  };

  const handleToggleMilestone = async (
    milestoneId: string,
    completed: boolean
  ) => {
    try {
      await projectsApi.updateMilestone(projectId, milestoneId, {
        completed: !completed,
        completedAt: !completed ? new Date().toISOString() : null,
      });
      success(completed ? "Milestone reopened" : "Milestone completed");
      fetchProject();
    } catch (err) {
      error("Failed to update milestone");
      console.error("Failed to update milestone:", err);
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    try {
      await projectsApi.deleteMilestone(projectId, milestoneId);
      success("Milestone deleted successfully");
      fetchProject();
    } catch (err) {
      error("Failed to delete milestone");
      console.error("Failed to delete milestone:", err);
    }
    setConfirmDelete(null);
  };

  const handleEditProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await projectsApi.update(projectId, {
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        deadline: formData.get("deadline") || null,
      });

      setShowEditProject(false);
      success("Project updated successfully");
      fetchProject();
    } catch (err) {
      error("Failed to update project");
      console.error("Failed to update project:", err);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projectsApi.delete(projectId);
      success("Project deleted successfully");
      router.push(`/dashboard/clients/${clientId}`);
    } catch (err) {
      error("Failed to delete project");
      console.error("Failed to delete project:", err);
    }
    setConfirmDelete(null);
  };

  const handleGenerateAiSummary = async () => {
    setAiLoading(true);
    try {
      const response = await aiApi.summarizeProject(projectId);
      setAiSummary(response.data);
      setShowAiSummary(true);
      success("AI summary generated successfully");
    } catch (err: any) {
      error(err.response?.data?.message || "Failed to generate AI summary");
      console.error("AI summary error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await notesApi.create({
        content: formData.get("content") as string,
        projectId,
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--color-muted-ink)]">Loading project...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <p>Project not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const completedMilestones =
    project.milestones?.filter((m: any) => m.completed).length || 0;
  const totalMilestones = project.milestones?.length || 0;
  const progress =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/dashboard/clients/${clientId}`}
            className="inline-flex items-center gap-2 text-[var(--color-muted-ink)] hover:text-[var(--color-accent)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">
              Back to {project.client?.name}
            </span>
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1
                className="text-4xl font-black text-[var(--color-ink)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h1>
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-xl font-semibold text-sm ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status.replace("_", " ")}
                </span>
                {project.deadline && (
                  <div className="flex items-center gap-2 text-[var(--color-muted-ink)]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Due: {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEditProject(true)}
                className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all"
              >
                <Edit className="w-5 h-5 text-[var(--color-muted-ink)]" />
              </button>
              <button
                onClick={() => setConfirmDelete({ type: "project" })}
                className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
              >
                <Trash2 className="w-5 h-5 text-[var(--color-muted-ink)] hover:text-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 mb-6">
            <h2 className="text-xl font-bold text-[var(--color-ink)] mb-3">
              Description
            </h2>
            <p className="text-[var(--color-muted-ink)] whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        )}

        {/* Milestones */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--color-ink)] mb-2">
                Milestones
              </h2>
              {totalMilestones > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-[var(--color-bg)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-accent)] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-[var(--color-muted-ink)]">
                    {completedMilestones}/{totalMilestones}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowAddMilestone(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Milestone</span>
            </button>
          </div>

          {totalMilestones === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-[var(--color-muted-ink)] mx-auto mb-3" />
              <p className="text-[var(--color-muted-ink)] mb-4">
                No milestones yet
              </p>
              <button
                onClick={() => setShowAddMilestone(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add First Milestone</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {project.milestones.map((milestone: any) => (
                <div
                  key={milestone.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-all group"
                >
                  <button
                    onClick={() =>
                      handleToggleMilestone(milestone.id, milestone.completed)
                    }
                    className="mt-1"
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-[var(--color-muted-ink)] group-hover:text-[var(--color-accent)]" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-1 ${
                        milestone.completed
                          ? "text-[var(--color-muted-ink)] line-through"
                          : "text-[var(--color-ink)]"
                      }`}
                    >
                      {milestone.title}
                    </h3>
                    {milestone.description && (
                      <p className="text-sm text-[var(--color-muted-ink)]">
                        {milestone.description}
                      </p>
                    )}
                    {milestone.completedAt && (
                      <p className="text-xs text-green-600 mt-1">
                        Completed{" "}
                        {new Date(milestone.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setConfirmDelete({ type: "milestone", id: milestone.id })
                    }
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-[var(--color-muted-ink)] hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Summary Section */}
        <div className="rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-bright)]/10 border border-[var(--color-accent)]/20 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
              <div>
                <h3 className="text-lg font-bold text-[var(--color-ink)]">
                  AI Summary
                </h3>
                <p className="text-sm text-[var(--color-muted-ink)]">
                  Generate a summary of this project
                </p>
              </div>
            </div>
            <button
              onClick={handleGenerateAiSummary}
              disabled={aiLoading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles
                className={`w-5 h-5 ${aiLoading ? "animate-spin" : ""}`}
              />
              <span>{aiLoading ? "Generating..." : "Summarize"}</span>
            </button>
          </div>
        </div>

        {/* Notes Section */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--color-accent)]" />
              <h2 className="text-xl font-bold text-[var(--color-ink)]">
                Notes
              </h2>
            </div>
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
              <p className="text-[var(--color-muted-ink)] mb-4">No notes yet</p>
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

        {/* Files Section */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Paperclip className="w-5 h-5 text-[var(--color-accent)]" />
              <h2 className="text-xl font-bold text-[var(--color-ink)]">
                Files
              </h2>
            </div>
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

        {/* Edit Project Modal */}
        {showEditProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-[var(--color-surface)] rounded-3xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
                Edit Project
              </h2>
              <form onSubmit={handleEditProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={project.title}
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
                    defaultValue={project.description || ""}
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
                      defaultValue={project.status}
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
                      defaultValue={
                        project.deadline
                          ? new Date(project.deadline)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditProject(false)}
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
            title={
              confirmDelete.type === "project"
                ? "Delete Project"
                : confirmDelete.type === "milestone"
                ? "Delete Milestone"
                : confirmDelete.type === "file"
                ? "Delete File"
                : "Delete Note"
            }
            message={
              confirmDelete.type === "project"
                ? "Are you sure you want to delete this project? This action cannot be undone."
                : confirmDelete.type === "milestone"
                ? "Are you sure you want to delete this milestone? This action cannot be undone."
                : confirmDelete.type === "file"
                ? "Are you sure you want to delete this file? This action cannot be undone."
                : "Are you sure you want to delete this note? This action cannot be undone."
            }
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={() => {
              if (confirmDelete.type === "project") {
                handleDeleteProject();
              } else if (
                confirmDelete.type === "milestone" &&
                confirmDelete.id
              ) {
                handleDeleteMilestone(confirmDelete.id);
              } else if (confirmDelete.type === "note") {
                handleDeleteNote();
              } else if (confirmDelete.type === "file") {
                handleFileDelete();
              }
            }}
            onCancel={() => setConfirmDelete(null)}
            type="danger"
          />
        )}

        {/* AI Summary Modal */}
        {showAiSummary && aiSummary && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-[var(--color-surface)] rounded-3xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-bright)] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--color-ink)]">
                      AI Project Summary
                    </h2>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      {aiSummary.cached
                        ? "Cached summary"
                        : "Generated just now"}{" "}
                      • {new Date(aiSummary.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAiSummary(false)}
                  className="p-2 rounded-lg hover:bg-[var(--color-bg)] transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--color-muted-ink)]" />
                </button>
              </div>

              <div className="rounded-2xl bg-[var(--color-bg)] border border-[var(--color-line)] p-6 mb-6">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-[var(--color-ink)] leading-relaxed">
                    {aiSummary.summary}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-[var(--color-muted-ink)]">
                  {aiSummary.tokensUsed && (
                    <span>Tokens used: {aiSummary.tokensUsed}</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiSummary.summary);
                      success("Summary copied to clipboard");
                    }}
                    className="px-4 py-2 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:bg-[var(--color-surface)] transition-all"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => setShowAiSummary(false)}
                    className="px-6 py-2 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
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

        {/* Add Milestone Modal */}
        {showAddMilestone && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-[var(--color-surface)] rounded-3xl p-8 max-w-lg w-full">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
                Add Milestone
              </h2>
              <form onSubmit={handleAddMilestone} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g., Complete wireframes"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={2}
                    placeholder="Optional details..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMilestone(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:bg-[var(--color-surface)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Add Milestone
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
