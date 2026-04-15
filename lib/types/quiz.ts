export interface QuizQuestion {
  id: string
  question: string
  description?: string
  type: 'single' | 'multiple' | 'scale'
  options: QuizOption[]
  tags: string[]
}

export interface QuizOption {
  id: string
  label: string
  description?: string
  image?: string
  tags: string[]
  score?: number
}

export interface QuizResponse {
  questionId: string
  selectedOptions: string[]
}

export interface QuizResult {
  responses: QuizResponse[]
  personalityType: string
  tags: string[]
  recommendedProducts: string[]
  completedAt: string
}

export type PersonalityType = 
  | 'bold'
  | 'soft'
  | 'minimal'
  | 'sensual'
  | 'sophisticated_minimalist'
  | 'bold_adventurer'
  | 'gentle_romantic'
  | 'fresh_natural'
  | 'warm_sensual'
  | 'elegant_classic'
