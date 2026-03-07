import type { QuizQuestion } from '@/lib/types/quiz'

// ─── Fragrance Persona Test ───
// Asks about moods, memories, and textures. The AI translates
// these abstract concepts into scent families.
export const fragranceQuestions: QuizQuestion[] = [
  {
    id: 'texture',
    question: 'Choose the fabric that matches your current energy.',
    description: 'Close your eyes. What are you reaching for?',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'linen',
        label: 'Crisp, Sun-Dried Linen',
        description: 'Freshly pressed, wind-blown, effortlessly clean',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
        tags: ['fresh', 'citrus', 'aldehydic'],
      },
      {
        id: 'velvet',
        label: 'Heavy, Crushed Silk Velvet',
        description: 'Deep, opulent, draped in richness',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
        tags: ['oriental', 'spicy', 'gourmand'],
      },
      {
        id: 'leather',
        label: 'Worn-In, Supple Leather',
        description: 'Lived-in warmth, quiet confidence, raw edge',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
        tags: ['woody', 'smoky', 'musk'],
      },
      {
        id: 'cashmere',
        label: 'Soft, Floating Cashmere',
        description: 'Weightless comfort, gentle warmth, close to skin',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
        tags: ['vanilla', 'powdery', 'soft_floral'],
      },
    ],
  },
  {
    id: 'setting',
    question: 'You have an entirely free afternoon. Where are we finding you?',
    description: 'No obligations. Just you and this place.',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'greenhouse',
        label: 'A Humid, Sunlit Greenhouse',
        description: 'Surrounded by jasmine, wet earth, and dappled light',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
        tags: ['white_floral', 'green', 'jasmine'],
      },
      {
        id: 'piazza',
        label: 'A Bustling European Piazza',
        description: 'Espresso steam, warm stone, golden-hour light',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
        tags: ['bergamot', 'neroli', 'coffee'],
      },
      {
        id: 'forest',
        label: 'A Damp, Quiet Forest Path',
        description: 'Moss underfoot, cool air, cathedral of trees',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
        tags: ['cedar', 'pine', 'vetiver', 'oakmoss'],
      },
    ],
  },
  {
    id: 'impression',
    question: 'How do you want to be remembered after you leave the room?',
    description: 'The door closes. What lingers?',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'warm_inviting',
        label: 'Warm & Effortlessly Inviting',
        description: 'Like a cashmere blanket left on a chair — comforting, familiar, magnetic',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
        tags: ['skin_scent', 'amber', 'warm'],
      },
      {
        id: 'mysterious_bold',
        label: 'Mysterious, Bold & Slightly Dangerous',
        description: "They can't quite place it — but they can't stop thinking about it",
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
        tags: ['oud', 'patchouli', 'dark_rose'],
      },
      {
        id: 'clean_sharp',
        label: 'Clean, Sharp & Totally Put-Together',
        description: 'Precision. Clarity. Not a thread out of place.',
        image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&q=80',
        tags: ['iris', 'musk', 'white_tea'],
      },
    ],
  },
]

// ─── Body Care Consultation ───
// Blends practical skin needs with sensory desires.
export const bodycareQuestions: QuizQuestion[] = [
  {
    id: 'environment',
    question: 'What does your skin battle most during a typical week?',
    description: 'Think about what your skin endures day to day.',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'dry_air',
        label: 'Harsh, Recycled Office Air & AC',
        description: 'Your skin feels tight, parched, and thirsty by midday',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
        tags: ['deep_hydration', 'ceramides', 'body_butter'],
      },
      {
        id: 'pollution',
        label: 'City Pollution & Running Around',
        description: 'Grime, sweat, and environmental stress from dawn to dusk',
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80',
        tags: ['antioxidant', 'purifying', 'exfoliant'],
      },
      {
        id: 'sun',
        label: 'Sun Exposure & The Outdoors',
        description: 'Heat, UV rays, and the elements take their toll',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
        tags: ['aloe', 'vitamin_c', 'lightweight', 'soothing'],
      },
    ],
  },
  {
    id: 'sensory',
    question: 'Step out of the shower. How do you want your body care to feel?',
    description: 'That first moment when product meets skin.',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'rich',
        label: 'Rich & Cocooning',
        description: 'Deeply coated, sealed in moisture — a full embrace',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6f?w=600&q=80',
        tags: ['body_oil', 'shea_butter', 'thick_cream'],
      },
      {
        id: 'weightless',
        label: 'Weightless & Instant',
        description: 'Absorbs in seconds so you can get dressed and go',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
        tags: ['gel_lotion', 'squalane', 'water_cream'],
      },
      {
        id: 'active',
        label: 'Active & Tingling',
        description: 'A glow you can feel — energized, resurfaced skin',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
        tags: ['aha_bha', 'body_serum', 'resurfacing'],
      },
    ],
  },
  {
    id: 'goal',
    question: 'If your skin could ask for one favor right now, what would it be?',
    description: 'Let your skin speak.',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'smooth',
        label: '"Smooth out these rough bumps and texture."',
        description: 'Uneven patches, keratosis pilaris, stubborn dryness',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
        tags: ['exfoliating_scrub', 'lactic_acid', 'smoothing'],
      },
      {
        id: 'calm',
        label: '"Calm me down. I\'m irritated and tight."',
        description: 'Redness, sensitivity, reactive skin that needs peace',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
        tags: ['colloidal_oatmeal', 'fragrance_free', 'calming'],
      },
      {
        id: 'glow',
        label: '"Give me an undeniable, radiant glaze."',
        description: 'Luminous, glass-skin glow from head to toe',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
        tags: ['shimmer_oil', 'illuminating', 'radiance'],
      },
    ],
  },
]

// Legacy export for backwards compatibility
export const quizQuestions = fragranceQuestions
