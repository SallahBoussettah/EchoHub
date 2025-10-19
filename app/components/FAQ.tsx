"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does the AI summarization work?",
    a: "EchoHub uses Claude Sonnet 4.5 to analyze your client conversations, notes, and feedback threads, then generates concise summaries highlighting key decisions, action items, and next steps.",
  },
  {
    q: "Can I import my existing client data?",
    a: "Yes! You can import clients from CSV files, connect your Gmail/Outlook for automatic email sync, and integrate with tools like Notion and Trello.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use end-to-end encryption, SOC 2 compliance, and never train AI models on your data. Your client information stays private.",
  },
  {
    q: "What happens after the free trial?",
    a: "Your Pro trial lasts 14 days with full access. After that, you can continue with the free plan (1 client hub) or upgrade to Pro/Team.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel anytime with no penalties. Your data remains accessible for 30 days after cancellation.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund you in full.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.97_0.01_95)]/50 to-transparent" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[var(--color-line)] mb-6">
            <span className="text-sm font-medium text-[var(--color-accent-ink)]">
              FAQ
            </span>
          </div>
          <h2
            className="font-bold mb-6 bg-gradient-to-br from-[var(--color-ink)] to-[oklch(0.4_0.05_265)] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontFamily: "var(--font-display)",
              lineHeight: "1.1",
            }}
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[var(--color-line)] overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-[var(--color-muted)]/50 transition-colors"
                aria-expanded={open === i}
              >
                <span
                  className="font-semibold pr-4"
                  style={{ fontSize: "var(--step-1)" }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div
                  className="px-6 pb-6 text-[var(--color-muted-ink)] leading-relaxed"
                  style={{ fontSize: "var(--step-0)" }}
                >
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
