"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Plus, X, ArrowRight, ShoppingBag, Heart, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Toast } from "@/components/ui/toast"
import { AuthGateModal } from "@/components/auth/auth-gate-modal"
import { useCartStore } from "@/lib/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/types/product"
import { createStaticClient } from "@/lib/supabase/static"
import { createClient } from "@/lib/supabase/client"

const MAX_SLOTS = 4

interface GiftBoxSlot {
  product: Product | null
}

export default function GiftCuratorPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [slots, setSlots] = useState<GiftBoxSlot[]>(
    Array.from({ length: MAX_SLOTS }, () => ({ product: null }))
  )
  const [giftNote, setGiftNote] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const addToCart = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function loadProducts() {
      const supabase = createStaticClient()
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (data) {
        setProducts(data as Product[])
      }
      setIsLoading(false)
    }
    loadProducts()
  }, [])

  const filledSlots = slots.filter((s) => s.product !== null)
  const totalPrice = filledSlots.reduce(
    (sum, s) => sum + (s.product?.price || 0),
    0
  )

  const addToSlot = (product: Product) => {
    const alreadyAdded = slots.some((s) => s.product?.id === product.id)
    if (alreadyAdded) {
      setToastMessage("This product is already in your gift box")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    const emptyIndex = slots.findIndex((s) => s.product === null)
    if (emptyIndex === -1) {
      setToastMessage("Gift box is full! Remove a product first.")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    const newSlots = [...slots]
    newSlots[emptyIndex] = { product }
    setSlots(newSlots)
    setToastMessage(`${product.name} added to gift box`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const removeFromSlot = (index: number) => {
    const newSlots = [...slots]
    newSlots[index] = { product: null }
    setSlots(newSlots)
  }

  const handleAddAllToCart = () => {
    filledSlots.forEach((slot) => {
      if (slot.product) addToCart(slot.product)
    })
    setToastMessage(`${filledSlots.length} items added to cart`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSaveGift = async () => {
    if (filledSlots.length === 0) return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setShowAuthModal(true)
      return
    }

    setIsSaving(true)
    try {
      const shareToken = crypto.randomUUID().slice(0, 8)

      const { data: giftBox, error: boxError } = await supabase
        .from('gift_boxes')
        .insert({
          user_id: user.id,
          title: `Gift Box — ${new Date().toLocaleDateString()}`,
          gift_note: giftNote || null,
          share_token: shareToken,
        })
        .select()
        .single()

      if (boxError || !giftBox) throw boxError

      const items = filledSlots.map((slot, index) => ({
        gift_box_id: giftBox.id,
        product_id: slot.product!.id,
        position: index,
        quantity: 1,
        product_snapshot: {
          name: slot.product!.name,
          price: slot.product!.price,
          image: getImageUrl(slot.product!),
        },
      }))

      const { error: itemsError } = await supabase
        .from('gift_box_items')
        .insert(items)

      if (itemsError) throw itemsError

      setToastMessage('Gift box saved to your account!')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      console.error('Error saving gift:', error)
      setToastMessage('Failed to save gift box. Please try again.')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const getImageUrl = (product: Product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return typeof product.images[0] === "string"
        ? product.images[0]
        : product.images[0].url
    }
    return "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&q=80"
  }

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="min-h-screen">
        {/* Header */}
        <section className="py-20 bg-allure-taupe/10">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-allure-gold/10 mb-6">
                <Gift className="h-8 w-8 text-allure-gold" />
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-light mb-6">
                Gift Curator
              </h1>
              <p className="text-lg text-allure-charcoal/80 editorial-spacing max-w-2xl mx-auto">
                Curate a personalized gift box with up to {MAX_SLOTS} products.
                Add a heartfelt note and share the luxury.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Builder */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Product List (left) */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-serif mb-6">
                 Curate Your Favourites {/* UPDATED TEXT */}
                </h2>

                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-3">
                        <div className="aspect-square bg-allure-taupe/20 luxury-border animate-pulse" />
                        <div className="h-4 bg-allure-taupe/20 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-allure-taupe/20 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-20 luxury-border">
                    <p className="text-allure-charcoal/70">
                      No products available yet. Check back soon!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => {
                      const isAdded = slots.some(
                        (s) => s.product?.id === product.id
                      )
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative aspect-square luxury-border overflow-hidden mb-3 bg-allure-cream/50">
                            <div
                              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                backgroundImage: `url('${getImageUrl(product)}')`,
                              }}
                            />
                            <button
                              onClick={() => addToSlot(product)}
                              disabled={isAdded}
                              className={`absolute bottom-3 right-3 p-2.5 rounded-full shadow-lg transition-all ${
                                isAdded
                                  ? "bg-allure-gold text-white cursor-default"
                                  : "bg-allure-cream text-allure-obsidian hover:bg-white opacity-0 group-hover:opacity-100"
                              }`}
                            >
                              {isAdded ? (
                                <Heart className="h-4 w-4 fill-current" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          <h3 className="text-sm font-serif truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm font-medium">
                            {formatCurrency(product.price)}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Gift Box (right) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-serif mb-6">Your Gift Box</h2>

                  {/* Slots */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {slots.map((slot, index) => (
                      <div
                        key={index}
                        className={`aspect-square luxury-border relative flex items-center justify-center transition-all ${
                          slot.product
                            ? "bg-allure-cream"
                            : "bg-allure-taupe/5 border-dashed"
                        }`}
                      >
                        {slot.product ? (
                          <>
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: `url('${getImageUrl(slot.product)}')`,
                              }}
                            />
                            <button
                              onClick={() => removeFromSlot(index)}
                              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors z-10"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 z-10">
                              <p className="text-xs font-medium truncate">
                                {slot.product.name}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="text-center">
                            <Plus className="h-6 w-6 text-allure-charcoal/30 mx-auto mb-1" />
                            <p className="text-xs text-allure-charcoal/40">
                              Slot {index + 1}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Gift Note */}
                  <div className="mb-6">
                    <label className="block text-sm mb-2">
                      Gift Note (optional)
                    </label>
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      rows={3}
                      placeholder="Add a personal message..."
                      className="flex w-full luxury-border bg-transparent px-4 py-3 text-sm transition-colors placeholder:text-allure-charcoal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allure-gold/50 resize-none"
                    />
                  </div>

                  {/* Summary */}
                  <div className="luxury-border p-4 mb-6 bg-allure-taupe/5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-allure-charcoal/70">
                        {filledSlots.length} of {MAX_SLOTS} items
                      </span>
                      <span className="font-medium">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-allure-taupe/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-allure-gold transition-all duration-300 rounded-full"
                        style={{
                          width: `${(filledSlots.length / MAX_SLOTS) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full"
                      disabled={filledSlots.length === 0}
                      onClick={handleAddAllToCart}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add Gift Box to Cart
                    </Button>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full"
                      disabled={filledSlots.length === 0 || isSaving}
                      onClick={handleSaveGift}
                    >
                      <Save className="mr-2 h-5 w-5" />
                      {isSaving ? 'Saving...' : 'Save Gift Box'}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/shop">
                        Browse More Products
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AuthGateModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Save your gift box"
        message="Sign in or create an account to save your curated gift box and access it anytime."
        returnTo="/gift-curator"
      />
    </>
  )
}
