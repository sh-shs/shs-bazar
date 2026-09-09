/**
 * Bangla Bazar - Local Category Auto Icon Mapping Library
 * Fully offline, 100% self-contained vector SVG Data URLs for category fallback images.
 */

function createSvgDataUri(svgContent) {
  const cleanSvg = svgContent
    .trim()
    .replace(/\s+/g, ' ');
  return `data:image/svg+xml,${encodeURIComponent(cleanSvg)}`;
}

// Crisp, high-definition 200x200 SVG category icons
export const CATEGORY_ICON_SVGS = {
  electronics: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-elec" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E3A8A"/>
          <stop offset="100%" stop-color="#3B82F6"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-elec)"/>
      <rect x="40" y="50" width="120" height="75" rx="8" fill="#FFFFFF"/>
      <rect x="48" y="58" width="104" height="59" rx="4" fill="#1E293B"/>
      <path d="M 75 140 L 125 140 L 135 150 L 65 150 Z" fill="#E2E8F0"/>
      <rect x="30" y="150" width="140" height="8" rx="4" fill="#94A3B8"/>
      <circle cx="100" cy="87" r="12" fill="#3B82F6" opacity="0.8"/>
      <path d="M 92 87 A 8 8 0 0 1 108 87" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>
  `),

  fashion: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-fash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#831843"/>
          <stop offset="100%" stop-color="#EC4899"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-fash)"/>
      <path d="M 60 55 L 85 40 L 100 55 L 115 40 L 140 55 L 125 80 L 115 75 L 115 160 L 85 160 L 85 75 L 75 80 Z" fill="#FFFFFF"/>
      <path d="M 85 40 L 100 60 L 115 40" stroke="#EC4899" stroke-width="4" fill="none"/>
    </svg>
  `),

  beauty: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-beauty" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#701A75"/>
          <stop offset="100%" stop-color="#D946EF"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-beauty)"/>
      <rect x="80" y="100" width="40" height="60" rx="6" fill="#F3E8FF"/>
      <rect x="86" y="70" width="28" height="30" rx="2" fill="#E9D5FF"/>
      <path d="M 88 70 L 100 35 L 112 70 Z" fill="#F43F5E"/>
      <circle cx="138" cy="65" r="10" fill="#FDE047" opacity="0.9"/>
      <circle cx="62" cy="115" r="7" fill="#FDE047" opacity="0.8"/>
    </svg>
  `),

  home: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-home" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#065F46"/>
          <stop offset="100%" stop-color="#10B981"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-home)"/>
      <path d="M 100 40 L 40 90 L 55 90 L 55 160 L 145 160 L 145 90 L 160 90 Z" fill="#FFFFFF"/>
      <rect x="85" y="110" width="30" height="50" rx="3" fill="#10B981"/>
      <rect x="70" y="100" width="20" height="20" rx="2" fill="#065F46" opacity="0.2"/>
    </svg>
  `),

  kids: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-kids" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C2410C"/>
          <stop offset="100%" stop-color="#FB923C"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-kids)"/>
      <circle cx="100" cy="100" r="45" fill="#FFFFFF"/>
      <circle cx="85" cy="90" r="6" fill="#C2410C"/>
      <circle cx="115" cy="90" r="6" fill="#C2410C"/>
      <path d="M 85 112 Q 100 128 115 112" stroke="#C2410C" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 70 55 C 60 40 85 30 95 50" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 130 55 C 140 40 115 30 105 50" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round"/>
    </svg>
  `),

  kitchen: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-kitch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#991B1B"/>
          <stop offset="100%" stop-color="#EF4444"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-kitch)"/>
      <rect x="50" y="85" width="100" height="60" rx="10" fill="#FFFFFF"/>
      <rect x="40" y="75" width="120" height="12" rx="4" fill="#FEF2F2"/>
      <circle cx="100" cy="65" r="8" fill="#FFFFFF"/>
      <path d="M 30 100 C 20 100 20 120 30 120 L 50 120 L 50 100 Z" fill="#FEF2F2"/>
      <path d="M 170 100 C 180 100 180 120 170 120 L 150 120 L 150 100 Z" fill="#FEF2F2"/>
    </svg>
  `),

  shoes: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-shoes" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0F766E"/>
          <stop offset="100%" stop-color="#14B8A6"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-shoes)"/>
      <path d="M 40 120 L 55 75 C 60 70 75 70 90 85 L 125 95 C 145 95 160 110 165 125 L 165 140 L 40 140 Z" fill="#FFFFFF"/>
      <rect x="35" y="135" width="135" height="15" rx="5" fill="#CCFBF1"/>
      <circle cx="80" cy="95" r="4" fill="#0F766E"/>
      <circle cx="95" cy="102" r="4" fill="#0F766E"/>
      <circle cx="110" cy="108" r="4" fill="#0F766E"/>
    </svg>
  `),

  toys: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-toys" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6B21A8"/>
          <stop offset="100%" stop-color="#A855F7"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-toys)"/>
      <rect x="45" y="70" width="110" height="60" rx="20" fill="#FFFFFF"/>
      <circle cx="75" cy="100" r="16" fill="#E9D5FF"/>
      <path d="M 75 90 L 75 110 M 65 100 L 85 100" stroke="#6B21A8" stroke-width="4" stroke-linecap="round"/>
      <circle cx="125" cy="92" r="6" fill="#F43F5E"/>
      <circle cx="137" cy="104" r="6" fill="#3B82F6"/>
      <circle cx="113" cy="104" r="6" fill="#10B981"/>
      <circle cx="125" cy="116" r="6" fill="#F59E0B"/>
    </svg>
  `),

  books: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-books" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E40AF"/>
          <stop offset="100%" stop-color="#60A5FA"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-books)"/>
      <path d="M 100 65 Q 65 50 35 60 L 35 145 Q 65 135 100 150 Q 135 135 165 145 L 165 60 Q 135 50 100 65 Z" fill="#FFFFFF"/>
      <line x1="100" y1="65" x2="100" y2="150" stroke="#93C5FD" stroke-width="4"/>
      <line x1="45" y1="80" x2="85" y2="75" stroke="#BFDBFE" stroke-width="3" stroke-linecap="round"/>
      <line x1="45" y1="95" x2="85" y2="90" stroke="#BFDBFE" stroke-width="3" stroke-linecap="round"/>
      <line x1="115" y1="75" x2="155" y2="80" stroke="#BFDBFE" stroke-width="3" stroke-linecap="round"/>
      <line x1="115" y1="90" x2="155" y2="95" stroke="#BFDBFE" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `),

  health: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-health" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9F1239"/>
          <stop offset="100%" stop-color="#F43F5E"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-health)"/>
      <path d="M 100 155 C 40 110 35 75 60 55 C 80 40 95 55 100 65 C 105 55 120 40 140 55 C 165 75 160 110 100 155 Z" fill="#FFFFFF"/>
      <rect x="91" y="75" width="18" height="46" rx="3" fill="#F43F5E"/>
      <rect x="77" y="89" width="46" height="18" rx="3" fill="#F43F5E"/>
    </svg>
  `),

  automotive: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-auto" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#374151"/>
          <stop offset="100%" stop-color="#6B7280"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-auto)"/>
      <path d="M 50 110 L 65 75 C 70 65 80 60 100 60 C 120 60 130 65 135 75 L 150 110 L 165 110 C 170 110 175 115 175 120 L 175 140 L 25 140 L 25 120 C 25 115 30 110 35 110 Z" fill="#FFFFFF"/>
      <circle cx="55" cy="140" r="16" fill="#1F2937"/>
      <circle cx="55" cy="140" r="8" fill="#F3F4F6"/>
      <circle cx="145" cy="140" r="16" fill="#1F2937"/>
      <circle cx="145" cy="140" r="8" fill="#F3F4F6"/>
      <circle cx="45" cy="120" r="6" fill="#F59E0B"/>
      <circle cx="155" cy="120" r="6" fill="#EF4444"/>
    </svg>
  `),

  mobile: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-mob" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#312E81"/>
          <stop offset="100%" stop-color="#6366F1"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-mob)"/>
      <rect x="65" y="40" width="70" height="120" rx="14" fill="#FFFFFF"/>
      <rect x="71" y="52" width="58" height="92" rx="4" fill="#1E1B4B"/>
      <circle cx="100" cy="150" r="4" fill="#6366F1"/>
      <path d="M 88 46 H 112" stroke="#E0E7FF" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `),

  sports: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-sports" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#15803D"/>
          <stop offset="100%" stop-color="#22C55E"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-sports)"/>
      <circle cx="100" cy="100" r="50" fill="#FFFFFF"/>
      <circle cx="100" cy="100" r="50" stroke="#166534" stroke-width="4" fill="none"/>
      <path d="M 75 60 C 90 85 90 115 75 140" stroke="#166534" stroke-width="5" fill="none"/>
      <path d="M 125 60 C 110 85 110 115 125 140" stroke="#166534" stroke-width="5" fill="none"/>
      <line x1="60" y1="100" x2="140" y2="100" stroke="#166534" stroke-width="5"/>
    </svg>
  `),

  default: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-def" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0B4D3C"/>
          <stop offset="100%" stop-color="#F5820A"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-def)"/>
      <path d="M 45 70 C 45 62 50 55 60 55 L 80 55 L 95 70 L 140 70 C 150 70 155 75 155 85 L 155 135 C 155 145 150 150 140 150 L 60 150 C 50 150 45 145 45 135 Z" fill="#FFFFFF"/>
      <path d="M 45 80 L 155 80" stroke="#F5820A" stroke-width="3" opacity="0.3"/>
    </svg>
  `)
};

