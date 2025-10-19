import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { FileCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="relative bg-[var(--color-bg)] min-h-screen">
      <PublicNavbar />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-4xl font-black text-[var(--color-ink)]">
              Terms of Service
            </h1>
          </div>

          <p className="text-sm text-[var(--color-muted-ink)] mb-12">
            Last updated: January 2025
          </p>

          <div className="space-y-8 text-[var(--color-muted-ink)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using EchoHub, you accept and agree to be bound
                by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                2. Use License
              </h2>
              <p className="mb-4">
                Permission is granted to temporarily use EchoHub for personal or
                commercial purposes. This is the grant of a license, not a
                transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose without proper
                  licensing
                </li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained on EchoHub
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                3. User Accounts
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your
                account and password. You agree to accept responsibility for all
                activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                4. Payment Terms
              </h2>
              <p className="mb-4">For paid subscriptions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Billing occurs on a monthly or annual basis</li>
                <li>You can cancel your subscription at any time</li>
                <li>Refunds are provided within 30 days of purchase</li>
                <li>Prices are subject to change with notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                5. Limitation of Liability
              </h2>
              <p>
                EchoHub shall not be liable for any damages arising out of the
                use or inability to use the service, even if EchoHub has been
                notified of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">
                6. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:legal@echohub.com"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  legal@echohub.com
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
