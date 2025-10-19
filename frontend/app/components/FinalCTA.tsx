"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import { X } from "lucide-react";

export default function FinalCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) {
      setVisible(true);
      return;
    }

    const trigger = ScrollTrigger.create({
      start: "50% top",
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!barRef.current || prefersReducedMotion()) return;

    if (visible) {
      gsap.fromTo(
        barRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [visible]);

  if (!visible || dismissed) return null;

  return (
    <div ref={barRef} className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-[var(--color-surface)] border-t border-[var(--color-line)] py-4 shadow-[var(--shadow-300)] backdrop-blur-xl relative">
        {/* Close button - Top right on mobile only */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors md:hidden"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[var(--color-muted-ink)]" />
        </button>

        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[var(--step-1)] font-semibold text-[var(--color-ink)]">
              Ready to organize your client chaos?
            </p>
            <p className="text-[var(--step-0)] text-[var(--color-muted-ink)]">
              Start free. No credit card required.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#signup"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--r-md)] bg-[var(--color-accent)] text-[var(--color-bg)] font-medium transition-all duration-200 hover:shadow-[var(--shadow-200)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-bright)]"
            >
              Get started
            </a>
            {/* Close button - Next to button on desktop */}
            <button
              onClick={() => setDismissed(true)}
              className="hidden md:block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-[var(--color-muted-ink)]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
