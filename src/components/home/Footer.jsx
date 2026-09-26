import React from "react";
import { Link } from "react-router-dom";
import IconFacebook from "../assets/facebook.png";
import IconInstagram from "../assets/instagram.png";
import IconLinkedIn from "../assets/linkedin.png";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
};

// Desktop and mobile render the same four sections, so the link data lives in
// one place and both layouts map over it.
const SECTIONS = [
  {
    heading: "About Morselv",
    links: [
      { label: "About Us", to: "/AboutUS" },
      { label: "Help & Support", to: "/HelpAndSupport" },
      { label: "Privacy Policy", to: "/PrivacyPolicy" },
      { label: "Terms & Conditions", to: "/TermsAndConditions" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "All Services", to: "/service" },
      { label: "Deals Around You", to: "/deals" },
      { label: "Blog", to: "https://blog.morselv.com/", external: true },
      { label: "FAQs", to: "/faq" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Packages", to: "/packages" },
      { label: "Job Opportunities", to: "/job-opportunities" },
      { label: "Customer Panel", to: "/customer-panel" },
      { label: "List Your Business", to: "/ListYourBusiness" },
    ],
  },
];

const SOCIALS = [
  {
    href: "https://www.facebook.com/profile.php?id=100066464515801",
    icon: IconFacebook,
    label: "Facebook",
    className: "w-8 h-8 cursor-pointer",
  },
  {
    href: "https://www.instagram.com/mor.selv/",
    icon: IconInstagram,
    label: "Instagram",
    className: "w-[18px] h-[18px] cursor-pointer mt-2",
  },
  {
    href: "https://www.linkedin.com/company/mor-selv/home/",
    icon: IconLinkedIn,
    label: "LinkedIn",
    className: "w-8 h-8 mt-[0.5px] cursor-pointer",
  },
];

const FooterLink = ({ link }) =>
  link.external ? (
    <a href={link.to} style={linkStyle} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  ) : (
    <Link to={link.to} style={linkStyle}>
      {link.label}
    </Link>
  );

const ContactBlock = ({ addressClass }) => (
  <address className="not-italic">
    <p>
      <a href="tel:+919818257300" style={linkStyle}>
        +91-9818257300
      </a>
    </p>
    <p>
      <a href="mailto:connect@morselv.com" style={linkStyle}>
        connect@morselv.com
      </a>
    </p>
    <p className={addressClass}>
      Office: Femtech Sphere Tech Pvt. Ltd. 422, 4th Floor, Tower A, Suncity
      Success Tower,
      <br />
      Golf Course Extension Road, Sector 65, Gurugram Haryana – 122005
    </p>
  </address>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#222] text-[#E0E0E0] font-montserrat pt-20 pb-10">
      {/* Desktop Footer — 4 columns */}
      <div className="hidden md:grid grid-cols-4 gap-x-8 lg:gap-x-12 max-w-[1300px] 2xl:max-w-[1400px] mx-auto px-8">
        {SECTIONS.slice(0, 2).map((section) => (
          <nav key={section.heading} aria-label={section.heading} className="w-full">
            <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6 whitespace-nowrap">
              {section.heading}
            </h3>
            <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3">
              {section.links.map((link) => (
                <p key={link.label}>
                  <FooterLink link={link} />
                </p>
              ))}
            </div>
          </nav>
        ))}

        {/* Get in Touch */}
        <div className="w-full">
          <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6">
            Get in Touch
          </h3>
          <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3">
            <ContactBlock addressClass="text-[#ADADAD] text-[12px] font-inter leading-relaxed" />
          </div>
        </div>

        {/* Explore (new fourth section) */}
        {SECTIONS.slice(2).map((section) => (
          <nav key={section.heading} aria-label={section.heading} className="w-full">
            <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6 whitespace-nowrap">
              {section.heading}
            </h3>
            <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3 whitespace-nowrap">
              {section.links.map((link) => (
                <p key={link.label}>
                  <FooterLink link={link} />
                </p>
              ))}
            </div>
          </nav>
        ))}
      </div>

      {/* Mobile Footer — same four sections, stacked */}
      <div className="md:hidden grid grid-cols-1 gap-y-8 px-6 pt-0">
        {SECTIONS.slice(0, 2).map((section) => (
          <nav key={section.heading} aria-label={section.heading} className="w-full">
            <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3">
              {section.heading}
            </h3>
            <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
              {section.links.map((link) => (
                <p key={link.label}>
                  <FooterLink link={link} />
                </p>
              ))}
            </div>
          </nav>
        ))}

        <div className="w-full">
          <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3">
            Get in Touch
          </h3>
          <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
            <ContactBlock addressClass="text-[#ADADAD] text-[12px] font-inter leading-tight" />
          </div>
        </div>

        {SECTIONS.slice(2).map((section) => (
          <nav key={section.heading} aria-label={section.heading} className="w-full">
            <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3">
              {section.heading}
            </h3>
            <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
              {section.links.map((link) => (
                <p key={link.label}>
                  <FooterLink link={link} />
                </p>
              ))}
            </div>
          </nav>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-8 mt-10 md:mt-16 pt-6">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            <img src={social.icon} alt={social.label} className={social.className} />
          </a>
        ))}
      </div>

      {/* Footer Bottom */}
      <p className="md:hidden text-[#ADADAD] text-[12px] font-inter text-center mt-6">
        Copyright © {currentYear}
      </p>
      <div className="hidden md:block">
        <p className="text-[#ADADAD] text-[12px] font-inter text-center mt-8">
          © {currentYear} Mor-Selv | Femtech Sphere Tech Pvt. Ltd. | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
