"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, User, Search, Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useCartStore } from "@/lib/store/cart-store"
import { CartDrawer } from "@/components/cart/cart-drawer"

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/quiz", label: "Discover Your Aura" },
  { href: "/gift-curator", label: "Gift Curator" },
  { href: "/about", label: "About" },
]

export default function Navigation() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  return (
    <>
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-allure-obsidian/60 backdrop-blur-sm z-50 md:hidden"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-allure-cream shadow-2xl z-50 md:hidden flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-allure-taupe/30">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <h2 className="text-2xl font-serif font-light tracking-wider">ALLURE</h2>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-allure-taupe/20 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 py-8 px-6">
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-lg font-serif border-b border-allure-taupe/20 hover:text-allure-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-allure-taupe/30 space-y-4">
              <Link
                href="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-sm text-allure-charcoal/70 hover:text-allure-gold transition-colors"
              >
                <Heart className="h-5 w-5" />
                Wishlist
              </Link>
              <p className="text-xs text-allure-charcoal/50 editorial-spacing">
                Where luxury meets ritual.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full luxury-border border-t-0 border-l-0 border-r-0 bg-allure-cream/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>

          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-2xl lg:text-3xl font-serif font-light tracking-wider text-allure-obsidian transition-colors group-hover:text-allure-gold">
              ALLURE
            </h1>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-10 editorial-spacing">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest hover:text-allure-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full hidden sm:inline-flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hidden sm:inline-flex" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hidden sm:inline-flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {isMounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-allure-gold text-[10px] font-medium text-white flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Shopping bag</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
    </>
  )
}
