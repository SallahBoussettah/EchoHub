import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-muted)] border border-[var(--color-line)] p-12 text-center">
          <h2
            className="text-4xl md:text-5xl font-black mb-6 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join us on this journey
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)] mb-8 max-w-2xl mx-auto">
            We're just getting started. Help us build the best workspace for
            freelancers by trying EchoHub and sharing your feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg"
            >
              <span>Start free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] font-semibold hover:shadow-xl hover:border-[var(--color-accent)] transition-all"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
