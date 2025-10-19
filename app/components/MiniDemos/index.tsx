import TimelineDemo from "./TimelineDemo";
import SummaryReveal from "./SummaryReveal";

export default function MiniDemos() {
  return (
    <section className="py-24 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: "var(--step-5)",
              fontFamily: "var(--font-display)",
            }}
          >
            See it in action
          </h2>
          <p
            style={{ fontSize: "var(--step-1)" }}
            className="text-[var(--color-muted-ink)] max-w-2xl mx-auto"
          >
            Interactive demos of EchoHub's core features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <TimelineDemo />
          <SummaryReveal />
        </div>
      </div>
    </section>
  );
}
