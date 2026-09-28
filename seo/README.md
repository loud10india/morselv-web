# seo/

`catalogue.fingerprint` holds the content fingerprint of the last published
pre-render (see `scripts/prerender.mjs`). The nightly workflow
`.github/workflows/seo-refresh.yml` rebuilds against the live API, and when the
fingerprint differs it commits the new one here, which makes App Platform
redeploy with fresh provider, deal and listing pages and sitemap.

To refresh immediately (for example after a bulk edit in the admin panel), open
the repository's **Actions** tab, choose **Refresh pre-rendered catalogue**, and
click **Run workflow**.

## Hosting behaviour the SEO setup relies on

These are App Platform settings, not files in this repository, so they are
listed here to be checked whenever the app spec changes (export it with
`doctl apps spec get <app-id>`; commit it only with secret values removed).

- **Catch-all document `spa.html`** for paths without a file of their own. It
  serves listings added since the last build, and lets renamed or mistyped
  listing URLs redirect to their canonical address in the app. Unknown pages
  get `noindex` from the app once it runs.
- **`/path` and `/path/` both serve `path/index.html`** (pre-rendered pages).
- **Permanent redirects** from `morselv.com` to `www.morselv.com`, and from
  `/blog` to `blog.morselv.com`. Every canonical URL uses `https://www.morselv.com`.
- **Deploy on push to `main`**, which is how the nightly catalogue refresh
  publishes new pages and sitemaps.
- **Build-time variables**: `VITE_API_URL` (the pre-render needs it to build
  catalogue pages; with an https URL an incomplete catalogue fails the build),
  optionally `VITE_SITE_URL`.
