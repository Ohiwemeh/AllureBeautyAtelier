import { getProducts } from '@/lib/supabase/products'
import { ProductCard } from '@/components/products/product-card'
import { Suspense } from 'react'

export const metadata = {
  title: 'Shop | Allure Beauty Atelier',
  description: 'Explore our curated collection of affordable luxury fragrances and body care products.',
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-allure-taupe/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">
            Our Collection
          </h1>
          <p className="text-lg text-allure-charcoal/80 editorial-spacing max-w-2xl mx-auto">
            Explore our carefully curated selection of luxury-inspired fragrances 
            and body care essentials.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 container mx-auto px-6 lg:px-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif mb-4">No Products Yet</h2>
            <p className="text-allure-charcoal/70 editorial-spacing">
              Our collection is being curated. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
