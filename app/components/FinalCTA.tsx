"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";

export default function FinalCTA() {
  const [visible, setVisible] = useState(false);
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

  if (!visible) return null;

  return (
    <div ref={barRef} className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-[var(--color-ink)] text-[var(--color-bg)] py-4 shadow-[var(--shadow-300)]">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[var(--step-1)] font-semibold">
              Ready to organize your client chaos?
            </p>
            <p className="text-[var(--step-0)] opacity-80">
              Start free. No credit card required.
            </p>
          </div>
          <a
            href="#signup"
            className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--r-md)] bg-white text-[var(--color-ink)] font-medium transition-all duration-200 hover:shadow-[var(--shadow-200)] hover:-translate-y-0.5"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}
