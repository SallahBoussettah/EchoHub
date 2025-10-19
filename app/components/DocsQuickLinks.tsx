import { Video, MessageCircle, Mail, Github } from "lucide-react";

const quickLinks = [
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Watch step-by-step guides",
    link: "#",
    linkText: "Watch now",
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "Ask questions and share tips",
    link: "#",
    linkText: "Join discussion",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help from our team",
    link: "mailto:support@echohub.com",
    linkText: "Contact support",
  },
  {
    icon: Github,
    title: "API Documentation",
    description: "Build integrations with EchoHub",
    link: "#",
    linkText: "View API docs",
  },
];

export default function DocsQuickLinks() {
  return (
    <section className="py-20 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Need more help?
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Additional resources to support your journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-500 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--color-accent)] transition-colors">
                <link.icon
                  className="w-6 h-6 text-[var(--color-accent)] group-hover:text-white transition-colors"
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2">
                {link.title}
              </h3>
              <p className="text-sm text-[var(--color-muted-ink)] mb-3">
                {link.description}
              </p>
              <span className="text-[var(--color-accent)] font-semibold text-sm group-hover:underline">
                {link.linkText} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
