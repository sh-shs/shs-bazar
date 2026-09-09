// Super Admin Management Module
import {
  db,
  storage,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from './firebase-config.js';
import { SUPER_ADMIN_EMAILS } from './auth.js';
import { clearCategoryCache } from './products.js';
import { getValidCategoryImageUrl } from './category-icons.js';

export function isSuperAdminUser(user, profile) {
  if (!user) return false;
  const userEmail = (user.email || '').toLowerCase();
  if (SUPER_ADMIN_EMAILS.some(email => email.toLowerCase() === userEmail)) return true;
  return profile && profile.role === 'admin';
}

// -------------------------------------------------------------
// 1. Settings CRUD Functions
// -------------------------------------------------------------
export async function fetchAdminSettings() {
  const DEFAULT_AUTO_REPLY = "আসসালামু আলাইকুম স্যার/ম্যাম। আপনি কিছুক্ষণ অপেক্ষা করুন। আমাদের প্রতিনিধি আপনার সাথে শীঘ্রই যোগাযোগ করবে। ধন্যবাদ।";
  try {
    const deliverySnap = await getDoc(doc(db, 'settings', 'delivery'));
    const paymentSnap = await getDoc(doc(db, 'settings', 'payment'));
    const generalSnap = await getDoc(doc(db, 'settings', 'general'));

    const generalData = generalSnap.exists() ? generalSnap.data() : {};

    return {
      delivery: deliverySnap.exists() ? deliverySnap.data() : { insideKushtia: 100, outsideKushtia: 160 },
      payment: paymentSnap.exists() ? paymentSnap.data() : { bKashNumber: '01342697743', codEnabled: true },
      general: {
        siteName: 'SHS Bazar',
        hotline: '+8809658183506',
        supportEmail: 'saripofficialsupport@gmail.com',
        autoReply: DEFAULT_AUTO_REPLY,
        ...generalData
      }
    };
  } catch (err) {
    console.error('Error fetching admin settings:', err);
    return {
      delivery: { insideKushtia: 100, outsideKushtia: 160 },
      payment: { bKashNumber: '01342697743', codEnabled: true },
      general: {
        siteName: 'SHS Bazar',
        hotline: '+8809658183506',
        supportEmail: 'saripofficialsupport@gmail.com',
        autoReply: DEFAULT_AUTO_REPLY
      }
    };
  }
}

export async function saveAdminDeliverySettings(insideKushtia, outsideKushtia) {
  await setDoc(doc(db, 'settings', 'delivery'), {
    insideKushtia: Number(insideKushtia),
    outsideKushtia: Number(outsideKushtia),
    updatedAt: new Date()
  }, { merge: true });
}

export async function saveAdminPaymentSettings(bKashNumber, codEnabled) {
  await setDoc(doc(db, 'settings', 'payment'), {
    bKashNumber,
    codEnabled: Boolean(codEnabled),
    updatedAt: new Date()
  }, { merge: true });
}

export async function saveAdminGeneralSettings(data) {
  await setDoc(doc(db, 'settings', 'general'), {
    ...data,
    updatedAt: new Date()
  }, { merge: true });
}

// -------------------------------------------------------------
// 2. Category CRUD Functions
// -------------------------------------------------------------
export function generateCategorySlug(name) {
  return (name || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function invalidateCategoryCache() {
  try {
    clearCategoryCache();
  } catch (e) {}
}

export async function createCategory(categoryData) {
  // Accepts object or positional arguments for backward compatibility
  let name, icon, description, slug, image, isActive;
  if (typeof categoryData === 'string') {
    name = categoryData;
    icon = arguments[1] || 'fa-folder';
    description = arguments[2] || '';
    slug = generateCategorySlug(name);
    image = '';
    isActive = true;
  } else {
    name = categoryData.name;
    slug = categoryData.slug;
    description = categoryData.description;
    image = categoryData.image;
    icon = categoryData.icon;
    isActive = categoryData.isActive;
  }

  name = (name || '').trim();
  if (!name) {
    throw new Error('Category name is required.');
  }

  slug = (slug || '').trim();
  if (!slug) {
    slug = generateCategorySlug(name);
  } else {
    slug = generateCategorySlug(slug);
  }

  if (!slug) {
    throw new Error('Valid category slug is required.');
  }

  // Fetch all existing categories to check duplicate name and duplicate slug
  const allCategories = await fetchCategoriesFromDB();
  const nameLower = name.toLowerCase().trim();
  const slugLower = slug.toLowerCase().trim();

  const duplicateName = allCategories.find(c => (c.name || '').toLowerCase().trim() === nameLower);
  if (duplicateName) {
    throw new Error('এই নামে ইতিমধ্যে একটি ক্যাটাগরি রয়েছে। অনুগ্রহ করে নতুন নাম ব্যবহার করুন। (A category with this name already exists)');
  }

  const duplicateSlug = allCategories.find(c => (c.slug || c.id || '').toLowerCase().trim() === slugLower);
  if (duplicateSlug) {
    throw new Error('এই স্লাগ দিয়ে ইতিমধ্যে একটি ক্যাটাগরি রয়েছে। (This category slug already exists)');
  }

  const docId = slug;
  const docRef = doc(db, 'categories', docId);

  let finalImage = getValidCategoryImageUrl(image, name, slug);

  const payload = {
    name,
    slug,
    description: (description || '').trim(),
    image: finalImage,
    icon: (icon || 'fa-folder').trim(),
    isActive: isActive !== false,
    createdAt: new Date()
  };

  await setDoc(docRef, payload);
  invalidateCategoryCache();
  return { id: docId, ...payload };
}

export async function updateCategory(catId, categoryData) {
  const name = (categoryData.name || '').trim();
  if (!name) {
    throw new Error('Category name is required.');
  }

  let slug = (categoryData.slug || '').trim();
  if (!slug) {
    slug = generateCategorySlug(name);
  } else {
    slug = generateCategorySlug(slug);
  }

  // Check unique name and slug among other categories
  const allCategories = await fetchCategoriesFromDB();
  const nameLower = name.toLowerCase().trim();
  const slugLower = slug.toLowerCase().trim();

  const duplicateName = allCategories.find(c => c.id !== catId && c.slug !== catId && (c.name || '').toLowerCase().trim() === nameLower);
  if (duplicateName) {
    throw new Error('অন্য একটি ক্যাটাগরিতে এই নাম ব্যবহার করা হয়েছে। (A category with this name already exists)');
  }

  const duplicateSlug = allCategories.find(c => c.id !== catId && c.slug !== catId && (c.slug || c.id || '').toLowerCase().trim() === slugLower);
  if (duplicateSlug) {
    throw new Error('অন্য একটি ক্যাটাগরিতে এই স্লাগ ব্যবহার করা হয়েছে। (This category slug already exists)');
  }

  let finalImage = getValidCategoryImageUrl(categoryData.image, name, slug);

  const payload = {
    name,
    slug,
    description: (categoryData.description || '').trim(),
    image: finalImage,
    icon: (categoryData.icon || 'fa-folder').trim(),
    isActive: categoryData.isActive !== false,
    updatedAt: new Date()
  };

  await updateDoc(doc(db, 'categories', catId), payload);
  invalidateCategoryCache();
}

export async function toggleCategoryStatus(catId, currentStatus) {
  await updateDoc(doc(db, 'categories', catId), {
    isActive: !currentStatus,
    updatedAt: new Date()
  });
  invalidateCategoryCache();
}

// -------------------------------------------------------------
// 7. Inventory & Stock Management Helper
// -------------------------------------------------------------
export async function updateProductStock(productId, newStock) {
  const stockNum = Math.max(0, parseInt(newStock, 10) || 0);
  await updateDoc(doc(db, 'products', productId), {
    stock: stockNum,
    updatedAt: new Date()
  });
}

export async function fetchCategoriesFromDB() {
  try {
    const snap = await getDocs(collection(db, 'categories'));
    const list = [];
    const updatePromises = [];

    snap.forEach(d => {
      const data = d.data();
      const slug = data.slug || d.id;
      const sanitizedImage = getValidCategoryImageUrl(data.image, data.name, slug);

      // Requirement 4: If database category has an old/incorrect icon value or stale SVG fallback Data URI,
      // overwrite/update it with the current exact mapped icon.
      if (data.image !== sanitizedImage && (data.image?.startsWith('data:image/svg+xml') || !data.image)) {
        updatePromises.push(
          updateDoc(doc(db, 'categories', d.id), {
            image: sanitizedImage,
            updatedAt: new Date()
          }).catch(err => console.warn(`Error auto-updating category ${d.id} icon:`, err))
        );
      }

      list.push({
        id: d.id,
        slug,
        isActive: data.isActive !== false,
        ...data,
        image: sanitizedImage
      });
    });

    if (updatePromises.length > 0) {
      Promise.all(updatePromises).catch(() => {});
    }

    return list;
  } catch (err) {
    console.error('Error fetching categories from DB:', err);
    return [];
  }
}

export async function deleteCategoryFromDB(catId) {
  await deleteDoc(doc(db, 'categories', catId));
  invalidateCategoryCache();
}

// -------------------------------------------------------------
// 3. Product Media & Save Helpers
// -------------------------------------------------------------
export async function compressImage(file, maxDimension = 1200, quality = 0.85) {
  if (!file || !file.type || !file.type.startsWith('image/')) return file;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

export async function uploadMediaFile(file, folderPath = 'products/images', timeoutMs = 25000) {
  if (!file) return null;

  console.log(`Starting Cloudinary upload for file "${file.name}" (${file.type || 'unknown type'}, ${(file.size / 1024).toFixed(1)} KB) to folder "${folderPath}"...`);

  let uploadFile = file;
  try {
    if (file.type && file.type.startsWith('image/')) {
      uploadFile = await compressImage(file);
    }
  } catch (compressErr) {
    console.warn('Image compression warning, proceeding with original file:', compressErr);
    uploadFile = file;
  }

  const formData = new FormData();
  formData.append('file', uploadFile);
  formData.append('upload_preset', 'Bangla Bazar');
  if (folderPath) {
    formData.append('folder', folderPath);
  }

  const isVideo = uploadFile.type && uploadFile.type.startsWith('video');
  const resourceType = isVideo ? 'video' : 'image';
  const endpoint = `https://api.cloudinary.com/v1_1/vhc6a9gy/${resourceType}/upload`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const resData = await res.json().catch(() => ({}));

    if (res.ok && resData.secure_url) {
      console.log('Cloudinary upload successful:', resData.secure_url);
      return resData.secure_url;
    }

    const errorMsg = resData.error?.message || `Cloudinary HTTP error ${res.status}`;
    console.error('Cloudinary upload API error response:', { status: res.status, errorMsg, resData });
    throw new Error(errorMsg);
  } catch (e) {
    clearTimeout(timeoutId);
    console.error('Cloudinary upload exception for file:', file.name, e);
    if (e.name === 'AbortError') {
      throw new Error(`Cloudinary upload timed out after ${timeoutMs / 1000} seconds. Please check your network connection.`);
    }
    throw new Error(e.message || 'Network error during Cloudinary upload');
  }
}

export async function saveAdminProduct(productData, productId = null) {
  try {
    const payload = {
      ...productData,
      sellerId: 'admin',
      sellerName: 'SHS Bazar Admin',
      updatedAt: new Date()
    };

    if (productId) {
      await updateDoc(doc(db, 'products', productId), payload);
      return productId;
    } else {
      payload.createdAt = new Date();
      payload.status = 'published';
      const docRef = await addDoc(collection(db, 'products'), payload);
      return docRef.id;
    }
  } catch (err) {
    console.error('Error in saveAdminProduct:', err);
    throw err;
  }
}

// -------------------------------------------------------------
// 4. Customers & Users Management Functions
// -------------------------------------------------------------
export async function fetchUsersFromDB() {
  try {
    const snap = await getDocs(collection(db, 'users'));
    const users = [];
    snap.forEach(d => users.push({ id: d.id, ...d.data() }));
    return users;
  } catch (err) {
    console.error('Error fetching users from DB:', err);
    return [];
  }
}

export async function updateUserProfile(userId, data) {
  await updateDoc(doc(db, 'users', userId), {
    ...data,
    updatedAt: new Date()
  });
}

export async function deleteUserDoc(userId) {
  await deleteDoc(doc(db, 'users', userId));
}

// -------------------------------------------------------------
// 4. Order Management Functions
// -------------------------------------------------------------
export async function fetchOrdersFromDB() {
  try {
    const snap = await getDocs(collection(db, 'orders'));
    const orders = [];
    snap.forEach(d => orders.push({ id: d.id, ...d.data() }));
    return orders;
  } catch (err) {
    console.error('Error fetching orders from DB:', err);
    return [];
  }
}

export async function updateOrderStatus(orderId, orderStatus) {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    orderStatus,
    updatedAt: new Date()
  });
}

export async function updatePaymentStatus(orderId, paymentStatus) {
  await updateDoc(doc(db, 'orders', orderId), {
    paymentStatus,
    updatedAt: new Date()
  });
}

export async function deleteOrderDoc(orderId) {
  await deleteDoc(doc(db, 'orders', orderId));
}

// -------------------------------------------------------------
// 5. Coupon CRUD Functions
// -------------------------------------------------------------
export function normalizeCouponCode(code) {
  return (code || '').toUpperCase().trim().replace(/\s+/g, '');
}

export function validateCouponData(data, existingCoupons = [], currentId = null) {
  const code = normalizeCouponCode(data.code);
  if (!code) {
    throw new Error('Coupon code is required.');
  }

  // Check unique coupon code
  const duplicate = existingCoupons.find(c => normalizeCouponCode(c.code) === code && c.id !== currentId);
  if (duplicate) {
    throw new Error('This coupon code already exists. Please use a unique coupon code.');
  }

  const discountType = data.discountType || 'percentage';
  let discountPercent = 0;
  let flatDiscount = 0;

  if (discountType === 'percentage') {
    discountPercent = Number(data.discountPercent);
    if (isNaN(discountPercent) || discountPercent <= 0 || discountPercent > 100) {
      throw new Error('Discount percentage must be between 1 and 100.');
    }
  } else if (discountType === 'flat') {
    flatDiscount = Number(data.flatDiscount);
    if (isNaN(flatDiscount) || flatDiscount <= 0) {
      throw new Error('Flat discount amount must be greater than 0.');
    }
  } else {
    throw new Error('Invalid discount type selected.');
  }

  const minSpend = Number(data.minSpend || 0);
  if (isNaN(minSpend) || minSpend < 0) {
    throw new Error('Minimum spend must be 0 or a positive number.');
  }

  return {
    code,
    discountType,
    discountPercent,
    flatDiscount,
    minSpend,
    isActive: data.isActive !== false
  };
}

export async function createCoupon(couponData) {
  // Support legacy positional arguments for backward compatibility
  let data;
  if (typeof couponData === 'string') {
    const discountPercent = Number(arguments[1] || 0);
    const flatDiscount = Number(arguments[2] || 0);
    data = {
      code: couponData,
      discountType: discountPercent > 0 ? 'percentage' : 'flat',
      discountPercent,
      flatDiscount,
      minSpend: Number(arguments[3] || 0),
      isActive: arguments[4] !== false
    };
  } else {
    data = couponData;
  }

  const existingCoupons = await fetchCoupons();
  const validated = validateCouponData(data, existingCoupons);

  const docRef = await addDoc(collection(db, 'coupons'), {
    ...validated,
    createdAt: new Date()
  });

  return { id: docRef.id, ...validated };
}

export async function updateCoupon(couponId, couponData) {
  const existingCoupons = await fetchCoupons();
  const validated = validateCouponData(couponData, existingCoupons, couponId);

  await updateDoc(doc(db, 'coupons', couponId), {
    ...validated,
    updatedAt: new Date()
  });
}

export async function fetchCoupons() {
  try {
    const snap = await getDocs(collection(db, 'coupons'));
    const coupons = [];
    snap.forEach(d => {
      const data = d.data();
      coupons.push({
        id: d.id,
        code: normalizeCouponCode(data.code),
        discountType: data.discountType || (data.discountPercent ? 'percentage' : 'flat'),
        discountPercent: Number(data.discountPercent || 0),
        flatDiscount: Number(data.flatDiscount || 0),
        minSpend: Number(data.minSpend || 0),
        isActive: data.isActive !== false,
        ...data
      });
    });
    return coupons;
  } catch (err) {
    console.error('Error fetching coupons from DB:', err);
    return [];
  }
}

export async function deleteCoupon(couponId) {
  await deleteDoc(doc(db, 'coupons', couponId));
}

export async function toggleCouponStatus(couponId, currentStatus) {
  await updateDoc(doc(db, 'coupons', couponId), {
    isActive: !currentStatus,
    updatedAt: new Date()
  });
}

// -------------------------------------------------------------
// 6. Banner Management Functions
// -------------------------------------------------------------
export async function addBanner(title, subtitle, imageFile, linkTo = 'shop.html') {
  let imageUrl = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80';
  if (imageFile) {
    try {
      const uploadedUrl = await uploadMediaFile(imageFile, 'banners');
      if (uploadedUrl) imageUrl = uploadedUrl;
    } catch (e) {
      console.warn('Banner upload via Cloudinary failed, falling back to Firebase storage:', e);
      const fileName = `banners/${Date.now()}_${imageFile.name}`;
      const storageRef = ref(storage, fileName);
      const snap = await uploadBytesResumable(storageRef, imageFile);
      imageUrl = await getDownloadURL(snap.ref);
    }
  }
  await addDoc(collection(db, 'banners'), {
    title: title.trim(),
    subtitle: subtitle ? subtitle.trim() : '',
    image: imageUrl,
    linkTo: linkTo ? linkTo.trim() : 'shop.html',
    isActive: true,
    createdAt: new Date()
  });
}

export async function updateBanner(bannerId, data, newImageFile = null) {
  let updatePayload = { ...data, updatedAt: new Date() };
  if (newImageFile) {
    try {
      const uploadedUrl = await uploadMediaFile(newImageFile, 'banners');
      if (uploadedUrl) updatePayload.image = uploadedUrl;
    } catch (e) {
      console.warn('Banner upload via Cloudinary failed, falling back to Firebase storage:', e);
      const fileName = `banners/${Date.now()}_${newImageFile.name}`;
      const storageRef = ref(storage, fileName);
      const snap = await uploadBytesResumable(storageRef, newImageFile);
      updatePayload.image = await getDownloadURL(snap.ref);
    }
  }
  await updateDoc(doc(db, 'banners', bannerId), updatePayload);
}

export async function fetchBannersFromDB() {
  try {
    const snap = await getDocs(collection(db, 'banners'));
    const banners = [];
    snap.forEach(d => banners.push({ id: d.id, ...d.data() }));
    return banners;
  } catch (err) {
    console.error('Error fetching banners from DB:', err);
    return [];
  }
}

export async function deleteBannerFromDB(bannerId) {
  await deleteDoc(doc(db, 'banners', bannerId));
}

export async function toggleBannerVisibility(bannerId, currentStatus) {
  await updateDoc(doc(db, 'banners', bannerId), {
    isActive: !currentStatus,
    updatedAt: new Date()
  });
}
