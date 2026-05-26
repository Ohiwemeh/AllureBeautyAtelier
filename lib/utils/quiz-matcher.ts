import type { QuizResponse, PersonalityType } from '@/lib/types/quiz'
import type { Product } from '@/lib/types/product'
import { fragranceQuestions, bodycareQuestions } from '@/lib/data/quiz-questions'

// Built directly from your actual product tags in the DB
const VIBE_TO_SCENT: Record<string, string[]> = {
  // Quiz vibe tags → your actual product scent words
  bold:                ['oud', 'woody', 'smoky', 'dark', 'warm masculine', 'aromatic', 'resinous', 'oriental', 'spicy', 'warm spicy'],
  soft:                ['floral', 'white floral', 'sweet', 'musky', 'soft musky', 'powdery', 'slightly powdery', 'fruity', 'creamy', 'vanilla'],
  minimal:             ['fresh', 'clean', 'citrus', 'musky clean', 'bright', 'soft soapy musk', 'energizing'],
  sensual:             ['warm', 'warm spicy', 'gourmand', 'amber', 'vanilla', 'boozy', 'resinous', 'cozy', 'chocolatey'],
  heavy_projection:    ['oud', 'dark', 'smoky', 'warm woody oriental', 'oriental'],
  moderate_projection: ['floral', 'fruity', 'sweet', 'creamy'],
  skin_scent:          ['musky clean', 'soft musky', 'clean', 'fresh'],
  intimate_projection: ['warm', 'vanilla', 'amber', 'gourmand', 'cozy'],
  professional:        ['woody', 'fresh', 'clean', 'aromatic', 'warm masculine'],
  celebratory:         ['floral', 'fruity', 'sweet', 'creamy', 'fruity spicy'],
  casual:              ['fresh', 'clean', 'citrus', 'fruity', 'musky'],
  evening:             ['warm spicy', 'amber', 'gourmand', 'vanilla', 'oud', 'boozy', 'dark'],
  // Bodycare
  fast_absorbing:      ['fresh', 'clean', 'energizing', 'bright'],
  energizing:          ['citrus', 'fresh', 'bright', 'energizing'],
  rich_lotion:         ['deep hydration', 'shea', 'nourishing'],
  calming:             ['calming', 'soothing', 'aloe'],
  lightweight:         ['fresh', 'clean', 'lightweight'],
  cooling:             ['fresh', 'citrus', 'clean'],
  body_oil:            ['nourishing', 'luxurious', 'shimmer'],
  luxurious:           ['nourishing', 'luxurious', 'deep hydration'],
  pollution_defense:   ['antioxidant', 'barrier'],
  matte_finish:        ['fresh', 'clean', 'lightweight'],
  radiance:            ['radiance', 'glow', 'bright'],
  glow:                ['shimmer', 'radiance', 'glow', 'bright'],
  spf_protection:      ['barrier', 'protective'],
  barrier_repair:      ['barrier', 'ceramides', 'soothing'],
  shimmer:             ['shimmer', 'glow', 'radiance'],
  deep_moisture:       ['deep hydration', 'nourishing', 'shea'],
  spray:               ['fresh', 'lightweight'],
  gel_lotion:          ['fresh', 'lightweight', 'clean'],
  daily_lotion:        ['nourishing', 'lightweight'],
  ceramides:           ['ceramides', 'barrier'],
  oil:                 ['nourishing', 'luxurious'],
  deep_hydration:      ['deep hydration', 'shea', 'nourishing'],
  shea:                ['shea', 'deep hydration', 'nourishing'],
  exfoliant:           ['exfoliant', 'smoothing', 'brightening'],
  aha_bha:             ['exfoliant', 'smoothing'],
  balancing:           ['lightweight', 'clean', 'fresh'],
  daily_care:          ['nourishing', 'lightweight'],
}

// Normalize: lowercase, trim, collapse spaces, remove special chars except spaces
function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[-]/g, ' ')        // hyphens to spaces: "sweet-spicy" → "sweet spicy"
    .replace(/[^a-z0-9\s]/g, '') // remove anything else weird
    .replace(/\s+/g, ' ')        // collapse multiple spaces
    .trim()
}

