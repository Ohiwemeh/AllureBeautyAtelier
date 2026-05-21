"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Package, Trash2, Plus, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { formatCurrency } from "@/lib/utils"

interface ProductForm {
  name: string
  slug: string
  price: number
  category: string
  stock_quantity: number
  is_active: boolean
  is_featured: boolean
  description: string
  images: string[]
}

const defaultForm: ProductForm = {
  name: "",
  slug: "",
  price: 0,
  category: "",
  stock_quantity: 0,
  is_active: true,
  is_featured: false,
  description: "",
  images: [],
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function AdminProductEditPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const isNew = id === "new"

  const [form, setForm] = useState<ProductForm>(defaultForm)
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState("")

  useEffect(() => {
    if (isNew) return
    const load = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error || !data) {
        setError("Product not found.")
        setIsLoading(false)
        return
      }

      const images: string[] = Array.isArray(data.images)
        ? data.images.map((img: unknown) => {
            if (typeof img === "string") return img
            if (typeof img === "object" && img !== null && "url" in img)
              return (img as { url: string }).url
            return ""
          }).filter(Boolean)
        : []

      setForm({
        name: data.name ?? "",
        slug: data.slug ?? "",
        price: data.price ?? 0,
        category: data.category ?? "",
        stock_quantity: data.stock_quantity ?? 0,
        is_active: data.is_active ?? true,
        is_featured: data.is_featured ?? false,
        description: data.description ?? "",
        images,
      })
      setIsLoading(false)
    }
    load()
  }, [id, isNew])

  const handleChange = (field: keyof ProductForm, value: unknown) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === "name" && isNew) {
        updated.slug = slugify(String(value))
      }
      return updated
    })
  }

  const addImage = () => {
    const url = newImageUrl.trim()
    if (!url) return
    setForm((prev) => ({ ...prev, images: [...prev.images, url] }))
    setNewImageUrl("")
  }

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()
    const payload = {
      name: form.name,
      slug: form.slug,
      price: Number(form.price),
      category: form.category,
      stock_quantity: Number(form.stock_quantity),
      is_active: form.is_active,
      is_featured: form.is_featured,
      description: form.description,
      images: form.images,
    }

    if (isNew) {
      const { error } = await supabase.from("products").insert([payload])
      if (error) {
        setError(error.message)
      } else {
        router.push("/admin/products")
      }
    } else {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", id)
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    }

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

  if (error && !form.name) {
    return (
      <div className="text-center py-20 text-gray-500">
        <Package className="h-10 w-10 mx-auto mb-3 text-gray-300" />
        <p className="mb-4">{error}</p>
        <Button asChild variant="outline">
          <Link href="/admin/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isNew ? "Add Product" : "Edit Product"}
          </h1>
          {!isNew && (
            <p className="text-sm text-gray-400 mt-0.5">{form.slug}</p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">

        {/* Basic Info */}
        <div className="p-6 space-y-4">
          <h2 className="text-sm font-medium text-gray-700">Basic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Product Name</label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Rose Hip Serum"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="e.g. rose-hip-serum"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Product description..."
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="p-6 space-y-4">
          <h2 className="text-sm font-medium text-gray-700">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Price (₦)</label>
              <Input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Category</label>
              <Input
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="e.g. skincare"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Stock Quantity</label>
              <Input
                type="number"
                min={0}
                value={form.stock_quantity}
                onChange={(e) => handleChange("stock_quantity", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="p-6 space-y-3">
          <h2 className="text-sm font-medium text-gray-700">Visibility</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => handleChange("is_active", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">Active (visible on storefront)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => handleChange("is_featured", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">Featured product</span>
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="p-6 space-y-4">
          <h2 className="text-sm font-medium text-gray-700">Images</h2>

          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {form.images.map((url, i) => (
                <div key={i} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={url}
                    alt={`Image ${i + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addImage()}
              placeholder="Paste image URL..."
              className="flex-1"
            />
            <Button variant="outline" onClick={addImage}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pb-8">
        <div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600">Changes saved successfully.</p>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
            ) : (
              <><Save className="h-4 w-4 mr-2" /> {isNew ? "Create Product" : "Save Changes"}</>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}