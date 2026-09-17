import React, { useEffect, useMemo, useRef, useState } from "react";

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

const SLIDE_MS = 2600;

// 4 per row on desktop, 3 on tablet, 2 on mobile.
const visibleForWidth = (width) => {
  if (width >= 1024) return 4;
  if (width >= 640) return 3;
  return 2;
};

function GallerySection() {
  const [perView, setPerView] = useState(() =>
    typeof window === "undefined" ? 4 : visibleForWidth(window.innerWidth)
  );
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const total = GALLERY_IMAGES.length;

  useEffect(() => {
    const onResize = () => setPerView(visibleForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Clone the leading slides onto the end so the last step wraps without a jump.
  const slides = useMemo(
    () => [...GALLERY_IMAGES, ...GALLERY_IMAGES.slice(0, perView)],
    [perView]
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
    }, 700);
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
              transition: animate ? "transform 700ms ease-in-out" : "none",
            }}
          >
            {slides.map((image, i) => (
              <li
                key={`${image.name}-${i}`}
                className="shrink-0 px-2 md:px-3"
                style={{ width: `${100 / perView}%` }}
                aria-hidden={i >= total ? "true" : undefined}
              >
                <div className="overflow-hidden rounded-2xl shadow-[0_3px_15px_rgba(0,0,0,0.10)] bg-white">
                  <img
                    src={image.src}
                    alt={`${image.name} — partner business on Morselv`}
                    loading="lazy"
                    decoding="async"
                    width="540"
                    height="360"
                    className="w-full h-[150px] sm:h-[190px] lg:h-[230px] object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
