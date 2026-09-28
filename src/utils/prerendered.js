/**
 * The pre-rendered copy of the landing page (scripts/prerender.mjs writes it
 * into #root), captured before React replaces it. Imported by main.jsx so it
 * runs first.
 *
 * If a detail page's data request fails, the page falls back to this copy
 * (heading, description, links) instead of an empty error state, so visitors
 * and crawlers still see the page's content during an API outage.
 */
const main =
  typeof document !== "undefined" ? document.querySelector("#prerender main") : null;

const snapshot = main
  ? { path: window.location.pathname.replace(/\/+$/, "") || "/", html: main.innerHTML }
  : null;

/** The pre-rendered main content, if the visitor landed on `pathname`. */
export function prerenderedHtml(pathname) {
  const path = String(pathname || "").replace(/\/+$/, "") || "/";
  return snapshot && snapshot.path === path ? snapshot.html : null;
}
