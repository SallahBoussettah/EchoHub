import { Mail, ArrowRight } from "lucide-react";

export default function BlogNewsletter() {
  return (
    <section className="py-20 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-muted)] border border-[var(--color-line)] p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>

          <h2
            className="text-4xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Never miss an update
          </h2>

          <p className="text-lg text-[var(--color-muted-ink)] mb-8 max-w-2xl mx-auto">
            Get the latest tips, tutorials, and product updates delivered to
            your inbox every week.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] placeholder:text-[var(--color-muted-ink)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 transition-all shadow-lg whitespace-nowrap"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-xs text-[var(--color-muted-ink)] mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
