import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import providersApi from "../../api/providers";
import galleryApi from "../../api/gallery";
import { useLoc } from "../context/LocationContext";
import { cloudinaryUrl, IMAGE_WIDTH, providerPath } from "../../seo/siteConfig";
import { onImageError } from "../../utils/imageFallback";
import linkTarget from "../../utils/linkTarget";

import g1 from "../assets/Boulder Creek.jpg";
import g2 from "../assets/Cactus Bloom.jpg";
import g3 from "../assets/Coyote Corner.jpg";
import g4 from "../assets/Dusty Trails.jpg";
import g5 from "../assets/Frontier Stop.jpg";
import g6 from "../assets/Grit & Grain.jpg";
import g7 from "../assets/Lone Star Lounge.jpg";
import g8 from "../assets/Mavericks Nook.jpg";
import g9 from "../assets/Pine Ridge.jpg";
import g10 from "../assets/Ranch House.jpg";
import g11 from "../assets/Rusty Wagon.jpg";
import g12 from "../assets/Saddleback Pub.jpg";
import g13 from "../assets/Silver Creek Tavern.jpg";
import g14 from "../assets/The Gilded Rose.jpg";
import g15 from "../assets/The Golden Oasis.jpg";
import g16 from "../assets/The Rusty Spur Salon.jpg";

// 16 images, rotated four-at-a-time. Swap this array for an API response
// (see banner.getAllBanner) if these ever need to be admin-managed.
const GALLERY_IMAGES = [
  { src: g1, name: "Boulder Creek" },
  { src: g2, name: "Cactus Bloom" },
  { src: g3, name: "Coyote Corner" },
  { src: g4, name: "Dusty Trails" },
  { src: g5, name: "Frontier Stop" },
  { src: g6, name: "Grit & Grain" },
  { src: g7, name: "Lone Star Lounge" },
  { src: g8, name: "Mavericks Nook" },
  { src: g9, name: "Pine Ridge" },
  { src: g10, name: "Ranch House" },
  { src: g11, name: "Rusty Wagon" },
  { src: g12, name: "Saddleback Pub" },
  { src: g13, name: "Silver Creek Tavern" },
  { src: g14, name: "The Gilded Rose" },
  { src: g15, name: "The Golden Oasis" },
  { src: g16, name: "The Rusty Spur Salon" },
];

const SLIDE_MS = 1000;
const GALLERY_TARGET = 16;


// 4 per row on desktop, 3 on tablet, 2 on mobile.
const visibleForWidth = (width) => {
  if (width >= 1024) return 4;
  if (width >= 640) return 3;
  return 2;
};

/**
 * A gallery tile: a real link when it has a destination (crawlable and
 * reachable by keyboard; it was a div with a click handler). Admin-entered
 * links to this site open in-app; external partner links are promotional
 * placements, hence rel="sponsored". Clones that only exist to make the
 * carousel loop are hidden from assistive tech and the tab order.
 */
