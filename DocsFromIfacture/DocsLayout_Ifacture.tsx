"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useI18n } from "@/lib/i18n-provider";

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface DocsLayoutProps {
  sections: DocSection[];
}

export default function DocsLayout({ sections }: DocsLayoutProps) {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const filteredSections = sections.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="glass rounded-xl p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("docs.search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-bg-elevated border border-bg-border rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:border-accent transition-colors"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Navigation */}
              <div className="glass rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                  {t("docs.contents")}
                </h3>
                <nav className="space-y-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-accent text-white font-medium"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="flex-shrink-0">{section.icon}</span>
                      <span className="truncate">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Links */}
              <div className="glass rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                  {t("docs.quickLinks")}
                </h3>
                <div className="space-y-2">
                  <a
                    href="mailto:support@ifacture.ma"
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {t("docs.contactSupport")}
                  </a>
                  <Link
                    href="/privacy"
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    {t("footer.legal.privacy")}
                  </Link>
                  <Link
                    href="/terms"
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t("footer.legal.terms")}
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Hero */}
            <div className="glass rounded-2xl p-8 sm:p-12 mb-8">
              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-accent/10 border border-accent/20">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {t("docs.badge")}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  {t("docs.title")}
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {t("docs.subtitle")}
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {filteredSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="glass rounded-2xl p-8 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Help Section */}
            <div className="mt-8 glass rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {t("docs.helpTitle")}
                </h3>
                <p className="text-text-secondary mb-6">
                  {t("docs.helpSubtitle")}
                </p>
                <a
                  href="mailto:support@ifacture.ma"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover transition-all duration-200 active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t("docs.contactSupport")}
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
