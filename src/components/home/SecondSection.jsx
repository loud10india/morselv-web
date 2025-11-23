import React, { useEffect, useState } from "react";
import c1 from "../assets/c1.svg";
import c2 from "../assets/c2.svg";
import c3 from "../assets/c3.svg";
import c4 from "../assets/c4.svg";
import c5 from "../assets/c5.svg";
import c6 from "../assets/c6.svg";
import c7 from "../assets/c7.svg";
import c8 from "../assets/c8.svg";
import c9 from "../assets/c10.svg";
import c10 from "../assets/c11.svg";
import c11 from "../assets/c12.svg";
import c12 from "../assets/c9.svg";
import { Link } from "react-router-dom";
import category from "../../api/category";

const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // spaces ? hyphen
    .replace(/(^-|-$)+/g, ""); // trim hyphens

function SecondSection() {
  const [categoryListData, setCategoryListData] = useState([]);
  useEffect(() => {
    category.getAllCategory().then((res) => {
      // setCategoryListData(res.data);

      const categories = [
        {
          icon: c1,
          label: "Skin, Hair & Beauty",
          link:
            "/service/14-" +
            toSlug(res.data[0].find((e) => e.value === 14).label),
        },
        {
          icon: c2,
          label: "Body Therapies",
          link:
            "/service/17-" +
            toSlug(res.data[0].find((e) => e.value === 17).label),
        },
        {
          icon: c3,
          label: "Health Wellness",
          link:
            "/service/15-" +
            toSlug(res.data[0].find((e) => e.value === 15).label),
        },
        {
          icon: c4,
          label: "Mental & Emotional Wellness",
          link:
            "/service/18-" +
            toSlug(res.data[0].find((e) => e.value === 18).label),
        },
        {
          icon: c5,
          label: "Diet & Weight Management",
          link:
            "/service/19-" +
            toSlug(res.data[0].find((e) => e.value === 19).label),
        },
        {
          icon: c6,
          label: "Travel & Relaxation",
          link:
            "/service/16-" +
            toSlug(res.data[0].find((e) => e.value === 16).label),
        },
        {
          icon: c7,
          label: "Friends, Fun & Community",
          link:
            "/service/21-" +
            toSlug(res.data[0].find((e) => e.value === 21).label),
        },
        {
          icon: c8,
          label: "Fitness & Body Movement",
          link:
            "/service/22-" +
            toSlug(res.data[0].find((e) => e.value === 22).label),
        },
        {
          icon: c9,
          label: "Career & Education",
          link:
            "/service/23-" +
            toSlug(res.data[0].find((e) => e.value === 23).label),
        },
        {
          icon: c10,
          label: "Kids' Activites & Hobbies",
          link:
            "/service/24-" +
            toSlug(res.data[0].find((e) => e.value === 24).label),
        },
        {
          icon: c11,
          label: "Finance & Legal Guidance",
          link:
            "/service/25-" +
            toSlug(res.data[0].find((e) => e.value === 25).label),
        },
        {
          icon: c12,
          label: "Other Services",
          link:
            "/service/26-" +
            toSlug(res.data[0].find((e) => e.value === 26).label),
        },
      ];
      setCategoryListData(categories);
    });
  }, []);

  return (
    <div className="bg-[#FBFBFB] py-10 sm:py-12 md:py-16 flex justify-center ">
      {/* Inner container */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 bg-[#fbfbfb] p-4 sm:p-6 rounded-3xl w-full max-w-[1200px] mx-3 lg:mx-0"
      >
        {categoryListData.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className="flex flex-col items-center p-4 hover:bg-[#FEE5C5] rounded-3xl transition-colors cursor-pointer bg-white shadow-sm border"
          >
            <img
              src={category.icon}
              alt={category.label}
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
