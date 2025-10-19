"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";

const milestones = [
  {
    date: "Jan 15",
    label: "Project kickoff",
    note: "Initial client meeting and requirements gathering",
  },
  {
    date: "Jan 22",
    label: "Design review",
    note: "Presented mockups and received feedback",
  },
  {
    date: "Feb 5",
    label: "Development start",
    note: "Backend API and database setup complete",
  },
  {
    date: "Feb 20",
    label: "Beta launch",
    note: "Deployed to staging for client testing",
  },
];

export default function TimelineDemo() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="card p-8">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-[var(--color-accent-ink)]" />
        <h3 className="text-[var(--step-2)] font-semibold">
          Client Hub Timeline
        </h3>
      </div>

      <div className="space-y-3">
        {milestones.map((milestone, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className="w-full text-left p-4 rounded-[var(--r-md)] border border-[var(--color-line)] transition-all hover:bg-[var(--color-muted)] hover:shadow-[var(--shadow-100)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--step-0)] font-semibold">
                {milestone.label}
              </span>
              <span className="text-[var(--step--1)] text-[var(--color-muted-ink)]">
                {milestone.date}
              </span>
            </div>
            {selected === i && (
              <p className="text-[var(--step-0)] text-[var(--color-muted-ink)] mt-2">
                {milestone.note}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
