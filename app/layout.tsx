import type { Metadata } from "next"
import { Noto_Serif, Montserrat } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Allure Beauty Atelier | Luxury Fragrance & Body Care",
  description: "A Nigerian beauty and personal care brand specialising in fragrances and body care essentials. Luxury personal care, accessible without compromise. Beauty, thoughtfully curated.",
  keywords: ["luxury beauty", "Nigerian beauty brand", "fragrance", "perfume", "body care", "scent personality test", "beauty atelier"],
  authors: [{ name: "Allure Beauty Atelier" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://allurebeautyatelier.com",
    title: "Allure Beauty Atelier | Luxury Fragrance & Body Care",
    description: "A Nigerian beauty and personal care brand making luxury personal care accessible. Fragrances and body care essentials, thoughtfully curated.",
    siteName: "Allure Beauty Atelier",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(notoSerif.variable, montserrat.variable)}>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