// Handles the actual format in your DB: ["Gourmand, Warm Spicy, Sweet, Amber"]
// — an array with ONE string that contains comma-separated tags
function parseProductTags(raw: string | string[] | null | undefined): string[] {
  if (!raw) return []

  let combined: string
  if (Array.isArray(raw)) {
    combined = raw.join(', ') // join array elements first
  } else {
    combined = raw
  }

  return combined
    .split(',')
    .map(t => normalizeTag(t))
    .filter(t => t.length > 0)
    // Remove filler words that appear in sentence-style tags like "slightly smoky, resinous, and woody"
    .map(t => t.replace(/\band\b/g, '').trim())
    .filter(t => t.length > 0)
}

function expandVibeToScent(tags: string[]): string[] {
  const expanded = new Set<string>()
  tags.forEach(tag => {
    const normalized = normalizeTag(tag)
    expanded.add(normalized)
    // Also try underscore version for map lookup
    const key = normalized.replace(/\s+/g, '_')
    const mapped = VIBE_TO_SCENT[normalized] ?? VIBE_TO_SCENT[key]
    if (mapped) mapped.forEach(t => expanded.add(normalizeTag(t)))
  })
  return [...expanded]
}

export function collectResponseTags(
  responses: QuizResponse[],
  category: 'fragrance' | 'bodycare'
): string[] {
  const questions = category === 'bodycare' ? bodycareQuestions : fragranceQuestions
  const tags: string[] = []

  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId)
    if (!question) return
    response.selectedOptions.forEach(optionId => {
      const option = question.options.find(o => o.id === optionId)
      if (!option) return
      tags.push(...option.tags)
    })
  })

  return tags
}

export function calculatePersonalityType(
  responses: QuizResponse[],
  category: 'fragrance' | 'bodycare' = 'fragrance'
): PersonalityType {
  const tags = collectResponseTags(responses, category)
  const tagCounts: Record<string, number> = {}
  tags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1
  })

  if (category === 'bodycare') {
    const scored: { type: PersonalityType; score: number }[] = [
      {
        type: 'warm_sensual',
        score: (tagCounts['body_oil'] || 0) + (tagCounts['luxurious'] || 0) +
               (tagCounts['deep_hydration'] || 0) + (tagCounts['rich_lotion'] || 0) +
               (tagCounts['deep_moisture'] || 0) + (tagCounts['shimmer'] || 0),
      },
      {
        type: 'fresh_natural',
        score: (tagCounts['lightweight'] || 0) + (tagCounts['cooling'] || 0) +
               (tagCounts['fast_absorbing'] || 0) + (tagCounts['energizing'] || 0) +
               (tagCounts['gel_lotion'] || 0),
      },
      {
        type: 'bold_adventurer',
        score: (tagCounts['exfoliant'] || 0) + (tagCounts['aha_bha'] || 0) +
               (tagCounts['radiance'] || 0) + (tagCounts['glow'] || 0) +
               (tagCounts['pollution_defense'] || 0),
      },
      {
        type: 'gentle_romantic',
        score: (tagCounts['calming'] || 0) + (tagCounts['rich_lotion'] || 0) +
               (tagCounts['barrier_repair'] || 0) + (tagCounts['balancing'] || 0),
      },
      {
        type: 'sophisticated_minimalist',
        score: (tagCounts['matte_finish'] || 0) + (tagCounts['spf_protection'] || 0) +
               (tagCounts['daily_lotion'] || 0) + (tagCounts['ceramides'] || 0),
      },
      { type: 'elegant_classic', score: 0 },
    ]
    scored.sort((a, b) => b.score - a.score)
    return scored[0].score > 0 ? scored[0].type : 'gentle_romantic'
  }

  const scored: { type: PersonalityType; score: number }[] = [
    {
      type: 'warm_sensual',
      score: (tagCounts['sensual'] || 0) + (tagCounts['warm'] || 0) +
             (tagCounts['gourmand'] || 0) + (tagCounts['intimate_projection'] || 0) +
             (tagCounts['evening'] || 0),
    },
    {
      type: 'bold_adventurer',
      score: (tagCounts['bold'] || 0) + (tagCounts['woody'] || 0) +
             (tagCounts['smoky'] || 0) + (tagCounts['heavy_projection'] || 0) +
             (tagCounts['professional'] || 0),
    },
    {
      type: 'gentle_romantic',
      score: (tagCounts['soft'] || 0) + (tagCounts['floral'] || 0) +
             (tagCounts['sweet'] || 0) + (tagCounts['moderate_projection'] || 0) +
             (tagCounts['celebratory'] || 0),
    },
    {
      type: 'fresh_natural',
      score: (tagCounts['minimal'] || 0) + (tagCounts['fresh'] || 0) +
             (tagCounts['clean'] || 0) + (tagCounts['skin_scent'] || 0) +
             (tagCounts['casual'] || 0),
    },
    {
      type: 'sophisticated_minimalist',
      score: (tagCounts['minimal'] || 0) + (tagCounts['skin_scent'] || 0) +
             (tagCounts['clean'] || 0),
    },
    { type: 'elegant_classic', score: 0 },
  ]
  scored.sort((a, b) => b.score - a.score)
  return scored[0].score > 0 ? scored[0].type : 'elegant_classic'
}

