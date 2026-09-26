import React, { useEffect, useState } from "react";
import { imageSrc, onImageError } from "../../utils/imageFallback";
import { Link } from "react-router-dom";
import Breadcrumbs from "../utils/Breadcrumbs";
import {
  CARD_SIZES,
  cleanText,
  cloudinarySrcSet,
  cloudinaryUrl,
  IMAGE_WIDTH,
  providerPath,
} from "../../seo/siteConfig";

const LocationPin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className="shrink-0"
  >
    <path
      d="M8.36621 9.15137C7.8903 9.15137 7.42508 9.01024 7.02937 8.74584C6.63367 8.48144 6.32525 8.10563 6.14313 7.66595C5.961 7.22627 5.91335 6.74245 6.0062 6.27568C6.09904 5.80892 6.32822 5.38016 6.66474 5.04364C7.00126 4.70712 7.43001 4.47795 7.89678 4.3851C8.36354 4.29226 8.84736 4.33991 9.28704 4.52203C9.72673 4.70416 10.1025 5.01257 10.3669 5.40828C10.6313 5.80398 10.7725 6.26921 10.7725 6.74512C10.7717 7.38306 10.5179 7.99466 10.0668 8.44575C9.61575 8.89684 9.00415 9.1506 8.36621 9.15137ZM8.36621 5.30137C8.08067 5.30137 7.80153 5.38604 7.56411 5.54468C7.32668 5.70333 7.14163 5.92881 7.03236 6.19262C6.92309 6.45643 6.8945 6.74672 6.9502 7.02678C7.00591 7.30684 7.14341 7.56409 7.34533 7.766C7.54724 7.96792 7.80449 8.10542 8.08455 8.16113C8.36461 8.21683 8.6549 8.18824 8.91871 8.07897C9.18252 7.96969 9.408 7.78465 9.56665 7.54722C9.72529 7.3098 9.80996 7.03066 9.80996 6.74512C9.80958 6.36233 9.65735 5.99533 9.38667 5.72465C9.116 5.45398 8.749 5.30175 8.36621 5.30137Z"
      fill="#5D5D5D"
    />
    <path
      d="M8.36699 14.9264L4.30717 10.1385C4.25076 10.0666 4.19493 9.99422 4.1397 9.92142C3.44655 9.00771 3.07196 7.89203 3.07325 6.74517C3.07325 5.34118 3.63098 3.99469 4.62375 3.00192C5.61652 2.00915 6.96301 1.45142 8.36699 1.45142C9.77098 1.45142 11.1175 2.00915 12.1102 3.00192C13.103 3.99469 13.6607 5.34118 13.6607 6.74517C13.6619 7.89148 13.2874 9.0066 12.5948 9.91997L12.5943 9.92142C12.5943 9.92142 12.4499 10.111 12.4283 10.1365L8.36699 14.9264ZM4.90825 9.34151C4.90825 9.34151 5.02038 9.48973 5.04589 9.5215L8.36699 13.4384L11.6924 9.5162C11.7136 9.48973 11.8262 9.34055 11.8267 9.34007C12.3932 8.59372 12.6994 7.68218 12.6982 6.74517C12.6982 5.59645 12.2419 4.49478 11.4297 3.68251C10.6174 2.87024 9.51571 2.41392 8.36699 2.41392C7.21828 2.41392 6.11661 2.87024 5.30434 3.68251C4.49207 4.49478 4.03575 5.59645 4.03575 6.74517C4.03456 7.68278 4.34107 8.59489 4.90825 9.34151Z"
      fill="#5D5D5D"
    />
  </svg>
);

/**
 * One responsive grid for every breakpoint.
 *
 * This previously rendered three full copies of the list (desktop / tablet /
 * mobile blocks), so a 214-provider category put 642 cards in the DOM and ran
 * to ~22,000px. A single grid plus lazy-loaded images keeps the markup to one
 * card per provider.
 */
// Cards rendered in the first pass. The rest follow right after the first
// paint: building all 343 cards (~10,000 elements) at once delayed the first
// photo appearing by ~0.3 s on a mid-range phone. Every card still ends up in
// the page, so nothing is hidden from visitors or crawlers.
const FIRST_PASS = 24;

