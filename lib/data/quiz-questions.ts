import type { QuizQuestion } from '@/lib/types/quiz'

// ─── FRAGRANCE SECTION ───
// Focuses on aura, projection, and sensory preferences.
export const fragranceQuestions: QuizQuestion[] = [
  {
    id: 'scent_preference',
    question: 'Which of these scents do you naturally gravitate toward?',
    description: '',
    type: 'single',
    tags: [],
    options: [
      { id: 'bold', label: 'Leather, strong coffee, or woodsmoke.', description: '', tags: ['bold', 'woody', 'smoky'] },
      { id: 'soft', label: 'Strawberries, vanilla cupcakes, or roses.', description: '', tags: ['soft', 'sweet', 'floral'] },
      { id: 'minimal', label: 'Sea salt, freshly washed laundry, or cut grass.', description: '', tags: ['minimal', 'fresh', 'clean'] },
      { id: 'sensual', label: 'Dark chocolate, warm honey, or musk.', description: '', tags: ['sensual', 'warm', 'gourmand'] },
    ],
  },
  {
    id: 'trail',
    question: 'What kind of "Trail" do you want to leave behind?',
    description: '',
    type: 'single',
    tags: [],
    options: [
      { id: 'bold', label: 'I want people to smell me before I even enter the room.', description: '', tags: ['bold', 'heavy_projection'] },
      { id: 'soft', label: 'I want to smell like a bouquet of fresh-cut flowers.', description: '', tags: ['soft', 'moderate_projection'] },
      { id: 'minimal', label: 'I want people to think, "They just smell naturally clean."', description: '', tags: ['minimal', 'skin_scent'] },
      { id: 'sensual', label: 'I want to be "discovered". Only those close to me should smell it.', description: '', tags: ['sensual', 'intimate_projection'] },
    ],
  },
  {
    id: 'outfit',
    question: 'Choose your "Confidence" Outfit:',
    description: '',
    type: 'single',
    tags: [],
    options: [
      { id: 'bold', label: 'A sharp blazer or a tailored suit that demands attention.', description: '', tags: ['bold'] },
      { id: 'soft', label: 'A flowing dress or a soft, well-fitted knit sweater.', description: '', tags: ['soft'] },
      { id: 'minimal', label: 'A clean white tee and classic denim.', description: '', tags: ['minimal'] },
      { id: 'sensual', label: 'Something dark, silk, or slightly mysterious.', description: '', tags: ['sensual'] },
    ],
  },
  {
    id: 'destination',
    question: 'Where are you headed today?',
    description: '',
    type: 'single',
    tags: [],
    options: [
      { id: 'bold', label: 'To a boardroom or a big social event to network.', description: '', tags: ['bold', 'professional'] },
      { id: 'soft', label: 'To a brunch date or a wedding.', description: '', tags: ['soft', 'celebratory'] },
      { id: 'minimal', label: 'To the office or running daily errands.', description: '', tags: ['minimal', 'casual'] },
      { id: 'sensual', label: 'To an intimate dinner or a night out.', description: '', tags: ['sensual', 'evening'] },
    ],
  },
]

// ─── BODY CARE SECTION ───
// Minimalist approach combining lifestyle context with functional skin needs.
export const bodycareQuestions: QuizQuestion[] = [
  {
    id: 'morning',
    question: 'Your ideal morning starts with...',
    description: 'This tells us how much time you have for your routine.',
    type: 'single',
    tags: [],
    options: [
      { id: 'bold', label: 'A strong espresso and checking my to-do list.', description: '', tags: ['fast_absorbing', 'energizing'] },
      { id: 'soft', label: 'Fresh flowers, soft music, and a slow breakfast.', description: '', tags: ['rich_lotion', 'calming'] },
      { id: 'minimal', label: 'Crisp white sheets, a cold shower, and an atmosphere of effortless calm.', description: '', tags: ['lightweight', 'cooling'] },
      { id: 'sensual', label: 'Soft sunlight through the curtains and the rich warmth of a silk robe.', description: '', tags: ['body_oil', 'luxurious'] },
    ],
  },
  {
    id: 'destination',
    question: 'Where are you headed today?',
    description: 'Environmental factors affect your skin.',
    type: 'single',
    tags: [],
    options: [
      { id: 'bold', label: 'To a boardroom or a big social event to network.', description: '', tags: ['pollution_defense', 'matte_finish'] },
      { id: 'soft', label: 'To a brunch date or a wedding.', description: '', tags: ['radiance', 'glow'] },
      { id: 'minimal', label: 'To the office or running daily errands.', description: '', tags: ['spf_protection', 'barrier_repair'] },
      { id: 'sensual', label: 'To an intimate dinner or a night out.', description: '', tags: ['shimmer', 'deep_moisture'] },
    ],
  },
  {
    id: 'routine_speed',
    question: 'Post-shower routine length:',
    description: '',
    type: 'single',
    tags: [],
    options: [
      { id: 'instant', label: 'Under 30 seconds', description: 'Swipe and go.', tags: ['spray', 'gel_lotion'] },
      { id: 'minute', label: 'A few minutes', description: 'Basic hydration.', tags: ['daily_lotion', 'ceramides'] },
      { id: 'ritual', label: 'It is a ritual', description: 'Layering and massage.', tags: ['body_butter', 'oil'] },
    ],
  },
  {
    id: 'primary_need',
    question: 'Right now, your skin feels:',
    description: '',
    type: 'single',
    tags: [],
    options: [
      { id: 'tight', label: 'Tight and dry', description: 'Needs heavy moisture.', tags: ['deep_hydration', 'shea'] },
      { id: 'rough', label: 'Rough or bumpy', description: 'Needs smoothing.', tags: ['exfoliant', 'aha_bha'] },
      { id: 'fine', label: 'Normal', description: 'Just basic maintenance.', tags: ['balancing', 'daily_care'] },
    ],
  },
]