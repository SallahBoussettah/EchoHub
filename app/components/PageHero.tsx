"use client";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import { LucideIcon } from "lucide-react";

interface PageHeroProps {
  badge?: {
    icon: LucideIcon;
    text: string;
  };
  title: string;
  titleAccent?: string;
  subtitle: string;
  children?: ReactNode;
}

export default function PageHero({
  badge,
  title,
  titleAccent,
  subtitle,
  children,
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".page-hero-content",
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
        <div className="page-hero-content text-center">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] mb-8">
              <badge.icon className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-sm font-semibold text-[var(--color-ink)]">
                {badge.text}
              </span>
            </div>
          )}

          <h1
            className="text-6xl md:text-7xl font-black leading-[1.1] tracking-[-0.03em] mb-6 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-[var(--color-muted-ink)]">
                  {titleAccent}
                </span>
              </>
            )}
          </h1>

          <p className="text-xl text-[var(--color-muted-ink)] max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
