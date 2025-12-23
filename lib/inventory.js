/**
 * Inventory Storage Abstraction Layer
 *
 * Currently reads from /data/inventory.json (read-only at runtime)
 * Designed for easy swap to: Vercel KV, Supabase, or Dashboard API
 */

import inventoryData from "@/data/inventory.json";

/**
 * Get all trailers
 * @param {Object} filters - Optional filters { category, status }
 * @returns {Array} Filtered trailers
 */
export function getTrailers(filters = {}) {
  let trailers = [...inventoryData.trailers];

  if (filters.category) {
    trailers = trailers.filter((t) => t.category === filters.category);
  }

  if (filters.status) {
    trailers = trailers.filter((t) => t.status === filters.status);
  }

  return trailers;
}

/**
 * Get a single trailer by slug
 * @param {string} slug - Trailer slug
 * @returns {Object|null} Trailer or null if not found
 */
export function getTrailerBySlug(slug) {
  return inventoryData.trailers.find((t) => t.slug === slug) || null;
}

/**
 * Get a single trailer by ID
 * @param {string} id - Trailer ID
 * @returns {Object|null} Trailer or null if not found
 */
export function getTrailerById(id) {
  return inventoryData.trailers.find((t) => t.id === id) || null;
}

/**
 * Get all trailer slugs (for static path generation)
 * @returns {Array} Array of slugs
 */
export function getAllTrailerSlugs() {
  return inventoryData.trailers.map((t) => t.slug);
}

/**
 * Get all categories
 * @returns {Array} Category list
 */
export function getCategories() {
  return inventoryData.categories;
}

/**
 * Get all statuses
 * @returns {Array} Status list
 */
export function getStatuses() {
  return inventoryData.statuses;
}

/**
 * Get public-facing status label
 * @param {string} status - Internal status value
 * @returns {string} Display label
 */
export function getStatusLabel(status) {
  return inventoryData.statusLabels[status] || status;
}

/**
 * Format price for display
 * @param {number} price - Price in dollars
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Available default images (filename without extension)
 * Named by size: 6X12SA, 7X16TA, 8.5X18-20TA, etc.
 * SA = Single Axle, TA = Tandem Axle
 */
const availableImages = [
  "4X6SA",
  "5X8SA",
  "6X10SA BLACKOUT",
  "6X10TA DUMP",
  "6X10TA",
  "6X12SA BLACKOUT",
  "6X12SA",
  "6X12TA BLACKOUT",
  "7X16SA BLACKOUT",
  "7X16SA",
  "7X16TA BLACKOUT",
  "7X16TA V NOSE",
  "7X16TA",
  "7X18-20TA CONCESSION",
  "8.5X18-20TA BLACKOUT",
  "8.5X18-20TA",
  "8.5X18TA RACING BLACKOUT",
  "8.5X18TA RACING",
  "8.5X22TA BLACKOUT",
];

/**
 * Parse size string to get width and length
 * @param {string} size - Size like "6x12", "8.5x20"
 * @returns {Object} { width, length }
 */
function parseSize(size) {
  if (!size) return { width: 0, length: 0 };
  const normalized = size.toLowerCase().replace(/\s/g, "");
  const match = normalized.match(/^(\d+\.?\d*)x(\d+\.?\d*)$/);
  if (match) {
    return { width: parseFloat(match[1]), length: parseFloat(match[2]) };
  }
  return { width: 0, length: 0 };
}

/**
 * Find best matching image for a trailer based on size and category
 * @param {Object} trailer - Trailer object with size and category
 * @returns {string} Image filename
 */
function findBestImageMatch(trailer) {
  const { width, length } = parseSize(trailer.size);
  const category = (trailer.category || "").toLowerCase();

  // Special case: Dump trailers
  if (category.includes("dump")) {
    return "6X10TA DUMP";
  }

  // Build search criteria from size
  const sizePrefix = `${width}X${length}`.toUpperCase().replace(".5", ".5");

  // Try exact size match first
  const exactMatch = availableImages.find((img) => {
    const imgUpper = img.toUpperCase();
    return imgUpper.startsWith(sizePrefix);
  });
  if (exactMatch) return exactMatch;

  // Try close width match with various lengths
  const widthPrefix = `${width}X`.toUpperCase().replace(".5", ".5");
  const widthMatch = availableImages.find((img) => img.toUpperCase().startsWith(widthPrefix));
  if (widthMatch) return widthMatch;

  // Find closest by width
  let bestMatch = availableImages[0];
  let bestDiff = Infinity;

  for (const img of availableImages) {
    const imgSize = parseSize(img.replace(/[A-Z\s]/g, "").replace("-", "x"));
    const diff = Math.abs(imgSize.width - width) + Math.abs(imgSize.length - length) * 0.5;
    if (diff < bestDiff) {
      bestDiff = diff;
      bestMatch = img;
    }
  }

  return bestMatch;
}

/**
 * Get default image path for a trailer based on size
 * @param {Object} trailer - Trailer object
 * @returns {string} Default image URL
 */
export function getDefaultImageForTrailer(trailer) {
  const imageName = findBestImageMatch(trailer);
  return `/assets/img/default-trailer-images/${imageName}.webp`;
}

/**
 * Get placeholder image path (generic fallback)
 * @returns {string} Placeholder image URL
 */
export function getPlaceholderImage() {
  return "/assets/img/default-trailer-images/6X12SA.webp";
}

/**
 * Get trailer's primary image or size-matched fallback
 * @param {Object} trailer - Trailer object
 * @returns {string} Image URL
 */
export function getTrailerImage(trailer) {
  if (trailer.images && trailer.images.length > 0) {
    return trailer.images[0];
  }
  return getDefaultImageForTrailer(trailer);
}
