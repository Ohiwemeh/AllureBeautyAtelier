"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { fragranceQuestions, bodycareQuestions } from "@/lib/data/quiz-questions"
import type { QuizResponse } from "@/lib/types/quiz"

const loadingMessages = [
  "Analyzing your aura...",
  "Curating your botanical profile...",
  "Preparing your bespoke Atelier routine...",
]

const categoryCards = [
  {
    id: 'fragrance' as const,
    title: 'Fragrance',
    subtitle: 'Discover your signature scent',
    description: 'From bold to subtle, find fragrances that tell your story.',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800&q=80',
  },
  {
    id: 'bodycare' as const,
    title: 'Body Care',
    subtitle: 'Elevate your self-care ritual',
    description: 'Luxurious body care products tailored to your needs.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [category, setCategory] = useState<'fragrance' | 'bodycare' | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<QuizResponse[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const questions = category === 'bodycare' ? bodycareQuestions : fragranceQuestions
  const currentQuestion = questions[currentStep]
  const isLastQuestion = currentStep === questions.length - 1
  const progress = ((currentStep + 1) / questions.length) * 100

  // Cycle through loading messages
  useEffect(() => {
    if (!isAnalyzing) return
    const interval = setInterval(() => {
      setLoadingMsgIndex((prev) => {
        if (prev >= loadingMessages.length - 1) return prev
        return prev + 1
      })
    }, 1800)
    return () => clearInterval(interval)
  }, [isAnalyzing])

  const handleOptionSelect = useCallback((optionId: string) => {
    if (currentQuestion.type === 'single' || currentQuestion.type === 'scale') {
      setSelectedOptions([optionId])
    } else {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      )
    }
  }, [currentQuestion])

  const handleNext = useCallback(() => {
    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      selectedOptions,
    }

    const updatedResponses = [...responses]
    updatedResponses[currentStep] = newResponse
    setResponses(updatedResponses)

    if (isLastQuestion) {
      setIsAnalyzing(true)
      const encodedResponses = encodeURIComponent(JSON.stringify(updatedResponses))
      setTimeout(() => {
        router.push(`/quiz/results?data=${encodedResponses}&category=${category}`)
      }, 5400)
    } else {
      setDirection(1)
      setCurrentStep(currentStep + 1)
      const nextResponse = updatedResponses[currentStep + 1]
      setSelectedOptions(nextResponse?.selectedOptions || [])
    }
  }, [currentQuestion, selectedOptions, responses, currentStep, isLastQuestion, category, router])

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
      const previousResponse = responses[currentStep - 1]
      setSelectedOptions(previousResponse?.selectedOptions || [])
    }
  }, [currentStep, responses])

  const canProceed = selectedOptions.length > 0

  // ─── Analyzing Screen ───
  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 z-50 bg-allure-obsidian flex items-center justify-center">
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(183,110,121,0.15) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 text-center px-6">
          {/* Spinner */}
          <motion.div
            className="mx-auto mb-12 w-16 h-16 rounded-full border-2 border-allure-gold/20"
            style={{ borderTopColor: '#B76E79' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Rotating messages */}
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingMsgIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl font-serif font-light text-allure-cream/90 tracking-wide"
            >
              {loadingMessages[loadingMsgIndex]}
            </motion.p>
          </AnimatePresence>

          {/* Subtle dots */}
          <div className="flex gap-2 justify-center mt-8">
            {loadingMessages.map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i <= loadingMsgIndex ? 'bg-allure-gold' : 'bg-allure-cream/20'
                }`}
                animate={i === loadingMsgIndex ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── Category Selection ───
  if (!category) {
    return (
      <div className="min-h-screen bg-allure-obsidian relative overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(183,110,121,0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(218,194,254,0.15) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-allure-gold/30 mb-8"
            >
              <Sparkles className="h-8 w-8 text-allure-gold" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-light text-allure-cream mb-6 leading-tight">
              Discover Your
              <br />
              <span className="italic text-allure-gold">Aura</span>
            </h1>
            <p className="text-lg text-allure-cream/60 max-w-lg mx-auto editorial-spacing">
              A personalized consultation to uncover the scents and rituals
              that resonate with who you truly are.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm uppercase tracking-[0.3em] text-allure-cream/40 mb-8"
          >
            Choose your path
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            {categoryCards.map((card, index) => (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.15 }}
                onClick={() => setCategory(card.id)}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-allure-obsidian/90 via-allure-obsidian/40 to-allure-obsidian/20 group-hover:from-allure-obsidian/80 transition-all duration-500" />
                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-allure-gold/50 rounded-sm transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-allure-gold mb-3">
                    {card.subtitle}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-serif font-light text-allure-cream mb-3 group-hover:text-allure-gold transition-colors duration-300">
                    {card.title}
                  </h2>
                  <p className="text-sm text-allure-cream/60 editorial-spacing mb-6">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-allure-gold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Begin consultation
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── Quiz Questions ───
  return (
    <div className="min-h-screen bg-allure-cream relative">
      {/* Thin gold progress bar - fixed top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-allure-taupe/10">
        <motion.div
          className="h-full bg-gradient-to-r from-allure-gold to-allure-terracotta"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Step counter */}
      <div className="fixed top-6 right-6 z-40">
        <p className="text-xs uppercase tracking-[0.2em] text-allure-charcoal/40">
          {currentStep + 1} / {questions.length}
        </p>
      </div>

      {/* Back button */}
      {currentStep > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-6 left-6 z-40"
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-allure-charcoal/50 hover:text-allure-obsidian transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </motion.div>
      )}

      {/* Question Area - full screen */}
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, y: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto"
          >
            {/* Question text */}
            <div className="text-center mb-12">
              {currentQuestion.type === 'multiple' && (
                <p className="text-xs uppercase tracking-[0.3em] text-allure-gold mb-4">
                  Select multiple
                </p>
              )}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light mb-4 leading-tight">
                {currentQuestion.question}
              </h2>
              {currentQuestion.description && (
                <p className="text-allure-charcoal/60 editorial-spacing text-lg">
                  {currentQuestion.description}
                </p>
              )}
            </div>

            {/* Image card grid */}
            <div className={`grid gap-4 ${
              currentQuestion.options.length <= 3
                ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto'
                : currentQuestion.options.length === 4
                  ? 'grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto'
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto'
            }`}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOptions.includes(option.id)

                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onClick={() => handleOptionSelect(option.id)}
                    className="group relative text-left"
                  >
                    {/* Image card */}
                    <div className={`relative aspect-[3/4] overflow-hidden rounded-sm transition-all duration-500 ${
                      isSelected
                        ? 'ring-2 ring-allure-gold shadow-lg shadow-allure-gold/20'
                        : 'hover:shadow-xl'
                    }`}>
                      {/* Background */}
                      {option.image && (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url('${option.image}')` }}
                        />
                      )}

                      {/* Overlay */}
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isSelected
                          ? 'bg-gradient-to-t from-allure-obsidian/80 via-allure-obsidian/30 to-allure-gold/10'
                          : 'bg-gradient-to-t from-allure-obsidian/80 via-allure-obsidian/30 to-transparent group-hover:from-allure-obsidian/70'
                      }`} />

                      {/* Selected check */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-allure-gold flex items-center justify-center"
                          >
                            <Check className="h-4 w-4 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Label */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className={`text-lg font-serif mb-1 transition-colors duration-300 ${
                          isSelected ? 'text-allure-gold' : 'text-allure-cream'
                        }`}>
                          {option.label}
                        </h3>
                        {option.description && (
                          <p className="text-xs text-allure-cream/60 line-clamp-2 editorial-spacing">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Continue button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: canProceed ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="mt-12 text-center"
            >
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!canProceed}
                className="text-base px-12 py-6"
              >
                {isLastQuestion ? 'Reveal My Aura' : 'Continue'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
