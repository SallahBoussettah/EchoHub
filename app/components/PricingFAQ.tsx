import { HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
  },
  {
    question: "What happens when I hit my AI summary limit?",
    answer:
      "You'll receive a notification when you're close to your limit. On the Free plan, you'll need to wait until next month or upgrade. Pro users get 100 summaries/month.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer:
      "Yes! Pro comes with a 14-day free trial. No credit card required. You can cancel anytime during the trial.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. Annual plans can also be paid via invoice.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund you in full.",
  },
  {
    question: "Do you offer discounts for students or nonprofits?",
    answer:
      "Yes! We offer 50% off Pro plans for students and registered nonprofits. Contact us with proof of eligibility.",
  },
];

export default function PricingFAQ() {
  return (
    <section className="py-20 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently asked questions
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Everything you need to know about pricing
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] overflow-hidden hover:border-[var(--color-accent)] transition-all"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-semibold text-[var(--color-ink)] pr-4">
                  {faq.question}
                </span>
                <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[var(--color-muted-ink)] leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--color-muted-ink)] mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold hover:underline"
          >
            Contact our team
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
