"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Toast } from "@/components/ui/toast"
import { useWishlistStore } from "@/lib/store/wishlist-store"
import { useCartStore } from "@/lib/store/cart-store"
import { formatCurrency } from "@/lib/utils"

export default function WishlistPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  
  const { items, removeItem } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleAddToCart = (product: any) => {
    addToCart(product)
    setToastMessage(`${product.name} added to cart`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleRemove = (productId: string) => {
    removeItem(productId)
    setToastMessage('Removed from wishlist')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const getImageUrl = (product: any) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return typeof product.images[0] === 'string' 
        ? product.images[0] 
        : product.images[0].url
    }
    return 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800&q=80'
  }

  if (!isMounted) {
    return null
  }

  return (
    <>
    <Toast 
      message={toastMessage}
      isVisible={showToast}
      onClose={() => setShowToast(false)}
    />
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">
            Your Wishlist
          </h1>
          <p className="text-allure-charcoal/70">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Wishlist Items */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Heart className="h-16 w-16 text-allure-charcoal/30 mx-auto mb-4" />
            <h2 className="text-2xl font-serif mb-4">Your wishlist is empty</h2>
            <p className="text-allure-charcoal/70 mb-8">
              Start adding your favorite products
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">
                Browse Products
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Product Image */}
                <div className="relative">
                  <Link href={`/shop/${product.slug}`}>
                    <div className="aspect-[3/4] luxury-border overflow-hidden mb-4 bg-allure-cream/50">
                      <div 
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${getImageUrl(product)}')` }}
                      />
                    </div>
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="h-4 w-4 text-allure-charcoal hover:text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  {product.brand && (
                    <p className="text-xs uppercase tracking-widest text-allure-charcoal/60">
                      {product.brand}
                    </p>
                  )}

                  <Link href={`/shop/${product.slug}`}>
                    <h3 className="text-xl font-serif hover:text-allure-gold transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {product.short_description && (
                    <p className="text-sm text-allure-charcoal/70 editorial-spacing line-clamp-2">
                      {product.short_description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-lg font-medium">
                      {formatCurrency(product.price)}
                    </span>
                    {product.compare_at_price && product.compare_at_price > product.price && (
                      <span className="text-sm text-allure-charcoal/50 line-through">
                        {formatCurrency(product.compare_at_price)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <Button
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity === 0}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
