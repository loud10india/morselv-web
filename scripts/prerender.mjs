#!/usr/bin/env node
/**
 * Build-time pre-render: one HTML file per public URL, plus the sitemaps.
 *
 * Runs after `vite build` (see package.json). The site is a client-rendered
 * React app, so every URL used to return the same index.html: one title, one
 * description, and a canonical pointing at the home page, until JavaScript
 * ran. Crawlers and link-preview bots that do not run JavaScript never saw
 * anything else.
 *
 * For each page this writes dist/<path>/index.html (the static host serves it
 * for both /path and /path/) containing:
 *   - the page's own title, description, robots, canonical, Open Graph,
 *     Twitter card and JSON-LD, built by src/seo/core.js — the same module
 *     the running app uses, so both agree;
 *   - a plain-HTML copy of the page's main content and links inside #root.
 *     Browsers with JavaScript hide it (see index.html) and React replaces it.
 *
 * Catalogue data comes from the same API endpoints the pages call. If the API
 * cannot be reached the build still succeeds with the fixed pages only, and
 * catalogue URLs keep working through the client-side app (dist/spa.html).
 */
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_SITE_URL,
  DEFAULT_TITLE,
  SITE_NAME,
  STATIC_PAGES,
  TWITTER_HANDLE,
  IMAGE_WIDTH,
  absoluteUrl,
  cleanText,
  cloudinaryUrl,
  dealMeta,
  dealPath,
  listingMeta,
  listingPath,
  providerMeta,
  providerPath,
  relatedByOrder,
  staticPageMeta,
} from "../src/seo/core.js";
import { FAQS } from "../src/content/faqs.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SITE_URL = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
const API = (process.env.VITE_API_URL || "").replace(/\/$/, "");
const CONCURRENCY = 8;
const TIMEOUT_MS = 20_000;

const log = (...a) => console.log("[prerender]", ...a);

/* ------------------------------------------------------------------ html */

const esc = (value) =>
  cleanText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// JSON-LD inside <script>: "<" must not appear or "</script>" in data could
// end the element early.
const jsonLd = (schema) =>
  `<script type="application/ld+json" data-prerender>${JSON.stringify(schema).replace(
    /</g,
    "\\u003c"
  )}</script>`;

const link = (path, text) => `<a href="${esc(path)}">${esc(text)}</a>`;

const list = (items) =>
  items.length ? `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>` : "";

const crumbsNav = (crumbs) =>
  crumbs?.length > 1
    ? `<nav aria-label="Breadcrumb"><ol>${crumbs
        .map((c, i) =>
          i === crumbs.length - 1
            ? `<li aria-current="page">${esc(c.name)}</li>`
            : `<li>${link(c.path, c.name)}</li>`
        )
        .join("")}</ol></nav>`
    : "";

