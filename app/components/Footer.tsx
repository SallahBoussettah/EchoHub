export default function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-[var(--step-1)] font-bold mb-4 text-[var(--color-ink)]">
              EchoHub
            </h3>
            <p className="text-[var(--step-0)] text-[var(--color-muted-ink)]">
              One calm place for all your client chaos.
            </p>
          </div>

          <div>
            <h4 className="text-[var(--step-0)] font-semibold mb-3 text-[var(--color-ink)]">
              Product
            </h4>
            <ul className="space-y-2 text-[var(--step-0)] text-[var(--color-muted-ink)]">
              <li>
                <a
                  href="#features"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#demo"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Demo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--step-0)] font-semibold mb-3 text-[var(--color-ink)]">
              Company
            </h4>
            <ul className="space-y-2 text-[var(--step-0)] text-[var(--color-muted-ink)]">
              <li>
                <a
                  href="#about"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--step-0)] font-semibold mb-3 text-[var(--color-ink)]">
              Legal
            </h4>
            <ul className="space-y-2 text-[var(--step-0)] text-[var(--color-muted-ink)]">
              <li>
                <a
                  href="#privacy"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="link-underline hover:text-[var(--color-accent)] transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-line)] text-center text-[var(--step-0)] text-[var(--color-muted-ink)]">
          <p>&copy; 2025 EchoHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
