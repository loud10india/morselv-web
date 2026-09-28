import React, { useEffect, useState } from "react";
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.png";
import c3 from "../assets/c3.png";
import c4 from "../assets/c4.png";
import c5 from "../assets/c5.png";
import c6 from "../assets/c6.png";
import c7 from "../assets/c7.png";
import c8 from "../assets/c8.png";
import c9 from "../assets/c10.png";
import c10 from "../assets/c11.png";
import c11 from "../assets/c12.png";
import c12 from "../assets/c9.png";
import { Link } from "react-router-dom";
import category from "../../api/category";
import { toSlug } from "../../seo/siteConfig";


// Tiles in display order. `slug` is the listing's current URL slug, so the
// tiles (twelve internal links) render immediately and still work if the
// category request fails; the API's labels refine the slugs when they arrive.
// Tile labels are marketing copy and may differ from the category names.
const TILES = [
  { id: 14, icon: c1, label: "Skin, Hair & Beauty", slug: "skin-hair-beauty" },
  { id: 17, icon: c2, label: "Body Therapies", slug: "body-therapies" },
  { id: 15, icon: c3, label: "Health & Wellness", slug: "health-wellness" },
  { id: 18, icon: c4, label: "Mental & Emotional Wellness", slug: "mental-emotional-wellness" },
  { id: 19, icon: c5, label: "Diet & Weight Management", slug: "diet-weight-management" },
  { id: 16, icon: c6, label: "Travel & Relaxation", slug: "travel-relaxation" },
  { id: 21, icon: c7, label: "Friends, Fun & Community", slug: "friends-fun-community" },
  { id: 22, icon: c8, label: "Fitness & Body Movement", slug: "fitness-body-movement" },
  { id: 23, icon: c9, label: "Career & Education", slug: "career-education" },
  { id: 24, icon: c10, label: "Kids' Activities & Hobbies", slug: "child-hobbies-interests" },
  { id: 25, icon: c11, label: "Finance & Legal Guidance", slug: "specialized-personal-services" },
  { id: 26, icon: c12, label: "Other Services", slug: "other-services" },
];

function SecondSection() {
  const [slugs, setSlugs] = useState({});
  useEffect(() => {
    let active = true;
    category
      .getAllCategory()
      .then((res) => {
        const rows = Array.isArray(res?.data?.[0]) ? res.data[0] : [];
        const next = {};
        for (const row of rows) {
          const slug = toSlug(row?.label);
          if (row?.value && slug) next[row.value] = slug;
        }
        if (active) setSlugs(next);
      })
      .catch(() => {
        /* keep the built-in slugs */
      });
    return () => {
      active = false;
    };
  }, []);

  const categoryListData = TILES.map((t) => ({
    icon: t.icon,
    label: t.label,
    link: `/service/${t.id}-${slugs[t.id] || t.slug}`,
  }));

  return (
    <div className="bg-[#FBFBFB] py-10 sm:py-12 md:py-16 flex justify-center ">
      {/* Inner container */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 bg-[#fbfbfb] p-4 sm:p-6 rounded-3xl w-full max-w-[1200px] mx-3 lg:mx-0"
      >
        {categoryListData.map((category) => (
          <Link
            key={category.link}
            to={category.link}
            className="flex flex-col items-center p-4 hover:bg-[#FEE5C5] rounded-3xl transition-colors cursor-pointer bg-white shadow-sm border"
          >
            <img
              src={category.icon}
              alt={category.label}
              loading="lazy"
              decoding="async"
              width="85"
              height="85"
              className="w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] md:w-[85px] md:h-[85px] object-contain mb-3"
            />
            <span className="text-center text-xs sm:text-sm md:text-base font-medium text-black">
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SecondSection;
