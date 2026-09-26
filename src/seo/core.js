/**
 * SEO building blocks shared by the React app and scripts/prerender.mjs.
 *
 * Everything in this file must stay Node-safe — no JSX, no import.meta, no
 * browser globals. The build script imports it to write one HTML file per
 * page, and the pages import it to set the same head at runtime, so the HTML
 * a crawler downloads and the page it renders cannot disagree about a title,
 * canonical URL or structured data.
 */
import { FAQS } from "../content/faqs.js";

export const DEFAULT_SITE_URL = "https://www.morselv.com";
export const SITE_NAME = "Morselv";

export const DEFAULT_TITLE =
  "Morselv | India's Women-Centric Marketplace for Wellness, Beauty & Lifestyle";

export const DEFAULT_DESCRIPTION =
  "Discover trusted salons, spas, clinics, fitness studios and lifestyle experts near you. Compare verified providers, book services and unlock exclusive deals on Morselv.";

export const TWITTER_HANDLE = "@morselv";
export const DEFAULT_OG_IMAGE_PATH = "/og-image.jpg";
export const LOGO_PATH = "/favicon.png";

// A listing with fewer entries than this is too thin to stand as a landing
// page of its own: it stays reachable, but is noindex,follow and kept out of
// the sitemap.
export const MIN_LISTING_ITEMS = 3;

// Where "near you" listings are measured from until the visitor shares a
// location. The listing API sorts by distance from it, so the pre-render has to
// use the same point to produce the same order as the page.
export const DEFAULT_LOCATION = {
  city: "New Delhi",
  state: "Delhi",
  country: "India",
  lat: 28.613939,
  lng: 77.209021,
};

/**
 * Identifies an unfiltered provider-listing request. The pre-rendered page
 * starts this request before the app loads (see scripts/prerender.mjs); the
 * listing uses that result when its own first request has the same key.
 */
export const listingPrefetchKey = (category, subCategory, location = DEFAULT_LOCATION) =>
  `provider:${Number(category) || 0}:${Number(subCategory) || 0}:${location?.lat}:${location?.lng}`;

export const ORGANIZATION = {
  legalName: "Femtech Sphere Tech Pvt. Ltd.",
  telephone: "+91-9818257300",
  email: "connect@morselv.com",
  address: {
    streetAddress:
      "422, 4th Floor, Tower A, Suncity Success Tower, Golf Course Extension Road, Sector 65",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122005",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100066464515801",
    "https://www.instagram.com/mor.selv/",
    "https://www.linkedin.com/company/mor-selv/home/",
  ],
};

/* ------------------------------------------------------------------ text */

export const cleanText = (value) =>
  value === undefined || value === null
    ? ""
    : String(value).replace(/\s+/g, " ").trim();