export function getPersonalityDescription(type: PersonalityType): { title: string; description: string } {
  const descriptions: Record<PersonalityType, { title: string; description: string }[]> = {
    sophisticated_minimalist: [
      { title: 'The Refined Purist', description: 'You gravitate toward precision and clarity. Clean, architectural scents and streamlined rituals speak to your discerning eye. Every detail is intentional, nothing is wasted.' },
      { title: 'The Quiet Architect', description: 'Structure is your aesthetic. You find beauty in restraint — a single note that lingers, a texture that speaks without shouting. Your taste is an edit, not a collection.' },
      { title: 'The Still Water', description: 'Calm, considered, and impossible to rattle. You choose scents and rituals that feel like a deep breath — unhurried, precise, and quietly powerful.' },
      { title: 'The Essentialist', description: "You have removed everything that doesn't belong. What remains is deliberate. Your fragrance is barely there and entirely unforgettable." },
    ],
    bold_adventurer: [
      { title: 'The Dark Romantic', description: 'Depth and mystery define your aura. You are drawn to raw, smoky, and untamed — scents and textures that leave an unforgettable impression in your wake.' },
      { title: 'The Midnight Wanderer', description: 'You are most alive when the world gets interesting. Heavy woods, dark resins, the smell of places most people never go. Your sillage tells a story before you say a word.' },
      { title: 'The Unapologetic', description: "Subtle was never your language. You wear your scent like armour — rich, dense, and completely intentional. People remember the room you were in long after you've left." },
      { title: 'The Shadow Bloom', description: 'There is something wild beneath your surface. Smoky florals, leather edges, and the kind of depth that takes time to fully reveal itself. You are not for the faint-hearted.' },
    ],
    gentle_romantic: [
      { title: 'The Soft Sensualist', description: 'You move through the world with grace and gentleness. Florals, powdery warmth, and soothing textures wrap around you like poetry. Your beauty is quiet but magnetic.' },
      { title: 'The Petal & Silk', description: "Everything you choose feels like a caress. Soft whites, warm skin, the faint blush of jasmine at dusk. You don't demand attention — you earn devotion." },
      { title: 'The Tender Archive', description: 'You hold the world gently. Your scent is a memory half-remembered — powdery, warm, the kind that makes people feel inexplicably safe standing near you.' },
      { title: 'The Garden Hour', description: 'There is romance in the ordinary for you. Morning light, soft florals, the warmth of something familiar. You carry comfort like a second skin.' },
    ],
    fresh_natural: [
      { title: 'The Luminous Free Spirit', description: 'Bright, vital, and effortlessly alive. You are drawn to scents of sunlight on skin, crisp linens, and morning air. Your energy is infectious and clean.' },
      { title: 'The Open Sky', description: 'You feel best when unencumbered. Green, airy, and genuinely present — your scent is the olfactory equivalent of a window thrown wide open on a clear morning.' },
      { title: 'The Unfiltered', description: 'No pretence, no performance. You gravitate toward what is real — fresh skin, clean water, the green of something just cut. Your beauty is effortless because it is honest.' },
      { title: 'The First Light', description: 'There is something quietly optimistic about you. Citrus, dew, the coolness before the day heats up. You carry a freshness that feels less like fragrance and more like atmosphere.' },
    ],
    warm_sensual: [
      { title: 'The Velvet Indulgent', description: 'Luxury is your love language. Rich ambers, opulent textures, and deep nourishment — you believe in wrapping yourself in warmth and never apologizing for pleasure.' },
      { title: 'The Golden Hour', description: 'You move slowly and on purpose. Warm skin, amber light, the kind of scent that deepens through the day. You are not in a rush — and everything you touch knows it.' },
      { title: 'The Ember', description: 'There is heat at your core. Spiced, golden, and deeply nourishing — your presence warms the air around you. You choose comfort that borders on ceremony.' },
      { title: 'The Slow Burn', description: 'You reveal yourself over time. Warm top notes that open into something richer, deeper, more complex. The longer someone knows you, the more they discover.' },
    ],
    elegant_classic: [
      { title: 'The Timeless Muse', description: 'You embody enduring sophistication. Balanced, refined, and versatile — your choices transcend trends and speak to a heritage of impeccable taste.' },
      { title: 'The Perennial', description: 'Trends come and go. You were never interested. Your taste is rooted in something deeper — a sense of what has always worked and always will.' },
      { title: 'The Composed', description: 'You carry yourself with a quiet authority that never needs to announce itself. Classic notes, considered choices, and a presence that reads as both familiar and entirely your own.' },
      { title: 'The Inherited Grace', description: 'Your aesthetic feels like something passed down — worn in, trusted, and irreplaceable. You are drawn to what has proven itself over time, because you know the difference.' },
    ],
  }

  const options = descriptions[type] ?? descriptions.elegant_classic
 const seed = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
return options[seed % options.length]
}

