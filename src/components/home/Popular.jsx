import React from "react";
import { Link } from "react-router-dom";

const PopularSearches = () => {
  // Relative paths to canonical listing pages. They used to be absolute
  // https://morselv.com/... links (the non-www host, so every one went through
  // a redirect) and four were dead "#" links. Where a sub-category page exists
  // for the phrase it is the target; otherwise its category.
  const SALON = "/service/14-skin-hair-beauty/11-salon";
  const data = [
      { name: "Women Body Massage Centre", link: "/service/17-body-therapies" },
      { name: "Beauty Spa For Women", link: "/service/17-body-therapies" },
      { name: "Saloon", link: SALON },
      { name: "Beauty Parlours", link: SALON },
      { name: "Female Psychiatrists", link: "/service/18-mental-emotional-wellness" },
      { name: "Yoga Class For Women", link: "/service/22-fitness-body-movement/19-yoga" },
      { name: "Skin Care For Females", link: "/service/14-skin-hair-beauty" },
      { name: "Female Physiotherapist", link: "/service/15-health-wellness/20-physiotherapy" },
      { name: "Female Music Teacher", link: "/service/24-child-hobbies-interests/30-dance-singing-music" },
      { name: "Female Hair Stylists", link: SALON },
      { name: "Female Ayurvedic Doctor", link: "/service/15-health-wellness" },
      { name: "Best Restaurants For Women", link: "/service/21-friends-fun-community/24-restobar" },
      { name: "Female Yoga Trainer", link: "/service/22-fitness-body-movement/19-yoga" },
      { name: "Education Consultant", link: "/service/23-career-education" },
      { name: "Female Homoeopathic Doctor", link: "/service/15-health-wellness/21-homeopathy" },
      { name: "Women Rejuvenation Center", link: "/service/17-body-therapies" },
      { name: "Women Mental Health", link: "/service/18-mental-emotional-wellness" },
      { name: "Women Life Coach", link: "/service/18-mental-emotional-wellness" },
      { name: "Restaurants", link: "/service/21-friends-fun-community" },
      { name: "Women friendly Bars", link: "/service/21-friends-fun-community/24-restobar" },
      { name: "Online Classes for Women", link: "/service/23-career-education" },
      { name: "Wellness Tourism For Women", link: "/service/17-body-therapies" },
      { name: "Solo Female Travel Groups", link: "/service/21-friends-fun-community" },
      { name: "Female Fitness Trainers", link: "/service/22-fitness-body-movement" },
      { name: "Beauty & Fashion", link: "/service/14-skin-hair-beauty" },
      { name: "Health & Fitness", link: "/service/22-fitness-body-movement" },
      { name: "Education & Career", link: "/service/23-career-education" },
      { name: "Makeup Artists", link: "/service/14-skin-hair-beauty/14-makeup-artist" },
      { name: "Women Ayurvedic Doctor", link: "/service/15-health-wellness" },
      { name: "Women Body Therapies", link: "/service/17-body-therapies" },
      { name: "Women Party Groups", link: "/service/21-friends-fun-community" },
      { name: "Women Home Tutor", link: "/service/23-career-education/29-academic-coaching" },
      { name: "Women Legal Services", link: "/service/25-specialized-personal-services/32-legal-services" },
      { name: "Female Local Meetup", link: "/service/21-friends-fun-community" },
      { name: "Kitty Party Venues", link: "/service/21-friends-fun-community" },
      { name: "Female Dietician", link: "/service/19-diet-weight-management" },
      { name: "Female Nutritionists", link: "/service/19-diet-weight-management" },
      { name: "Meditation Centre", link: "/service/18-mental-emotional-wellness" },
      { name: "Gynecologist", link: "/service/15-health-wellness" },
      { name: "Cosmetologist", link: "/service/14-skin-hair-beauty/16-dermatologist" },
      { name: "Women Jobs", link: "/job-opportunities" },
      { name: "Women Party Place", link: "/service/21-friends-fun-community" },
      { name: "Women Career Coach", link: "/service/25-specialized-personal-services" },
      { name: "Women Entrepreneur", link: "/service/23-career-education" },
      { name: "Part Time Job For Women", link: "/job-opportunities" },
      { name: "Women Coaching Centre", link: "/service/23-career-education/29-academic-coaching" },
      { name: "Home-Based Job For Women", link: "/job-opportunities" },
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
          <Link
            to={item.link}
            className="hover:underline transition"
            style={{ textDecoration: 'none' }}
          >
            {item.name}
          </Link>
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