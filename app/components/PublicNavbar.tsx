"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-line)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-semibold text-[var(--color-ink)] hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EchoHub
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/features"
                className="nav-link text-[15px] font-medium text-[var(--color-muted-ink)] hover:text-[var(--color-ink)] transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="nav-link text-[15px] font-medium text-[var(--color-muted-ink)] hover:text-[var(--color-ink)] transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="nav-link text-[15px] font-medium text-[var(--color-muted-ink)] hover:text-[var(--color-ink)] transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="nav-link text-[15px] font-medium text-[var(--color-muted-ink)] hover:text-[var(--color-ink)] transition-colors"
              >
                Blog
              </Link>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 border border-[var(--color-line)] text-[var(--color-ink)] rounded-lg hover:border-[var(--color-accent)] transition-all font-medium text-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 bg-[var(--color-accent)] text-white rounded-lg font-semibold hover:brightness-110 hover:-translate-y-0.5 transition-all text-sm shadow-lg"
              >
                Start Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[var(--color-ink)] hover:bg-[var(--color-surface)] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-[var(--color-bg)]/98 backdrop-blur-xl"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative h-full flex flex-col pt-20 px-6">
            <div className="flex flex-col gap-6">
              <Link
                href="/features"
                className="text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              <div className="h-px bg-[var(--color-line)] my-4" />

              <Link
                href="/login"
                className="w-full px-6 py-3 border border-[var(--color-line)] text-[var(--color-ink)] rounded-xl hover:border-[var(--color-accent)] transition-all font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="w-full px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:brightness-110 transition-all text-center shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
