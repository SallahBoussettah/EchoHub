import { MessageCircle, Mail, Twitter, Github } from "lucide-react";

const communityLinks = [
  {
    icon: MessageCircle,
    title: "Discord Community",
    description: "Join 500+ freelancers sharing tips and feedback",
    link: "#",
    linkText: "Join Discord",
  },
  {
    icon: Twitter,
    title: "Follow on Twitter",
    description: "Product updates, tips, and behind-the-scenes",
    link: "#",
    linkText: "@echohub",
  },
  {
    icon: Github,
    title: "Open Roadmap",
    description: "Vote on features and track development progress",
    link: "#",
    linkText: "View Roadmap",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help from our team within 24 hours",
    link: "mailto:support@echohub.com",
    linkText: "support@echohub.com",
  },
];

export default function AboutCommunity() {
  return (
    <section className="py-20 bg-[var(--color-muted)]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join the community
          </h2>
          <p className="text-lg text-[var(--color-muted-ink)]">
            Connect with other freelancers and help shape EchoHub
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {communityLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                  <item.icon
                    className="w-6 h-6 text-[var(--color-accent)] group-hover:text-white transition-colors"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-muted-ink)] mb-3 text-sm">
                    {item.description}
                  </p>
                  <span className="text-[var(--color-accent)] font-semibold text-sm group-hover:underline">
                    {item.linkText} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
