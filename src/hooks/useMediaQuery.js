import { useEffect, useState } from "react";

// Tailwind's default breakpoints, so a layout chosen here lines up exactly
// with the sm:/md:/lg:/xl: classes it replaces.
export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };
export const minWidth = (bp) => `(min-width: ${BREAKPOINTS[bp]}px)`;

const matches = (query) =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;

/**
 * True while the media query matches. The first render already has the
 * right answer (it is read synchronously), so a layout picked with this does
 * not flash the wrong variant first.
 */
export default function useMediaQuery(query) {
  const [isMatch, setIsMatch] = useState(() => matches(query));

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const mql = window.matchMedia(query);
    const onChange = () => setIsMatch(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMatch;
}
