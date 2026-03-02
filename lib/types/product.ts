// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  compare_at_price: number | null
  category: 'fragrance' | 'bodycare'
  subcategory: string | null
  brand: string | null
  sku: string | null
  stock_quantity: number
  is_active: boolean
  is_featured: boolean
  volume: string | null
  ingredients: string[] | null
  notes: string[] | null
  skin_type: string | null
  scent_profile: string | null
  images: ProductImage[]
  video_url: string | null
  meta_title: string | null
  meta_description: string | null
  personality_tags: string[] | null
  quiz_match_score: Record<string, any>
  created_at: string
  updated_at: string
}

export interface ProductImage {
  url: string
  alt?: string
  position?: number
}

// Cart Types
export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}
