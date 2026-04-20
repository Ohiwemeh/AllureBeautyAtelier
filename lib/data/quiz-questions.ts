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
      { 
        id: 'bold', 
        label: 'Leather, strong coffee, or woodsmoke.', 
        description: '', 
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', // ✅ FIXED: rich dark espresso/coffee
        tags: ['bold', 'woody', 'smoky'] 
      },
      { 
        id: 'soft', 
        label: 'Strawberries, vanilla cupcakes, or roses.', 
        description: '', 
        image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80',
        tags: ['soft', 'sweet', 'floral'] 
      },
      { 
        id: 'minimal', 
        label: 'Sea salt, freshly washed laundry, or cut grass.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679514/WhatsApp_Image_2026-04-16_at_19.58.11_zdtxyu.jpg',
        tags: ['minimal', 'fresh', 'clean'] 
      },
      { 
        id: 'sensual', 
        label: 'Dark chocolate, warm honey, or musk.', 
        description: '', 
        image: 'https://i.pinimg.com/736x/6f/b3/0a/6fb30ad18a207ff03b09a04ffee906d1.jpg',
        tags: ['sensual', 'warm', 'gourmand'] 
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
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679513/WhatsApp_Image_2026-04-16_at_20.39.51_v1ecql.jpg',
        tags: ['bold', 'heavy_projection'] 
      },
      { 
        id: 'soft', 
        label: 'I want to smell like a bouquet of fresh-cut flowers.', 
        description: '', 
        image: 'https://i.pinimg.com/736x/0f/73/5b/0f735b8cba7f689f8d3dcfe0e05a901b.jpg',
        tags: ['soft', 'moderate_projection'] 
      },
      { 
        id: 'minimal', 
        label: 'I want people to think, "They just smell naturally clean."', 
        description: '', 
        image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&q=80', // ✅ FIXED: fresh clean laundry/linen
        tags: ['minimal', 'skin_scent'] 
      },
      { 
        id: 'sensual', 
        label: 'I want to be "discovered". Only those close to me should smell it.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679513/WhatsApp_Image_2026-04-16_at_20.48.54_jxjatn.jpg', // ✅ FIXED: close intimate perfume scene
        tags: ['sensual', 'intimate_projection'] 
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
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679513/WhatsApp_Image_2026-04-16_at_20.52.31_vomy5w.jpg',
        tags: ['bold'] 
      },
      { 
        id: 'soft', 
        label: 'A flowing dress or a soft, well-fitted knit sweater.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679514/WhatsApp_Image_2026-04-16_at_21.14.59_vvoe8f.jpg',
        tags: ['soft'] 
      },
      { 
        id: 'minimal', 
        label: 'A clean white tee and classic denim.', 
        description: '', 
        image: 'https://i.pinimg.com/736x/b7/8d/86/b78d86fa697ea554964bb8348afe2b26.jpg',
        tags: ['minimal'] 
      },
      { 
        id: 'sensual', 
        label: 'Something dark, silk, or slightly mysterious.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679516/WhatsApp_Image_2026-04-16_at_21.19.22_f7su95.jpg', // ✅ FIXED: dark moody fashion/silk
        tags: ['sensual'] 
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
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679516/WhatsApp_Image_2026-04-16_at_21.21.51_geuwpw.jpg',
        tags: ['bold', 'professional'] 
      },
      { 
        id: 'soft', 
        label: 'To a brunch date or a wedding.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679513/WhatsApp_Image_2026-04-16_at_21.28.46_wblm80.jpg',
        tags: ['soft', 'celebratory'] 
      },
      { 
        id: 'minimal', 
        label: 'To the office or running daily errands.', 
        description: '', 
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
        tags: ['minimal', 'casual'] 
      },
      { 
        id: 'sensual', 
        label: 'To an intimate dinner or a night out.', 
        description: '', 
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
        tags: ['sensual', 'evening'] 
      },
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
      { 
        id: 'bold', 
        label: 'A strong espresso and checking my to-do list.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679514/WhatsApp_Image_2026-04-16_at_21.41.47_katlc5.jpg',
        tags: ['fast_absorbing', 'energizing'] 
      },
      { 
        id: 'soft', 
        label: 'Fresh flowers, soft music, and a slow breakfast.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679514/WhatsApp_Image_2026-04-16_at_21.45.48_izcz40.jpg',
        tags: ['rich_lotion', 'calming'] 
      },
      { 
        id: 'minimal', 
        label: 'Crisp white sheets, a cold shower, and an atmosphere of effortless calm.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679515/WhatsApp_Image_2026-04-16_at_21.51.13_copedh.jpg',
        tags: ['lightweight', 'cooling'] 
      },
      { 
        id: 'sensual', 
        label: 'Soft sunlight through the curtains and the rich warmth of a silk robe.', 
        description: '', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679515/WhatsApp_Image_2026-04-16_at_22.02.51_rlj235.jpg',
        tags: ['body_oil', 'luxurious'] 
      },
    ],
  },
  {
    id: 'destination',
    question: 'Where are you headed today?',
    description: 'Environmental factors affect your skin.',
    type: 'single',
    tags: [],
    options: [
      { 
        id: 'bold', 
        label: 'To a boardroom or a big social event to network.', 
        description: '', 
        image: 'https://i.pinimg.com/736x/dd/9f/74/dd9f74f5f13646a187a2656eeb84730f.jpg',
        tags: ['pollution_defense', 'matte_finish'] 
      },
      { 
        id: 'soft', 
        label: 'To a brunch date or a wedding.', 
        description: '', 
        image: 'https://i.pinimg.com/736x/35/c9/22/35c922f0e5f9298fb2f2f30835605ddc.jpg',
        tags: ['radiance', 'glow'] 
      },
      { 
        id: 'minimal', 
        label: 'To the office or running daily errands.', 
        description: '', 
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
        tags: ['spf_protection', 'barrier_repair'] 
      },
      { 
        id: 'sensual', 
        label: 'To an intimate dinner or a night out.', 
        description: '', 
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
        tags: ['shimmer', 'deep_moisture'] 
      },
    ],
  },
  {
    id: 'routine_speed',
    question: 'Post-shower routine length:',
    description: '',
    type: 'single',
    tags: [],
    options: [
      { 
        id: 'instant', 
        label: 'Under 5 Minutes', 
        description: 'Swipe and go.', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679515/WhatsApp_Image_2026-04-16_at_22.07.22_lxg5r1.jpg', // ✅ FIXED: body mist/spray product
        tags: ['spray', 'gel_lotion'] 
      },
      { 
        id: 'minute', 
        label: 'A few minutes', 
        description: 'Basic hydration.', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776679515/WhatsApp_Image_2026-04-16_at_22.12.46_jpkzx6.jpg',
        tags: ['daily_lotion', 'ceramides'] 
      },
      { 
        id: 'ritual', 
        label: 'It is a ritual', 
        description: 'Layering and massage.', 
        image: 'https://res.cloudinary.com/dufw6bsko/image/upload/v1776283915/WhatsApp_Image_2026-04-10_at_22.39.10_ynpb1w.jpg',
        tags: ['body_butter', 'oil'] 
      },
    ],
  },
  {
    id: 'primary_need',
    question: 'Right now, your skin feels:',
    description: '',
    type: 'single',
    tags: [],
    options: [
      { 
        id: 'tight', 
        label: 'Tight and dry', 
        description: 'Needs heavy moisture.', 
        image: 'https://i.pinimg.com/736x/bf/4c/ce/bf4cce6c3de0a01566ee6ed936714b7d.jpg',
        tags: ['deep_hydration', 'shea'] 
      },
      { 
        id: 'rough', 
        label: 'Rough or bumpy', 
        description: 'Needs smoothing.', 
        image: 'https://i.pinimg.com/1200x/59/80/04/598004288ef26767c0e0734c8c9d6d7a.jpg', // ✅ FIXED: body scrub/exfoliant
        tags: ['exfoliant', 'aha_bha'] 
      },
      { 
        id: 'fine', 
        label: 'Normal', 
        description: 'Just basic maintenance.', 
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
        tags: ['balancing', 'daily_care'] 
      },
    ],
  },
]