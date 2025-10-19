"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-muted-ink)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-bright)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[var(--color-ink)]">
              EchoHub
            </h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--color-muted-ink)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h2
              className="text-5xl font-black text-[var(--color-ink)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome back, {user.name}! 👋
            </h2>
            <p className="text-xl text-[var(--color-muted-ink)]">
              Ready to manage your clients and projects?
            </p>
          </div>

          {/* User Info Card */}
          <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 mb-8">
            <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
              Your Account
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[var(--color-line)]">
                <span className="text-[var(--color-muted-ink)]">Name</span>
                <span className="font-semibold text-[var(--color-ink)]">
                  {user.name}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--color-line)]">
                <span className="text-[var(--color-muted-ink)]">Email</span>
                <span className="font-semibold text-[var(--color-ink)]">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[var(--color-muted-ink)]">Plan</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold text-sm">
                  {user.plan}
                </span>
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="rounded-3xl bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-bright)]/10 border border-[var(--color-accent)]/20 p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-bright)] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-2">
              Dashboard Coming Soon
            </h3>
            <p className="text-[var(--color-muted-ink)] mb-6">
              We're building your client management dashboard. Stay tuned for
              clients, projects, AI summaries, and more!
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-line)] text-sm text-[var(--color-muted-ink)]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Backend connected and working</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
