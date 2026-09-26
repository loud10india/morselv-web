# seo/

`catalogue.fingerprint` holds the content fingerprint of the last published
pre-render (see `scripts/prerender.mjs`). The nightly workflow
`.github/workflows/seo-refresh.yml` rebuilds against the live API, and when the
fingerprint differs it commits the new one here, which makes App Platform
redeploy with fresh provider, deal and listing pages and sitemap.

To refresh immediately (for example after a bulk edit in the admin panel), open
the repository's **Actions** tab, choose **Refresh pre-rendered catalogue**, and
click **Run workflow**.
