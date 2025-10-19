"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";

const rawText = `Client called at 2pm. Wants to add a new feature to the dashboard. 
Mentioned budget concerns but willing to discuss. Follow up next week about timeline. 
Also asked about mobile app - not urgent but interested for Q2.`;

const summaryText = `🎯 Action Items:
• Schedule follow-up call next week re: dashboard feature
• Prepare budget proposal for new feature
• Q2 mobile app discussion (low priority)

💰 Budget: Concerns raised, open to negotiation`;

export default function SummaryReveal() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="card p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--color-accent-ink)]" />
          <h3 className="text-[var(--step-2)] font-semibold">AI Summary</h3>
        </div>
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="text-[var(--step-0)] text-[var(--color-accent-ink)] font-medium hover:underline"
        >
          {showSummary ? "Show raw" : "Summarize"}
        </button>
      </div>

      <div className="p-4 rounded-[var(--r-md)] bg-[var(--color-muted)] min-h-[160px] transition-all">
        {showSummary ? (
          <div className="text-[var(--step-0)] whitespace-pre-line">
            {summaryText}
          </div>
        ) : (
          <p className="text-[var(--step-0)] text-[var(--color-muted-ink)]">
            {rawText}
          </p>
        )}
      </div>
    </div>
  );
}
