// Main Application Script (UI Wiring, Search, Cart State, Mobile Nav)
import { fetchPublishedProducts, subscribeToPublishedProducts, fetchBanners, renderProductCard, renderSkeletonCards, renderErrorState, renderEmptyState, fetchActiveCategories, DEFAULT_CATEGORIES, DEFAULT_BANNERS, getProductShareUrl, FALLBACK_IMAGE } from './products.js';
import { toggleWishlist, isProductInWishlist, currentUser, logoutUser, onAuthStateUpdate } from './auth.js';
import { TRANSLATIONS } from './translations.js';
import { db, collection, query, where, getDocs, limit } from './firebase-config.js';

export { TRANSLATIONS };

export function getCurrentLang() {
  return localStorage.getItem('shs_lang') || 'bn';
}

export function setLanguage(lang) {
  const targetLang = (lang === 'en' || lang === 'bn') ? lang : 'bn';
  localStorage.setItem('shs_lang', targetLang);
  applyTranslations();
  showToast(targetLang === 'bn' ? 'ভাষা: বাংলা সিলেক্ট করা হয়েছে' : 'Language: English selected');
}

export function toggleLanguage(lang) {
  const newLang = lang || (getCurrentLang() === 'bn' ? 'en' : 'bn');
  setLanguage(newLang);
}

export function applyTranslations() {
  const lang = getCurrentLang();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.bn;

  // 1. Text Content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // 2. Form Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // 3. Titles and Aria Labels
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (t[key] !== undefined) {
      el.setAttribute('title', t[key]);
    }
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (t[key] !== undefined) {
      el.setAttribute('aria-label', t[key]);
    }
  });

  // Re-render Side Drawer to sync current language active item state
  if (typeof window.renderDrawer === 'function') {
    window.renderDrawer();
  }
}

window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;

