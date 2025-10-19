import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {/* Simple Header */}
      <header className="py-6 border-b border-[var(--color-line)]">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="text-2xl font-bold text-[var(--color-ink)] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-display)" }}
          >
            EchoHub
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="py-6 border-t border-[var(--color-line)]">
        <div className="container mx-auto px-6 text-center text-sm text-[var(--color-muted-ink)]">
          <p>&copy; 2025 EchoHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
