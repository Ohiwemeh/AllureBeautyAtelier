import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="luxury-border border-b-0 border-l-0 border-r-0 bg-allure-cream mt-32">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif font-light tracking-wider mb-4">
              ALLURE
            </h2>
            <p className="text-sm text-allure-charcoal/70 editorial-spacing max-w-md">
              A Nigerian beauty and personal care brand specialising in fragrances and body care 
              essentials. Luxury personal care, accessible without compromise. Beauty, thoughtfully curated.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-medium mb-4">
              Shop
            </h3>
            <ul className="space-y-3 text-sm text-allure-charcoal/70">
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
            <h3 className="text-sm uppercase tracking-widest font-medium mb-4">
              Experience
            </h3>
            <ul className="space-y-3 text-sm text-allure-charcoal/70">
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
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-allure-taupe/30 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-allure-charcoal/60 editorial-spacing">
            © {currentYear} Allure Beauty Atelier. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-allure-charcoal/60">
            <Link href="/privacy" className="hover:text-allure-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-allure-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-allure-gold transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