/** Cuts at a word boundary so a description never ends mid-word. */
export const truncate = (value, max = 155) => {
  const text = cleanText(value);
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.5 ? cut.slice(0, space) : cut).replace(
    /[\s,;:.\-–—]+$/,
    ""
  )}…`;
};

/** "Salon" -> "Salon Services"; "Legal services" stays as it is. */
export const serviceLabel = (name) => {
  const text = cleanText(name);
  return /\bservices?$/i.test(text) ? text : `${text} Services`;
};

/* ------------------------------------------------------------------ URLs */

export const toSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/** Path only, no query or hash, no trailing slash (except the root). */
export const normalizePath = (path = "/") => {
  const bare = String(path).split(/[?#]/)[0].replace(/\/{2,}/g, "/");
  const withLead = bare.startsWith("/") ? bare : `/${bare}`;
  return withLead.length > 1 ? withLead.replace(/\/+$/, "") : "/";
};

export const absoluteUrl = (path = "/", siteUrl = DEFAULT_SITE_URL) =>
  `${siteUrl.replace(/\/$/, "")}${normalizePath(path)}`;

export const providerPath = (name, id) =>
  `/provider/${toSlug(name) || "provider"}/${id}`;

export const dealPath = (name, id) => `/deal/${toSlug(name) || "deal"}/${id}`;

/**
 * Category listings: /service/14-skin-hair-beauty/11-salon, and the same
 * shape under /deals. A sub-category is only meaningful under its category.
 */
export const listingPath = (base, category, subCategory) => {
  let path = `/${base}`;
  if (category?.ID && cleanText(category.Name)) {
    path += `/${category.ID}-${toSlug(category.Name)}`;
    if (subCategory?.ID && cleanText(subCategory.Name)) {
      path += `/${subCategory.ID}-${toSlug(subCategory.Name)}`;
    }
  }
  return path;
};

/* ---------------------------------------------------------------- schema */

export const organizationSchema = (siteUrl = DEFAULT_SITE_URL) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
      legalName: ORGANIZATION.legalName,
      url: `${siteUrl}/`,
      logo: `${siteUrl}${LOGO_PATH}`,
      email: ORGANIZATION.email,
      telephone: ORGANIZATION.telephone,
      address: { "@type": "PostalAddress", ...ORGANIZATION.address },
      sameAs: ORGANIZATION.sameAs,
    },
    {
      // No SearchAction: the site has no ?q= search results page for it to
      // point at, and Google retired the sitelinks search box in 2024.
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: SITE_NAME,
      // How the brand is written in the logo and on the About page.
      alternateName: "Mor-Selv",
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
});

/** crumbs: [{ name, path }] ordered from the home page to the current page. */
export const breadcrumbList = (crumbs = [], siteUrl = DEFAULT_SITE_URL) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: cleanText(crumb.name),
    item: absoluteUrl(crumb.path, siteUrl),
  })),
});

export const breadcrumbSchema = (crumbs = [], siteUrl = DEFAULT_SITE_URL) => ({
  "@context": "https://schema.org",
  ...breadcrumbList(crumbs, siteUrl),
});

export const faqSchema = (faqs = FAQS) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: cleanText(faq.question),
    acceptedAnswer: { "@type": "Answer", text: cleanText(faq.answer) },
  })),
});

/**
 * The most specific schema.org type we can state with confidence. Anything
 * not listed stays plain LocalBusiness rather than guessing.
 */
const BUSINESS_TYPES = {
  salon: "BeautySalon",
  "nail art nail studio": "NailSalon",
  "spa wellness center": "DaySpa",
  gym: "ExerciseGym",
  physiotherapy: "Physiotherapy",
  dermatologist: "MedicalBusiness",
  homeopathy: "MedicalBusiness",
  "legal services": "LegalService",
  ca: "AccountingService",
  restaurant: "Restaurant",
  cafe: "CafeOrCoffeeShop",
  restobar: "BarOrPub",
};

export const businessType = (subCategory) =>
  BUSINESS_TYPES[toSlug(subCategory).replace(/-/g, " ")] || "LocalBusiness";

const validCoordinate = (value, limit) => {
  const n = Number(value);
  return Number.isFinite(n) && n !== 0 && Math.abs(n) <= limit ? n : undefined;
};

/** Drops undefined, empty strings and empty arrays so the JSON stays clean. */
const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        v !== undefined &&
        v !== null &&
        v !== "" &&
        !(Array.isArray(v) && v.length === 0)
    )
  );

/**
 * Provider detail page. Only states what the page shows: name, description,
 * address, photos and the services listed under "Main Offerings". No ratings,
 * prices or opening hours — the site does not display them.
 */
export const localBusinessSchema = (
  provider,
  { services = [], images = [], siteUrl = DEFAULT_SITE_URL } = {}
) => {
  if (!provider?.Name) return undefined;
  const url = absoluteUrl(providerPath(provider.Name, provider.ID), siteUrl);
  const latitude = validCoordinate(provider.Latitude, 90);
  const longitude = validCoordinate(provider.Longitude, 180);
  const offers = services
    .filter((s) => cleanText(s?.Name))
    .map((s) => ({
      "@type": "Offer",
      itemOffered: compact({
        "@type": "Service",
        name: cleanText(s.Name),
        description: cleanText(s.Description) || undefined,
      }),
    }));

  return compact({
    "@type": businessType(provider.SubCategory),
    "@id": `${url}#business`,
    name: cleanText(provider.Name),
    description: cleanText(provider.Description) || undefined,
    url,
    image: images
      .map((img) => img?.url || img?.imageURL)
      .filter(Boolean)
      .slice(0, 5),
    address: cleanText(provider.FullAddress)
      ? compact({
          "@type": "PostalAddress",
          streetAddress: cleanText(provider.FullAddress),
          addressLocality: cleanText(provider.LocationCity) || undefined,
          addressRegion: cleanText(provider.state) || undefined,
          postalCode: cleanText(provider.pincode) || undefined,
          addressCountry: "IN",
        })
      : undefined,
    geo:
      latitude !== undefined && longitude !== undefined
        ? { "@type": "GeoCoordinates", latitude, longitude }
        : undefined,
    hasOfferCatalog: offers.length
      ? {
          "@type": "OfferCatalog",
          name: `Services at ${cleanText(provider.Name)}`,
          itemListElement: offers,
        }
      : undefined,
  });
};

