import React, { useState } from "react";
import { useRef, useEffect } from "react";

const PopularSearches = () => {
  const data = [
      { name: "Women Body Massage Centre", link: "#" },
      { name: "Beauty Spa For Women", link: "https://morselv.com/service/17-body-therapies/17-spa-wellness-center" },
      { name: "Saloon", link: "https://morselv.com/service/14-skin-hair-beauty" },
      { name: "Beauty Parlours", link: "https://morselv.com/service/14-skin-hair-beauty" },
      { name: "Female Psychiatrists", link: "https://morselv.com/service/18-mental-emotional-wellness" },
      { name: "Yoga Class For Women", link: "https://morselv.com/service/22-fitness-body-movement" },
      { name: "Skin Care For Females", link: "https://morselv.com/service/14-skin-hair-beauty" },
      { name: "Female Physiotherapist", link: "https://morselv.com/service/15-health-wellness" },
      { name: "Female Music Teacher", link: "https://morselv.com/service/24-child-hobbies-interests" },
      { name: "Female Hair Stylists", link: "https://morselv.com/service/14-skin-hair-beauty" },
      { name: "Female Ayurvedic Doctor", link: "https://morselv.com/service/15-health-wellness" },
      { name: "Best Restaurants For Women", link: "https://morselv.com/service/21-friends-fun-community/24-restobar" },
      { name: "Female Yoga Trainer", link: "https://morselv.com/service/22-fitness-body-movement" },
      { name: "Education Consultant", link: "https://morselv.com/service/23-career-education" },
      { name: "Female Homoeopathic Doctor", link: "https://morselv.com/service/15-health-wellness" },
      { name: "Women Rejuvenation Center", link: "https://morselv.com/service/17-body-therapies/17-spa-wellness-center" },
      { name: "Women Mental Health", link: "https://morselv.com/service/18-mental-emotional-wellness" },
      { name: "Women Life Coach", link: "https://morselv.com/service/18-mental-emotional-wellness" },
      { name: "Restaurants", link: "https://morselv.com/service/21-friends-fun-community" },
      { name: "Women friendly Bars", link: "https://morselv.com/service/21-friends-fun-community" },
      { name: "Online Classes for Women", link: "https://morselv.com/service/23-career-education" },
      { name: "Wellness Tourism For Women", link: "https://morselv.com/service/17-body-therapies/17-spa-wellness-center" },
      { name: "Solo Female Travel Groups", link: "https://morselv.com/service/21-friends-fun-community" },
      { name: "Female Fitness Trainers", link: "https://morselv.com/service/22-fitness-body-movement" },
      { name: "Beauty & Fashion", link: "https://morselv.com/service/14-skin-hair-beauty" },
      { name: "Health & Fitness", link: "https://morselv.com/service/22-fitness-body-movement" },
      { name: "Education & Career", link: "https://morselv.com/service/23-career-education" },
      { name: "Makeup Artists", link: "https://morselv.com/service/14-skin-hair-beauty" },
      { name: "Women Ayurvedic Doctor", link: "https://morselv.com/service/15-health-wellness" },
      { name: "Women Body Therapies", link: "https://morselv.com/service/17-body-therapies/17-spa-wellness-center" },
      { name: "Women Party Groups", link: "https://morselv.com/service/21-friends-fun-community" },
      { name: "Women Helpline", link: "#" },
      { name: "Women Home Tutor", link: "#" },
      { name: "Women Legal Services", link: "https://morselv.com/service/25-specialized-personal-services" },
      { name: "Female Local Meetup", link: "https://morselv.com/service/21-friends-fun-community" },
      { name: "Kitty Party Venues", link: "https://morselv.com/service/21-friends-fun-community" },
      { name: "Female Dietician", link: "https://morselv.com/service/19-diet-weight-management" },
      { name: "Female Nutritionists", link: "https://morselv.com/service/19-diet-weight-management" },
      { name: "Meditation Centre", link: "https://morselv.com/service/18-mental-emotional-wellness" },
      { name: "Gynecologist", link: "https://morselv.com/service/15-health-wellness" },
      { name: "Cosmetologist", link: "https://morselv.com/service/14-skin-hair-beauty/16-dermatologist" },
      { name: "Women Jobs", link: "https://morselv.com/service/23-career-education" },
      { name: "Women Legal Services", link: "https://morselv.com/service/25-specialized-personal-services" },
      { name: "Women Party Place", link: "https://morselv.com/service/21-friends-fun-community" },
      { name: "Women Career Coach", link: "https://morselv.com/service/25-specialized-personal-services" },
      { name: "Women Entrepreneur", link: "https://morselv.com/service/23-career-education" },
      { name: "Part Time Job For Women", link: "https://morselv.com/service/23-career-education" },
      { name: "Women Coaching Centre", link: "https://morselv.com/service/24-child-hobbies-interests" },
      { name: "Home-Based Job For Women", link: "#" },
    ];

return (
  <div className="font-montserrat p-3 sm:p-4 bg-[#fbfbfb]">
    <h2 className="text-black text-xl md:text-3xl font-bold leading-tight sm:leading-[75px] mb-2 sm:mb-2">
      POPULAR SEARCHES
    </h2>

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
    {/* `<style jsx>` is a Next.js idiom. Plain React passes `jsx` straight to
        the DOM, which logs "Received `true` for a non-boolean attribute". */}
    <style>{`
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