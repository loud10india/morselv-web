import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner from "../../api/banner";
import useMediaQuery, { minWidth } from "../../hooks/useMediaQuery";
import { cloudinaryUrl } from "../../seo/siteConfig";
import { onImageError } from "../../utils/imageFallback";
import linkTarget from "../../utils/linkTarget";

/**
 * One banner. A real link (crawlable, keyboard-reachable) instead of a div
 * with window.open, which also opened a blank tab for banners with no link.
 * External partner banners are promotional placements: rel="sponsored".
 */
const Banner = ({ item, className, width }) => {
  const dest = linkTarget(item?.link);
  const image = item?.ImageName && (
    <img
      src={cloudinaryUrl(item.ImageName, width)}
      data-original={item.ImageName}
      onError={onImageError}
      alt={dest?.label || "Featured on Morselv"}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover"
    />
  );
  const classes = `block overflow-hidden rounded-lg border border-gray-200 bg-[#F4F4F4] shadow-md ${className}`;
  if (dest?.internal) {
    return (
      <Link to={dest.to} className={classes}>
        {image}
      </Link>
    );
  }
  if (dest) {
    return (
      <a href={dest.href} target="_blank" rel="sponsored noopener noreferrer" className={classes}>
        {image}
      </a>
    );
  }
  return <div className={classes}>{image}</div>;
};

const PartnerSection = () => {
  const [banners, setBanners] = useState([]);
  // One layout at a time: images in a CSS-hidden copy would still download.
  const isLg = useMediaQuery(minWidth("lg"));

  useEffect(() => {
    let active = true;
    banner
      .getAllBanner()
      .then((res) => {
        if (active && Array.isArray(res?.data?.[0])) setBanners(res.data[0]);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // The boxes keep their size while empty, so nothing moves when the images
  // arrive (the placeholders used to request "url(undefined)").
  const [wide, square1, square2] = [0, 1, 2].map((i) => banners[i] || {});

  return (
    <div className="bg-[#fbfbfb]">
      <div className="w-full lg:px-6 xl:px-6 py-8 -px-1">
        {isLg ? (
          <div className="flex gap-6 justify-center lg:w-[90%] mx-auto">
            <Banner item={wide} width={1200} className="flex-[2] aspect-[33/16] max-h-[350px]" />
            <Banner item={square1} width={700} className="flex-1 aspect-square max-h-[350px]" />
            <Banner item={square2} width={700} className="flex-1 aspect-square max-h-[350px]" />
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-[90%] mx-auto mt-6">
            <Banner item={wide} width={900} className="w-full aspect-[33/16] max-h-[350px]" />
            <div className="flex gap-4 w-full">
              <Banner item={square1} width={600} className="flex-1 aspect-square max-h-[350px]" />
              <Banner item={square2} width={600} className="flex-1 aspect-square max-h-[350px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerSection;