// Theme Logic
export function initTheme() {
  const savedTheme = localStorage.getItem('shs_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

export function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  const theme = isDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('shs_theme', theme);
  showToast(isDark ? 'Dark Mode Enabled' : 'Light Mode Enabled');
  if (typeof window.renderDrawer === 'function') {
    window.renderDrawer();
  }
}

window.toggleDarkMode = toggleDarkMode;

// Share & Rate Modal Logic
export function openShareModal() {
  let modal = document.getElementById('share-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'share-modal-overlay';
    modal.className = 'share-modal-overlay';
    modal.onclick = (e) => {
      if (e.target === modal) closeShareModal();
    };
    document.body.appendChild(modal);
  }

  const siteUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/index.html');
  const shareText = encodeURIComponent("Check out SHS Bazar for amazing local deals in Kushtia!");
  const encodedUrl = encodeURIComponent(siteUrl);

  modal.innerHTML = `
    <div class="share-modal-card">
      <button class="bkash-close-btn" onclick="closeShareModal()"><i class="fas fa-times"></i></button>
      <div style="text-align: center; margin-bottom: 12px;">
        <img src="assets/images/logo.png" style="height: 48px; border-radius: 8px;" alt="Logo">
        <h3 style="color: var(--primary-color); font-size: 1.2rem; margin-top: 6px;">Share SHS Bazar</h3>
        <p style="font-size: 0.82rem; color: var(--text-muted);">Spread the word with friends & family in Kushtia!</p>
      </div>

      <div class="share-btn-grid">
        <a href="https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}" target="_blank" class="share-option-btn" style="text-decoration:none;">
          <i class="fab fa-whatsapp" style="font-size: 1.5rem; color: #25D366;"></i>
          <span>WhatsApp</span>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" class="share-option-btn" style="text-decoration:none;">
          <i class="fab fa-facebook" style="font-size: 1.5rem; color: #1877F2;"></i>
          <span>Facebook</span>
        </a>
        <button onclick="handleCopyWebsiteUrl()" class="share-option-btn">
          <i class="fas fa-copy" style="font-size: 1.5rem; color: var(--accent-color);"></i>
          <span>Copy Link</span>
        </button>
      </div>

      <div style="border-top: 1px dashed var(--border-color); padding-top: 14px; text-align: center;">
        <h4 style="font-size: 0.9rem; color: var(--primary-color); margin-bottom: 4px;">Rate Our Experience</h4>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 8px;">Tap stars to rate us</p>
        <div class="rating-stars" id="rating-stars">
          <i class="fas fa-star" data-rating="1"></i>
          <i class="fas fa-star" data-rating="2"></i>
          <i class="fas fa-star" data-rating="3"></i>
          <i class="fas fa-star" data-rating="4"></i>
          <i class="fas fa-star" data-rating="5"></i>
        </div>
        <button onclick="handleRateUsSubmit()" class="btn-accent" style="width: 100%; font-size: 0.85rem; padding: 8px; border-radius: 10px; margin-top: 8px;">
          Submit Feedback
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  let selectedRating = 5;
  const stars = modal.querySelectorAll('#rating-stars i');
  const updateStars = (val) => {
    stars.forEach((star, idx) => {
      if (idx < val) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  };
  updateStars(5);

  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-rating'), 10);
      updateStars(selectedRating);
    });
  });
}

export function closeShareModal() {
  const modal = document.getElementById('share-modal-overlay');
  if (modal) modal.classList.remove('active');
}

window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;

// Image Lightbox Modal
export function openImageModal(imageUrl) {
  if (!imageUrl) return;
  let modal = document.getElementById('image-lightbox-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-lightbox-overlay';
    modal.className = 'share-modal-overlay';
    modal.onclick = (e) => {
      if (e.target === modal || e.target.closest('.bkash-close-btn')) {
        closeImageModal();
      }
    };
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="share-modal-card" style="max-width: 90vw; max-height: 90vh; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.95); border: 1px solid var(--border-color);">
      <button class="bkash-close-btn" onclick="closeImageModal()" style="top: 10px; right: 10px; background: rgba(255,255,255,0.2); color: #FFF; z-index: 10;"><i class="fas fa-times"></i></button>
      <img src="${imageUrl}" style="max-width: 100%; max-height: 82vh; object-fit: contain; border-radius: 8px;">
    </div>
  `;

  modal.classList.add('active');
}

export function closeImageModal() {
  const modal = document.getElementById('image-lightbox-overlay');
  if (modal) modal.classList.remove('active');
}

window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

// Notification System Logic
function getStatusTextBn(status) {
  const map = {
    'Pending': 'পেন্ডিং (নজরদারিতে আছে)',
    'Confirmed': 'কনফার্মড (নিশ্চিত করা হয়েছে)',
    'Packed': 'প্যাকিং সম্পন্ন হয়েছে',
    'Shipped': 'শিপিংয়ে পাঠানো হয়েছে',
    'Out for Delivery': 'ডেলিভারির জন্য বের হয়েছে',
    'Delivered': 'ডেলিভারি সম্পন্ন হয়েছে',
    'Cancelled': 'বাতিল করা হয়েছে',
    'Returned': 'ফেরত নেওয়া হয়েছে'
  };
  return map[status] || status;
}

export function getReadNotificationIds() {
  try {
    const raw = localStorage.getItem('shs_notifications_read');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function markNotificationsRead(ids) {
  try {
    const current = getReadNotificationIds();
    const updated = Array.from(new Set([...current, ...ids]));
    localStorage.setItem('shs_notifications_read', JSON.stringify(updated));
  } catch (e) {
    console.warn('Error saving read notifications:', e);
  }
}

export async function fetchUserNotifications() {
  const lang = getCurrentLang();
  const notifications = [];

  // 1. Fetch Order notifications if user is logged in
  if (currentUser) {
    try {
      const q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid), limit(15));
      const snap = await getDocs(q);
      snap.forEach(docSnap => {
        const orderData = docSnap.data();
        const orderId = docSnap.id;
        const shortId = orderId.slice(-6).toUpperCase();
        const status = orderData.orderStatus || 'Pending';
        notifications.push({
          id: `order_${orderId}_${status}`,
          type: 'order',
          title: lang === 'bn' ? 'অর্ডার স্ট্যাটাস আপডেট' : 'Order Status Update',
          message: lang === 'bn'
            ? `আপনার অর্ডার #${shortId} ${getStatusTextBn(status)} অবস্থায় রয়েছে।`
            : `Your order #${shortId} status is ${status}.`,
          timestamp: orderData.createdAt?.toDate ? orderData.createdAt.toDate().getTime() : Date.now(),
          icon: 'fas fa-box',
          link: 'orders.html'
        });
      });
    } catch (err) {
      console.warn('Could not fetch user order notifications:', err);
    }
  }

  // 2. Offer / Promotion Notification
  notifications.push({
    id: 'offer_kushtia_wholesale_deal',
    type: 'offer',
    title: lang === 'bn' ? 'বিশেষ অফার ও ডিসকাউন্ট' : 'Special Offer & Discount',
    message: lang === 'bn'
      ? 'কুষ্টিয়ায় বিশেষ পাইকারি অফার! ডেলিভারি চার্জ মাত্র ৳১০০ কুষ্টিয়া শহরের মধ্যে।'
      : 'Special Wholesale Deals inside Kushtia! Delivery only ৳100 inside Kushtia town.',
    timestamp: Date.now() - 3600000,
    icon: 'fas fa-tags',
    link: 'offers.html'
  });

  // Sort notifications by timestamp descending
  notifications.sort((a, b) => b.timestamp - a.timestamp);
  return notifications;
}

export async function initNotifications() {
  const notifications = await fetchUserNotifications();
  const readIds = getReadNotificationIds();
  const unreadCount = notifications.filter(n => !readIds.includes(n.id)).length;

  document.querySelectorAll('#nav-notification-badge, .notification-count-badge').forEach(badge => {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

export async function openNotificationModal() {
  let modal = document.getElementById('notification-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'notification-modal-overlay';
    modal.className = 'notification-modal-overlay';
    modal.onclick = (e) => {
      if (e.target === modal) closeNotificationModal();
    };
    document.body.appendChild(modal);
  }

  const lang = getCurrentLang();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.bn;

  modal.innerHTML = `
    <div class="notification-modal-card">
      <div class="notification-modal-header">
        <div class="notification-modal-title">
          <i class="fas fa-bell"></i>
          <span>${t.navNotification || 'Notification'}</span>
        </div>
        <button type="button" class="notification-modal-close" onclick="closeNotificationModal()" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="notification-modal-body" id="notification-modal-body">
        <div style="text-align: center; padding: 24px; color: var(--text-muted);">
          <i class="fas fa-spinner fa-spin" style="font-size: 1.5rem; margin-bottom: 8px;"></i>
          <p style="font-size: 0.85rem;">${lang === 'bn' ? 'নোটিফিকেশন লোড হচ্ছে...' : 'Loading notifications...'}</p>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const notifications = await fetchUserNotifications();
  const bodyEl = document.getElementById('notification-modal-body');

  if (bodyEl) {
    if (notifications.length > 0) {
      bodyEl.innerHTML = notifications.map(item => `
        <div class="notification-item" onclick="window.location.href='${item.link || 'index.html'}'">
          <div class="notification-item-icon ${item.type === 'order' ? 'type-order' : 'type-offer'}">
            <i class="${item.icon}"></i>
          </div>
          <div class="notification-item-content">
            <div class="notification-item-title">
              <span>${item.title}</span>
            </div>
            <div class="notification-item-msg">${item.message}</div>
            <div class="notification-item-time">${formatRelativeTime(item.timestamp, lang)}</div>
          </div>
        </div>
      `).join('');

      // Mark notifications as read when viewed
      const allIds = notifications.map(n => n.id);
      markNotificationsRead(allIds);

      // Clear badge
      document.querySelectorAll('#nav-notification-badge, .notification-count-badge').forEach(badge => {
        badge.style.display = 'none';
      });
    } else {
      bodyEl.innerHTML = `
        <div class="notification-empty-state">
          <div class="notification-empty-icon">
            <i class="fas fa-bell-slash"></i>
          </div>
          <h4>${t.noNotifications || 'কোনো নোটিফিকেশন নেই'}</h4>
          <p>${t.noNotificationsDesc || 'আপনার সমস্ত তথ্য আপডেট রয়েছে! অর্ডার স্ট্যাটাস ও বিশেষ অফারের নোটিফিকেশন এখানে দেখাবে।'}</p>
        </div>
      `;
    }
  }
}

export function closeNotificationModal() {
  const modal = document.getElementById('notification-modal-overlay');
  if (modal) modal.classList.remove('active');
}

function formatRelativeTime(timestamp, lang) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (lang === 'bn') {
    if (minutes < 5) return 'এইমাত্র';
    if (minutes < 60) return `${minutes} মিনিট আগে`;
    if (hours < 24) return `${hours} ঘণ্টা আগে`;
    return `${days} দিন আগে`;
  } else {
    if (minutes < 5) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}

window.openNotificationModal = openNotificationModal;
window.closeNotificationModal = closeNotificationModal;
window.initNotifications = initNotifications;

window.handleCopyWebsiteUrl = () => {
  const url = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/index.html');
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Website link copied!');
    }).catch(() => fallbackCopyText(url));
  } else {
    fallbackCopyText(url);
  }
};

window.handleRateUsSubmit = () => {
  showToast('Thank you for rating SHS Bazar!');
  closeShareModal();
};

// Drawer Generator
export function renderDrawer() {
  let drawer = document.getElementById('nav-drawer');
  let overlay = document.getElementById('drawer-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'drawer-overlay';
    overlay.className = 'drawer-overlay';
    overlay.onclick = () => window.toggleDrawer();
    document.body.appendChild(overlay);
  }

  if (!drawer) {
    drawer = document.createElement('aside');
    drawer.id = 'nav-drawer';
    drawer.className = 'nav-drawer';
    document.body.appendChild(drawer);
  }

  const lang = getCurrentLang();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.bn;
  const isDark = document.body.classList.contains('dark-mode');
  const isLoggedIn = !!currentUser;
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  drawer.innerHTML = `
    <div class="drawer-header">
      <div class="logo-container">
        <img src="assets/images/logo.png" alt="SHS Bazar Logo" class="logo-img">
        <span class="brand-name">SHS Bazar</span>
      </div>
      <button class="hamburger-btn" onclick="toggleDrawer()"><i class="fas fa-times"></i></button>
    </div>

    <ul class="drawer-menu">
      <!-- 1. MAIN -->
      <li class="drawer-section-title">
        ${t.navSectionMain}
      </li>
      <li><a href="index.html" class="drawer-menu-item ${currentPath === 'index.html' ? 'active' : ''}"><i class="fas fa-home" style="width: 20px;"></i> <span>${t.home}</span></a></li>
      <li><a href="shop.html" class="drawer-menu-item ${currentPath === 'shop.html' ? 'active' : ''}"><i class="fas fa-th-large" style="width: 20px;"></i> <span>${t.allCategories}</span></a></li>
      <li><a href="offers.html" class="drawer-menu-item ${currentPath === 'offers.html' ? 'active' : ''}"><i class="fas fa-tags" style="width: 20px;"></i> <span>${t.specialOffers}</span></a></li>
      <li><a href="orders.html" class="drawer-menu-item ${currentPath === 'orders.html' ? 'active' : ''}"><i class="fas fa-box" style="width: 20px;"></i> <span>${t.myOrders}</span></a></li>
      <li><a href="wishlist.html" class="drawer-menu-item ${currentPath === 'wishlist.html' ? 'active' : ''}"><i class="fas fa-heart" style="width: 20px;"></i> <span>${t.wishlist}</span></a></li>

      <!-- 2. ACCOUNT & SETTINGS -->
      <li class="drawer-section-title">
        ${t.navSectionAccount}
      </li>
      <li><a href="${isLoggedIn ? 'profile.html' : 'login.html'}" class="drawer-menu-item account-link ${currentPath === 'profile.html' || currentPath === 'login.html' ? 'active' : ''}"><i class="fas fa-user-circle" style="width: 20px;"></i> <span>${t.myAccount}</span></a></li>
      <li>
        <a href="#" onclick="event.preventDefault(); toggleDarkMode();" class="drawer-menu-item">
          <i class="${isDark ? 'fas fa-sun' : 'fas fa-moon'} theme-toggle-icon" style="width: 20px; color: var(--accent-color);"></i>
          <span class="theme-toggle-text">${isDark ? t.lightMode : t.darkMode}</span>
        </a>
      </li>
      <li style="padding: 8px 20px 4px 20px;">
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-globe" style="color: var(--primary-color);"></i>
          <span>${t.language} / Language</span>
        </div>
        <div class="drawer-lang-selector-block" style="display: flex; gap: 8px; background: var(--bg-color); padding: 4px; border-radius: 10px; border: 1px solid var(--border-color);">
          <button type="button" onclick="event.preventDefault(); setLanguage('bn');" class="lang-option-btn ${lang === 'bn' ? 'active' : ''}" style="flex: 1; padding: 7px 10px; border-radius: 8px; border: none; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 6px; ${lang === 'bn' ? 'background: var(--primary-color); color: #FFF; box-shadow: 0 2px 6px rgba(10,74,57,0.25);' : 'background: transparent; color: var(--text-primary);'}">
            <span>বাংলা</span>
            ${lang === 'bn' ? '<i class="fas fa-check" style="font-size: 0.75rem;"></i>' : ''}
          </button>
          <button type="button" onclick="event.preventDefault(); setLanguage('en');" class="lang-option-btn ${lang === 'en' ? 'active' : ''}" style="flex: 1; padding: 7px 10px; border-radius: 8px; border: none; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 6px; ${lang === 'en' ? 'background: var(--primary-color); color: #FFF; box-shadow: 0 2px 6px rgba(10,74,57,0.25);' : 'background: transparent; color: var(--text-primary);'}">
            <span>English</span>
            ${lang === 'en' ? '<i class="fas fa-check" style="font-size: 0.75rem;"></i>' : ''}
          </button>
        </div>
      </li>

      <!-- 3. POLICIES & INFO -->
      <li class="drawer-section-title">
        ${t.navSectionPolicies}
      </li>
      <li><a href="return-policy.html" class="drawer-menu-item ${currentPath === 'return-policy.html' ? 'active' : ''}"><i class="fas fa-undo" style="width: 20px;"></i> <span>${t.returnPolicy}</span></a></li>
      <li><a href="shipping-policy.html" class="drawer-menu-item ${currentPath === 'shipping-policy.html' ? 'active' : ''}"><i class="fas fa-truck" style="width: 20px;"></i> <span>${t.shippingInfo}</span></a></li>
      <li><a href="privacy-policy.html" class="drawer-menu-item ${currentPath === 'privacy-policy.html' ? 'active' : ''}"><i class="fas fa-user-shield" style="width: 20px;"></i> <span>${t.privacyPolicy}</span></a></li>
      <li><a href="terms.html" class="drawer-menu-item ${currentPath === 'terms.html' ? 'active' : ''}"><i class="fas fa-file-contract" style="width: 20px;"></i> <span>${t.termsOfService}</span></a></li>
      <li><a href="faq.html" class="drawer-menu-item ${currentPath === 'faq.html' ? 'active' : ''}"><i class="fas fa-question-circle" style="width: 20px;"></i> <span>${t.faq}</span></a></li>

      <!-- 4. HELP & SOCIAL -->
      <li class="drawer-section-title">
        ${t.navSectionSupport}
      </li>
      <li><a href="contact.html" class="drawer-menu-item ${currentPath === 'contact.html' ? 'active' : ''}"><i class="fas fa-headset" style="width: 20px;"></i> <span>${t.contactUs}</span></a></li>
      <li><a href="about.html" class="drawer-menu-item ${currentPath === 'about.html' ? 'active' : ''}"><i class="fas fa-info-circle" style="width: 20px;"></i> <span>${t.aboutUs}</span></a></li>
      <li><a href="#" onclick="event.preventDefault(); toggleDrawer(); openShareModal();" class="drawer-menu-item"><i class="fas fa-share-alt" style="width: 20px; color: var(--accent-color);"></i> <span>${t.shareApp}</span></a></li>

      <!-- 5. LOGOUT (Bottom Divider & Item) -->
      ${isLoggedIn ? `
      <li class="drawer-logout-divider"></li>
      <li><a href="#" onclick="event.preventDefault(); toggleDrawer(); window.handleLogout();" class="drawer-menu-item logout-link" style="color: var(--danger-color);"><i class="fas fa-sign-out-alt" style="width: 20px;"></i> <span>${t.logout}</span></a></li>
      ` : ''}
    </ul>
  `;
}

window.renderDrawer = renderDrawer;
window.handleLogout = () => {
  logoutUser();
};

// Global Cart State (localStorage backed)
export function getCart() {
  try {
    const data = localStorage.getItem('bb_cart');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Error parsing cart from localStorage:', e);
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem('bb_cart', JSON.stringify(cart));
  updateCartUI();
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id && item.variant === product.variant);
  if (existing) {
    existing.quantity += product.quantity || 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: product.sellerId || 'admin',
      variant: product.variant || '',
      quantity: product.quantity || 1
    });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart!`);
}

export function updateCartUI() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update header & navigation cart badges dynamically
  document.querySelectorAll('.cart-count-badge').forEach(el => {
    const prevCount = el.textContent;
    el.textContent = totalItems;
    if (el.classList.contains('nav-cart-badge')) {
      el.style.display = totalItems > 0 ? 'flex' : 'none';
    } else {
      el.style.display = 'inline-flex';
    }
    if (prevCount !== String(totalItems)) {
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
    }
  });

  // Toggle cart button glow pulse
  document.querySelectorAll('.center-cart-shortcut').forEach(el => {
    if (totalItems > 0) {
      el.classList.add('has-items');
    } else {
      el.classList.remove('has-items');
    }
  });

  // Update floating cart summary bubble
  const cartBubble = document.getElementById('floating-cart-bubble');
  if (cartBubble) {
    if (totalItems > 0) {
      cartBubble.style.display = 'flex';
      const itemsEl = cartBubble.querySelector('.cart-items');
      const totalEl = cartBubble.querySelector('.cart-total');
      if (itemsEl) itemsEl.textContent = `${totalItems} Items`;
      if (totalEl) totalEl.textContent = `৳${totalPrice}`;
    } else {
      cartBubble.style.display = 'none';
    }
  }
}

// Toast Notification
export function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Expose handlers globally for onclick attributes
window.handleAddToCart = (id, name, price, image, sellerId = 'admin') => {
  addToCart({ id, name, price, image, sellerId, quantity: 1 });
};

window.handleCopyProductLink = (productId) => {
  const link = getProductShareUrl(productId);
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(link).then(() => {
      showToast('Link copied!');
    }).catch(() => {
      fallbackCopyText(link);
    });
  } else {
    fallbackCopyText(link);
  }
};

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('Link copied!');
  } catch (err) {
    showToast('Failed to copy link');
  }
  document.body.removeChild(textArea);
}

