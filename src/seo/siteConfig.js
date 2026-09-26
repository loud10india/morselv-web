// App-side entry point for SEO values. The implementations live in ./core.js,
// which the build-time pre-render shares; this file only binds them to the
// site origin for the current environment (override with VITE_SITE_URL).
import * as core from "./core.js";

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || core.DEFAULT_SITE_URL
).replace(/\/$/, "");

export const {
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  TWITTER_HANDLE,
  ORGANIZATION,
  MIN_LISTING_ITEMS,
  toSlug,
  cleanText,
  normalizePath,
  providerPath,
  dealPath,
  listingPath,
  relatedByOrder,
  cloudinaryUrl,
  cloudinarySrcSet,
  CARD_SIZES,
  IMAGE_WIDTH,
} = core;

export const DEFAULT_OG_IMAGE = `${SITE_URL}${core.DEFAULT_OG_IMAGE_PATH}`;

export const absoluteUrl = (path = "/") => core.absoluteUrl(path, SITE_URL);
export const organizationSchema = () => core.organizationSchema(SITE_URL);
export const breadcrumbSchema = (crumbs = []) => core.breadcrumbSchema(crumbs, SITE_URL);
export const faqSchema = (faqs) => core.faqSchema(faqs);
export const staticPageMeta = (path) => core.staticPageMeta(path, SITE_URL);
export const providerMeta = (provider, extra = {}) =>
  core.providerMeta(provider, { ...extra, siteUrl: SITE_URL });
export const dealMeta = (deal, dealID) => core.dealMeta(deal, dealID, { siteUrl: SITE_URL });
export const listingMeta = (args) => core.listingMeta({ ...args, siteUrl: SITE_URL });
