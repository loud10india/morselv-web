/** "skin-hair-beauty" -> "Skin Hair Beauty": a readable label until the real one loads. */
export const prettifySlug = (slug = "") =>
  slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const NONE = { ID: 0, Name: "" };

const parseSegment = (segment) => {
  if (!segment) return NONE;
  const [id, ...slug] = segment.split("-");
  return { ID: parseInt(id), Name: prettifySlug(slug.join("-")) };
};

/**
 * The category and sub-category a listing URL names, e.g.
 * /service/14-skin-hair-beauty/11-salon. Used as the listing's initial state,
 * so its very first render already describes the page it is on (it used to
 * start as the unfiltered listing and correct itself a moment later).
 */
export const selectionFromPath = (pathname = "") => {
  const parts = pathname.split("/").filter(Boolean);
  return { category: parseSegment(parts[1]), subCategory: parseSegment(parts[2]) };
};
