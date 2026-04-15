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
// Minimalist approach to skin needs.
export const bodycareQuestions: QuizQuestion[] = [
  {
    id: 'environment',
    question: 'Your environment challenges your skin by...',
    description: '',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'dry_air',
        label: 'Dry air & AC',
        description: 'Skin feels tight by midday',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
        tags: ['deep_hydration', 'ceramides', 'body_butter'],
      },
      {
        id: 'pollution',
        label: 'City pollution',
        description: 'Grime and daily stress',
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80',
        tags: ['antioxidant', 'purifying', 'exfoliant'],
      },
      {
        id: 'sun',
        label: 'Sun & outdoors',
        description: 'Heat and UV exposure',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
        tags: ['aloe', 'vitamin_c', 'lightweight', 'soothing'],
      },
    ],
  },
  {
    id: 'texture',
    question: 'Preferred body care texture:',
    description: '',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'rich',
        label: 'Rich & coating',
        description: 'Deep moisture seal',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6f?w=600&q=80',
        tags: ['body_oil', 'shea_butter', 'thick_cream'],
      },
      {
        id: 'weightless',
        label: 'Weightless',
        description: 'Absorbs instantly',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
        tags: ['gel_lotion', 'squalane', 'water_cream'],
      },
      {
        id: 'active',
        label: 'Active',
        description: 'Energizing feel',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
        tags: ['aha_bha', 'body_serum', 'resurfacing'],
      },
    ],
  },
  {
    id: 'goal',
    question: 'Your skin needs:',
    description: '',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'smooth',
        label: 'Smoother texture',
        description: 'Even out rough patches',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
        tags: ['exfoliating_scrub', 'lactic_acid', 'smoothing'],
      },
      {
        id: 'calm',
        label: 'Calming relief',
        description: 'Soothe irritation',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
        tags: ['colloidal_oatmeal', 'fragrance_free', 'calming'],
      },
      {
        id: 'glow',
        label: 'Radiant glow',
        description: 'Luminous finish',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
        tags: ['shimmer_oil', 'illuminating', 'radiance'],
      },
    ],
  },
]

// ─── Personality Quiz ───
// Determines fragrance and body care personality type
export const personalityQuestions: QuizQuestion[] = [
  {
    id: 'morning',
    question: 'Your ideal morning starts with...',
    description: '',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'bold',
        label: 'A strong espresso and checking my to-do list.',
        description: 'Bold',
        tags: ['bold', 'confident', 'assertive'],
      },
      {
        id: 'soft',
        label: 'Fresh flowers, soft music, and a slow breakfast.',
        description: 'Soft',
        tags: ['soft', 'gentle', 'romantic'],
      },
      {
        id: 'minimal',
        label: 'Crisp white sheets, a cold shower, and an atmosphere of effortless calm.',
        description: 'Minimal',
        tags: ['minimal', 'clean', 'understated'],
      },
      {
        id: 'sensual',
        label: 'Soft sunlight through the curtains and the rich warmth of a silk robe.',
        description: 'Sensual',
        tags: ['sensual', 'warm', 'inviting'],
      },
    ],
  },
  {
    id: 'outfit',
    question: 'Choose your "Confidence" Outfit:',
    description: '',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'bold',
        label: 'A sharp blazer or a tailored suit that demands attention.',
        description: 'Bold',
        tags: ['bold', 'powerful', 'statement'],
      },
      {
        id: 'soft',
        label: 'A flowing dress or a soft, well-fitting knit sweater.',
        description: 'Soft',
        tags: ['soft', 'comfortable', 'elegant'],
      },
      {
        id: 'minimal',
        label: 'A clean white tee and classic denim.',
        description: 'Minimal',
        tags: ['minimal', 'classic', 'effortless'],
      },
      {
        id: 'sensual',
        label: 'Something dark, silk, or slightly mysterious.',
        description: 'Sensual',
        tags: ['sensual', 'mysterious', 'alluring'],
      },
    ],
  },
  {
    id: 'trail',
    question: 'What kind of "Trail" do you want to leave behind?',
    description: '',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'bold',
        label: 'I want people to smell me before I even enter the room.',
        description: 'Bold',
        tags: ['bold', 'noticeable', 'memorable'],
      },
      {
        id: 'soft',
        label: 'I want to smell like a bouquet of fresh-cut flowers.',
        description: 'Soft',
        tags: ['soft', 'floral', 'delicate'],
      },
      {
        id: 'minimal',
        label: 'I want people to think, "They just smell naturally clean."',
        description: 'Minimal',
        tags: ['minimal', 'clean', 'subtle'],
      },
      {
        id: 'sensual',
        label: 'I want to be "discovered". Only those close to me should smell it.',
        description: 'Sensual',
        tags: ['sensual', 'intimate', 'personal'],
      },
    ],
  },
  {
    id: 'scent_preference',
    question: 'Which of these scents do you naturally gravitate toward?',
    description: '',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'bold',
        label: 'Leather, strong coffee, or woodsmoke.',
        description: 'Bold',
        tags: ['bold', 'woody', 'smoky'],
      },
      {
        id: 'soft',
        label: 'Strawberries, vanilla cupcakes, or roses.',
        description: 'Soft',
        tags: ['soft', 'sweet', 'floral'],
      },
      {
        id: 'minimal',
        label: 'Sea salt, freshly washed laundry, or cut grass.',
        description: 'Minimal',
        tags: ['minimal', 'fresh', 'clean'],
      },
      {
        id: 'sensual',
        label: 'Dark chocolate, warm honey, or musk.',
        description: 'Sensual',
        tags: ['sensual', 'warm', 'gourmand'],
      },
    ],
  },
  {
    id: 'destination',
    question: 'Where are you headed today?',
    description: '',
    type: 'single',
    tags: [],
    options: [
      {
        id: 'bold',
        label: 'To a boardroom or a big social event to network.',
        description: 'Bold',
        tags: ['bold', 'professional', 'social'],
      },
      {
        id: 'soft',
        label: 'To a brunch date or a wedding.',
        description: 'Soft',
        tags: ['soft', 'social', 'celebratory'],
      },
      {
        id: 'minimal',
        label: 'To the office or running daily errands.',
        description: 'Minimal',
        tags: ['minimal', 'practical', 'everyday'],
      },
      {
        id: 'sensual',
        label: 'To an intimate dinner or a night out.',
        description: 'Sensual',
        tags: ['sensual', 'evening', 'romantic'],
      },
    ],
  },
]

// Legacy export for backwards compatibility
export const quizQuestions = fragranceQuestions
