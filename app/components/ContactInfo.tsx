import { Mail, Clock, HelpCircle } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help from our team",
    info: "support@echohub.com",
    link: "mailto:support@echohub.com",
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "We typically respond within",
    info: "24 hours",
    link: null,
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Find quick answers",
    info: "Visit our FAQ",
    link: "/#faq",
  },
];

export default function ContactInfo() {
  return (
    <section className="py-20 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Other ways to reach us
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Choose the method that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-500 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-6">
                <method.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
                {method.title}
              </h3>
              <p className="text-sm text-[var(--color-muted-ink)] mb-3">
                {method.description}
              </p>
              {method.link ? (
                <a
                  href={method.link}
                  className="text-[var(--color-accent)] font-semibold hover:underline"
                >
                  {method.info}
                </a>
              ) : (
                <p className="text-[var(--color-accent)] font-semibold">
                  {method.info}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