/** The <!--seo--> block of index.html, rebuilt for one page. */
function headFor(meta) {
  const title = meta.title ? `${cleanText(meta.title)} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonical = absoluteUrl(meta.path, SITE_URL);
  const image = meta.image || `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;
  const isDefaultImage = !meta.image;
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${
      meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"
    }" />`,
    // A page that asks not to be indexed has no canonical to declare.
    meta.noindex ? "" : `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    isDefaultImage ? `<meta property="og:image:width" content="1200" />` : "",
    isDefaultImage ? `<meta property="og:image:height" content="630" />` : "",
    `<meta property="og:image:alt" content="${esc(meta.imageAlt || title)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${TWITTER_HANDLE}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(meta.imageAlt || title)}" />`,
    ...(meta.preload || []),
    meta.schema ? jsonLd(meta.schema) : "",
  ];
  return tags.filter(Boolean).join("\n  ");
}

/* ------------------------------------------------------------- templates */

const SITE_NAV = [
  ["/", "Home"],
  ["/service", "Discover services"],
  ["/deals", "Deals & offers"],
  ["/ListYourBusiness", "List Your Business"],
  ["/customer-panel", "Customer Panel"],
];
const FOOTER_NAV = [
  ["/AboutUS", "About Us"],
  ["/HelpAndSupport", "Help & Support"],
  ["/faq", "FAQs"],
  ["/packages", "Packages"],
  ["/job-opportunities", "Job Opportunities"],
  ["/Careers", "Careers"],
  ["/PrivacyPolicy", "Privacy Policy"],
  ["/TermsAndConditions", "Terms & Conditions"],
];

const shell = (main) =>
  `<div id="prerender"><header><nav aria-label="Main">${list(
    SITE_NAV.map(([p, t]) => link(p, t))
  )}</nav></header><main>${main}</main><footer><nav aria-label="Footer">${list(
    FOOTER_NAV.map(([p, t]) => link(p, t))
  )}</nav><p><a href="https://blog.morselv.com/">Blog</a></p></footer></div>`;

let template;
function render(meta, main) {
  const head = headFor(meta);
  return template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n  ${head}\n  <!--/seo-->`)
    .replace('<div id="root"></div>', `<div id="root">${main ? shell(main) : ""}</div>`);
}

const pages = []; // { path, html, indexable, lastmod, group }

function addPage(meta, main, { group, lastmod } = {}) {
  pages.push({
    path: meta.path,
    html: render(meta, main),
    indexable: !meta.noindex,
    lastmod,
    group,
  });
}

/* ------------------------------------------------------------------- api */

