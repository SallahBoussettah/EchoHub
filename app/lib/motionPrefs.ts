"use client";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getMotionConfig() {
  const reduced = prefersReducedMotion();
  return {
    reduced,
    duration: reduced ? 0.01 : 0.6,
    ease: reduced ? "none" : "power2.out",
  };
}