function getPersonalityTags(type: PersonalityType): string[] {
  const tagMap: Record<PersonalityType, string[]> = {
    sophisticated_minimalist: ['minimal', 'clean', 'skin_scent', 'fresh', 'lightweight'],
    bold_adventurer:          ['bold', 'woody', 'smoky', 'oud', 'heavy_projection'],
    gentle_romantic:          ['soft', 'floral', 'sweet', 'moderate_projection', 'celebratory'],
    fresh_natural:            ['minimal', 'fresh', 'clean', 'citrus', 'energizing'],
    warm_sensual:             ['sensual', 'warm', 'gourmand', 'amber', 'vanilla', 'evening'],
    elegant_classic:          ['soft', 'floral', 'warm', 'sweet', 'fresh'],
  }
  return tagMap[type]
}

export function matchProducts(
  products: Product[],
  responses: QuizResponse[],
  personalityType: PersonalityType,
  category: 'fragrance' | 'bodycare' = 'fragrance'
): Product[] {
  const rawResponseTags = collectResponseTags(responses, category)
  const rawPersonalityTags = getPersonalityTags(personalityType)
  const searchTags = new Set(expandVibeToScent([...rawResponseTags, ...rawPersonalityTags]))

  const scoredProducts = products
    .filter(p => p.category === category) // only match same category
    .map(product => {
      const productTags = parseProductTags(product.personality_tags)
      
      let score = 0
      let matchCount = 0

      // Score each product tag against search tags
      // Using includes() instead of exact match to handle partial overlaps
      // e.g. "warm spicy" contains "warm" and "spicy"
      searchTags.forEach(searchTag => {
        productTags.forEach(productTag => {
          if (productTag === searchTag) {
            score += 3  // exact match
            matchCount++
          } else if (productTag.includes(searchTag) || searchTag.includes(productTag)) {
            score += 1  // partial match
            matchCount++
          }
        })
      })

      // Also score against description text
      const desc = (product.description ?? product.short_description ?? '').toLowerCase()
      rawResponseTags.forEach(tag => {
        const keyword = normalizeTag(tag).replace(/_/g, ' ')
        if (keyword.length > 3 && desc.includes(keyword)) score += 1
      })

      return { product, matchCount, score }
    })

  return scoredProducts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(item => item.product)
}