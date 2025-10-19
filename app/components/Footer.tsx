export default function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--color-line)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-[var(--step-1)] font-bold mb-4">EchoHub</h3>
            <p className="text-[var(--step-0)] text-[var(--color-muted-ink)]">
              One calm place for all your client chaos.
            </p>
          </div>

          <div>
            <h4 className="text-[var(--step-0)] font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-[var(--step-0)] text-[var(--color-muted-ink)]">
              <li>
                <a href="#features" className="link-underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="link-underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#demo" className="link-underline">
                  Demo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--step-0)] font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-[var(--step-0)] text-[var(--color-muted-ink)]">
              <li>
                <a href="#about" className="link-underline">
                  About
                </a>
              </li>
              <li>
                <a href="#blog" className="link-underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="link-underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--step-0)] font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-[var(--step-0)] text-[var(--color-muted-ink)]">
              <li>
                <a href="#privacy" className="link-underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className="link-underline">
                  Terms
                </a>
              </li>
              <li>
                <a href="#security" className="link-underline">
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