/* --------------------------------------------------------- page metadata */

const HOME_CRUMB = { name: "Home", path: "/" };

/**
 * Fixed pages. `h1` mirrors the visible heading so the pre-rendered HTML says
 * what the rendered page says.
 */
export const STATIC_PAGES = {
  "/": {
    title: null, // DEFAULT_TITLE
    description: DEFAULT_DESCRIPTION,
    h1: "WE KNOW WHAT WOMEN NEED",
    intro:
      "From therapy to nutrition to coaching — discover services from trusted businesses, built around your life.",
  },
  "/packages": {
    title: "Branding Packages for Businesses",
    description:
      "Mor-Selv branding packages for businesses — Growing Talent, Premium Luxury and Signature Elite, from ₹15,000/month, plus fully bespoke plans.",
    h1: "Your journey to an iconic legacy begins here",
    crumb: "Packages",
  },
  "/ListYourBusiness": {
    title: "List Your Business",
    description:
      "Get your salon, spa, clinic, studio or wellness practice in front of women actively searching for trusted services. List your business on Morselv and start receiving enquiries.",
    h1: "Join India's Women-Centric Business Marketplace",
    crumb: "List Your Business",
  },
  "/job-opportunities": {
    title: "Jobs with Partner Businesses",
    description:
      "Job opportunities available with different partners of Morselv. Browse current openings and submit your CV for roles across salons, spas, wellness studios and lifestyle businesses.",
    h1: "Opportunities available with different partners of Morselv",
    crumb: "Job Opportunities",
  },
  "/Careers": {
    title: "Careers",
    description:
      "Join the Morselv team. Explore open roles and help build India's women-centric marketplace for wellness, beauty, fitness and lifestyle services.",
    h1: "Careers: Join our team",
    crumb: "Careers",
  },
  "/AboutUS": {
    title: "About Us",
    description:
      "Morselv is India's women-centric marketplace connecting you with trusted salons, spas, clinics, studios and lifestyle experts. Learn about our mission and the team behind it.",
    h1: "About Mor-Selv: Wellness, Designed for Women",
    crumb: "About Us",
  },
  "/HelpAndSupport": {
    title: "Help & Support",
    description:
      "Need a hand with a booking, an enquiry or your Morselv account? Chat with the Morselv support team on WhatsApp, or reach us by phone or email.",
    h1: "Need assistance? We're here to help.",
    crumb: "Help & Support",
  },
  "/faq": {
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about booking services, payments, cancellations, refunds and listing your business on Morselv.",
    h1: "Frequently asked questions",
    crumb: "FAQs",
  },
  "/PrivacyPolicy": {
    title: "Privacy Policy",
    description:
      "How Morselv collects, uses, stores and protects your personal information.",
    h1: "Privacy Policy: Your Trust, Our Priority",
    crumb: "Privacy Policy",
  },
  "/TermsAndConditions": {
    title: "Terms & Conditions",
    description:
      "The terms that govern your use of the Morselv platform and services.",
    h1: "Terms & Conditions: Our Agreement with You",
    crumb: "Terms & Conditions",
  },
  // A registration form: useful to visitors, of no value as a search result.
  "/customer-panel": {
    title: "Customer Panel",
    description:
      "Register with Morselv to keep your details with us and hear first about deals, new providers and offers near you.",
    h1: "Register with Morselv",
    crumb: "Customer Panel",
    noindex: true,
  },
};