async function getJSON(path, attempt = 1) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${API}/api${path}`, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json())?.data;
  } catch (err) {
    if (attempt < 3) return getJSON(path, attempt + 1);
    throw new Error(`${path}: ${err.message}`);
  } finally {
    clearTimeout(timer);
  }
}

async function mapLimit(items, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        try {
          out[i] = await fn(items[i]);
        } catch (err) {
          out[i] = undefined;
          log("skipped:", err.message);
        }
      }
    })
  );
  return out;
}

const rows = (data) => (Array.isArray(data) ? data : []);

/* ------------------------------------------------------------ page kinds */

function staticPages(categories) {
  for (const path of Object.keys(STATIC_PAGES)) {
    const meta = staticPageMeta(path, SITE_URL);
    let main = `${crumbsNav(meta.crumbs)}<h1>${esc(meta.h1)}</h1><p>${esc(
      meta.intro || meta.description
    )}</p>`;
    if (path === "/") {
      main += `<h2>Browse by category</h2>${list(
        categories.map((c) => link(listingPath("service", { ID: c.ID, Name: c.label }), c.label))
      )}<p>${link("/service", "All services")} · ${link("/deals", "Deals around you")}</p>`;
      meta.preload = homePreloads;
    }
    if (path === "/faq") {
      main += FAQS.map((f) => `<h2>${esc(f.question)}</h2><p>${esc(f.answer)}</p>`).join("");
    }
    addPage(meta, main, { group: "pages" });
  }
}

const providerLine = (r) => {
  const where = [r.area, r.city].map(cleanText).filter(Boolean).join(", ");
  return `${link(providerPath(r.providerName, r.ID), r.providerName)}${
    r.subCatName ? ` — ${esc(r.subCatName)}` : ""
  }${where ? `, ${esc(where)}` : ""}`;
};

const dealLine = (r) =>
  `${link(dealPath(r.dealName, r.ID), r.dealName)}${
    r.providerName ? ` — ${esc(r.providerName)}` : ""
  }${cleanText(r.city) ? `, ${esc(r.city)}` : ""}`;

function listingPage({ base, category, subCategory, items, subs }) {
  const isDeals = base === "deals";
  const meta = listingMeta({
    base,
    category,
    subCategory,
    count: items.length,
    subNames: subs.map((s) => s.name),
    siteUrl: SITE_URL,
  });
  const heading = `${isDeals ? "Exclusive Deals" : "SERVICE PROVIDERS"}${
    category ? ` - ${cleanText(category.Name)}` : ""
  }`;
  const noun = isDeals ? "deal" : "provider";
  const scope = [category?.Name, subCategory?.Name].map(cleanText).filter(Boolean).join(" / ");
  let main = `${crumbsNav(meta.crumbs)}<h1>${esc(heading)}</h1><p>${esc(meta.description)}</p>`;
  if (!subCategory && subs.length) {
    main += `<h2>${category ? "Sub-categories" : "Categories"}</h2>${list(
      subs.map((s) => link(s.path, s.name))
    )}`;
  }
  main += `<h2>${items.length} ${noun}${items.length === 1 ? "" : "s"}${
    scope ? ` in ${esc(scope)}` : ""
  }</h2>${list(items.map(isDeals ? dealLine : providerLine))}`;
  addPage(meta, main, { group: "listings" });
  return meta;
}

function providerPage(detail, siblings) {
  const [provider, services, images] = detail;
  const meta = providerMeta(provider, { services, images, siteUrl: SITE_URL });
  meta.preload = imagePreload(images.map((i) => i?.url).find(Boolean));
  const related = relatedByOrder(siblings, provider.ID);
  const cat = meta.crumbs.slice(2, -1); // category, sub-category crumbs
  const named = services.filter((s) => cleanText(s.Name));
  let main = `${crumbsNav(meta.crumbs)}<h1>${esc(meta.h1)}</h1>`;
  if (cat.length) main += `<p>${cat.map((c) => link(c.path, c.name)).join(" / ")}</p>`;
  if (cleanText(provider.FullAddress)) main += `<p>${esc(provider.FullAddress)}</p>`;
  if (named.length) {
    main += `<h2>Main Offerings</h2>${named
      .map((s) => `<h3>${esc(s.Name)}</h3>${cleanText(s.Description) ? `<p>${esc(s.Description)}</p>` : ""}`)
      .join("")}`;
  }
  if (cleanText(provider.highlights)) main += `<h2>Highlights</h2><p>${esc(provider.highlights)}</p>`;
  if (cleanText(provider.Description)) main += `<h2>About the business</h2><p>${esc(provider.Description)}</p>`;
  if (related.length) {
    main += `<h2>More ${esc(provider.SubCategory || "providers")} on Morselv</h2>${list(
      related.map(providerLine)
    )}`;
    if (meta.crumbs.length === 5) main += `<p>${link(meta.crumbs[3].path, `See all ${provider.SubCategory}`)}</p>`;
  }
  const modified = provider.ModifiedDate || provider.CreatedDate;
  addPage(meta, main, {
    group: "providers",
    lastmod: modified ? new Date(modified).toISOString().slice(0, 10) : undefined,
  });
}

function dealPage(deal, dealID) {
  const meta = dealMeta(deal, dealID, { siteUrl: SITE_URL });
  meta.preload = imagePreload(deal.ImageName);
  let main = `${crumbsNav(meta.crumbs)}<h1>${esc(meta.h1)}</h1>`;
  if (cleanText(deal.Description)) main += `<p>${esc(deal.Description)}</p>`;
  if (cleanText(deal.ProviderName)) {
    main += `<p>by ${
      meta.providerPath ? link(meta.providerPath, deal.ProviderName) : esc(deal.ProviderName)
    }</p>`;
  }
  const cats = [deal.CatName, deal.SubCatName].map(cleanText).filter(Boolean);
  if (cats.length) main += `<p>${esc(cats.join(" / "))}</p>`;
  if (cleanText(deal.FullAddress)) main += `<p>${esc(deal.FullAddress)}</p>`;
  if (deal.ImageName) main += `<img src="${esc(deal.ImageName)}" alt="${esc(meta.imageAlt)}" />`;
  addPage(meta, main, { group: "deals" });
}

/* --------------------------------------------------------------- sitemap */

function urlset(entries) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(
      (p) =>
        `  <url><loc>${esc(absoluteUrl(p.path, SITE_URL))}</loc>${
          // Only a date we actually know. A build date on every URL tells
          // crawlers nothing and teaches them to ignore lastmod.
          p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ""
        }</url>`
    ),
    "</urlset>",
    "",
  ].join("\n");
}

async function writeSitemaps() {
  const groups = ["pages", "listings", "providers", "deals"];
  const files = [];
  for (const group of groups) {
    const entries = pages.filter((p) => p.group === group && p.indexable);
    if (!entries.length) continue;
    const file = `sitemap-${group}.xml`;
    await writeFile(join(DIST, file), urlset(entries));
    files.push({ file, count: entries.length });
  }
  const index = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...files.map((f) => `  <sitemap><loc>${SITE_URL}/${f.file}</loc></sitemap>`),
    "</sitemapindex>",
    "",
  ].join("\n");
  await writeFile(join(DIST, "sitemap.xml"), index);
  return files;
}

// On provider and deal pages the main photo is the largest element, but the
// browser only learns its URL after the app has loaded and fetched the record.
// Preloading the exact (resized) URL the page will use starts that download
// with the HTML.
const imagePreload = (url) =>
  url
    ? [`<link rel="preload" as="image" href="${esc(
        cloudinaryUrl(url, IMAGE_WIDTH.detail)
      )}" fetchpriority="high" />`]
    : [];

