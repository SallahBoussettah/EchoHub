import { Target, Users, Zap, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Focus on what matters",
    description:
      "We build features that solve real problems, not features for the sake of features. Every addition must earn its place.",
  },
  {
    icon: Users,
    title: "Built with freelancers",
    description:
      "We're not guessing what freelancers need. We are freelancers. We build in public and listen to our community.",
  },
  {
    icon: Zap,
    title: "Speed and simplicity",
    description:
      "Complexity is easy. Simplicity is hard. We obsess over making EchoHub fast, intuitive, and delightful to use.",
  },
  {
    icon: Shield,
    title: "Privacy first",
    description:
      "Your client data is sacred. We never train AI models on your data, never sell it, and encrypt everything.",
  },
];

export default function AboutValues() {
  return (
    <section className="py-20 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Values
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)]">
            The principles that guide everything we build
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center mb-6">
                <value.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
                {value.title}
              </h3>
              <p className="text-[var(--color-muted-ink)] leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