/** Head values for a fixed page, including its breadcrumb schema. */
export const staticPageMeta = (path, siteUrl = DEFAULT_SITE_URL) => {
  const page = STATIC_PAGES[path];
  if (!page) return undefined;
  const crumbs = page.crumb ? [HOME_CRUMB, { name: page.crumb, path }] : null;
  let schema;
  if (path === "/") schema = organizationSchema(siteUrl);
  else if (path === "/faq") schema = faqSchema();
  else if (crumbs) schema = breadcrumbSchema(crumbs, siteUrl);
  return { ...page, path, crumbs, schema };
};

const withSuffix = (text, suffix) =>
  cleanText(text).length >= 90 ? cleanText(text) : `${cleanText(text)} ${suffix}`;

/**
 * Provider detail page. `provider` is the getProviderByID row; services and
 * images are its second and third result sets.
 */
export const providerMeta = (
  provider,
  { services = [], images = [], siteUrl = DEFAULT_SITE_URL } = {}
) => {
  const name = cleanText(provider.Name);
  const sub = cleanText(provider.SubCategory);
  const category = cleanText(provider.Category);
  const city = cleanText(provider.LocationCity);
  const area = cleanText(provider.area);
  const path = providerPath(name, provider.ID);
  const kind = sub || category;
  const place = [area, city].filter(Boolean).join(", ");
  const where = [kind, place].filter(Boolean).join(" in ");

  // Several businesses list more than one branch under the same name, so the
  // locality has to be in the title for the pages to be told apart. Take the
  // most specific form that still fits in a search result.
  const TITLE_BUDGET = 62;
  const title =
    [
      where && `${name} – ${where}`,
      place && `${name}, ${place}`,
      kind && city && `${name} – ${kind} in ${city}`,
      city && `${name}, ${city}`,
    ].find((t) => t && t.length <= TITLE_BUDGET) || name;

  const crumbs = [
    HOME_CRUMB,
    { name: "Services", path: "/service" },
    provider.catID && category
      ? {
          name: category,
          path: listingPath("service", { ID: provider.catID, Name: category }),
        }
      : null,
    provider.catID && provider.SubCategoryID && sub
      ? {
          name: sub,
          path: listingPath(
            "service",
            { ID: provider.catID, Name: category },
            { ID: provider.SubCategoryID, Name: sub }
          ),
        }
      : null,
    { name, path },
  ].filter(Boolean);

  const business = localBusinessSchema(provider, { services, images, siteUrl });
  const image = ogImageUrl(images.map((i) => i?.url).find(Boolean));

  // Lead with what and where: it is what a searcher scans for, and it keeps
  // the descriptions distinct when one business lists the same text under
  // several categories.
  const about = cleanText(provider.Description);
  return {
    path,
    title,
    description: truncate(
      [
        where && `${where}.`,
        about || "See services and location, and enquire on Morselv.",
      ]
        .filter(Boolean)
        .join(" ")
    ),
    image,
    imageAlt: where ? `${name}, ${where}` : name,
    h1: name,
    crumbs,
    schema: {
      "@context": "https://schema.org",
      "@graph": [business, breadcrumbList(crumbs, siteUrl)].filter(Boolean),
    },
  };
};

