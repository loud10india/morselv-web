/**
 * Placeholder for records with no image.
 *
 * Provider and deal rows can come back without an image URL, and
 * `<img src={undefined}>` renders the browser's broken-image icon inside the
 * card. Inline SVG so it costs no request and cannot itself 404.
 */
export const IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300" role="img" aria-label="No image available">
      <rect width="300" height="300" fill="#F4F4F4"/>
      <g fill="none" stroke="#C9C9C9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="88" y="100" width="124" height="100" rx="10"/>
        <circle cx="120" cy="132" r="11"/>
        <path d="M96 186l38-36 30 28 22-20 26 26"/>
      </g>
      <text x="150" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" fill="#9A9A9A">No image</text>
    </svg>`
  );

/** src with a guaranteed value. */
export const imageSrc = (src) =>
  typeof src === "string" && src.trim() ? src : IMAGE_PLACEHOLDER;

/** Swaps in the placeholder if the real URL fails to load. */
export const onImageError = (e) => {
  if (e.currentTarget.dataset.fallbackApplied) return;
  e.currentTarget.dataset.fallbackApplied = "1";
  e.currentTarget.src = IMAGE_PLACEHOLDER;
};