function Tile({ image, hidden, children }) {
  const dest = linkTarget(image.href);
  const base = "group block overflow-hidden rounded-2xl bg-white shadow-[0_3px_15px_rgba(0,0,0,0.10)]";
  const interactive = `${base} cursor-pointer transition hover:shadow-[0_6px_22px_rgba(0,0,0,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9636]`;
  const tab = hidden ? -1 : undefined;
  if (dest?.internal) {
    return (
      <Link to={dest.to} className={interactive} tabIndex={tab}>
        {children}
      </Link>
    );
  }
  if (dest) {
    return (
      <a
        href={dest.href}
        className={interactive}
        tabIndex={tab}
        rel="sponsored noopener noreferrer"
        target={image.newTab ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }
  return <div className={base}>{children}</div>;
}

function GallerySection() {
  const [perView, setPerView] = useState(() =>
    typeof window === "undefined" ? 4 : visibleForWidth(window.innerWidth)
  );
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [providers, setProviders] = useState([]);
  const [managed, setManaged] = useState([]);
  const { location } = useLoc();

  // Admin-curated tiles win: each carries its own image and destination, set
  // from the dashboard. Providers and the bundled images are fallbacks.
  useEffect(() => {
    let active = true;
    galleryApi
      .getGallery()
      .then((res) => {
        const rows = res?.data?.[0];
        if (!active || !Array.isArray(rows) || !rows.length) return;
        setManaged(
          rows
            .filter((r) => r.ImageURL)
            .map((r) => ({
              src: r.ImageURL,
              name: r.Title || "Morselv",
              href: r.LinkURL || null,
              external: !!r.LinkURL,
              newTab: !!r.OpenInNewTab,
            }))
        );
      })
      .catch(() => {
        /* fall through to providers / bundled images */
      });
    return () => {
      active = false;
    };
  }, []);

  // Prefer real providers so each tile links somewhere useful; the bundled
  // images stay as a fallback when the API has nothing for this location.
  useEffect(() => {
    if (!location?.lat || !location?.lng) return;
    let active = true;
    providersApi
      .getNearbyProviders(location)
      .then((res) => {
        const rows = Array.isArray(res?.data) ? res.data : [];
        const mapped = rows
          .filter((x) => x.imageURL && x.providerName)
          .slice(0, 16)
          .map((x) => ({
            src: x.imageURL,
            name: x.providerName,
            href: providerPath(x.providerName, x.ID),
          }));
        if (active && mapped.length >= 4) setProviders(mapped);
      })
      .catch(() => {
        /* keep the bundled set */
      });
    return () => {
      active = false;
    };
  }, [location]);

  // Always show 16 tiles. Admin tiles come first, then providers, then the
  // bundled images top up whatever is left.
  const items = useMemo(() => {
    if (managed.length >= GALLERY_TARGET) return managed.slice(0, GALLERY_TARGET);
    if (managed.length) {
      const used = new Set(managed.map((m) => m.src));
      const rest = [...providers, ...GALLERY_IMAGES].filter((x) => !used.has(x.src));
      return [...managed, ...rest].slice(0, GALLERY_TARGET);
    }
    if (!providers.length) return GALLERY_IMAGES;
    if (providers.length >= GALLERY_TARGET) return providers.slice(0, GALLERY_TARGET);
    const used = new Set(providers.map((p) => p.src));
    const filler = GALLERY_IMAGES.filter((g) => !used.has(g.src));
    return [...providers, ...filler].slice(0, GALLERY_TARGET);
  }, [managed, providers]);

  const total = items.length;

  useEffect(() => {
    const onResize = () => setPerView(visibleForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Clone the leading slides onto the end so the last step wraps without a jump.
  const slides = useMemo(
    () => [...items, ...items.slice(0, perView)],
    [items, perView]
  );


  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const timer = setInterval(() => setIndex((i) => i + 1), SLIDE_MS);
    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  // Once the cloned tail is on screen, snap back to the real first slide.
  useEffect(() => {
    if (index !== total) return undefined;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 620);
    return () => clearTimeout(t);
  }, [index, total]);

  useEffect(() => {
    if (animate) return undefined;
    const t = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(t);
  }, [animate]);

  // Keep index in range when the breakpoint changes under us.
  useEffect(() => {
    setIndex((i) => (i > total ? 0 : i));
  }, [perView, total]);

  return (
    <section
      aria-labelledby="gallery-heading"
      className="bg-[#FBFBFB] py-10 md:py-16"
    >
      <div className="w-[90%] max-w-[1300px] mx-auto">
        <div className="flex items-center w-full mb-8 md:mb-12">
          <h2
            id="gallery-heading"
            className="sm:text-xl md:text-2xl lg:text-4xl font-bold text-black tracking-wider whitespace-nowrap"
          >
            MOMENTS AT MORSELV
          </h2>
          <div className="flex-1 mx-4 h-[2px] bg-black" />
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ul
            className="flex list-none p-0 m-0"
            style={{
              transform: `translateX(-${index * (100 / perView)}%)`,
              transition: animate ? "transform 600ms ease-in-out" : "none",
            }}
          >
            {slides.map((image, i) => (
              <li
                key={`${image.name}-${i}`}
                className="shrink-0 px-2 md:px-3"
                style={{ width: `${100 / perView}%` }}
                aria-hidden={i >= total ? "true" : undefined}
              >
                <Tile image={image} hidden={i >= total}>
                  <img
                    src={cloudinaryUrl(image.src, IMAGE_WIDTH.card)}
                    data-original={image.src}
                    onError={onImageError}
                    alt={
                      image.href
                        ? `${image.name} — view this provider on Morselv`
                        : `${image.name} — partner business on Morselv`
                    }
                    loading="lazy"
                    decoding="async"
                    width="540"
                    height="360"
                    className="w-full h-[150px] sm:h-[190px] lg:h-[230px] object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                </Tile>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
