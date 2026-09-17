#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml for the site's static routes.
 *
 * Run: npm run sitemap   (also runs automatically via `npm run build`)
 *
 * Dynamic routes (/deal/:slug/:id, /provider/:slug/:id and the
 * category-filtered listings) are intentionally NOT emitted here: their
 * identifiers live in the database. Once the API is reachable, extend
 * `dynamicRoutes()` below to fetch and append them.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.VITE_SITE_URL || "https://www.morselv.com").replace(/\/$/, "");

const staticRoutes = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/service", changefreq: "daily", priority: "0.9" },
  { path: "/deals", changefreq: "daily", priority: "0.9" },
  { path: "/packages", changefreq: "monthly", priority: "0.8" },
  { path: "/ListYourBusiness", changefreq: "monthly", priority: "0.8" },
  { path: "/customer-panel", changefreq: "monthly", priority: "0.6" },
  { path: "/Careers", changefreq: "weekly", priority: "0.6" },
  { path: "/AboutUS", changefreq: "monthly", priority: "0.6" },
  { path: "/HelpAndSupport", changefreq: "monthly", priority: "0.5" },
  { path: "/faq", changefreq: "monthly", priority: "0.5" },
  { path: "/PrivacyPolicy", changefreq: "yearly", priority: "0.3" },
  { path: "/TermsAndConditions", changefreq: "yearly", priority: "0.3" },
];

// Placeholder for DB-backed URLs. Return [{ path, changefreq, priority }].
async function dynamicRoutes() {
  return [];
}

const urlEntry = ({ path, changefreq, priority }, lastmod) =>
  [
    "  <url>",
    `    <loc>${SITE_URL}${path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");

const routes = [...staticRoutes, ...(await dynamicRoutes())];
const lastmod = new Date().toISOString().slice(0, 10);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => urlEntry(route, lastmod)),
  "</urlset>",
  "",
].join("\n");

const out = resolve(__dirname, "..", "public", "sitemap.xml");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, xml, "utf8");
console.log(`sitemap.xml written with ${routes.length} URLs -> ${out}`);
