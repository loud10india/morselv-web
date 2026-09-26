import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { listingPath } from "../seo/core.js";

/**
 * Keeps a listing's URL in step with its filters (/service/… or /deals/…).
 *
 * The URL is authoritative whenever it changes — landing on a page, a link,
 * back/forward: the listing copies it into state, and this hook does not push
 * the not-yet-updated state back over it. (It used to, on the very first
 * render, which is how /service/14-…?min=0&max=5 lost its category.) When the
 * state changes while the URL stays put — the visitor used the filters, or the
 * category list loaded and a mistyped slug can be corrected — the URL is
 * updated to match.
 *
 * Only min/max belong to the listing. Any other query parameters (utm_*,
 * gclid, …) are kept, so campaign attribution survives.
 */
export default function useListingUrlSync(base, category, subCategory, distance) {
  const location = useLocation();
  const navigate = useNavigate();
  const lastSeen = useRef(null);
  const here = location.pathname + location.search;

  useEffect(() => {
    if (lastSeen.current !== here) {
      lastSeen.current = here;
      return;
    }
    const params = new URLSearchParams(location.search);
    params.delete("min");
    params.delete("max");
    if (distance?.min !== undefined) params.set("min", distance.min);
    if (distance?.max !== undefined && distance.max !== Infinity) {
      params.set("max", distance.max);
    }
    const path = listingPath(
      base,
      category?.ID ? category : null,
      subCategory?.ID ? subCategory : null
    );
    const qs = params.toString();
    const target = path + (qs ? `?${qs}` : "");
    if (target !== here) navigate(target + location.hash, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    here,
    base,
    category?.ID,
    category?.Name,
    subCategory?.ID,
    subCategory?.Name,
    distance?.min,
    distance?.max,
  ]);
}
