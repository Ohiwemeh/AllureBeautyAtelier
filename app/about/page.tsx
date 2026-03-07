"use client"

import { motion } from "framer-motion"
import { Sparkles, Heart, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-allure-taupe/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-allure-gold mb-4">
              Our Story
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-6">
              About Allure
            </h1>
            <p className="text-lg text-allure-charcoal/80 editorial-spacing max-w-2xl mx-auto">
              Where affordable luxury meets ritual. We believe everyone deserves 
              to experience the transformative power of beautifully crafted 
              fragrances and body care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="aspect-[4/5] luxury-border bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80')`,
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-serif font-light">
                Crafted With Intention
              </h2>
              <p className="text-allure-charcoal/80 editorial-spacing">
                Allure Beauty Atelier was born from a simple belief: luxury 
                should be accessible without compromise. Every product in our 
                collection is meticulously selected for its quality, artistry, 
                and ability to elevate the everyday.
              </p>
              <p className="text-allure-charcoal/80 editorial-spacing">
                We partner with artisan creators who share our passion for 
                exceptional ingredients and timeless formulations. The result 
                is a curated collection that feels deeply personal yet 
                universally elegant.
              </p>
              <p className="text-allure-charcoal/80 editorial-spacing">
                From our signature fragrances to our indulgent body care 
                rituals, every product tells a story and invites you to 
                discover yours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-allure-taupe/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-light mb-4">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Accessible Luxury",
                description:
                  "Premium quality without the premium price tag. We believe luxury is a feeling, not a number.",
              },
              {
                icon: Heart,
                title: "Personal Connection",
                description:
                  "Our AI-powered quiz helps you discover products that resonate with your unique personality and preferences.",
              },
              {
                icon: Leaf,
                title: "Conscious Beauty",
                description:
                  "We prioritize clean ingredients, sustainable packaging, and ethical sourcing in every product we curate.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-allure-gold/10 mb-6">
                  <value.icon className="h-6 w-6 text-allure-gold" />
                </div>
                <h3 className="text-xl font-serif mb-3">{value.title}</h3>
                <p className="text-sm text-allure-charcoal/70 editorial-spacing">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-light mb-6">
              Begin Your Journey
            </h2>
            <p className="text-allure-charcoal/70 editorial-spacing max-w-xl mx-auto mb-8">
              Discover what makes you unique with our personality quiz, or 
              explore our collection at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/quiz">Take the Quiz</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/shop">Explore Collection</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
