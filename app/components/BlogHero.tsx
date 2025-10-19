"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import { BookOpen } from "lucide-react";

export default function BlogHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".blog-hero-content",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="blog-hero-content text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] mb-8">
            <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="text-sm font-semibold text-[var(--color-ink)]">
              Tips, updates & insights
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl font-black leading-[1.1] tracking-[-0.03em] mb-6 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The EchoHub Blog
          </h1>

          <p className="text-xl text-[var(--color-muted-ink)] max-w-3xl mx-auto leading-relaxed">
            Learn how to work smarter, stay organized, and grow your freelance
            business.
          </p>
        </div>
      </div>
    </section>
  );
}
