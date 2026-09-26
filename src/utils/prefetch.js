/**
 * Hands over a request the pre-rendered page started before the app loaded.
 *
 * Listing pages carry a small inline script (scripts/prerender.mjs) that
 * starts the provider-list request while the HTML is still parsing, instead
 * of after the JavaScript bundle has downloaded and run. The listing takes
 * that promise if its first request has the same key; otherwise, or if the
 * early request fails, it makes the request itself as before.
 *
 * Returns a promise for the API response body, or null. Each prefetch is
 * used at most once.
 */
export function takePrefetch(key) {
  if (typeof window === "undefined") return null;
  const entry = window.__MORSELV_PREFETCH__;
  if (!entry || entry.key !== key || !entry.promise) return null;
  window.__MORSELV_PREFETCH__ = null;
  return entry.promise;
}
