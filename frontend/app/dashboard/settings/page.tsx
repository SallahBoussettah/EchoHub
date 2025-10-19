"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { aiApi } from "../../lib/api";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  CreditCard,
  Sparkles,
  Crown,
} from "lucide-react";

type Tab = "profile" | "account" | "notifications" | "billing";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [aiUsage, setAiUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toasts, removeToast, success, error } = useToast();

  useEffect(() => {
    fetchAiUsage();
  }, []);

  const fetchAiUsage = async () => {
    try {
      const response = await aiApi.getUsage();
      setAiUsage(response.data);
    } catch (err) {
      console.error("Failed to fetch AI usage:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "PRO":
        return "bg-gradient-to-r from-purple-500 to-blue-500";
      case "TEAM":
        return "bg-gradient-to-r from-orange-500 to-red-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement profile update API
    success("Profile updated successfully");
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement password change API
    success("Password changed successfully");
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

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-black text-[var(--color-ink)] mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Settings
          </h1>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Manage your account and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--color-line)] mb-8">
          <div className="flex gap-6">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "account", label: "Account", icon: SettingsIcon },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "billing", label: "Billing", icon: CreditCard },
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
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">
                Profile Information
              </h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-muted-ink)] cursor-not-allowed"
                  />
                  <p className="text-xs text-[var(--color-muted-ink)] mt-1">
                    Email cannot be changed
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors">
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                    <option>Europe/Paris</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="max-w-4xl">
            {/* Current Plan */}
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 mb-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">
                Current Plan
              </h2>
              <div className="flex items-center justify-between p-6 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)]">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${getPlanColor(
                      user?.plan || "FREE"
                    )} flex items-center justify-center`}
                  >
                    {user?.plan === "FREE" ? (
                      <Sparkles className="w-6 h-6 text-white" />
                    ) : (
                      <Crown className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-ink)]">
                      {user?.plan || "FREE"} Plan
                    </h3>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      {user?.plan === "FREE"
                        ? "Perfect for trying out EchoHub"
                        : "For serious freelancers"}
                    </p>
                  </div>
                </div>
                {user?.plan === "FREE" && (
                  <button
                    onClick={() => success("Upgrade feature coming soon!")}
                    className="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Upgrade to Pro
                  </button>
                )}
              </div>
            </div>

            {/* AI Usage */}
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
                <h2 className="text-xl font-bold text-[var(--color-ink)]">
                  AI Summary Usage
                </h2>
              </div>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-sm text-[var(--color-muted-ink)]">
                    Loading usage...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--color-muted-ink)]">
                      This month
                    </span>
                    <span className="font-semibold text-[var(--color-ink)]">
                      {aiUsage?.usage || 0} / {aiUsage?.limit || 5} summaries
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[var(--color-bg)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-accent)] transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          ((aiUsage?.usage || 0) / (aiUsage?.limit || 5)) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-muted-ink)]">
                      {aiUsage?.remaining || 0} remaining
                    </span>
                    <span className="text-[var(--color-muted-ink)]">
                      Resets monthly
                    </span>
                  </div>
                  {(aiUsage?.usage || 0) >= (aiUsage?.limit || 5) && (
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        You've reached your AI summary limit. Upgrade to Pro for
                        100 summaries per month.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="max-w-2xl">
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">
                Email Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)]">
                  <div>
                    <h3 className="font-semibold text-[var(--color-ink)]">
                      Deadline Reminders
                    </h3>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      Get notified 24 hours before project deadlines
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                      onChange={() =>
                        success("Notification preference updated")
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--color-accent)]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)]">
                  <div>
                    <h3 className="font-semibold text-[var(--color-ink)]">
                      Weekly Summary
                    </h3>
                    <p className="text-sm text-[var(--color-muted-ink)]">
                      Receive a weekly summary of your projects
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() =>
                        success("Notification preference updated")
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--color-accent)]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div className="max-w-2xl">
            <div className="space-y-6">
              <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6">
                <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">
                  Change Password
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              <div className="rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-6">
                <h2 className="text-xl font-bold text-red-600 mb-4">
                  Danger Zone
                </h2>
                <p className="text-sm text-red-600 mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <button
                  onClick={() => error("Account deletion feature coming soon")}
                  className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
