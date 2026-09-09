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
  // 1. Electronics: Power plug & circuit board
  electronics: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-elec" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E1B4B"/>
          <stop offset="100%" stop-color="#3B82F6"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-elec)"/>
      <!-- Plug Body -->
      <rect x="65" y="85" width="70" height="55" rx="10" fill="#FFFFFF"/>
      <rect x="80" y="50" width="10" height="35" rx="4" fill="#E0E7FF"/>
      <rect x="110" y="50" width="10" height="35" rx="4" fill="#E0E7FF"/>
      <path d="M 100 140 L 100 170 C 100 175 90 175 90 170" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- Circuit lines & nodes -->
      <circle cx="50" cy="50" r="6" fill="#60A5FA"/>
      <path d="M 50 50 L 50 80 L 65 80" stroke="#60A5FA" stroke-width="3" fill="none"/>
      <circle cx="150" cy="50" r="6" fill="#60A5FA"/>
      <path d="M 150 50 L 150 80 L 135 80" stroke="#60A5FA" stroke-width="3" fill="none"/>
      <circle cx="40" cy="120" r="5" fill="#38BDF8"/>
      <line x1="40" y1="120" x2="65" y2="120" stroke="#38BDF8" stroke-width="3"/>
    </svg>
  `),

  // 2. Computers & Accessories: Laptop computer & keyboard
  computers: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0F172A"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-comp)"/>
      <!-- Screen -->
      <rect x="45" y="45" width="110" height="75" rx="8" fill="#FFFFFF"/>
      <rect x="52" y="52" width="96" height="61" rx="4" fill="#0F172A"/>
      <!-- Screen Code Lines -->
      <rect x="60" y="62" width="40" height="6" rx="3" fill="#38BDF8"/>
      <rect x="60" y="74" width="60" height="6" rx="3" fill="#818CF8"/>
      <rect x="60" y="86" width="30" height="6" rx="3" fill="#34D399"/>
      <!-- Base & Keyboard -->
      <path d="M 30 130 L 170 130 L 180 148 C 180 152 175 155 170 155 L 30 155 C 25 155 20 152 20 148 Z" fill="#E2E8F0"/>
      <rect x="85" y="134" width="30" height="4" rx="2" fill="#94A3B8"/>
    </svg>
  `),

  // 3. Mobile & Accessories: Smartphone
  mobile: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-mob" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#312E81"/>
          <stop offset="100%" stop-color="#6366F1"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-mob)"/>
      <rect x="65" y="35" width="70" height="130" rx="14" fill="#FFFFFF"/>
      <rect x="71" y="47" width="58" height="102" rx="4" fill="#1E1B4B"/>
      <!-- Notch & Home bar -->
      <rect x="90" y="41" width="20" height="3" rx="1.5" fill="#C7D2FE"/>
      <rect x="88" y="152" width="24" height="3" rx="1.5" fill="#818CF8"/>
      <!-- App Grid Icons -->
      <rect x="78" y="58" width="18" height="18" rx="4" fill="#F43F5E"/>
      <rect x="104" y="58" width="18" height="18" rx="4" fill="#10B981"/>
      <rect x="78" y="84" width="18" height="18" rx="4" fill="#F59E0B"/>
      <rect x="104" y="84" width="18" height="18" rx="4" fill="#3B82F6"/>
    </svg>
  `),

  // 4. Tools & Hardware: Wrench & Hammer
  tools: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-tools" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7C2D12"/>
          <stop offset="100%" stop-color="#EA580C"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-tools)"/>
      <!-- Hammer -->
      <g transform="rotate(45 100 100)">
        <rect x="92" y="50" width="16" height="100" rx="4" fill="#FFEDD5"/>
        <path d="M 70 40 L 130 40 L 130 60 L 70 60 Z" fill="#FFFFFF"/>
        <rect x="65" y="43" width="10" height="14" rx="2" fill="#FED7AA"/>
      </g>
      <!-- Wrench -->
      <g transform="rotate(-45 100 100)">
        <rect x="93" y="40" width="14" height="110" rx="4" fill="#FFFFFF"/>
        <circle cx="100" cy="45" r="18" fill="#FFFFFF"/>
        <circle cx="100" cy="45" r="9" fill="#7C2D12"/>
        <rect x="95" y="30" width="10" height="16" fill="#7C2D12"/>
      </g>
    </svg>
  `),

  // 5. Home Appliances: Refrigerator & Blender
  home_appliances: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-appliance" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064E3B"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-appliance)"/>
      <!-- Refrigerator -->
      <rect x="40" y="40" width="60" height="120" rx="8" fill="#FFFFFF"/>
      <line x1="40" y1="85" x2="100" y2="85" stroke="#059669" stroke-width="3"/>
      <rect x="46" y="60" width="4" height="18" rx="2" fill="#064E3B"/>
      <rect x="46" y="98" width="4" height="24" rx="2" fill="#064E3B"/>
      <!-- Blender -->
      <rect x="120" y="115" width="40" height="45" rx="6" fill="#D1FAE5"/>
      <path d="M 125 115 L 120 65 L 160 65 L 155 115 Z" fill="#FFFFFF" opacity="0.9"/>
      <rect x="128" y="57" width="24" height="8" rx="3" fill="#064E3B"/>
      <circle cx="140" cy="135" r="5" fill="#064E3B"/>
    </svg>
  `),

  // 6. Home & Living: Sofa & House Lamp
  home: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-home" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#065F46"/>
          <stop offset="100%" stop-color="#10B981"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-home)"/>
      <!-- Sofa Backrest -->
      <rect x="40" y="80" width="120" height="45" rx="10" fill="#FFFFFF"/>
      <!-- Sofa Armrests -->
      <rect x="30" y="95" width="22" height="50" rx="8" fill="#A7F3D0"/>
      <rect x="148" y="95" width="22" height="50" rx="8" fill="#A7F3D0"/>
      <!-- Sofa Cushion Seat -->
      <rect x="48" y="115" width="104" height="30" rx="6" fill="#ECFDF5"/>
      <!-- Legs -->
      <rect x="42" y="145" width="8" height="15" rx="2" fill="#065F46"/>
      <rect x="150" y="145" width="8" height="15" rx="2" fill="#065F46"/>
      <!-- Wall Art Frame -->
      <rect x="80" y="40" width="40" height="30" rx="4" fill="#A7F3D0"/>
      <path d="M 90 60 L 100 48 L 110 60 Z" fill="#065F46"/>
    </svg>
  `),

  // 7. Health & Wellness: Heart & Medical Cross
  health: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-health" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#881337"/>
          <stop offset="100%" stop-color="#E11D48"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-health)"/>
      <!-- Heart -->
      <path d="M 100 160 C 40 115 35 75 62 52 C 82 35 96 52 100 62 C 104 52 118 35 138 52 C 165 75 160 115 100 160 Z" fill="#FFFFFF"/>
      <!-- Medical Cross -->
      <rect x="91" y="78" width="18" height="46" rx="4" fill="#E11D48"/>
      <rect x="77" y="92" width="46" height="18" rx="4" fill="#E11D48"/>
    </svg>
  `),

  // 8. Sports & Fitness: Gym Dumbbell
  sports: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-sports" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14532D"/>
          <stop offset="100%" stop-color="#16A34A"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-sports)"/>
      <!-- Dumbbell in diagonal rotation -->
      <g transform="rotate(-30 100 100)">
        <rect x="40" y="92" width="120" height="16" rx="4" fill="#DCFCE7"/>
        <!-- Left Weights -->
        <rect x="42" y="65" width="16" height="70" rx="6" fill="#FFFFFF"/>
        <rect x="58" y="75" width="12" height="50" rx="4" fill="#86EFAC"/>
        <!-- Right Weights -->
        <rect x="142" y="65" width="16" height="70" rx="6" fill="#FFFFFF"/>
        <rect x="130" y="75" width="12" height="50" rx="4" fill="#86EFAC"/>
      </g>
    </svg>
  `),

  // 9. Beauty & Personal Care: Lipstick & Perfume Bottle
  beauty: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-beauty" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#701A75"/>
          <stop offset="100%" stop-color="#D946EF"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-beauty)"/>
      <!-- Perfume Bottle -->
      <rect x="50" y="90" width="55" height="65" rx="10" fill="#FFFFFF"/>
      <rect x="65" y="72" width="25" height="18" fill="#F5D0FE"/>
      <rect x="60" y="60" width="35" height="12" rx="4" fill="#FDE047"/>
      <circle cx="77.5" cy="122.5" r="12" fill="#F5D0FE"/>
      <!-- Lipstick -->
      <rect x="125" y="105" width="30" height="50" rx="5" fill="#F5D0FE"/>
      <rect x="129" y="80" width="22" height="25" fill="#E9D5FF"/>
      <path d="M 129 80 L 151 80 L 151 50 Z" fill="#F43F5E"/>
    </svg>
  `),

  // 10. Fashion & Clothing: Clothes Hanger & Shirt
  fashion: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-fash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#831843"/>
          <stop offset="100%" stop-color="#EC4899"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-fash)"/>
      <!-- Hanger Hook -->
      <path d="M 100 55 C 90 55 90 35 100 35 C 110 35 110 45 105 50 L 100 55" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Shirt body -->
      <path d="M 55 75 L 80 60 L 100 70 L 120 60 L 145 75 L 132 98 L 120 92 L 120 160 L 80 160 L 80 92 L 68 98 Z" fill="#FFFFFF"/>
      <path d="M 80 60 L 100 82 L 120 60" stroke="#F472B6" stroke-width="4" fill="none"/>
    </svg>
  `),

  // 11. Shoes & Footwear: Athletic Sneaker
  shoes: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-shoes" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0F766E"/>
          <stop offset="100%" stop-color="#14B8A6"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-shoes)"/>
      <!-- Shoe Body -->
      <path d="M 35 125 L 50 75 C 55 68 70 68 85 82 L 120 92 C 145 92 165 110 170 128 L 170 142 L 35 142 Z" fill="#FFFFFF"/>
      <rect x="30" y="138" width="145" height="16" rx="6" fill="#CCFBF1"/>
      <!-- Swoosh Accent -->
      <path d="M 60 115 C 80 125 110 120 135 102" stroke="#0F766E" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Eyelets & Laces -->
      <circle cx="75" cy="92" r="3.5" fill="#0F766E"/>
      <circle cx="90" cy="98" r="3.5" fill="#0F766E"/>
      <circle cx="105" cy="104" r="3.5" fill="#0F766E"/>
    </svg>
  `),

  // 12. Bags & Luggage: Rolling Suitcase & Backpack
  bags: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-bags" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#78350F"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-bags)"/>
      <!-- Suitcase Handle -->
      <path d="M 80 50 L 80 35 C 80 30 85 28 100 28 C 115 28 120 30 120 35 L 120 50" stroke="#FEF3C7" stroke-width="5" fill="none"/>
      <!-- Suitcase Body -->
      <rect x="60" y="50" width="80" height="110" rx="12" fill="#FFFFFF"/>
      <rect x="70" y="65" width="60" height="80" rx="6" stroke="#F59E0B" stroke-width="3" fill="none"/>
      <!-- Wheels -->
      <circle cx="75" cy="165" r="7" fill="#78350F"/>
      <circle cx="125" cy="165" r="7" fill="#78350F"/>
    </svg>
  `),

  // 13. Groceries & Food: Shopping Basket & Fresh Produce
  groceries: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-groc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#15803D"/>
          <stop offset="100%" stop-color="#22C55E"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-groc)"/>
      <!-- Apple / Fruit behind -->
      <circle cx="80" cy="85" r="22" fill="#EF4444"/>
      <path d="M 80 63 C 85 55 92 60 92 60" stroke="#15803D" stroke-width="3" fill="none"/>
      <!-- Baguette / Carrot -->
      <rect x="105" y="55" width="18" height="50" rx="9" fill="#F59E0B" transform="rotate(15 114 80)"/>
      <!-- Basket handles -->
      <path d="M 50 100 C 50 65 150 65 150 100" stroke="#FFFFFF" stroke-width="6" fill="none"/>
      <!-- Shopping Basket -->
      <path d="M 40 100 L 160 100 L 148 155 C 146 162 140 165 130 165 L 70 165 C 60 165 54 162 52 155 Z" fill="#FFFFFF"/>
      <line x1="50" y1="120" x2="150" y2="120" stroke="#86EFAC" stroke-width="4"/>
      <line x1="55" y1="140" x2="145" y2="140" stroke="#86EFAC" stroke-width="4"/>
    </svg>
  `),

  // 14. Jewelry & Accessories: Diamond Ring
  jewelry: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-jewel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#581C87"/>
          <stop offset="100%" stop-color="#9333EA"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-jewel)"/>
      <!-- Ring Band -->
      <circle cx="100" cy="120" r="42" stroke="#FDE047" stroke-width="12" fill="none"/>
      <!-- Diamond Gem -->
      <path d="M 80 65 L 120 65 L 135 85 L 100 115 L 65 85 Z" fill="#FFFFFF"/>
      <path d="M 80 65 L 100 85 L 120 65 M 100 85 L 100 115 M 65 85 L 135 85" stroke="#C084FC" stroke-width="2.5" fill="none"/>
      <!-- Sparkle stars -->
      <path d="M 145 50 L 150 60 L 160 65 L 150 70 L 145 80 L 140 70 L 130 65 L 140 60 Z" fill="#FDE047"/>
    </svg>
  `),

  // 15. Office Supplies: Pen, Notebook & Paperclip
  office: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-off" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E3A8A"/>
          <stop offset="100%" stop-color="#2563EB"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-off)"/>
      <!-- Notepad -->
      <rect x="50" y="45" width="85" height="115" rx="8" fill="#FFFFFF"/>
      <line x1="68" y1="70" x2="118" y2="70" stroke="#93C5FD" stroke-width="4" stroke-linecap="round"/>
      <line x1="68" y1="90" x2="118" y2="90" stroke="#93C5FD" stroke-width="4" stroke-linecap="round"/>
      <line x1="68" y1="110" x2="105" y2="110" stroke="#93C5FD" stroke-width="4" stroke-linecap="round"/>
      <!-- Spiral binding -->
      <circle cx="50" cy="60" r="4" fill="#1E3A8A"/>
      <circle cx="50" cy="80" r="4" fill="#1E3A8A"/>
      <circle cx="50" cy="100" r="4" fill="#1E3A8A"/>
      <circle cx="50" cy="120" r="4" fill="#1E3A8A"/>
      <!-- Pen -->
      <g transform="rotate(-25 130 110)">
        <rect x="135" y="40" width="14" height="100" rx="4" fill="#F59E0B"/>
        <path d="M 135 140 L 142 155 L 149 140 Z" fill="#FDE68A"/>
        <path d="M 140 150 L 142 155 L 144 150 Z" fill="#1E293B"/>
      </g>
    </svg>
  `),

  // 16. Pet Supplies: Paw Print & Bone
  pets: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-pets" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#854D0E"/>
          <stop offset="100%" stop-color="#EAB308"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-pets)"/>
      <!-- Main Paw Pad -->
      <path d="M 100 110 C 80 110 68 130 80 150 C 90 162 110 162 120 150 C 132 130 120 110 100 110 Z" fill="#FFFFFF"/>
      <!-- Toe Pads -->
      <circle cx="62" cy="105" r="14" fill="#FFFFFF"/>
      <circle cx="85" cy="78" r="14" fill="#FFFFFF"/>
      <circle cx="115" cy="78" r="14" fill="#FFFFFF"/>
      <circle cx="138" cy="105" r="14" fill="#FFFFFF"/>
    </svg>
  `),

  // 17. Watches & Accessories: Wristwatch
  watches: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-watch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#312E81"/>
          <stop offset="100%" stop-color="#4F46E5"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-watch)"/>
      <!-- Straps -->
      <rect x="82" y="25" width="36" height="150" rx="6" fill="#1E1B4B"/>
      <!-- Watch Case -->
      <circle cx="100" cy="100" r="48" fill="#FFFFFF"/>
      <circle cx="100" cy="100" r="40" fill="#1E1B4B"/>
      <!-- Dial Hands & Crown -->
      <circle cx="100" cy="100" r="4" fill="#818CF8"/>
      <line x1="100" y1="100" x2="100" y2="72" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="118" y2="100" stroke="#818CF8" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="148" y="94" width="6" height="12" rx="2" fill="#FFFFFF"/>
    </svg>
  `),

  // 18. Kids & Baby: Smile / Pacifier / Teddy
  kids: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="bg-kids" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C2410C"/>
          <stop offset="100%" stop-color="#FB923C"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="40" fill="url(#bg-kids)"/>
      <circle cx="100" cy="105" r="45" fill="#FFFFFF"/>
      <circle cx="85" cy="95" r="6" fill="#C2410C"/>
      <circle cx="115" cy="95" r="6" fill="#C2410C"/>
      <path d="M 85 118 Q 100 134 115 118" stroke="#C2410C" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Bear Ears -->
      <circle cx="62" cy="65" r="16" fill="#FFFFFF"/>
      <circle cx="62" cy="65" r="8" fill="#FED7AA"/>
      <circle cx="138" cy="65" r="16" fill="#FFFFFF"/>
      <circle cx="138" cy="65" r="8" fill="#FED7AA"/>
    </svg>
  `),

  // 19. Kitchen & Dining: Cooking Pot
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

  // 20. Toys & Games: Game Pad & Blocks
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

  // 21. Books & Stationery: Book
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

  // 22. Automotive: Car Front
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

  // Generic Default Fallback
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
// IMPORTANT: Specific multi-word patterns and sub-domains MUST come before generic parent categories.
const CATEGORY_KEYWORDS = [
  {
    key: 'home_appliances',
    keywords: [
      'home appliances', 'home appliance', 'appliances', 'appliance',
      'হোম অ্যাপ্লায়েন্স', 'হোম অ্যাপ্লায়েন্স', 'হোম অ্যাপ্লায়েন্সেস', 'হোম অ্যাপ্লায়েন্সেস', 'অ্যাপ্লায়েন্স', 'অ্যাপ্লায়েন্স',
      'fridge', 'refrigerator', 'blender', 'microwave', 'washing machine', 'fan', 'air conditioner', 'ফ্রিজ', 'ব্লেন্ডার'
    ]
  },
  {
    key: 'computers',
    keywords: [
      'computers', 'computer', 'laptop', 'desktop', 'monitors', 'monitor', 'keyboard', 'mouse', 'pc',
      'কম্পিউটার', 'পিসি', 'ল্যাপটপ', 'কীবোর্ড', 'মনিটর'
    ]
  },
  {
    key: 'mobile',
    keywords: [
      'mobile & accessories', 'mobile accessories', 'mobile', 'smartphone', 'phone', 'charger', 'case', 'earphone', 'headphone', 'powerbank',
      'মোবাইল', 'মোবাইল ফোন', 'ফোন', 'চার্জার', 'ইয়ারফোন', 'হেডফোন'
    ]
  },
  {
    key: 'tools',
    keywords: [
      'tools & hardware', 'tools and hardware', 'hardware', 'tools', 'tool', 'wrench', 'hammer', 'screwdriver', 'equipment',
      'টুলস', 'হার্ডওয়্যার', 'হার্ডওয়্যার', 'হাতুড়ি', 'রেঞ্চ'
    ]
  },
  {
    key: 'electronics',
    keywords: [
      'electronics', 'electronic', 'plug', 'circuit', 'gadget', 'gadgets', 'audio', 'ইলেকট্রনিক্স', 'ইলেকট্রনিক'
    ]
  },
  {
    key: 'home',
    keywords: [
      'home & living', 'home and living', 'home', 'living', 'furniture', 'decor', 'house', 'bed', 'sofa', 'chair',
      'হোম এন্ড লিভিং', 'হোম অ্যান্ড লিভিং', 'হোম ও লিভিং', 'হোম', 'লিভিং', 'ফার্নিচার', 'গৃহস্থালী', 'ঘর', 'সোফা'
    ]
  },
  {
    key: 'sports',
    keywords: [
      'sports & fitness', 'sports and fitness', 'fitness', 'sports', 'sport', 'outdoor', 'gym', 'dumbbell', 'cricket', 'football',
      'স্পোর্টস', 'ফিটনেস', 'খেলাধুলা', 'আউটডোর', 'ডাম্বেল', 'জিমে'
    ]
  },
  {
    key: 'health',
    keywords: [
      'health & wellness', 'health and wellness', 'health', 'wellness', 'medicine', 'medical', 'first aid', 'healthcare',
      'স্বাস্থ্য', 'ওয়েলনেস', 'ওয়েলনেস', 'মেডিসিন', 'মেডিকেল'
    ]
  },
  {
    key: 'beauty',
    keywords: [
      'beauty & personal care', 'beauty and personal care', 'personal care', 'beauty', 'cosmetic', 'cosmetics', 'skincare', 'makeup', 'lipstick', 'perfume', 'grooming',
      'বিউটি', 'পার্সোনাল কেয়ার', 'পার্সোনাল কেয়ার', 'কসমোটিক', 'সৌন্দর্য', 'লিপস্টিক', 'পারফিউম'
    ]
  },
  {
    key: 'fashion',
    keywords: [
      'fashion & clothing', 'fashion and clothing', 'fashion', 'clothing', 'apparel', 'dress', 'shirt', 'pant', 'cloth', 'style',
      'ফ্যাশন', 'পোশাক', 'জামা', 'কাপড়'
    ]
  },
  {
    key: 'shoes',
    keywords: [
      'shoes & footwear', 'shoes and footwear', 'shoes', 'footwear', 'sneaker', 'sneakers', 'boot', 'sandal',
      'জুতা', 'জুতো', 'শু', 'ফুটওয়্যার', 'ফুটওয়্যার'
    ]
  },
  {
    key: 'bags',
    keywords: [
      'bags & luggage', 'bags and luggage', 'luggage', 'bags', 'bag', 'suitcase', 'backpack', 'handbag', 'purse', 'trolley',
      'ব্যাগ', 'লাগেজ', 'সুটকেস', 'ব্যাকপ্যাক'
    ]
  },
  {
    key: 'groceries',
    keywords: [
      'groceries & food', 'groceries and food', 'groceries', 'grocery', 'food', 'snack', 'beverage', 'basket',
      'গ্রোসারী', 'গ্রোসারি', 'মুদি', 'খাবার', 'খাদ্য'
    ]
  },
  {
    key: 'jewelry',
    keywords: [
      'jewelry & accessories', 'jewellery & accessories', 'jewelry', 'jewellery', 'ring', 'necklace', 'gold', 'diamond', 'ornament',
      'জুয়েলারি', 'জুয়েলারি', 'গয়না', 'গহনা', 'রিং'
    ]
  },
  {
    key: 'office',
    keywords: [
      'office supplies', 'office', 'stationery', 'desk', 'pen', 'paper', 'binder', 'clipboard',
      'অফিস', 'অফিস সাপ্লাইজ', 'স্টেশনারি', 'কলম'
    ]
  },
  {
    key: 'pets',
    keywords: [
      'pet supplies', 'pet supply', 'pets', 'pet', 'dog', 'cat', 'animal', 'paw',
      'পশু', 'পোষা প্রাণী', 'পোষা', 'পেট', 'পেট সাপ্লাইজ'
    ]
  },
  {
    key: 'watches',
    keywords: [
      'watches & accessories', 'watches and accessories', 'watches', 'watch', 'wristwatch', 'clock',
      'ঘড়ি', 'ঘড়ির', 'ঘড়ি'
    ]
  },
  {
    key: 'kids',
    keywords: [
      'kids & baby', 'kids and baby', 'kids', 'baby', 'child', 'infant', 'toddler', 'nursery',
      'কিডস', 'বেবি', 'শিশু', 'বাচ্চা'
    ]
  },
  {
    key: 'kitchen',
    keywords: [
      'kitchen & dining', 'kitchen and dining', 'kitchen', 'dining', 'cookware', 'pot', 'pan', 'oven', 'tableware',
      'কিচেন', 'ডাইনিং', 'রান্নাঘর'
    ]
  },
  {
    key: 'toys',
    keywords: [
      'toys & games', 'toys and games', 'toys', 'toy', 'games', 'game', 'puzzle', 'doll',
      'খেলনা'
    ]
  },
  {
    key: 'books',
    keywords: [
      'books & stationery', 'books and stationery', 'books', 'book', 'notebook', 'novel', 'reading',
      'বই', 'খাতা', 'বই-খাতা', 'স্টেশনারি'
    ]
  },
  {
    key: 'automotive',
    keywords: [
      'automotive', 'automobile', 'car parts', 'cars', 'vehicle', 'motor', 'bike',
      'অটোমোবাইল', 'গাড়ি', 'গাড়ী', 'বাইক'
    ]
  }
];

