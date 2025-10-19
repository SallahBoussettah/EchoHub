"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpen,
  Rocket,
  Users,
  Sparkles,
  FileText,
  Settings,
  HelpCircle,
  Zap,
  Shield,
  Search,
  Mail,
  Lock,
  FileCheck,
  BarChart3,
  Calendar,
  Inbox,
} from "lucide-react";

interface DocsLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    title: "Getting Started",
    href: "/docs",
    icon: Rocket,
    status: "available",
  },
  {
    title: "Account Setup",
    href: "/docs/account-setup",
    icon: Users,
    status: "available",
  },
  {
    title: "Dashboard",
    href: "/docs/dashboard",
    icon: BarChart3,
    status: "available",
  },
  {
    title: "Client Management",
    href: "/docs/client-management",
    icon: Users,
    status: "available",
  },
  {
    title: "Projects & Tasks",
    href: "/docs/projects",
    icon: FileText,
    status: "available",
  },
  {
    title: "AI Features",
    href: "/docs/ai-features",
    icon: Sparkles,
    status: "available",
  },
  {
    title: "Proposals",
    href: "/docs/proposals",
    icon: FileText,
    status: "coming-soon",
  },
  {
    title: "Smart Scheduler",
    href: "/docs/scheduler",
    icon: Calendar,
    status: "coming-soon",
  },
  {
    title: "Inbox Sync",
    href: "/docs/inbox-sync",
    icon: Inbox,
    status: "coming-soon",
  },
  {
    title: "Search & Organization",
    href: "/docs/search",
    icon: Search,
    status: "available",
  },
  {
    title: "Productivity Tips",
    href: "/docs/productivity",
    icon: Zap,
    status: "coming-soon",
  },
  {
    title: "Settings",
    href: "/docs/settings",
    icon: Settings,
    status: "available",
  },
  {
    title: "Security & Privacy",
    href: "/docs/security",
    icon: Shield,
    status: "available",
  },
  {
    title: "Troubleshooting",
    href: "/docs/troubleshooting",
    icon: HelpCircle,
    status: "available",
  },
];

const quickLinks = [
  { title: "Home", href: "/", icon: BookOpen },
  { title: "Contact Support", href: "/contact", icon: Mail },
  { title: "Privacy Policy", href: "/privacy", icon: Lock },
  { title: "Terms of Service", href: "/terms", icon: FileCheck },
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; title: string; level: number }[]
  >([]);
  const pathname = usePathname();

  // Generate table of contents from headings (only H2)
  useEffect(() => {
    const generateTOC = () => {
      const headings = document.querySelectorAll(".docs-content h2");
      const toc = Array.from(headings).map((heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id) {
          heading.id = id;
        }
        return {
          id,
          title: heading.textContent || "",
          level: parseInt(heading.tagName.charAt(1)),
        };
      });
      setTableOfContents(toc);
    };

    // Generate TOC after content loads
    const timer = setTimeout(generateTOC, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <style jsx global>{`
        /* Custom Scrollbar Styles */
        .docs-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .docs-scrollbar::-webkit-scrollbar-track {
          background: var(--color-surface);
          border-radius: 4px;
        }

        .docs-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-line);
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .docs-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--color-accent);
        }

        /* Firefox scrollbar */
        .docs-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--color-line) var(--color-surface);
        }
      `}</style>

      <div className="flex h-screen bg-[var(--color-bg)]">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 transform bg-[var(--color-bg)] border-r border-[var(--color-line)] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar header */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-[var(--color-line)]">
              <Link
                href="/docs"
                className="flex items-center gap-2 text-lg font-semibold text-[var(--color-ink)]"
              >
                <BookOpen className="w-5 h-5 text-[var(--color-accent)]" />
                Documentation
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 docs-scrollbar">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-ink)]" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] text-sm placeholder:text-[var(--color-muted-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>

              {/* Navigation */}
              <nav className="space-y-1 mb-8">
                <h3 className="text-xs font-semibold text-[var(--color-muted-ink)] uppercase tracking-wide mb-3">
                  Contents
                </h3>
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  const isComingSoon = item.status === "coming-soon";
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[var(--color-accent)] text-white"
                          : "text-[var(--color-muted-ink)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                      {isComingSoon && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 font-semibold whitespace-nowrap">
                          SOON
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Links */}
              <nav className="space-y-1">
                <h3 className="text-xs font-semibold text-[var(--color-muted-ink)] uppercase tracking-wide mb-3">
                  Quick Links
                </h3>
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-muted-ink)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-all"
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile header */}
          <header className="lg:hidden flex h-16 items-center justify-between px-6 border-b border-[var(--color-line)] bg-[var(--color-bg)]">
            <Link
              href="/docs"
              className="text-lg font-semibold text-[var(--color-ink)]"
            >
              Documentation
            </Link>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </header>

          {/* Content area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Main content */}
            <main className="flex-1 overflow-y-auto docs-scrollbar">
              <div className="docs-content max-w-4xl mx-auto px-6 py-12">
                {children}
              </div>
            </main>

            {/* Table of contents */}
            {tableOfContents.length > 0 && (
              <aside className="hidden xl:block w-64 overflow-y-auto border-l border-[var(--color-line)] bg-[var(--color-bg)] docs-scrollbar">
                <div className="sticky top-0 px-6 py-12">
                  <h3 className="text-sm font-semibold text-[var(--color-ink)] mb-4">
                    On this page
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-[var(--color-muted-ink)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
