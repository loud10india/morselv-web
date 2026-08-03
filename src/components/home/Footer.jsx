import React from "react";
import { Link } from "react-router-dom";
import IconFacebook from "../assets/facebook.png";
import IconInstagram from "../assets/instagram.png";
import IconLinkedIn from "../assets/linkedin.png";
import Faq from "../home/Faq";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="w-full bg-[#222] text-[#E0E0E0] font-montserrat pt-20 pb-10">
    {/* Desktop Footer */}
    <div className="hidden md:flex justify-center max-w-[1300px]  2xl:max-w-[1400px] md:space-x-[70px] lg:space-x-[100px] px-8">
      {/* About Morselv */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6 whitespace-nowrap">About Morselv</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3">
          <p>
            <Link to="/AboutUs"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              About Us
            </Link></p>
          <p>
            <Link to="/HelpAndSupport"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Help & Support
            </Link></p>
          <p>
            <Link to="/PrivacyPolicy"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Privacy Policy
            </Link></p>
          <p>
            <Link to="/TermsAndConditions"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Terms & Conditions
            </Link></p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6 whitespace-nowrap">Quick Links</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3 whitespace-nowrap">
          <p>
            <Link to="http://blog.morselv.com/"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Blog
            </Link></p>
          <p>
            <Link
              to="/faq"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              FAQs
            </Link>
          </p>
          <p>
            <Link to="/ListYourBusiness"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              List Your Business
            </Link></p>
        </div>
      </div>

      {/* Get in Touch */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6">Get in Touch</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3">
          <p>+91-9818257300</p>
          <p>connect@morselv.com</p>
          <p className="text-[#ADADAD] text-[12px] font-inter leading-relaxed">
            Office: Femtech Sphere Tech Pvt. Ltd. 422, 4th Floor, Tower A, Suncity Success Tower,<br />
            Golf Course Extension Road, Sector 65, Gurugram Haryana – 122005
          </p>
        </div>
      </div>
    </div>

    {/* Mobile Footer */}
    <div className="md:hidden grid grid-cols-1 gap-y-8 px-6 pt-0">
      {/* About Morselv */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3">About Morselv</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
          <p>
            <Link
              to="/AboutUs"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              About Us
            </Link>
          </p>
          <p>
            <Link
              to="/HelpAndSupport"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Help & Support
            </Link>
          </p>
          <p>
            <Link
              to="/PrivacyPolicy"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Privacy Policy
            </Link>
          </p>
          <p>
            <Link
              to="/TermsAndConditions"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3">Quick Links</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
          <p>
            <Link
              to="http://blog.morselv.com/"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Blog
            </Link>
          </p>
          <p>
            <Link
              to="/faq"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              FAQs
            </Link>
          </p>
          <p>
            <Link
              to="/ListYourBusiness"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              List Your Business
            </Link>
          </p>
        </div>
      </div>

      {/* Get in Touch */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3">Get in Touch</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
          <p>+91-9818257300</p>
          <p>connect@morselv.com</p>
          <p className="text-[#ADADAD] text-[12px] font-inter leading-tight">
            Office: Femtech Sphere Tech Pvt. Ltd. 422, 4th Floor, Tower A, Suncity Success Tower,<br />
            Golf Course Extension Road, Sector 65, Gurugram Haryana – 122005
          </p>
        </div>
      </div>
    </div>

    {/* Social Icons */}
    <div className="flex justify-center space-x-8 mt-10 md:mt-16 pt-6">
      <a href="https://www.facebook.com/profile.php?id=100066464515801" target="_blank" rel="noopener noreferrer">
        <img src={IconFacebook} alt="Facebook" className="w-8 h-8 cursor-pointer" />
      </a>
      <a href="https://www.instagram.com/mor.selv/" target="_blank" rel="noopener noreferrer">
        <img src={IconInstagram} alt="Instagram" className="w-[18px] h-[18px] cursor-pointer mt-2" />
      </a>
      <a href="https://www.linkedin.com/company/mor-selv/home/" target="_blank" rel="noopener noreferrer">
        <img src={IconLinkedIn} alt="LinkedIn" className="w-8 h-8 mt-[0.5px] cursor-pointer" />
      </a>
    </div>

    {/* Footer Bottom */}
    <p className="md:hidden text-[#ADADAD] text-[12px] font-inter text-center mt-6">
      Copyright © {currentYear}
    </p>
    <div className="hidden md:block">
      <p className="text-[#ADADAD] text-[12px] font-inter text-center mt-8">
        © {currentYear} Mor-Selv | Femtech Sphere Tech Pvt. Ltd. | All rights reserved.
      </p>
    </div>
  </footer>
  );
};

export default Footer;
