"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: reduced ? "none" : "power2.out" },
      });

      tl.from(".h-head", {
        y: reduced ? 4 : 24,
        opacity: 0,
        duration: reduced ? 0.01 : 0.6,
      })
        .from(
          ".h-sub",
          {
            y: reduced ? 2 : 16,
            opacity: 0,
            duration: reduced ? 0.01 : 0.5,
          },
          "-=0.3"
        )
        .from(
          ".h-cta",
          {
            opacity: 0,
            duration: reduced ? 0.01 : 0.4,
          },
          "-=0.2"
        );

      if (!reduced) {
        gsap.utils.toArray(".strip-item").forEach((el, i) => {
          gsap.to(el as Element, {
            xPercent: (i % 2 === 0 ? -1 : 1) * 12,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=60% top",
              scrub: true,
            },
          });
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-28 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1
          className="h-head leading-[1.05] tracking-[-0.02em] max-w-3xl font-bold"
          style={{
            fontSize: "var(--step-6)",
            fontFamily: "var(--font-display)",
          }}
        >
          One calm place for all your client chaos.
        </h1>
        <p
          className="h-sub mt-5 max-w-2xl opacity-80"
          style={{ fontSize: "var(--step-2)" }}
        >
          EchoHub unifies clients, projects, proposals, and comms — with AI
          summaries and a smart scheduler.
        </p>
        <div className="h-cta mt-8 flex gap-3 flex-wrap">
          <a className="btn-primary" href="#signup">
            Start free
          </a>
          <a className="btn-ghost" href="#demo">
            See a live demo
          </a>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-6 max-w-7xl mx-auto">
        {[
          "Client Hub",
          "Timeline",
          "AI Summary",
          "Proposals",
          "Scheduler",
          "Dashboard",
        ].map((label, i) => (
          <div
            key={i}
            className="strip-item card h-40 flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-white to-[var(--color-muted)]"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-ink)] opacity-20"></div>
            <span className="text-[var(--step-0)] font-semibold text-center">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
