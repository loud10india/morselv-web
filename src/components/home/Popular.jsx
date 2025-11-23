import React, { useState } from "react";
import { useRef, useEffect } from "react";

const PopularSearches = () => {
  const data = [
      { name: "Women Body Massage Centre", link: "#" },
      { name: "Beauty Spa For Women", link: "#" },
      { name: "Saloon", link: "#" },
      { name: "Beauty Parlours", link: "#" },
      { name: "Female Psychiatrists", link: "#" },
      { name: "Yoga Class For Women", link: "#" },
      { name: "Skin Care For Females", link: "#" },
      { name: "Female Physiotherapist", link: "#" },
      { name: "Female Music Teacher", link: "#" },
      { name: "Female Hair Stylists", link: "#" },
      { name: "Female Ayurvedic Doctor", link: "#" },
      { name: "Best Restaurants For Women", link: "#" },
      { name: "Female Yoga Trainer", link: "#" },
      { name: "Education Consultant", link: "#" },
      { name: "Female Homoeopathic Doctor", link: "#" },
      { name: "Women Rejuvenation Center", link: "#" },
      { name: "Women Mental Health", link: "#" },
      { name: "Women Life Coach", link: "#" },
      { name: "Restaurants", link: "#" },
      { name: "Women friendly Bars", link: "#" },
      { name: "Online Classes for Women", link: "#" },
      { name: "Wellness Tourism For Women", link: "#" },
      { name: "Solo Female Travel Groups", link: "#" },
      { name: "Female Fitness Trainers", link: "#" },
      { name: "Beauty & Fashion", link: "#" },
      { name: "Health & Fitness", link: "#" },
      { name: "Education & Career", link: "#" },
      { name: "Makeup Artists", link: "#" },
      { name: "Women Ayurvedic Doctor", link: "#" },
      { name: "Women Body Therapies", link: "#" },
      { name: "Women Party Groups", link: "#" },
      { name: "Women Helpline", link: "#" },
      { name: "Women Home Tutor", link: "#" },
      { name: "Women Legal Services", link: "#" },
      { name: "Female Local Meetup", link: "#" },
      { name: "Kitty Party Venues", link: "#" },
      { name: "Female Dietician", link: "#" },
      { name: "Female Nutritionists", link: "#" },
      { name: "Meditation Centre", link: "#" },
      { name: "Gynecologist", link: "#" },
      { name: "Cosmetologist", link: "#" },
      { name: "Women Jobs", link: "#" },
      { name: "Women Legal Services", link: "#" },
      { name: "Women Party Place", link: "#" },
      { name: "Women Career Coach", link: "#" },
      { name: "Women Entrepreneur", link: "#" },
      { name: "Part Time Job For Women", link: "#" },
      { name: "Women Coaching Centre", link: "#" },
      { name: "Home-Based Job For Women", link: "#" },
    ];

return (
  <div className="font-montserrat p-3 sm:p-4 bg-[#fbfbfb]">
    <h1 className="text-black text-xl md:text-3xl font-bold leading-tight sm:leading-[75px] mb-2 sm:mb-2">
      POPULAR SEARCHES
    </h1>

    {/* Paragraph version for ALL screens */}
  <div className="mt-2 overflow-x-auto">
  <div
    className="
      w-[200%]             
      md:w-[100%]
      p-4 bg-white rounded-lg shadow-sm text-justify
    "
  >
    <p
      className="
        text-[#121212] font-montserrat text-sm leading-[150%]
        line-clamp-5
        text-justify
      "
    >
      {data.map((item, index) => (
        <span key={index}>
          <a
            href={item.link}
            className="hover:underline transition"
            style={{ textDecoration: 'none' }}
          >
            {item.name}
          </a>
          {index !== data.length - 1 && ' | '}
        </span>
      ))}
    </p>
  </div>
</div>
    <style jsx>{`
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`}</style>
  </div>
);

};
export default PopularSearches;