// Keyword mapping configuration with English and Bengali support
const CATEGORY_KEYWORDS = [
  {
    key: 'electronics',
    keywords: ['electronic', 'electronics', 'ইলেকট্রনিক্স', 'laptop', 'computer', 'tv', 'gadget', 'audio', 'hardware']
  },
  {
    key: 'fashion',
    keywords: ['fashion', 'ফ্যাশন', 'clothing', 'apparel', 'dress', 'shirt', 'pant', 'wear', 'cloth', 'style', 'পোশাক']
  },
  {
    key: 'beauty',
    keywords: ['beauty', 'personal care', 'বিউটি', 'পার্সোনাল কেয়ার', 'cosmetic', 'skincare', 'makeup', 'care', 'grooming', 'perfume', 'সৌন্দর্য']
  },
  {
    key: 'home',
    keywords: ['home', 'living', 'home & living', 'হোম', 'লিভিং', 'furniture', 'decor', 'house', 'bed', 'sofa', 'ফার্নিচার', 'গৃহস্থালী']
  },
  {
    key: 'kids',
    keywords: ['kids', 'baby', 'kids & baby', 'কিডস', 'বেবি', 'child', 'infant', 'toddler', 'nursery', 'শিশু', 'বাচ্চা']
  },
  {
    key: 'kitchen',
    keywords: ['kitchen', 'dining', 'kitchen & dining', 'কিচেন', 'ডাইনিং', 'cook', 'tableware', 'pot', 'pan', 'oven', 'রান্নাঘর']
  },
  {
    key: 'shoes',
    keywords: ['shoes', 'footwear', 'shoes & footwear', 'জুতা', 'শু', 'sneaker', 'boot', 'sandal', 'জুতো']
  },
  {
    key: 'toys',
    keywords: ['toys', 'games', 'toys & games', 'খেলনা', 'game', 'puzzle', 'doll']
  },
  {
    key: 'books',
    keywords: ['books', 'stationery', 'books & stationery', 'বই', 'খাতা', 'বই-খাতা', 'paper', 'pen', 'notebook', 'স্টেশনারি']
  },
  {
    key: 'health',
    keywords: ['health', 'wellness', 'health & wellness', 'স্বাস্থ্য', 'ওয়েলনেস', 'ওয়েলনেস', 'medicine', 'fitness', 'medical', 'মেডিসিন']
  },
  {
    key: 'automotive',
    keywords: ['automotive', 'অটোমোবাইল', 'গাড়ি', 'গাড়ী', 'car', 'auto', 'vehicle', 'motor', 'bike']
  },
  {
    key: 'mobile',
    keywords: ['mobile', 'mobile accessories', 'মোবাইল', 'ফোন', 'এক্সেসরিজ', 'charger', 'case', 'headphone', 'earphone', 'cable', 'accessory']
  },
  {
    key: 'sports',
    keywords: ['sports', 'outdoor', 'sports & outdoor', 'খেলাধুলা', 'স্পোর্টস', 'আউটডোর', 'sport', 'gym', 'fitness', 'cricket', 'football', 'ball']
  }
];

/**
 * Gets the corresponding SVG Data URI for a given category name based on keyword matching.
 * @param {string} categoryName - Name of the category
 * @returns {string} SVG Data URI
 */
export function getCategoryAutoIcon(categoryName) {
  if (!categoryName || typeof categoryName !== 'string') {
    return CATEGORY_ICON_SVGS.default;
  }

  const nameLower = categoryName.toLowerCase().trim();
  if (!nameLower) {
    return CATEGORY_ICON_SVGS.default;
  }

  for (const item of CATEGORY_KEYWORDS) {
    const match = item.keywords.some(kw => nameLower.includes(kw.toLowerCase()));
    if (match) {
      return CATEGORY_ICON_SVGS[item.key] || CATEGORY_ICON_SVGS.default;
    }
  }

  return CATEGORY_ICON_SVGS.default;
}

if (typeof window !== 'undefined') {
  window.getCategoryAutoIcon = getCategoryAutoIcon;
  window.CATEGORY_ICON_SVGS = CATEGORY_ICON_SVGS;
}
