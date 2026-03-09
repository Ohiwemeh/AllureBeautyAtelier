"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAppleSignIn = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/auth/callback`,
      },
    })
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <Link href="/">
              <h1 className="text-3xl font-serif font-light tracking-wider mb-2">ALLURE</h1>
            </Link>
            <p className="text-sm uppercase tracking-[0.3em] text-allure-charcoal/50">
              Welcome back
            </p>
          </div>

          {/* Apple Sign-In */}
          <div className="space-y-6">
            <button
              onClick={handleAppleSignIn}
              className="w-full flex items-center justify-center gap-3 h-12 px-4 rounded-sm border border-allure-charcoal/20 bg-allure-obsidian text-white text-sm font-medium hover:bg-allure-charcoal transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-allure-taupe/30" />
              <span className="text-xs uppercase tracking-[0.2em] text-allure-charcoal/40">or</span>
              <div className="flex-1 h-px bg-allure-taupe/30" />
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.15em] text-allure-charcoal/70">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.15em] text-allure-charcoal/70">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-allure-charcoal/40 hover:text-allure-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full text-base py-6"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-allure-charcoal/60">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-allure-gold hover:text-allure-terracotta transition-colors font-medium"
              >
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right — Visual */}
      <div className="hidden lg:flex flex-1 relative bg-allure-obsidian items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=1200&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-allure-obsidian via-allure-obsidian/50 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-allure-gold/30 mb-6">
            <Sparkles className="h-7 w-7 text-allure-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-allure-cream mb-4 leading-tight">
            Your Beauty,
            <br />
            <span className="italic text-allure-gold">Personalized</span>
          </h2>
          <p className="text-allure-cream/60 editorial-spacing max-w-sm mx-auto">
            Sign in to access your curated recommendations, scent profile, and order history.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