window.handleWishlistToggle = async (id, btnEl) => {
  const isWishlisted = await toggleWishlist(id);
  // Synchronize all wishlist buttons on the page for this product ID
  const cardButtons = document.querySelectorAll(`.product-card[data-product-id="${id}"] .wishlist-btn-card`);
  const buttonsToUpdate = cardButtons.length > 0 ? cardButtons : (btnEl ? [btnEl] : []);

  buttonsToUpdate.forEach(btn => {
    const icon = btn.querySelector('i');
    if (isWishlisted) {
      btn.classList.add('active');
      if (icon) icon.className = 'fas fa-heart';
    } else {
      btn.classList.remove('active');
      if (icon) icon.className = 'far fa-heart';
    }
  });

  if (isWishlisted) {
    showToast('Added to Wishlist');
  } else {
    showToast('Removed from Wishlist');
  }
};

window.toggleDrawer = () => {
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
};

window.goBack = () => {
  if (document.referrer && document.referrer.includes(window.location.host)) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
};

// Search Setup
export function initSearch(allProducts) {
  const input = document.getElementById('search-input');
  const resultsDropdown = document.getElementById('search-results');
  if (!input || !resultsDropdown) return;

  const searchBox = input.closest('.search-box');
  const searchBtn = searchBox ? searchBox.querySelector('button') : null;

  const triggerSearchRedirect = () => {
    const query = input.value.trim();
    if (query) {
      window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerSearchRedirect();
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerSearchRedirect();
    });
  }

  input.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    if (val.length < 2) {
      resultsDropdown.classList.remove('active');
      return;
    }
    const matches = (allProducts || []).filter(p => p.name.toLowerCase().includes(val) || (p.category && p.category.toLowerCase().includes(val)));
    if (matches.length > 0) {
      resultsDropdown.innerHTML = matches.slice(0, 6).map(p => `
        <div class="search-result-item" onclick="window.location.href='product-detail.html?id=${encodeURIComponent(p.id || p.slug)}'">
          <img src="${p.images?.[0] || FALLBACK_IMAGE}" alt="${p.name}" loading="lazy">
          <div>
            <div style="font-size: 0.85rem; font-weight: 600;">${p.name}</div>
            <div style="font-size: 0.75rem; color: var(--accent-color); font-weight: bold;">৳${p.discountPrice || p.regularPrice}</div>
          </div>
        </div>
      `).join('');
      resultsDropdown.classList.add('active');
    } else {
      resultsDropdown.innerHTML = '<div style="padding: 10px; font-size: 0.85rem; color: #777;">No products found</div>';
      resultsDropdown.classList.add('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !resultsDropdown.contains(e.target)) {
      resultsDropdown.classList.remove('active');
    }
  });
}

