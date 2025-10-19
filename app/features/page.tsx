"use client";
import { useEffect, useRef } from "react";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";
import { gsap } from "@/app/lib/gsapClient";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";
import {
  Sparkles,
  Users,
  FileText,
  Calendar,
  Mail,
  BarChart3,
  Search,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function FeaturesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".features-hero-content",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );

        gsap.fromTo(
          ".feature-card",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Users,
      title: "Client Hubs",
      description:
        "Dedicated spaces for each client with timelines, notes, and shared files. Everything about a client in one organized place.",
      benefits: [
        "Centralized client information",
        "Project timeline tracking",
        "File attachments and notes",
        "Activity history log",
      ],
      color: "var(--color-accent)",
    },
    {
      icon: Sparkles,
      title: "AI Summaries",
      description:
        "Instantly summarize conversations, feedback threads, and project notes. Get clarity in seconds, not hours.",
      benefits: [
        "3-second summary generation",
        "Context-aware insights",
        "Multi-language support",
        "Smart bullet points",
      ],
      color: "var(--color-accent-bright)",
    },
    {
      icon: FileText,
      title: "Project Management",
      description:
        "Track deliverables with simple, focused project tools. No complexity, just what freelancers actually need.",
      benefits: [
        "Milestone checklists",
        "Deadline tracking",
        "Status management",
        "Rich text notes",
      ],
      color: "var(--color-accent)",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description:
        "Find anything instantly across all clients, projects, and notes. Never lose track of important information again.",
      benefits: [
        "Full-text search",
        "Instant results",
        "Filter by client or project",
        "Search history",
      ],
      color: "var(--color-accent-bright)",
    },
    {
      icon: Mail,
      title: "Smart Notifications",
      description:
        "Stay on top of deadlines without the noise. Get timely reminders that actually help, not distract.",
      benefits: [
        "Deadline reminders",
        "Weekly summaries",
        "Overdue alerts",
        "Customizable preferences",
      ],
      color: "var(--color-accent)",
    },
    {
      icon: BarChart3,
      title: "Dashboard Overview",
      description:
        "See what matters at a glance. Active clients, upcoming deadlines, and recent activity in one clean view.",
      benefits: [
        "Quick stats overview",
        "Upcoming deadlines",
        "Activity feed",
        "Client status cards",
      ],
      color: "var(--color-accent-bright)",
    },
  ];

  const comparisonData = [
    {
      feature: "Client organization",
      scattered: "Spreadsheets + folders",
      echohub: "Dedicated Client Hubs",
    },
    {
      feature: "Project tracking",
      scattered: "Trello + Notion + emails",
      echohub: "Unified timeline view",
    },
    {
      feature: "Communication",
      scattered: "Gmail + Slack + texts",
      echohub: "Centralized inbox (coming soon)",
    },
    {
      feature: "AI assistance",
      scattered: "Manual summaries",
      echohub: "Instant AI summaries",
    },
    {
      feature: "File management",
      scattered: "Google Drive + Dropbox",
      echohub: "Attached to clients/projects",
    },
    {
      feature: "Search",
      scattered: "Search each tool separately",
      echohub: "Search everything at once",
    },
  ];

  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="features-hero-content text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] mb-8">
              <Zap className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-sm font-semibold text-[var(--color-ink)]">
                Everything you need
              </span>
            </div>

            <h1
              className="text-6xl md:text-7xl font-black leading-[1.1] tracking-[-0.03em] mb-6 text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for freelancers
              <br />
              <span className="text-[var(--color-muted-ink)]">
                who value clarity
              </span>
            </h1>

            <p className="text-xl text-[var(--color-muted-ink)] max-w-3xl mx-auto leading-relaxed">
              Stop juggling tools. EchoHub brings clients, projects, and
              communications into one calm, organized workspace with AI-powered
              insights.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group relative rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:shadow-2xl hover:border-[var(--color-accent)] transition-all duration-500 cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon
                    className="w-7 h-7 text-white"
                    strokeWidth={2.5}
                  />
                </div>

                <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
                  {feature.title}
                </h3>

                <p className="text-[var(--color-muted-ink)] mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-[var(--color-muted-ink)]"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0"
                        strokeWidth={2.5}
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-[var(--color-muted)]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              One tool vs scattered chaos
            </h2>
            <p className="text-lg text-[var(--color-muted-ink)]">
              See how EchoHub compares to juggling multiple tools
            </p>
          </div>

          <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-line)] overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-[var(--color-line)] bg-[var(--color-bg)]">
              <div className="font-semibold text-[var(--color-ink)]">
                Feature
              </div>
              <div className="font-semibold text-[var(--color-muted-ink)] text-center">
                Scattered Tools
              </div>
              <div className="font-semibold text-[var(--color-accent)] text-center">
                EchoHub
              </div>
            </div>

            {comparisonData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-6 border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-muted)] transition-colors"
              >
                <div className="font-medium text-[var(--color-ink)]">
                  {row.feature}
                </div>
                <div className="text-sm text-[var(--color-muted-ink)] text-center">
                  {row.scattered}
                </div>
                <div className="text-sm font-semibold text-[var(--color-ink)] text-center">
                  {row.echohub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-black mb-4 text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What's coming next
            </h2>
            <p className="text-lg text-[var(--color-muted-ink)]">
              We're constantly improving based on your feedback
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                title: "Email Integration",
                description:
                  "Connect Gmail and Outlook to centralize client communications",
                timeline: "Q2 2025",
              },
              {
                icon: FileText,
                title: "Proposal Generator",
                description:
                  "Create polished proposals from project briefs with AI assistance",
                timeline: "Q2 2025",
              },
              {
                icon: Calendar,
                title: "Calendar Sync",
                description:
                  "Integrate with Google Calendar and Outlook for smart scheduling",
                timeline: "Q3 2025",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-8 hover:border-[var(--color-accent)] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-muted)] flex items-center justify-center mb-4">
                  <item.icon
                    className="w-6 h-6 text-[var(--color-accent)]"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--color-muted-ink)] mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                  <Clock className="w-3 h-3 text-[var(--color-accent)]" />
                  <span className="text-xs font-semibold text-[var(--color-accent)]">
                    {item.timeline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FinalCTA />
    </main>
  );
}
