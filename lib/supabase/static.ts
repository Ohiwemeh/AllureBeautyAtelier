import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Static client for build-time operations (no cookies)
export function createStaticClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)
}
