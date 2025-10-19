"use client";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ComingSoonOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]/95 backdrop-blur-lg">
      <div className="max-w-md mx-auto px-6 text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-bright)] flex items-center justify-center shadow-2xl">
          <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>

        {/* Heading */}
        <h2
          className="text-4xl font-black text-[var(--color-ink)] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Coming Soon
        </h2>

        {/* Description */}
        <p className="text-lg text-[var(--color-muted-ink)] mb-8">
          This feature is not available in the current MVP version. We're
          working hard to bring it to you soon!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Docs</span>
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:border-[var(--color-accent)] transition-all"
          >
            <span>View Pricing</span>
          </Link>
        </div>

        {/* Roadmap Link */}
        <p className="text-sm text-[var(--color-muted-ink)] mt-6">
          Want to see what's coming next?{" "}
          <Link
            href="/about"
            className="text-[var(--color-accent)] hover:underline font-semibold"
          >
            Check our roadmap
          </Link>
        </p>
      </div>
    </div>
  );
}
