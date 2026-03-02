import { getProductBySlug, getProducts } from '@/lib/supabase/products'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/products/product-detail-client'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | Allure Beauty Atelier`,
    description: product.meta_description || product.short_description || product.description,
    openGraph: {
      title: product.name,
      description: product.short_description || product.description || '',
      images: Array.isArray(product.images) && product.images.length > 0
        ? [typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url]
        : [],
    },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
