import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="luxury-border border-b-0 border-l-0 border-r-0 bg-allure-cream mt-32">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Brand */}
        <div className="text-center mb-12">
          <h2 className="font-serif font-light tracking-wider mb-3">
            <span className="text-4xl italic">Allure</span>
            <br />
            <span className="text-xs uppercase tracking-[0.4em] text-allure-charcoal/60">Beauty Atelier</span>
          </h2>
          <div className="w-12 h-[1px] bg-allure-gold/40 mx-auto mt-4" />
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center">
          {/* Shop */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-allure-charcoal/70">
              <li>
                <Link href="/shop/fragrance" className="hover:text-allure-gold transition-colors">
                  Fragrance
                </Link>
              </li>
              <li>
                <Link href="/shop/bodycare" className="hover:text-allure-gold transition-colors">
                  Body Care
                </Link>
              </li>
              <li>
                <Link href="/shop/collections" className="hover:text-allure-gold transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">Experience</h3>
            <ul className="space-y-2 text-sm text-allure-charcoal/70">
              <li>
                <Link href="/quiz" className="hover:text-allure-gold transition-colors">
                  Personality Quiz
                </Link>
              </li>
              <li>
                <Link href="/gift-curator" className="hover:text-allure-gold transition-colors">
                  Gift Curator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-allure-charcoal/70">
              <li>
                <Link href="/about" className="hover:text-allure-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-allure-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-allure-charcoal/70">
              <li>
                <Link href="/shipping" className="hover:text-allure-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-allure-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-allure-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-allure-taupe/30 text-center">
          <p className="text-xs text-allure-charcoal/50">
            © {currentYear} Allure Beauty Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
