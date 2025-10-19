import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    category: "Tips",
    title: "5 Ways Freelancers Lose Money to Disorganization",
    excerpt:
      "Discover the hidden costs of scattered tools and learn how to reclaim your time and revenue.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    slug: "5-ways-freelancers-lose-money",
  },
  {
    category: "Tutorial",
    title: "How to Use AI to Summarize Client Feedback",
    excerpt:
      "A step-by-step guide to using EchoHub's AI summaries to extract actionable insights from client conversations.",
    date: "Jan 12, 2025",
    readTime: "7 min read",
    slug: "ai-summarize-client-feedback",
  },
  {
    category: "Case Study",
    title: "How Sarah Saved 10 Hours Per Week with EchoHub",
    excerpt:
      "A freelance designer shares how she went from chaos to clarity by centralizing her client work.",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    slug: "sarah-case-study",
  },
  {
    category: "Tips",
    title: "The Ultimate Client Onboarding Checklist",
    excerpt:
      "Everything you need to collect from new clients to set projects up for success from day one.",
    date: "Jan 8, 2025",
    readTime: "4 min read",
    slug: "client-onboarding-checklist",
  },
  {
    category: "Updates",
    title: "Introducing AI Summaries: Your New Superpower",
    excerpt:
      "We're excited to announce our most requested feature: AI-powered project summaries that save you hours.",
    date: "Jan 5, 2025",
    readTime: "3 min read",
    slug: "introducing-ai-summaries",
  },
  {
    category: "Tutorial",
    title: "Setting Up Your First Client Hub in 5 Minutes",
    excerpt:
      "A quick walkthrough of creating your first client hub and organizing all your project information.",
    date: "Jan 3, 2025",
    readTime: "5 min read",
    slug: "first-client-hub-setup",
  },
];

const categories = ["All", "Tips", "Updates", "Case Studies", "Tutorials"];

export default function BlogGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                index === 0
                  ? "bg-[var(--color-accent)] text-white shadow-lg"
                  : "bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] overflow-hidden hover:border-[var(--color-accent)] hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Placeholder Image */}
              <div className="h-48 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-bright)]/20 flex items-center justify-center">
                <span className="text-6xl opacity-20">📝</span>
              </div>

              <div className="p-6">
                <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 mb-4">
                  <span className="text-xs font-semibold text-[var(--color-accent)]">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h3>

                <p className="text-[var(--color-muted-ink)] mb-4 leading-relaxed text-sm">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-[var(--color-muted-ink)]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--color-accent)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
