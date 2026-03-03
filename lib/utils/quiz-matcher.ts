import type { QuizResponse, PersonalityType } from '@/lib/types/quiz'
import type { Product } from '@/lib/types/product'

export function calculatePersonalityType(responses: QuizResponse[]): PersonalityType {
  // Aggregate all tags from responses
  const tagCounts: Record<string, number> = {}
  
  responses.forEach(response => {
    response.selectedOptions.forEach(optionId => {
      // In a real implementation, we'd look up the actual tags from the questions
      // For now, we'll use a simplified approach
    })
  })

  // Determine personality type based on dominant tags
  const tags = Object.keys(tagCounts)
  
  if (tags.includes('sophisticated') && tags.includes('minimal')) {
    return 'sophisticated_minimalist'
  } else if (tags.includes('bold') && tags.includes('adventurous')) {
    return 'bold_adventurer'
  } else if (tags.includes('gentle') && tags.includes('romantic')) {
    return 'gentle_romantic'
  } else if (tags.includes('fresh') && tags.includes('natural')) {
    return 'fresh_natural'
  } else if (tags.includes('warm') && tags.includes('sensual')) {
    return 'warm_sensual'
  } else {
    return 'elegant_classic'
  }
}

export function getPersonalityDescription(type: PersonalityType): { title: string; description: string } {
  const descriptions = {
    sophisticated_minimalist: {
      title: 'The Sophisticated Minimalist',
      description: 'You appreciate quality over quantity. Your refined taste gravitates toward clean, timeless fragrances with exceptional craftsmanship. Less is more, but it must be perfect.',
    },
    bold_adventurer: {
      title: 'The Bold Adventurer',
      description: 'You embrace the extraordinary and aren\'t afraid to stand out. Your fragrance choices are daring, unique, and make a statement. Convention is just a suggestion.',
    },
    gentle_romantic: {
      title: 'The Gentle Romantic',
      description: 'You find beauty in softness and elegance. Classic florals and delicate compositions speak to your nurturing, romantic soul. Timeless grace is your signature.',
    },
    fresh_natural: {
      title: 'The Fresh Naturalist',
      description: 'You seek purity and authenticity in all things. Clean, crisp scents that evoke nature and wellness resonate with your organic, effortless approach to beauty.',
    },
    warm_sensual: {
      title: 'The Warm Sensualist',
      description: 'You embrace indulgence and sensory pleasure. Rich, enveloping fragrances with depth and warmth reflect your appreciation for luxury and intimate moments.',
    },
    elegant_classic: {
      title: 'The Elegant Classic',
      description: 'You embody timeless sophistication. Your choices are refined, balanced, and versatile. You appreciate heritage, quality, and enduring style.',
    },
  }

  return descriptions[type]
}

export function matchProducts(
  products: Product[],
  responses: QuizResponse[],
  personalityType: PersonalityType
): Product[] {
  // Simple matching based on personality tags in products
  const personalityTags = getPersonalityTags(personalityType)
  
  const scoredProducts = products.map(product => {
    let score = 0
    
    // Match personality tags
    if (product.personality_tags) {
      personalityTags.forEach(tag => {
        if (product.personality_tags?.includes(tag)) {
          score += 2
        }
      })
    }
    
    return { product, score }
  })

  // Sort by score and return top matches
  return scoredProducts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(item => item.product)
}

function getPersonalityTags(type: PersonalityType): string[] {
  const tagMap = {
    sophisticated_minimalist: ['sophisticated', 'minimal', 'elegant'],
    bold_adventurer: ['bold', 'unique', 'daring'],
    gentle_romantic: ['gentle', 'romantic', 'calming'],
    fresh_natural: ['fresh', 'natural', 'pure'],
    warm_sensual: ['warm', 'sensual', 'indulgent'],
    elegant_classic: ['elegant', 'sophisticated', 'balanced'],
  }
  
  return tagMap[type]
}
