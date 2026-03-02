import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Allure Beauty Atelier | Affordable Luxury Fragrance & Body Care",
  description: "Discover bespoke beauty through our curated collection of affordable luxury fragrances and body care. Inspired by artistry, designed for you.",
  keywords: ["affordable luxury beauty", "fragrance", "perfume", "body care", "beauty atelier"],
  authors: [{ name: "Allure Beauty Atelier" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://allurebeautyatelier.com",
    title: "Allure Beauty Atelier | Affordable Luxury Fragrance & Body Care",
    description: "Discover bespoke beauty through our curated collection of affordable luxury fragrances and body care.",
    siteName: "Allure Beauty Atelier",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(cormorant.variable, inter.variable)}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