/** Deal detail page, from the get_deals_by_ID row. */
export const dealMeta = (deal, dealID, { siteUrl = DEFAULT_SITE_URL } = {}) => {
  const name = cleanText(deal.DealName);
  const provider = cleanText(deal.ProviderName);
  const path = dealPath(name, dealID);
  const crumbs = [HOME_CRUMB, { name: "Deals", path: "/deals" }, { name, path }];
  // Deal names are often long marketing lines. The provider is what tells two
  // similar deals apart, so keep it and shorten the deal name instead.
  const TITLE_MAX = 90;
  const full = provider ? `${name} at ${provider}` : name;
  const title =
    full.length <= TITLE_MAX || !provider
      ? full
      : `${truncate(name, Math.max(30, TITLE_MAX - provider.length - 4))} at ${provider}`;
  return {
    path,
    title,
    description: truncate(
      withSuffix(
        deal.Description,
        `${provider ? `Offered by ${provider}. ` : ""}Enquire about this deal on Morselv.`
      )
    ),
    image: ogImageUrl(deal.ImageName) || undefined,
    imageAlt: provider ? `${name} at ${provider}` : name,
    h1: name,
    crumbs,
    providerPath: deal.ProviderID && provider ? providerPath(provider, deal.ProviderID) : undefined,
    schema: breadcrumbSchema(crumbs, siteUrl),
  };
};

/**
 * /service and /deals listings, optionally narrowed to a category and
 * sub-category. `count` is the number of results the page shows unfiltered;
 * below MIN_LISTING_ITEMS the page is noindex. `subNames` feeds the category
 * description.
 */
export const listingMeta = ({
  base,
  category,
  subCategory,
  count,
  subNames = [],
  siteUrl = DEFAULT_SITE_URL,
}) => {
  const isDeals = base === "deals";
  const cat = category?.ID && cleanText(category.Name) ? category : null;
  const sub = cat && subCategory?.ID && cleanText(subCategory.Name) ? subCategory : null;
  const catName = cat ? cleanText(cat.Name) : "";
  const subName = sub ? cleanText(sub.Name) : "";
  const path = listingPath(base, cat, sub);
  const known = Number.isFinite(count);
  const n = known ? `${count} ` : "";
  const providers = count === 1 ? "provider" : "providers";
  const deals = count === 1 ? "deal" : "deals";

  let title;
  let description;
  if (isDeals) {
    title = sub
      ? `${subName} Deals & Offers – ${catName}`
      : cat
      ? `${catName} Deals & Offers`
      : "Deals & Offers on Beauty, Wellness & Lifestyle Services";
    description = sub
      ? `${n}current ${subName} ${deals} from ${catName} providers on Morselv. Compare offers from trusted local businesses and enquire directly.`
      : cat
      ? `${n}current ${catName} ${deals} and offers on Morselv. Compare limited-time offers from trusted local providers and enquire directly.`
      : "Discover limited-time offers from trusted salons, spas, wellness studios and lifestyle providers near you. Compare deals and enquire directly on Morselv.";
  } else {
    title = sub
      ? `${serviceLabel(subName)} – ${catName}`
      : cat
      ? serviceLabel(catName)
      : "Beauty, Wellness & Lifestyle Services for Women";
    const examples = subNames.map(cleanText).filter(Boolean).slice(0, 3);
    description = sub
      ? `Browse ${n}${subName} ${providers} in ${catName} on Morselv. Compare businesses by area, see their services and enquire directly.`
      : cat
      ? `Browse ${n}${catName} ${providers} on Morselv${
          examples.length ? `, including ${examples.join(", ")}` : ""
        }. Compare businesses by area and enquire directly.`
      : "Browse verified salons, spas, clinics, fitness studios and lifestyle experts near you. Filter by category and distance to find the right provider on Morselv.";
  }

  const rootName = isDeals ? "Deals" : "Services";
  const crumbs = [
    HOME_CRUMB,
    { name: rootName, path: `/${base}` },
    cat ? { name: catName, path: listingPath(base, cat) } : null,
    sub ? { name: subName, path } : null,
  ].filter(Boolean);

  return {
    path,
    title,
    description: truncate(description),
    // Provider listings: a category or sub-category is a landing page unless
    // it is thin. Deals listings: category filters are not landing pages —
    // with ~65 deals in all, the largest filter repeats 88% of /deals and the
    // rest hold a handful — so only /deals itself is indexed. Every filter
    // page stays reachable (follow), and every deal keeps its own page.
    noindex: isDeals
      ? Boolean(cat)
      : Boolean(cat) && known && count < MIN_LISTING_ITEMS,
    crumbs,
    schema: breadcrumbSchema(crumbs, siteUrl),
  };
};

