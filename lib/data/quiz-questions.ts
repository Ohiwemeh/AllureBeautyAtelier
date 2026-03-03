import type { QuizQuestion } from '@/lib/types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'lifestyle',
    question: 'How would you describe your lifestyle?',
    description: 'Choose the option that best resonates with your daily life',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'minimalist',
        label: 'Minimalist & Refined',
        description: 'Clean lines, intentional choices, quality over quantity',
        tags: ['sophisticated', 'minimal', 'elegant'],
      },
      {
        id: 'adventurous',
        label: 'Bold & Adventurous',
        description: 'Always trying new things, embracing change',
        tags: ['bold', 'adventurous', 'daring'],
      },
      {
        id: 'romantic',
        label: 'Soft & Romantic',
        description: 'Gentle, nurturing, classic elegance',
        tags: ['gentle', 'romantic', 'calming'],
      },
      {
        id: 'natural',
        label: 'Fresh & Natural',
        description: 'Organic, wellness-focused, effortless',
        tags: ['fresh', 'natural', 'pure'],
      },
    ],
  },
  {
    id: 'scent_preference',
    question: 'Which scent family appeals to you most?',
    description: 'Select all that resonate with you',
    type: 'multiple',
    tags: [],
    options: [
      {
        id: 'floral',
        label: 'Floral',
        description: 'Rose, jasmine, peony - soft and feminine',
        tags: ['floral', 'romantic', 'gentle'],
      },
      {
        id: 'woody',
        label: 'Woody',
        description: 'Sandalwood, cedar, oud - warm and grounding',
        tags: ['woody', 'warm', 'sophisticated'],
      },
      {
        id: 'citrus',
        label: 'Citrus',
        description: 'Bergamot, lemon, orange - fresh and energizing',
        tags: ['citrus', 'fresh', 'energizing'],
      },
      {
        id: 'oriental',
        label: 'Oriental',
        description: 'Amber, vanilla, spices - exotic and sensual',
        tags: ['oriental', 'sensual', 'warm'],
      },
      {
        id: 'green',
        label: 'Green/Herbal',
        description: 'Mint, basil, tea - clean and crisp',
        tags: ['green', 'fresh', 'natural'],
      },
    ],
  },
  {
    id: 'occasion',
    question: 'When do you typically wear fragrance?',
    description: 'Choose your primary use case',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'everyday',
        label: 'Every Day',
        description: 'A signature scent for daily wear',
        tags: ['versatile', 'daily'],
      },
      {
        id: 'special',
        label: 'Special Occasions',
        description: 'Reserved for events and evenings out',
        tags: ['bold', 'sophisticated'],
      },
      {
        id: 'mood',
        label: 'Based on Mood',
        description: 'Different scents for different feelings',
        tags: ['versatile', 'expressive'],
      },
      {
        id: 'seasonal',
        label: 'Seasonally',
        description: 'Change with the weather',
        tags: ['versatile', 'natural'],
      },
    ],
  },
  {
    id: 'intensity',
    question: 'How intense do you prefer your fragrance?',
    description: 'Rate from subtle to bold',
    type: 'scale',
    tags: [],
    options: [
      {
        id: 'subtle',
        label: 'Subtle',
        description: 'Barely there, intimate',
        tags: ['gentle', 'minimal'],
        score: 1,
      },
      {
        id: 'moderate',
        label: 'Moderate',
        description: 'Noticeable but not overpowering',
        tags: ['balanced'],
        score: 2,
      },
      {
        id: 'bold',
        label: 'Bold',
        description: 'Make a statement, leave an impression',
        tags: ['bold', 'confident'],
        score: 3,
      },
    ],
  },
  {
    id: 'values',
    question: 'What matters most to you in beauty products?',
    description: 'Select your top priorities',
    type: 'multiple',
    tags: [],
    options: [
      {
        id: 'quality',
        label: 'Premium Quality',
        description: 'Best ingredients, expert craftsmanship',
        tags: ['sophisticated', 'elegant'],
      },
      {
        id: 'sustainability',
        label: 'Sustainability',
        description: 'Eco-friendly, ethical sourcing',
        tags: ['natural', 'conscious'],
      },
      {
        id: 'uniqueness',
        label: 'Uniqueness',
        description: 'Stand out, be different',
        tags: ['bold', 'unique'],
      },
      {
        id: 'simplicity',
        label: 'Simplicity',
        description: 'Clean, minimal, essential',
        tags: ['minimal', 'pure'],
      },
      {
        id: 'indulgence',
        label: 'Indulgence',
        description: 'Luxury, pampering, self-care',
        tags: ['indulgent', 'sensual'],
      },
    ],
  },
]
