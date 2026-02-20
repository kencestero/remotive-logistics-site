/**
 * SalesHub Public Inventory API Client
 *
 * Fetches live inventory data from the SalesHub public API.
 * Used by getStaticProps with ISR — runs server-side only.
 */

const FALLBACK_DATA = {
  totalAvailable: 0,
  stockBySize: {},
  units: [],
  _fallback: true,
};

/**
 * Fetch public inventory from SalesHub API
 * @returns {Promise<Object>} Inventory data with totalAvailable, stockBySize, units[]
 */
export async function fetchPublicInventory() {
  const baseUrl = process.env.SALESHUB_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    console.error("[SalesHub] SALESHUB_PUBLIC_API_BASE_URL is not configured");
    return FALLBACK_DATA;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${baseUrl}/api/public-inventory`, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[SalesHub] API returned ${response.status}: ${response.statusText}`);
      return FALLBACK_DATA;
    }

    const data = await response.json();

    // API returns { meta: { totalAvailable, stockBySize }, units: [...] }
    if (
      !data ||
      !data.meta ||
      typeof data.meta.totalAvailable !== "number" ||
      !Array.isArray(data.units)
    ) {
      console.error(
        "[SalesHub] Unexpected API response shape:",
        JSON.stringify(data).slice(0, 200)
      );
      return FALLBACK_DATA;
    }

    // Flatten meta into top-level for consistent internal usage
    return {
      totalAvailable: data.meta.totalAvailable,
      stockBySize: data.meta.stockBySize || {},
      units: data.units,
    };
  } catch (error) {
    console.error("[SalesHub] Failed to fetch public inventory:", error.message);
    return FALLBACK_DATA;
  }
}
