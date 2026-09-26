import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  TWITTER_HANDLE,
  absoluteUrl,
  normalizePath,
} from "../../seo/siteConfig";

// Every tag this component creates is stamped so it can be told apart from
// the tags the pre-rendered HTML ships with.
const OWNED = "data-seo-managed";

const upsertMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute(OWNED, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  // Adopt the pre-rendered tag if it is there — a second <link rel="canonical">
  // would leave the page with conflicting canonicals.
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(OWNED, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Per-page document head: title, description, robots, canonical, Open Graph,
 * Twitter card and JSON-LD.
 *
 * The first page a visitor lands on arrives with these already in the HTML
 * (scripts/prerender.mjs writes them from the same src/seo/core.js), so
 * crawlers and link previews that do not run JavaScript see the right values.
 * This component keeps them correct as the visitor navigates client-side.
 */
function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  noindex = false,
  schema,
}) {
  const location = useLocation();
  const canonical = absoluteUrl(normalizePath(path ?? location.pathname));
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const schemaKey = schema ? JSON.stringify(schema) : "";

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta(
      "name",
      "robots",
      // follow: a thin or missing page should still pass its links on.
      noindex ? "noindex, follow" : "index, follow, max-image-preview:large"
    );
    // A page that asks not to be indexed has no canonical to declare.
    upsertLink("canonical", noindex ? null : canonical);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", imageAlt || fullTitle);
    upsertMeta("property", "og:locale", "en_IN");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", TWITTER_HANDLE);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertMeta("name", "twitter:image:alt", imageAlt || fullTitle);
  }, [fullTitle, description, canonical, image, imageAlt, type, noindex]);

  useEffect(() => {
    // The landing page's pre-rendered JSON-LD describes the URL the visitor
    // arrived on. Once the app is running this component owns structured
    // data, so drop the static copy rather than leave a duplicate (or, after
    // client-side navigation, a stale one) in the head.
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-prerender]')
      .forEach((el) => el.remove());

    if (!schemaKey) return undefined;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(OWNED, "true");
    script.text = schemaKey;
    document.head.appendChild(script);
    return () => script.remove();
  }, [schemaKey]);

  return null;
}

export default Seo;
