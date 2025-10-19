"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-surface)] border-b border-[var(--color-line)] z-40 safe-area-inset-top">
        <div className="flex items-center justify-between h-full px-4">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            EchoHub
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-[var(--color-bg)] transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-[var(--color-ink)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--color-ink)]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-16 right-0 w-64 bg-[var(--color-surface)] border-l border-[var(--color-line)] h-[calc(100vh-4rem)] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="mb-4 pb-4 border-b border-[var(--color-line)]">
                  <p className="text-sm font-semibold text-[var(--color-ink)]">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-[var(--color-muted-ink)]">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-muted-ink)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
