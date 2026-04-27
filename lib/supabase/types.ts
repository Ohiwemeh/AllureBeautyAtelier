export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          price: number
          compare_at_price: number | null
          category: string
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
          images: Json
          video_url: string | null
          meta_title: string | null
          meta_description: string | null
          personality_tags: string[] | null
          quiz_match_score: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          price: number
          compare_at_price?: number | null
          category: string
          subcategory?: string | null
          brand?: string | null
          sku?: string | null
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          volume?: string | null
          ingredients?: string[] | null
          notes?: string[] | null
          skin_type?: string | null
          scent_profile?: string | null
          images?: Json
          video_url?: string | null
          meta_title?: string | null
          meta_description?: string | null
          personality_tags?: string[] | null
          quiz_match_score?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          price?: number
          compare_at_price?: number | null
          category?: string
          subcategory?: string | null
          brand?: string | null
          sku?: string | null
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          volume?: string | null
          ingredients?: string[] | null
          notes?: string[] | null
          skin_type?: string | null
          scent_profile?: string | null
          images?: Json
          video_url?: string | null
          meta_title?: string | null
          meta_description?: string | null
          personality_tags?: string[] | null
          quiz_match_score?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          skin_type: string | null
          favorite_scents: string[] | null
          quiz_results: Json | null
          quiz_completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          skin_type?: string | null
          favorite_scents?: string[] | null
          quiz_results?: Json | null
          quiz_completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          skin_type?: string | null
          favorite_scents?: string[] | null
          quiz_results?: Json | null
          quiz_completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      gift_boxes: {
        Row: {
          id: string
          user_id: string | null
          title: string
          description: string | null
          gift_note: string | null
          share_token: string
          is_public: boolean
          view_count: number
          is_purchased: boolean
          purchased_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title?: string
          description?: string | null
          gift_note?: string | null
          share_token?: string
          is_public?: boolean
          view_count?: number
          is_purchased?: boolean
          purchased_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          description?: string | null
          gift_note?: string | null
          share_token?: string
          is_public?: boolean
          view_count?: number
          is_purchased?: boolean
          purchased_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      gift_box_items: {
        Row: {
          id: string
          gift_box_id: string
          product_id: string
          position: number
          quantity: number
          product_snapshot: Json | null
          added_at: string
        }
        Insert: {
          id?: string
          gift_box_id: string
          product_id: string
          position: number
          quantity?: number
          product_snapshot?: Json | null
          added_at?: string
        }
        Update: {
          id?: string
          gift_box_id?: string
          product_id?: string
          position?: number
          quantity?: number
          product_snapshot?: Json | null
          added_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          order_number: string
          status: string
          subtotal: number
          tax: number
          shipping: number
          discount: number
          total: number
          currency: string
          flw_transaction_id: string | null
          flw_tx_ref: string | null
          payment_status: string | null
          payment_reference: string | null
          shipping_address: Json | null
          billing_address: Json | null
          gift_box_id: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_number: string
          status?: string
          subtotal: number
          tax?: number
          shipping?: number
          discount?: number
          total: number
          currency?: string
          flw_transaction_id?: string | null
          flw_tx_ref?: string | null
          payment_status?: string | null
          payment_reference?: string | null
          shipping_address?: Json | null
          billing_address?: Json | null
          gift_box_id?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          order_number?: string
          status?: string
          subtotal?: number
          tax?: number
          shipping?: number
          discount?: number
          total?: number
          currency?: string
          flw_transaction_id?: string | null
          flw_tx_ref?: string | null
          payment_status?: string | null
          payment_reference?: string | null
          shipping_address?: Json | null
          billing_address?: Json | null
          gift_box_id?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          product_sku: string | null
          product_image: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          product_sku?: string | null
          product_image?: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          product_sku?: string | null
          product_image?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      quiz_responses: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          responses: Json
          result: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          responses: Json
          result?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          responses?: Json
          result?: Json | null
          created_at?: string
        }
      }
    }
  }
}