/**
 * Checks if a search keyword matches a given category string safely.
 * Handles English word boundaries and direct string matching for Bengali & compound phrases.
 */
function matchesKeyword(textLower, kwLower) {
  if (textLower === kwLower || textLower.includes(kwLower)) {
    // If the keyword is a short English word (1-4 ASCII letters), verify word boundary to prevent partial word matches like 'ac' in 'accessories' or 'wear' in 'footwear'
    if (/^[a-z]{1,4}$/.test(kwLower)) {
      const regex = new RegExp(`\\b${kwLower}\\b`, 'i');
      return regex.test(textLower);
    }
    return true;
  }
  return false;
}

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
    const match = item.keywords.some(kw => matchesKeyword(nameLower, kw.toLowerCase()));
    if (match) {
      return CATEGORY_ICON_SVGS[item.key] || CATEGORY_ICON_SVGS.default;
    }
  }

  return CATEGORY_ICON_SVGS.default;
}

/**
 * Ensures a valid image URL or Data URI is returned for a category.
 * If image is empty, malformed, contains HTML tags, or is not a valid URL/Data URI,
 * it returns the auto-generated fallback SVG icon for the category name.
 * @param {string} image - Image URL or Data URI from DB/input
 * @param {string} categoryName - Name of the category
 * @returns {string} Sanitized image URL or Data URI
 */
export function getValidCategoryImageUrl(image, categoryName) {
  if (image && typeof image === 'string') {
    const trimmed = image.trim();
    if (trimmed) {
      // Reject raw HTML tag strings (e.g. <img ...> or <svg ...>)
      if (trimmed.startsWith('<') || trimmed.includes('<img') || trimmed.includes('<svg')) {
        return getCategoryAutoIcon(categoryName);
      }
      // Valid HTTP/HTTPS URL, Data URI, relative path, or non-spaced string
      if (
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('data:image/') ||
        trimmed.startsWith('assets/') ||
        trimmed.startsWith('./') ||
        trimmed.startsWith('/') ||
        !/\s/.test(trimmed)
      ) {
        return trimmed.replace(/"/g, '%22');
      }
    }
  }
  return getCategoryAutoIcon(categoryName);
}

if (typeof window !== 'undefined') {
  window.getCategoryAutoIcon = getCategoryAutoIcon;
  window.getValidCategoryImageUrl = getValidCategoryImageUrl;
  window.CATEGORY_ICON_SVGS = CATEGORY_ICON_SVGS;
}
