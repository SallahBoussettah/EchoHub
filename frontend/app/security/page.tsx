import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { Shield, Lock, Key, Eye, Server, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-4xl font-black text-[var(--color-ink)]">
              Security Practices
            </h1>
          </div>

          <p className="text-lg text-[var(--color-muted-ink)] mb-12">
            Your data security is our top priority. Here's how we protect your
            information.
          </p>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-[var(--color-accent)]" />
                <h2 className="text-2xl font-bold text-[var(--color-ink)]">
                  Encryption
                </h2>
              </div>
              <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
                <ul className="space-y-3">
                  {[
                    "All data encrypted in transit using TLS 1.3",
                    "Data encrypted at rest using AES-256",
                    "End-to-end encryption for sensitive information",
                    "Secure key management practices",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span className="text-[var(--color-muted-ink)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-6 h-6 text-[var(--color-accent)]" />
                <h2 className="text-2xl font-bold text-[var(--color-ink)]">
                  Authentication
                </h2>
              </div>
              <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
                <ul className="space-y-3">
                  {[
                    "Secure password hashing with bcrypt",
                    "Two-factor authentication (2FA) available",
                    "OAuth integration with Google",
                    "Session management and automatic logout",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span className="text-[var(--color-muted-ink)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-[var(--color-accent)]" />
                <h2 className="text-2xl font-bold text-[var(--color-ink)]">
                  Infrastructure
                </h2>
              </div>
              <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
                <ul className="space-y-3">
                  {[
                    "Hosted on secure cloud infrastructure (Vercel)",
                    "Regular security audits and penetration testing",
                    "Automated backups and disaster recovery",
                    "DDoS protection and rate limiting",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span className="text-[var(--color-muted-ink)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-[var(--color-accent)]" />
                <h2 className="text-2xl font-bold text-[var(--color-ink)]">
                  Privacy & Compliance
                </h2>
              </div>
              <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
                <ul className="space-y-3">
                  {[
                    "GDPR compliant data processing",
                    "No data sharing with third parties",
                    "AI models not trained on your data",
                    "Right to data deletion and export",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span className="text-[var(--color-muted-ink)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="p-6 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
              <h3 className="font-semibold text-[var(--color-ink)] mb-2">
                Report a Security Issue
              </h3>
              <p className="text-[var(--color-muted-ink)] mb-3">
                If you discover a security vulnerability, please report it to us
                immediately.
              </p>
              <a
                href="mailto:security@echohub.com"
                className="text-[var(--color-accent)] hover:underline font-semibold"
              >
                security@echohub.com
              </a>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
