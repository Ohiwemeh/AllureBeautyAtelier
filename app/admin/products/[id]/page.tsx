"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Plus, X, Loader2, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

interface ProductForm {
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  compare_at_price: string
  category: string
  subcategory: string
  brand: string
  sku: string
  stock_quantity: string
  is_active: boolean
  is_featured: boolean
  volume: string
  scent_profile: string
  skin_type: string
}

const defaultForm: ProductForm = {
  name: "",
  slug: "",
  description: "",
  short_description: "",
  price: "",
  compare_at_price: "",
  category: "fragrance",
  subcategory: "",
  brand: "",
  sku: "",
  stock_quantity: "0",
  is_active: true,
  is_featured: false,
  volume: "",
  scent_profile: "",
  skin_type: "",
}

const SUBCATEGORY_OPTIONS: Record<string, string[]> = {
  fragrance: ["Eau de Parfum", "Eau de Toilette", "Body Mist", "Perfume Oil"],
  bodycare: ["Body Washes", "Body Creams and Oils", "Cleansing Essentials", "Body Scrubs"],
  skincare: ["Cleansers", "Moisturizers", "Serums", "Treatments"],
  "gift-set": ["Fragrance Sets", "Body Care Sets", "Complete Sets"],
}

export default function AdminProductEditPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [form, setForm] = useState<ProductForm>(defaultForm)
  const [imageUrls, setImageUrls] = useState<string[]>([""])
  const [ingredients, setIngredients] = useState<string[]>([])
  const [notes, setNotes] = useState<string[]>([])
  const [personalityTags, setPersonalityTags] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState("")
  const [newNote, setNewNote] = useState("")
  const [newTag, setNewTag] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error || !data) {
        setNotFound(true)
        setIsLoading(false)
        return
      }

      setForm({
        name: data.name ?? "",
        slug: data.slug ?? "",
        description: data.description ?? "",
        short_description: data.short_description ?? "",
        price: data.price != null ? String(data.price) : "",
        compare_at_price: data.compare_at_price != null ? String(data.compare_at_price) : "",
        category: data.category ?? "fragrance",
        subcategory: data.subcategory ?? "",
        brand: data.brand ?? "",
        sku: data.sku ?? "",
        stock_quantity: data.stock_quantity != null ? String(data.stock_quantity) : "0",
        is_active: data.is_active ?? true,
        is_featured: data.is_featured ?? false,
        volume: data.volume ?? "",
        scent_profile: data.scent_profile ?? "",
        skin_type: data.skin_type ?? "",
      })

      // Normalise images → array of URL strings
      const rawImages = Array.isArray(data.images) ? data.images : []
      const urls = rawImages.map((img: unknown) => {
        if (typeof img === "string") return img
        if (typeof img === "object" && img !== null && "url" in img)
          return (img as { url: string }).url
        return ""
      }).filter(Boolean) as string[]
      setImageUrls(urls.length > 0 ? urls : [""])

      setIngredients(Array.isArray(data.ingredients) ? data.ingredients : [])
      setNotes(Array.isArray(data.notes) ? data.notes : [])
      setPersonalityTags(Array.isArray(data.personality_tags) ? data.personality_tags : [])

      setIsLoading(false)
    }
    load()
  }, [id])

  const updateField = (field: keyof ProductForm, value: string | boolean) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === "category") updated.subcategory = ""
      return updated
    })
  }

  const addToList = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.trim() && !list.includes(value.trim())) {
      setList([...list, value.trim()])
      setValue("")
    }
  }

  const removeFromList = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setList(list.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSaving(true)

    if (!form.name || !form.slug || !form.price) {
      setError("Name, slug, and price are required.")
      setIsSaving(false)
      return
    }

    const supabase = createClient()
    const images = imageUrls
      .filter((url) => url.trim())
      .map((url) => ({ url: url.trim() }))

    const { error: updateError } = await supabase
      .from("products")
      .update({
        name: form.name,
        slug: form.slug,
        description: form.description || null,
        short_description: form.short_description || null,
        price: parseFloat(form.price),
        compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
        category: form.category,
        subcategory: form.subcategory || null,
        brand: form.brand || null,
        sku: form.sku || null,
        stock_quantity: parseInt(form.stock_quantity) || 0,
        is_active: form.is_active,
        is_featured: form.is_featured,
        volume: form.volume || null,
        scent_profile: form.scent_profile || null,
        skin_type: form.skin_type || null,
        images,
        ingredients: ingredients.length > 0 ? ingredients : null,
        notes: notes.length > 0 ? notes : null,
        personality_tags: personalityTags.length > 0 ? personalityTags : null,
      })
      .eq("id", id)

    if (updateError) {
      setError(updateError.message)
      setIsSaving(false)
      return
    }

    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading product...
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="text-center py-20 text-gray-500">
        <Package className="h-10 w-10 mx-auto mb-3 text-gray-300" />
        <p className="mb-4">Product not found.</p>
        <Button asChild variant="outline">
          <Link href="/admin/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Edit Product</h1>
          <p className="text-sm text-gray-500">{form.slug}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg"
          >
            Changes saved successfully.
          </motion.div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Product Name *</label>
              <Input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g., Midnight Rose Eau de Parfum"
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">URL Slug *</label>
              <Input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="midnight-rose-edp"
                required
                className="bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Short Description</label>
            <Input
              value={form.short_description}
              onChange={(e) => updateField("short_description", e.target.value)}
              placeholder="A one-line tagline"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Detailed product description..."
              rows={4}
              className="flex w-full luxury-border bg-transparent px-4 py-3 text-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allure-gold/50"
            />
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Pricing & Inventory</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price ($) *</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="0.00"
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Compare At</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={form.compare_at_price}
                onChange={(e) => updateField("compare_at_price", e.target.value)}
                placeholder="0.00"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Stock Qty</label>
              <Input
                type="number"
                min="0"
                value={form.stock_quantity}
                onChange={(e) => updateField("stock_quantity", e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">SKU</label>
              <Input
                value={form.sku}
                onChange={(e) => updateField("sku", e.target.value)}
                placeholder="ABC-123"
                className="bg-white"
              />
            </div>
          </div>
        </div>

        {/* Category & Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Category & Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category *</label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="flex h-12 w-full luxury-border bg-white px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allure-gold/50"
              >
                <option value="fragrance">Fragrance</option>
                <option value="bodycare">Body Care</option>
                <option value="skincare">Skincare</option>
                <option value="gift-set">Gift Set</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Subcategory</label>
              <select
                value={form.subcategory}
                onChange={(e) => updateField("subcategory", e.target.value)}
                disabled={!form.category}
                className="flex h-12 w-full luxury-border bg-white px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-allure-gold/50 disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">Select subcategory...</option>
                {SUBCATEGORY_OPTIONS[form.category]?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Brand</label>
              <Input
                value={form.brand}
                onChange={(e) => updateField("brand", e.target.value)}
                placeholder="e.g., Allure Atelier"
                className="bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Volume</label>
              <Input
                value={form.volume}
                onChange={(e) => updateField("volume", e.target.value)}
                placeholder="e.g., 50ml"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Scent Profile</label>
              <Input
                value={form.scent_profile}
                onChange={(e) => updateField("scent_profile", e.target.value)}
                placeholder="e.g., Woody, Floral"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Skin Type</label>
              <Input
                value={form.skin_type}
                onChange={(e) => updateField("skin_type", e.target.value)}
                placeholder="e.g., All skin types"
                className="bg-white"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Images</h2>
          <p className="text-sm text-gray-500">Add image URLs for this product.</p>

          {/* Previews */}
          {imageUrls.some((u) => u.trim()) && (
            <div className="flex flex-wrap gap-3">
              {imageUrls.filter((u) => u.trim()).map((url, i) => (
                <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={url}
                    alt={`Preview ${i + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}

          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => {
                  const updated = [...imageUrls]
                  updated[index] = e.target.value
                  setImageUrls(updated)
                }}
                placeholder="https://example.com/image.jpg"
                className="bg-white"
              />
              {imageUrls.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setImageUrls([...imageUrls, ""])}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>

        {/* Tags & Attributes */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Tags & Attributes</h2>

          {/* Ingredients */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Ingredients</label>
            <div className="flex gap-2">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient"
                className="bg-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addToList(ingredients, setIngredients, newIngredient, setNewIngredient)
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addToList(ingredients, setIngredients, newIngredient, setNewIngredient)}
              >
                Add
              </Button>
            </div>
            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ingredients.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-100 px-3 py-1.5 rounded-full">
                    {item}
                    <button type="button" onClick={() => removeFromList(ingredients, setIngredients, i)}>
                      <X className="h-3 w-3 text-gray-400 hover:text-red-500" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Scent Notes */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Scent Notes</label>
            <div className="flex gap-2">
              <Input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add note (e.g., Rose, Sandalwood)"
                className="bg-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addToList(notes, setNotes, newNote, setNewNote)
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addToList(notes, setNotes, newNote, setNewNote)}
              >
                Add
              </Button>
            </div>
            {notes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {notes.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
                    {item}
                    <button type="button" onClick={() => removeFromList(notes, setNotes, i)}>
                      <X className="h-3 w-3 text-amber-400 hover:text-red-500" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Personality Tags */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Personality / Quiz Tags</label>
            <p className="text-xs text-gray-400">
              Tags used by the quiz matcher (e.g., woody, fresh, citrus, body_oil, calming)
            </p>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                className="bg-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addToList(personalityTags, setPersonalityTags, newTag, setNewTag)
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addToList(personalityTags, setPersonalityTags, newTag, setNewTag)}
              >
                Add
              </Button>
            </div>
            {personalityTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {personalityTags.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full">
                    {item}
                    <button type="button" onClick={() => removeFromList(personalityTags, setPersonalityTags, i)}>
                      <X className="h-3 w-3 text-purple-400 hover:text-red-500" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Visibility</h2>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => updateField("is_active", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-allure-gold focus:ring-allure-gold"
              />
              <span className="text-sm text-gray-700">Active (visible in store)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => updateField("is_featured", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-allure-gold focus:ring-allure-gold"
              />
              <span className="text-sm text-gray-700">Featured product</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 pb-8">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSaving} className="px-8">
            {isSaving ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" /> Save Changes</>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}