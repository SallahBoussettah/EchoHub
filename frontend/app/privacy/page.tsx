import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-4xl font-black text-[var(--color-ink)]">
              Privacy Policy
            </h1>
          </div>

          <p className="text-sm text-[var(--color-muted-ink)] mb-12">
            Last updated: January 2025
          </p>

          <div className="space-y-8 text-[var(--color-muted-ink)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We collect information that you provide directly to us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account information (name, email, password)</li>
                <li>Business profile information</li>
                <li>Client and project data you create</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Generate AI summaries and insights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                3. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal data against unauthorized or unlawful
                processing, accidental loss, destruction, or damage. All data is
                encrypted in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                4. AI and Data Processing
              </h2>
              <p>
                When you use our AI features, your data is processed by our AI
                provider (Anthropic Claude). We do not use your data to train AI
                models. All AI processing is done securely and your data is not
                shared with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                5. Your Rights
              </h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                6. GDPR Compliance
              </h2>
              <p>
                We are committed to GDPR compliance. If you are located in the
                European Economic Area, you have additional rights under GDPR
                including the right to data portability and the right to lodge a
                complaint with a supervisory authority.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                7. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:privacy@echohub.com"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  privacy@echohub.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
