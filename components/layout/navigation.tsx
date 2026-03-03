"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, User, Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useCartStore } from "@/lib/store/cart-store"
import { CartDrawer } from "@/components/cart/cart-drawer"

export default function Navigation() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full luxury-border border-t-0 border-l-0 border-r-0 bg-allure-cream/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-2xl lg:text-3xl font-serif font-light tracking-wider text-allure-obsidian transition-colors group-hover:text-allure-gold">
              ALLURE
            </h1>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-10 editorial-spacing">
            <Link 
              href="/shop" 
              className="text-sm uppercase tracking-widest hover:text-allure-gold transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/quiz" 
              className="text-sm uppercase tracking-widest hover:text-allure-gold transition-colors"
            >
              Discover Your Ritual
            </Link>
            <Link 
              href="/gift-curator" 
              className="text-sm uppercase tracking-widest hover:text-allure-gold transition-colors"
            >
              Gift Curator
            </Link>
            <Link 
              href="/about" 
              className="text-sm uppercase tracking-widest hover:text-allure-gold transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
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
