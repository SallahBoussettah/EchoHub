"use client";
import { Mail, FileText, Trello, StickyNote, ArrowRight } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="font-bold mb-6"
              style={{
                fontSize: "var(--step-4)",
                fontFamily: "var(--font-display)",
              }}
            >
              Fragmentation hurts
            </h2>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Gmail for client emails" },
                { icon: Trello, label: "Trello for task tracking" },
                { icon: StickyNote, label: "Notion for notes" },
                { icon: FileText, label: "Google Docs for proposals" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-[var(--r-md)] border border-[var(--color-line)] bg-white/50 transition-all hover:bg-white hover:shadow-[var(--shadow-100)]"
                >
                  <item.icon className="w-6 h-6 text-[var(--color-muted-ink)]" />
                  <span className="text-[var(--step-1)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="font-bold mb-6"
              style={{
                fontSize: "var(--step-4)",
                fontFamily: "var(--font-display)",
              }}
            >
              EchoHub consolidates
            </h2>
            <div className="card p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-accent-ink)]" />
                  <span className="text-[var(--step-1)]">Client Hubs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-accent-ink)]" />
                  <span className="text-[var(--step-1)]">AI Summaries</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-accent-ink)]" />
                  <span className="text-[var(--step-1)]">Unified Inbox</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-accent-ink)]" />
                  <span className="text-[var(--step-1)]">Smart Scheduler</span>
                </div>
                <div className="pt-4 border-t border-[var(--color-line)]">
                  <ArrowRight className="w-6 h-6 text-[var(--color-accent-ink)]" />
                  <p className="mt-2 text-[var(--step-0)] text-[var(--color-muted-ink)]">
                    Everything in one calm workspace
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
