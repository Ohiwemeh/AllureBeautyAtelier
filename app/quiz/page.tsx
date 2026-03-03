"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { quizQuestions } from "@/lib/data/quiz-questions"
import type { QuizResponse } from "@/lib/types/quiz"

export default function QuizPage() {
  const router = useRouter()
  const [category, setCategory] = useState<'fragrance' | 'bodycare' | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<QuizResponse[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const currentQuestion = quizQuestions[currentStep]
  const isLastQuestion = currentStep === quizQuestions.length - 1
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  const handleOptionSelect = (optionId: string) => {
    if (currentQuestion.type === 'single' || currentQuestion.type === 'scale') {
      setSelectedOptions([optionId])
    } else {
      // Multiple selection
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId))
      } else {
        setSelectedOptions([...selectedOptions, optionId])
      }
    }
  }

  const handleNext = () => {
    // Save current response
    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      selectedOptions,
    }
    
    const updatedResponses = [...responses]
    updatedResponses[currentStep] = newResponse
    setResponses(updatedResponses)

    if (isLastQuestion) {
      // Navigate to results with responses and category
      const encodedResponses = encodeURIComponent(JSON.stringify(updatedResponses))
      router.push(`/quiz/results?data=${encodedResponses}&category=${category}`)
    } else {
      setCurrentStep(currentStep + 1)
      // Load previous response if going back
      const nextResponse = updatedResponses[currentStep + 1]
      setSelectedOptions(nextResponse?.selectedOptions || [])
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      const previousResponse = responses[currentStep - 1]
      setSelectedOptions(previousResponse?.selectedOptions || [])
    }
  }

  const canProceed = selectedOptions.length > 0

  // Category Selection Screen
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-allure-gold/10 mb-6">
              <Sparkles className="h-8 w-8 text-allure-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">
              What Are You Looking For?
            </h1>
            <p className="text-allure-charcoal/70 editorial-spacing">
              Choose a category to personalize your quiz experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setCategory('fragrance')}
              className="luxury-border p-12 text-center hover:border-allure-gold hover:bg-allure-gold/5 transition-all group"
            >
              <div className="text-6xl mb-4">🌸</div>
              <h2 className="text-3xl font-serif mb-3 group-hover:text-allure-gold transition-colors">
                Fragrance
              </h2>
              <p className="text-allure-charcoal/70 editorial-spacing">
                Discover your signature scent. From bold to subtle, find fragrances that tell your story.
              </p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => setCategory('bodycare')}
              className="luxury-border p-12 text-center hover:border-allure-gold hover:bg-allure-gold/5 transition-all group"
            >
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-3xl font-serif mb-3 group-hover:text-allure-gold transition-colors">
                Body Care
              </h2>
              <p className="text-allure-charcoal/70 editorial-spacing">
                Elevate your self-care ritual. Luxurious body care products tailored to your needs.
              </p>
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-allure-gold/10 mb-6">
            <Sparkles className="h-8 w-8 text-allure-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">
            {category === 'fragrance' ? 'Discover Your Signature Scent' : 'Find Your Perfect Body Care'}
          </h1>
          <p className="text-allure-charcoal/70 editorial-spacing">
            Answer a few questions to find {category === 'fragrance' ? 'fragrances' : 'body care products'} perfectly matched to your personality
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-allure-charcoal/60">
              Question {currentStep + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-allure-charcoal/60">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 bg-allure-taupe/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-allure-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="luxury-border p-8 md:p-12 mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-serif mb-3">
              {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <p className="text-allure-charcoal/70 editorial-spacing mb-8">
                {currentQuestion.description}
              </p>
            )}

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptions.includes(option.id)
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full text-left p-6 luxury-border transition-all ${
                      isSelected
                        ? 'border-allure-gold bg-allure-gold/5'
                        : 'hover:border-allure-gold/50 hover:bg-allure-taupe/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
                        isSelected
                          ? 'border-allure-gold bg-allure-gold'
                          : 'border-allure-charcoal/30'
                      } flex items-center justify-center`}>
                        {isSelected && <Check className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{option.label}</h3>
                        {option.description && (
                          <p className="text-sm text-allure-charcoal/60 editorial-spacing">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
          >
            {isLastQuestion ? 'See Results' : 'Next'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
