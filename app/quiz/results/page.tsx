"use client"

import { Suspense, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { calculatePersonalityType, getPersonalityDescription, matchProducts } from "@/lib/utils/quiz-matcher"
import { createStaticClient } from "@/lib/supabase/static"
import type { QuizResponse } from "@/lib/types/quiz"
import type { Product } from "@/lib/types/product"

function ResultsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const responsesData = searchParams.get('data')
  const categoryParam = searchParams.get('category') as 'fragrance' | 'bodycare' || 'fragrance'
  const responses: QuizResponse[] = responsesData ? JSON.parse(decodeURIComponent(responsesData)) : []
  
  const personalityType = calculatePersonalityType(responses)
  const personality = getPersonalityDescription(personalityType)

  useEffect(() => {
    async function loadProducts() {
      const supabase = createStaticClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('category', categoryParam)

      if (data) {
        const matched = matchProducts(data as Product[], responses, personalityType)
        setProducts(matched.length > 0 ? matched : data.slice(0, 4) as Product[])
      }
      setIsLoading(false)
    }

    loadProducts()
  }, [responses, personalityType, categoryParam])

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-allure-gold/10 mb-6">
            <Sparkles className="h-10 w-10 text-allure-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">
            {personality.title}
          </h1>
          <p className="text-lg text-allure-charcoal/80 editorial-spacing">
            {personality.description}
          </p>
        </motion.div>

        {/* Personality Traits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="luxury-border p-8 mb-16 max-w-3xl mx-auto bg-allure-taupe/5"
        >
          <h2 className="text-2xl font-serif mb-6 text-center">Your Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {getPersonalityTraits(personalityType).map((trait, index) => (
              <div
                key={trait}
                className="text-center p-4 bg-white luxury-border"
              >
                <span className="text-sm uppercase tracking-wider text-allure-charcoal/70">
                  {trait}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Products */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
              Curated Just For You
            </h2>
            <p className="text-allure-charcoal/70 editorial-spacing">
              {categoryParam === 'fragrance' ? 'Fragrances' : 'Body care products'} that match your unique personality and preferences
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-allure-charcoal/60">Loading your recommendations...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-allure-charcoal/70 mb-6">
                We&rsquo;re still curating products for your profile. Check back soon!
              </p>
              <Button asChild>
                <Link href="/shop">Browse All Products</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" asChild>
            <Link href="/shop">
              Explore All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/quiz">
              Retake Quiz
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function getPersonalityTraits(type: string): string[] {
  const traitMap: Record<string, string[]> = {
    sophisticated_minimalist: ['Refined', 'Intentional', 'Quality-Focused', 'Timeless', 'Elegant', 'Curated'],
    bold_adventurer: ['Daring', 'Unique', 'Confident', 'Expressive', 'Adventurous', 'Statement-Making'],
    gentle_romantic: ['Soft', 'Classic', 'Nurturing', 'Elegant', 'Delicate', 'Graceful'],
    fresh_natural: ['Pure', 'Organic', 'Effortless', 'Authentic', 'Clean', 'Balanced'],
    warm_sensual: ['Indulgent', 'Rich', 'Intimate', 'Luxurious', 'Enveloping', 'Sensory'],
    elegant_classic: ['Sophisticated', 'Versatile', 'Balanced', 'Refined', 'Heritage', 'Timeless'],
  }

  return traitMap[type] || traitMap.elegant_classic
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your results...</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
