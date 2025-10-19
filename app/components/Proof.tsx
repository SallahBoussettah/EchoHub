"use client";
import { useState } from "react";

const testimonials = [
  { company: "Studio A", quote: "Cut my admin time in half." },
  { company: "Agency B", quote: "Finally, one place for everything." },
  { company: "Freelancer C", quote: "The AI summaries are a game-changer." },
  { company: "Team D", quote: "Best tool for client management." },
  { company: "Creator E", quote: "Simple, elegant, and powerful." },
  { company: "Consultant F", quote: "Saves me hours every week." },
];

export default function Proof() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2
          className="font-bold mb-12 text-center"
          style={{
            fontSize: "var(--step-4)",
            fontFamily: "var(--font-display)",
          }}
        >
          Trusted by freelancers and creators
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              className="card p-6 h-24 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-200)] cursor-pointer"
            >
              {selected === i ? (
                <p className="text-[var(--step--1)] text-center italic text-[var(--color-muted-ink)]">
                  "{item.quote}"
                </p>
              ) : (
                <span className="text-[var(--step-0)] font-semibold text-[var(--color-muted-ink)]">
                  {item.company}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