/**
 * A stable handful of neighbours for "more providers like this" links:
 * the next `n` by ID after the current one, wrapping around. Deterministic, so
 * the pre-rendered page and the rendered page link to the same providers.
 */
export const relatedByOrder = (items, currentId, n = 6, idOf = (x) => x.ID) => {
  const sorted = [...items]
    .filter((x) => String(idOf(x)) !== String(currentId))
    .sort((a, b) => Number(idOf(a)) - Number(idOf(b)));
  if (sorted.length <= n) return sorted;
  const start = sorted.findIndex((x) => Number(idOf(x)) > Number(currentId));
  const from = start === -1 ? 0 : start;
  return [...sorted.slice(from), ...sorted.slice(0, from)].slice(0, n);
};

/* ---------------------------------------------------------------- images */

// A Cloudinary transformation segment, e.g. "f_auto,q_auto,w_600".
const TRANSFORM_SEGMENT = /\/image\/upload\/[a-z]{1,3}_[^/,]+(,[a-z]{1,3}_[^/,]+)*\//;

/**
 * A Cloudinary image at display size, in the best format the browser takes
 * (WebP/AVIF via f_auto). Provider photos are uploaded at full camera size —
 * often 200–350 KB for a card shown 200px wide. Non-Cloudinary URLs, and URLs
 * that already carry a transformation, are returned unchanged.
 */
export const cloudinaryUrl = (url, width) => {
  if (typeof url !== "string" || !url.includes("res.cloudinary.com/")) return url;
  if (!url.includes("/image/upload/") || TRANSFORM_SEGMENT.test(url)) return url;
  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
};

// Display widths, sized for a ~2x screen at the largest layout each appears in.
export const IMAGE_WIDTH = { card: 600, detail: 900 };

/** srcset for a Cloudinary image at several widths (undefined otherwise). */
export const cloudinarySrcSet = (url, widths = [300, 400, 600]) =>
  typeof url === "string" && cloudinaryUrl(url, 1) !== url
    ? widths.map((w) => `${cloudinaryUrl(url, w)} ${w}w`).join(", ")
    : undefined;

// Rendered width of a listing card image: 2 columns on phones, 3 from md,
// 4 from lg, inside the 1280px container.
export const CARD_SIZES =
  "(min-width: 1280px) 300px, (min-width: 1024px) 23vw, (min-width: 768px) 30vw, 46vw";

/**
 * Image for Open Graph / Twitter cards: at most 1200px wide in its original
 * format (some link-preview bots do not accept WebP or AVIF, so no f_auto).
 * Uploads can be several megabytes, which preview bots may time out on.
 */
export const ogImageUrl = (url) => {
  if (typeof url !== "string" || !url.includes("res.cloudinary.com/")) return url;
  if (!url.includes("/image/upload/") || TRANSFORM_SEGMENT.test(url)) return url;
  return url.replace("/image/upload/", "/image/upload/q_auto,c_limit,w_1200/");
};