// Carousel Banner Controls
let currentSlide = 0;
let carouselTimer = null;

export function initCarousel(banners) {
  const container = document.getElementById('carousel-container');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!container || !dotsContainer || !banners || banners.length === 0) return;

  container.innerHTML = banners.map(b => {
    const imgSrc = (b.image && !b.image.startsWith('PASTE_CLOUDINARY_URL')) ? b.image : (b.fallbackImage || b.image);
    const linkUrl = b.linkTo || 'shop.html';
    const hasOverlay = (b.title && b.title.trim()) || (b.subtitle && b.subtitle.trim());
    return `
      <div class="carousel-slide" onclick="window.location.href='${linkUrl}'" style="cursor: pointer;">
        <img src="${imgSrc}" alt="${b.title || 'Banner'}" loading="lazy" onerror="this.src='${b.fallbackImage || FALLBACK_IMAGE}'">
        ${hasOverlay ? `
        <div class="banner-overlay">
          <h2>${b.title || ''}</h2>
          <p>${b.subtitle || ''}</p>
        </div>` : ''}
      </div>
    `;
  }).join('');

  dotsContainer.innerHTML = banners.map((_, idx) => `<div class="dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>`).join('');

  const goToSlide = (index) => {
    currentSlide = (index + banners.length) % banners.length;
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentSlide));
  };

  const startAutoRotate = () => {
    if (carouselTimer) clearInterval(carouselTimer);
    carouselTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 2000); // 2-second rotation
  };

  dotsContainer.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      goToSlide(idx);
      startAutoRotate();
    });
  });


  // Touch / Swipe Gesture support for mobile devices
  let startX = 0;
  let endX = 0;
  const heroSec = container.closest('.hero-section') || container;

  heroSec.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  heroSec.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
      startAutoRotate();
    }
  }, { passive: true });

  startAutoRotate();
}

