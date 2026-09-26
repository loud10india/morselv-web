const SITE_HOSTS = new Set(["morselv.com", "www.morselv.com"]);

const titleFromSlug = (slug = "") =>
  slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/**
 * Classifies an admin-entered link (banners, gallery tiles).
 *
 *  - Links to this site, on either hostname, become in-app paths, so they
 *    open on the canonical host with no redirect hop.
 *  - Anything else is external.
 *  - Empty or malformed input returns null: show the image, but not as a link.
 *
 * `label` describes the destination, for use as alt text on a linked image.
 */
export default function linkTarget(link) {
  if (!link) return null;
  if (typeof link === "string" && link.startsWith("/")) {
    return { internal: true, to: link, label: "Morselv" };
  }
  try {
    const url = new URL(link);
    if (SITE_HOSTS.has(url.hostname)) {
      const provider = url.pathname.match(/^\/provider\/([^/]+)\//);
      return {
        internal: true,
        to: `${url.pathname}${url.search}`,
        label: provider ? `${titleFromSlug(provider[1])} on Morselv` : "Morselv",
      };
    }
    return {
      internal: false,
      href: url.href,
      label: `Visit ${url.hostname.replace(/^www\./, "")}`,
    };
  } catch {
    return null;
  }
}