/* ------------------------------------------------------------------ main */

let homePreloads = [];

async function heroPreloads() {
  // The home page's largest image is a CSS background, which the browser's
  // preload scanner cannot see; tell it about the right one per viewport.
  const assets = await readdir(join(DIST, "assets"));
  const find = (prefix) => assets.find((f) => f.startsWith(`${prefix}-`) && f.endsWith(".webp"));
  const mobile = find("bgimgmobile");
  const desktop = find("bgImg");
  return [
    mobile &&
      `<link rel="preload" as="image" href="/assets/${mobile}" media="(max-width: 767px)" fetchpriority="high" />`,
    desktop &&
      `<link rel="preload" as="image" href="/assets/${desktop}" media="(min-width: 768px)" fetchpriority="high" />`,
  ].filter(Boolean);
}

async function main() {
  // dist/index.html becomes the rendered home page below; spa.html keeps the
  // untouched build output, so `npm run prerender` can be re-run on its own.
  template = await readFile(join(DIST, "spa.html"), "utf8").catch(() =>
    readFile(join(DIST, "index.html"), "utf8")
  );
  if (!template.includes("<!--seo-->") || !template.includes('<div id="root"></div>')) {
    throw new Error("dist/index.html is missing the <!--seo--> block or #root");
  }

  // Catch-all document for URLs without a file of their own (a provider
  // added since the last build, a mistyped path). Deliberately generic: no
  // canonical, so it cannot claim to be the home page.
  await writeFile(join(DIST, "spa.html"), template);

  homePreloads = await heroPreloads();

  let categories = [];
  let subCategories = [];
  let catalogue = true;
  if (!API) {
    catalogue = false;
    log("VITE_API_URL not set — fixed pages only");
  } else {
    try {
      [categories, subCategories] = (
        await Promise.all([getJSON("/category"), getJSON("/subCategory")])
      ).map((d) => rows(d?.[0] ?? d));
    } catch (err) {
      catalogue = false;
      log("catalogue unavailable, fixed pages only:", err.message);
    }
  }

  staticPages(categories);

  if (catalogue) {
    const cat = (c) => ({ ID: c.ID, Name: c.label });
    const subsOf = (catId) => subCategories.filter((s) => s.CatID === catId);
    const subLink = (c, s) => ({
      name: cleanText(s.SubCatName),
      path: listingPath("service", cat(c), { ID: s.ID, Name: s.SubCatName }),
    });

    // Listings, from the endpoints the listing pages call.
    const combos = [
      { c: null, s: null },
      ...categories.map((c) => ({ c, s: null })),
      ...subCategories
        .map((s) => ({ c: categories.find((c) => c.ID === s.CatID), s }))
        .filter((x) => x.c),
    ];
    const filterQuery = ({ c, s }) => `category=${c ? c.ID : 0}&subCategory=${s ? s.ID : 0}`;
    const [providerSets, dealSets] = await Promise.all([
      mapLimit(combos, (x) => getJSON(`/provider/filter?${filterQuery(x)}`)),
      mapLimit(combos, (x) => getJSON(`/deals/filter?${filterQuery(x)}`)),
    ]);

    const siblingsBySub = new Map();
    combos.forEach((x, i) => {
      const providersHere = rows(providerSets[i]);
      const dealsHere = rows(dealSets[i]);
      if (x.s) siblingsBySub.set(`${x.c.ID}:${x.s.ID}`, providersHere);
      const subs = x.s
        ? []
        : x.c
        ? subsOf(x.c.ID).map((s) => subLink(x.c, s))
        : categories.map((c) => ({ name: c.label, path: listingPath("service", cat(c)) }));
      const dealSubs = x.s
        ? []
        : x.c
        ? subsOf(x.c.ID).map((s) => ({
            name: cleanText(s.SubCatName),
            path: listingPath("deals", cat(x.c), { ID: s.ID, Name: s.SubCatName }),
          }))
        : categories.map((c) => ({ name: c.label, path: listingPath("deals", cat(c)) }));
      const category = x.c ? cat(x.c) : null;
      const subCategory = x.s ? { ID: x.s.ID, Name: x.s.SubCatName } : null;
      if (providerSets[i] !== undefined) {
        listingPage({ base: "service", category, subCategory, items: providersHere, subs });
      }
      if (dealSets[i] !== undefined) {
        listingPage({ base: "deals", category, subCategory, items: dealsHere, subs: dealSubs });
      }
    });

    // Providers: every provider the public listing shows.
    const allProviders = rows(providerSets[0]);
    const details = await mapLimit(allProviders, async (p) => {
      const d = await getJSON(`/provider/id?providerID=${p.ID}`);
      const provider = rows(d?.[0])[0];
      return provider ? [provider, rows(d?.[1]), rows(d?.[2])] : undefined;
    });
    for (const d of details.filter(Boolean)) {
      const siblings = siblingsBySub.get(`${d[0].catID}:${d[0].SubCategoryID}`) || [];
      providerPage(d, siblings);
    }

    // Deals: every deal the public listing shows.
    const allDeals = rows(dealSets[0]);
    const dealDetails = await mapLimit(allDeals, async (r) => {
      const d = rows(await getJSON(`/deals/id?dealID=${r.ID}`))[0];
      return d ? [d, r.ID] : undefined;
    });
    for (const d of dealDetails.filter(Boolean)) dealPage(d[0], d[1]);
  }

  // Write the files.
  for (const page of pages) {
    const file =
      page.path === "/" ? join(DIST, "index.html") : join(DIST, page.path.slice(1), "index.html");
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, page.html);
  }
  const sitemaps = await writeSitemaps();

  const by = (g) => pages.filter((p) => p.group === g);
  log(
    `wrote ${pages.length} pages:`,
    ["pages", "listings", "providers", "deals"]
      .map((g) => `${g} ${by(g).length} (${by(g).filter((p) => !p.indexable).length} noindex)`)
      .join(", ")
  );
  log("sitemaps:", sitemaps.map((s) => `${s.file} ${s.count}`).join(", "));
}

main().catch((err) => {
  // Never fail the deploy over SEO output: the app itself is already built.
  console.error("[prerender] failed:", err);
  process.exitCode = 0;
});
