// Products Data Management & Firestore Helper Functions
import { db, collection, getDocs, doc, getDoc, query, where, orderBy, limit } from './firebase-config.js';
import { isProductInWishlist } from './auth.js';

export const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23F4F6F9'/%3E%3Cg transform='translate(100, 90)'%3E%3Crect x='0' y='0' width='100' height='80' rx='8' fill='none' stroke='%239CA3AF' stroke-width='6'/%3E%3Ccircle cx='30' cy='30' r='10' fill='%239CA3AF'/%3E%3Cpath d='M10 70 L35 40 L55 60 L70 45 L90 70 Z' fill='%239CA3AF'/%3E%3C/g%3E%3Ctext x='50%25' y='68%25' dominant-baseline='middle' text-anchor='middle' fill='%230B4D3C' font-size='18' font-weight='700' font-family='sans-serif'%3ESHS Bazar%3C/text%3E%3C/svg%3E";

export function getOptimizedImageUrl(url, width = 300, quality = 'auto') {
  if (!url || typeof url !== 'string') return FALLBACK_IMAGE;
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    if (url.includes('/f_auto,q_auto') || url.includes('/w_')) {
      return url;
    }
    const params = `f_auto,q_${quality},w_${width}`;
    return url.replace('/upload/', `/upload/${params}/`);
  }
  return url;
}

// Fallback initial categories array as defined in requirement
export const DEFAULT_CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'fa-laptop' },
  { id: 'fashion', name: 'Fashion', icon: 'fa-tshirt' },
  { id: 'home-living', name: 'Home & Living', icon: 'fa-couch' },
  { id: 'kitchen', name: 'Kitchen', icon: 'fa-utensils' },
  { id: 'beauty', name: 'Beauty', icon: 'fa-pump-soap' },
  { id: 'health', name: 'Health', icon: 'fa-heartbeat' },
  { id: 'baby-care', name: 'Baby Care', icon: 'fa-baby' },
  { id: 'sports', name: 'Sports', icon: 'fa-football-ball' },
  { id: 'lighting', name: 'Lighting', icon: 'fa-lightbulb' },
  { id: 'gadgets', name: 'Gadgets', icon: 'fa-mobile-alt' }
];

let cachedCategories = null;

export async function fetchActiveCategories() {
  if (cachedCategories && cachedCategories.length > 0) {
    return cachedCategories;
  }
  try {
    const sessionData = sessionStorage.getItem('shs_cached_categories');
    if (sessionData) {
      cachedCategories = JSON.parse(sessionData);
      return cachedCategories;
    }
  } catch (e) {
    console.warn('sessionStorage categories read error:', e);
  }

  try {
    const snap = await getDocs(collection(db, 'categories'));
    const list = [];
    snap.forEach(docSnap => {
      const data = docSnap.data();
      if (data.isActive !== false) {
        list.push({
          id: data.slug || docSnap.id,
          name: data.name,
          icon: data.icon || 'fa-folder',
          image: data.image || '',
          ...data
        });
      }
    });

    if (list.length > 0) {
      cachedCategories = list;
      try {
        sessionStorage.setItem('shs_cached_categories', JSON.stringify(list));
      } catch (e) {}
      return list;
    }
  } catch (err) {
    console.warn('Error fetching categories from Firestore, using default categories:', err);
  }
  cachedCategories = DEFAULT_CATEGORIES;
  return DEFAULT_CATEGORIES;
}

export async function fetchPublishedProducts(limitCount = null) {
  try {
    let q = query(collection(db, 'products'), where('status', '==', 'published'));
    if (limitCount && Number(limitCount) > 0) {
      q = query(collection(db, 'products'), where('status', '==', 'published'), limit(Number(limitCount)));
    }
    const snap = await getDocs(q);
    const products = [];
    snap.forEach(docSnap => {
      products.push({ id: docSnap.id, ...docSnap.data() });
    });
    return products;
  } catch (err) {
    console.warn('Firestore products fetch error / offline mode, returning empty array:', err);
    return [];
  }
}

export async function fetchProductBySlugOrId(identifier) {
  if (!identifier) return null;
  const fetchPromise = (async () => {
    try {
      // Check by ID
      const docRef = doc(db, 'products', identifier);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }
      // Check by slug
      const q = query(collection(db, 'products'), where('slug', '==', identifier), limit(1));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        const docSnap = querySnap.docs[0];
        return { id: docSnap.id, ...docSnap.data() };
      }
    } catch (err) {
      console.warn('Error fetching product detail from Firestore:', err);
    }
    return null;
  })();

  const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 3500));
  return Promise.race([fetchPromise, timeoutPromise]);
}