// Initializer on Page Load
async function initApp() {
  initTheme();
  applyTranslations();
  updateCartUI();
  renderDrawer();

  onAuthStateUpdate(() => {
    renderDrawer();
    initNotifications();
  });

  initNotifications();

  const copyrightYearEl = document.getElementById('copyright-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }

  // If on homepage, render catalog sections
  const trendingGrid = document.getElementById('trending-products');
  if (trendingGrid) {
    // 1. Render default categories and initial banner immediately (non-blocking)
    const catGrid = document.getElementById('category-grid');
    if (catGrid) {
      catGrid.innerHTML = DEFAULT_CATEGORIES.map(cat => `
        <div class="category-card" onclick="window.location.href='shop.html?category=${cat.id}'">
          <div class="category-icon-box"><i class="fas ${cat.icon}"></i></div>
          <span class="category-name">${cat.name}</span>
        </div>
      `).join('');

      fetchActiveCategories().then(cats => {
        if (cats && cats.length > 0) {
          catGrid.innerHTML = cats.map(cat => `
            <div class="category-card" onclick="window.location.href='shop.html?category=${cat.id}'">
              <div class="category-icon-box">
                ${cat.image ? `<img src="${cat.image}" loading="lazy" style="width:28px; height:28px; object-fit:cover; border-radius:4px;">` : `<i class="fas ${cat.icon || 'fa-folder'}"></i>`}
              </div>
              <span class="category-name">${cat.name}</span>
            </div>
          `).join('');
        }
      }).catch(err => console.warn('Error loading active categories:', err));
    }

    // Initialize carousel immediately with default local banners
    initCarousel(DEFAULT_BANNERS);

    // 2. Fetch remote banners asynchronously without blocking static components
    fetchBanners().then(banners => {
      if (banners && banners.length > 0) {
        initCarousel(banners);
      }
    }).catch(err => console.warn('Banner fetch error:', err));

    // Show skeletons immediately during initial loading
    const allProductsGrid = document.getElementById('all-products');
    trendingGrid.innerHTML = renderSkeletonCards(4);
    if (allProductsGrid) {
      allProductsGrid.innerHTML = renderSkeletonCards(8);
    }

    let isSnapshotActive = false;
    let unsubscribeProducts = null;

    const renderHomepageProductsUI = (products) => {
      initSearch(products);
      const lang = getCurrentLang();
      const t = TRANSLATIONS[lang] || TRANSLATIONS.bn;

      // Trending Grid
      const trendingProducts = products.filter(p => p.isTrending);
      if (trendingProducts.length > 0) {
        trendingGrid.innerHTML = trendingProducts.map(renderProductCard).join('');
      } else {
        trendingGrid.innerHTML = renderEmptyState(t.noTrendingProducts || 'বর্তমানে কোনো ট্রেন্ডিং প্রোডাক্ট নেই');
      }

      // All Products grid with pagination / Load More
      if (allProductsGrid) {
        if (products.length > 0) {
          const PAGE_SIZE = 8;
          let visibleCount = PAGE_SIZE;

          const renderAllProductsGrid = () => {
            const visibleProducts = products.slice(0, visibleCount);
            allProductsGrid.innerHTML = visibleProducts.map(renderProductCard).join('');

            const loadMoreContainer = document.getElementById('load-more-container');
            const loadMoreBtn = document.getElementById('load-more-btn');

            if (loadMoreContainer && loadMoreBtn) {
              if (visibleCount < products.length) {
                loadMoreContainer.style.display = 'block';
                loadMoreBtn.onclick = () => {
                  visibleCount += PAGE_SIZE;
                  renderAllProductsGrid();
                };
              } else {
                loadMoreContainer.style.display = 'none';
              }
            }
          };

          renderAllProductsGrid();
        } else {
          allProductsGrid.innerHTML = renderEmptyState(t.noProductsFound || 'কোনো প্রোডাক্ট পাওয়া যায়নি');
          const loadMoreContainer = document.getElementById('load-more-container');
          if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        }
      }
    };

    const loadHomepageProducts = async () => {
      trendingGrid.innerHTML = renderSkeletonCards(4);
      if (allProductsGrid) {
        allProductsGrid.innerHTML = renderSkeletonCards(8);
      }

      try {
        const products = await fetchPublishedProducts(null, 3, 1000);
        renderHomepageProductsUI(products);

        // Attach snapshot listener after initial fetch succeeds for real-time reactivity
        if (!isSnapshotActive) {
          unsubscribeProducts = subscribeToPublishedProducts(
            (updatedProducts) => {
              isSnapshotActive = true;
              renderHomepageProductsUI(updatedProducts);
            },
            (error) => {
              console.warn('[Realtime Listener Error]:', error);
            }
          );
        }
      } catch (err) {
        console.error('[loadHomepageProducts Error]:', err);
        const lang = getCurrentLang();
        const t = TRANSLATIONS[lang] || TRANSLATIONS.bn;
        const errorHtml = renderErrorState(t.errorLoadingProducts, 'window.retryFetchHomepageProducts()');
        trendingGrid.innerHTML = errorHtml;
        if (allProductsGrid) {
          allProductsGrid.innerHTML = errorHtml;
        }
      }
    };

    window.retryFetchHomepageProducts = () => {
      loadHomepageProducts();
    };

    window.addEventListener('beforeunload', () => {
      if (typeof unsubscribeProducts === 'function') {
        unsubscribeProducts();
      }
    });

    loadHomepageProducts();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
