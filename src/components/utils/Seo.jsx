import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  TWITTER_HANDLE,
  absoluteUrl,
} from "../../seo/siteConfig";

// Every tag this component writes is stamped so it can be cleaned up on unmount
// without disturbing the static tags that ship in index.html.
const OWNED = "data-seo-managed";

const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute(OWNED, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  if (!href) return;
  // Adopt the static tag from index.html if it is there — creating a second
  // <link rel="canonical"> would leave the page with conflicting canonicals.
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(OWNED, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Per-page document head: title, description, canonical, Open Graph,
 * Twitter cards and optional JSON-LD.
 *
 * Note: this runs client-side. Google renders JS and will read these, but
 * link-preview crawlers that do not execute JS (Facebook, Slack, WhatsApp)
 * only see the static defaults in index.html. Pre-rendering or SSR is the
 * fix if rich per-page social previews are required.
 */
function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  schema,
}) {
  const location = useLocation();
  const canonicalPath = path ?? location.pathname;
  const canonical = absoluteUrl(canonicalPath);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const schemaKey = schema ? JSON.stringify(schema) : "";

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
    upsertLink("canonical", canonical);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", "en_IN");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", TWITTER_HANDLE);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
  }, [fullTitle, description, canonical, image, type, noindex]);

  useEffect(() => {
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
