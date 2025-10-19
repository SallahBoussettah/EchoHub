import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--color-ink)]">
              EchoHub
            </h3>
            <p className="text-sm text-[var(--color-muted-ink)]">
              One calm place for all your client chaos.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-[var(--color-ink)]">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-muted-ink)]">
              <li>
                <Link
                  href="/features"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#demo"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-[var(--color-ink)]">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-muted-ink)]">
              <li>
                <Link
                  href="/about"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-[var(--color-ink)]">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-muted-ink)]">
              <li>
                <Link
                  href="/privacy"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-line)] text-center text-sm text-[var(--color-muted-ink)]">
          <p>&copy; 2025 EchoHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