function ServiceCardGrid({
  data,
  selectedCategory,
  selectedSubCategory,
  crumbs = [],
  loaded = true,
}) {
  const [limit, setLimit] = useState(FIRST_PASS);
  useEffect(() => {
    setLimit(FIRST_PASS);
    if (data.length <= FIRST_PASS) return undefined;
    // Two frames: let the first batch paint, then add the rest.
    let second;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setLimit(Infinity));
    });
    return () => {
      cancelAnimationFrame(first);
      if (second) cancelAnimationFrame(second);
    };
  }, [data]);
  const visible = limit === Infinity ? data : data.slice(0, limit);
  const breadcrumb = [selectedCategory?.Name, selectedSubCategory?.Name]
    .filter(Boolean)
    .join(" / ");

  return (
    <section className="w-full bg-white pt-6 pb-12 sm:pt-[45.75px] sm:pb-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">
        {/* Breadcrumb + result count */}
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <Breadcrumbs items={crumbs} />
          {data.length > 0 && (
            // The heading for the card list (cards use <h3>), so the page
            // reads h1 -> h2 -> h3.
            <h2 className="font-montserrat text-[13px] sm:text-[14px] text-[#777]">
              {data.length} {data.length === 1 ? "provider" : "providers"}
              {breadcrumb ? ` in ${breadcrumb}` : ""}
            </h2>
          )}
        </div>

        {!loaded ? (
          // Holds the space the results will fill, so the sections below
          // stay out of view instead of being pushed down when they arrive.
          <div className="min-h-screen" aria-busy="true" />
        ) : data.length === 0 ? (
          <div className="rounded-2xl border border-[#EFEFEF] bg-[#FBFBFB] px-6 py-14 text-center">
            <p className="font-montserrat text-[15px] sm:text-[16px] text-[#5D5D5D]">
              We didn&rsquo;t find anything that matched your search. Try
              resetting your filters.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-5 list-none p-0 m-0">
            {visible.map((provider, index) => (
              <li key={provider.id}>
                <article className="h-full">
                  <Link
                    // A real link: crawlers can follow it, and middle-click /
                    // open-in-new-tab work (the card was a div with onClick).
                    to={providerPath(provider.providerName, provider.id)}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[14px] sm:rounded-[17px] bg-white shadow-[0_1.882px_8.799px_rgba(0,0,0,0.10)] sm:shadow-[0_3.422px_15.999px_rgba(0,0,0,0.10)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9636]"
                  >
                    <div className="p-2 sm:p-3 lg:p-4">
                      <div className="relative w-full overflow-hidden rounded-[10px] sm:rounded-[14px] border border-gray-200 bg-[#F4F4F4] aspect-square">
                        <img
                          src={imageSrc(cloudinaryUrl(provider.image, IMAGE_WIDTH.card))}
                          srcSet={cloudinarySrcSet(provider.image)}
                          sizes={CARD_SIZES}
                          data-original={provider.image || undefined}
                          onError={onImageError}
                          alt={cleanText(provider.providerName)}
                          // The first row is in view on load: fetch it now, and leave
                          // the rest (up to 343 cards) until they are scrolled to.
                          loading={index < 4 ? "eager" : "lazy"}
                          fetchPriority={index < 2 ? "high" : "auto"}
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
  
                    <div className="flex flex-grow flex-col px-3 pb-3 sm:px-4 sm:pb-4">
                      <span className="font-montserrat text-[10px] sm:text-[13px] font-medium leading-[125%] text-[#4D4D4D]">
                        {provider.subCatName}
                      </span>
                      <h3 className="mt-1 truncate font-montserrat text-[12px] sm:text-[16px] lg:text-[19px] font-semibold text-[#2D2D2D]">
                        {provider.providerName}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 sm:gap-2">
                        <LocationPin />
                        <span className="truncate font-montserrat text-[10px] sm:text-[12px] lg:text-[13px] leading-snug text-[#4D4D4D]">
                          {[provider.area, provider.city].map(cleanText).filter(Boolean).join(", ")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ServiceCardGrid;