export function getProductShareUrl(identifier) {
  if (!identifier) return window.location.href;
  const base = window.location.href.split('?')[0].split('#')[0];
  const directory = base.substring(0, base.lastIndexOf('/') + 1);
  return `${directory}product-detail.html?id=${encodeURIComponent(identifier)}`;
}

export const DEFAULT_BANNERS = [
  {
    id: 'banner_1',
    image: 'assets/banners/hero-banner-1.jpg',
    fallbackImage: 'assets/banners/hero-banner-1.jpg',
    linkTo: 'offers.html'
  },
  {
    id: 'banner_2',
    image: 'assets/banners/hero-banner-2.jpg',
    fallbackImage: 'assets/banners/hero-banner-2.jpg',
    linkTo: 'shop.html'
  },
  {
    id: 'banner_3',
    image: 'assets/banners/hero-banner-3.jpg',
    fallbackImage: 'assets/banners/hero-banner-3.jpg',
    linkTo: 'shop.html'
  }
];

let cachedBanners = null;

export async function fetchBanners() {
  if (cachedBanners && cachedBanners.length > 0) {
    return cachedBanners;
  }
  try {
    const sessionData = sessionStorage.getItem('shs_cached_banners');
    if (sessionData) {
      cachedBanners = JSON.parse(sessionData);
      return cachedBanners;
    }
  } catch (e) {
    console.warn('sessionStorage banners read error:', e);
  }

  try {
    const fetchPromise = (async () => {
      const snap = await getDocs(collection(db, 'banners'));
      const list = [];
      snap.forEach(docSnap => {
        const data = docSnap.data();
        if (data.isActive !== false) {
          list.push({ id: docSnap.id, ...data });
        }
      });
      const result = list.length > 0 ? list : DEFAULT_BANNERS;
      cachedBanners = result;
      try {
        sessionStorage.setItem('shs_cached_banners', JSON.stringify(result));
      } catch (e) {}
      return result;
    })();

    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(DEFAULT_BANNERS), 1200));
    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (err) {
    console.warn('Error fetching banners from Firestore, using default banners:', err);
    return DEFAULT_BANNERS;
  }
}

// Generate product card HTML snippet
export function renderProductCard(product) {
  const isDiscounted = product.discountPrice && Number(product.discountPrice) < Number(product.regularPrice);
  const currentPrice = isDiscounted ? product.discountPrice : product.regularPrice;
  const discountPercent = isDiscounted ? Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100) : 0;
  const isOutOfStock = !product.stock || Number(product.stock) <= 0;
  const productIdOrSlug = product.id || product.slug;
  const productUrl = `product-detail.html?id=${encodeURIComponent(productIdOrSlug)}`;
  const rawImage = product.images && product.images.length > 0 ? product.images[0] : FALLBACK_IMAGE;
  const imageSrc = getOptimizedImageUrl(rawImage, 300);
  const sellerId = product.sellerId || 'admin';

  const lang = localStorage.getItem('shs_lang') || 'bn';
  const addToCartText = lang === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart';
  const stockOutText = lang === 'bn' ? 'স্টক আউট' : 'Stock Out';

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-thumb">
        <a href="${productUrl}">
          <img src="${imageSrc}" alt="${product.name}" loading="lazy">
        </a>
        ${isDiscounted ? `<span class="discount-badge">-${discountPercent}%</span>` : ''}
        ${isOutOfStock ? `<div class="stock-out-overlay" data-i18n="stockOut">${stockOutText}</div>` : ''}
        <button class="share-btn-card" title="Share Product" onclick="event.preventDefault(); event.stopPropagation(); window.handleCopyProductLink('${product.id}')">
          <i class="fas fa-share-nodes"></i>
        </button>
        <button class="wishlist-btn-card ${isProductInWishlist(product.id) ? 'active' : ''}" onclick="window.handleWishlistToggle('${product.id}', this)">
          <i class="${isProductInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="product-details">
        <a href="${productUrl}">
          <h3 class="product-title">${product.name}</h3>
        </a>
        <div class="product-price-wrap">
          <span class="current-price">৳${currentPrice}</span>
          ${isDiscounted ? `<span class="old-price">৳${product.regularPrice}</span>` : ''}
        </div>
        <button class="add-to-cart-btn ${isOutOfStock ? 'stock-out' : ''}"
          ${isOutOfStock ? 'disabled' : ''}
          onclick="window.handleAddToCart('${product.id}', '${product.name}', ${currentPrice}, '${imageSrc}', '${sellerId}')">
          <i class="fas fa-shopping-cart"></i> <span data-i18n="${isOutOfStock ? 'stockOut' : 'addToCart'}">${isOutOfStock ? stockOutText : addToCartText}</span>
        </button>
      </div>
    </div>
  `;
}
