import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"
import { ChatbotWidget } from "@/components/chat/chatbot-widget"

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  )
}
