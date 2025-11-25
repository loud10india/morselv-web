import React from "react";
import { Link } from "react-router-dom";
import IconFacebook from "../assets/facebook.png";
import IconInstagram from "../assets/instagram.png";
import IconLinkedIn from "../assets/linkedin.png";
import Faq from "../home/Faq";

const Footer = () => (
  <footer className="w-full bg-[#222] text-[#E0E0E0] font-montserrat pt-20 pb-10">
    {/* Desktop Footer */}
    <div className="hidden md:flex justify-center max-w-[1300px]  2xl:max-w-[1400px] md:space-x-[70px] lg:space-x-[100px] px-8">
      {/* About Morselv */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6 whitespace-nowrap">About Morselv</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3">
          <p>
            <Link to="/AboutUs" 
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer"}} 
            >
              About Us
            </Link></p>
          <p>
            <Link to="/Careers" 
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer"}} 
            >
              Careers
            </Link></p>
          <p>
            <Link to="/HelpAndSupport" 
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer"}} 
            >
              Help & Support
            </Link></p>
           <p>
            <Link to="http://blog.morselv.com/"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Blog
            </Link></p>
        </div>
      </div>

      {/* For Business */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6 whitespace-nowrap">For Business</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3 whitespace-nowrap">
          <p>List your business</p>
          <p>          <Link
            to="/faq"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            FAQs
          </Link>
          </p>
          <p>Pricing</p>
          <p>Support</p>
        </div>
      </div>

      {/* Legal */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6">Legal</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3 whitespace-nowrap">
          <p>
            <Link to="/PrivacyPolicy" 
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer"}} 
            >
              Privacy Policy
            </Link></p>
          <p>
            <Link to="/TermsAndConditions" 
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer"}} 
            >
              Terms & Conditions
            </Link></p>
          <p>Cancellation Policy</p>
          <p>Refund Policy</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[18px] mb-6">Contact Info</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-3">
          <p>+91-9818257300 | +91-8800802349</p>
          <p>hello@morselv.com</p>
          <p className="text-[#ADADAD] text-[12px] font-inter leading-relaxed">
            Corporate Office: Femtech Sphere Tech Pvt. Ltd.<br />
            TR-242, Suncity Success Tower, Golf Course Extn Rd, Badshahpur, Sec-65,<br />
            Gurugram, Haryana Pin-122101
          </p>
        </div>
      </div>
    </div>

    {/* Mobile Footer */}
    <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-6 px-4 pt-0">
      {/* About Morselv */}
      <div className="pl-5 w-full">
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
            to="/Careers"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            Careers
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
              to="http://blog.morselv.com/"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              Blog
            </Link>
          </p>
        </div>
      </div>

      {/* For Business */}
      <div className="pr-5 w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3">For Business</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
          <p>List your business</p>
          <p>
            <Link
            to="/faq"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            FAQs
            </Link>
          </p>
          <p>Pricing</p>
          <p>Support</p>   
        </div>
      </div>

      {/* Legal */}
      <div className="pl-5 w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3 pt-6">Legal</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
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
          <p>Cancellation Policy</p>
          <p>Refund Policy</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="pr-5 w-full">
        <h3 className="text-[#E5E5E5] font-semibold text-[16px] mb-3 pt-6">Contact Info</h3>
        <div className="text-[#E0E0E0] font-normal text-[14px] space-y-1">
          <p>+91-9818257300 | +91-8800802349</p>
          <p>hello@morselv.com</p>
          <p className="text-[#ADADAD] text-[12px] font-inter leading-tight">
            Corporate Office: Femtech Sphere Tech Pvt. Ltd.<br />
            TR-242, Suncity Success Tower, Golf Course Extn<br />
            Rd, Badshahpur, Sec-65, Gurugram, Haryana<br />
            Pin-122101
          </p>
        </div>
      </div>
    </div>

    {/* Social Icons */}
    <div className="flex justify-center space-x-8 mt-10 md:mt-16 pt-6">
      <img src={IconFacebook} alt="Facebook" className="w-8 h-8 cursor-pointer" />
      <img src={IconInstagram} alt="Instagram" className="w-[18px] h-[18px] cursor-pointer mt-2" />
      <img src={IconLinkedIn} alt="LinkedIn" className="w-8 h-8 mt-[0.5px] cursor-pointer" />
    </div>

    {/* Footer Bottom */}
    <p className="md:hidden text-[#ADADAD] text-[12px] font-inter text-center mt-6">
      Copyright © 2025
    </p>
    <div className="hidden md:block">
      <p className="text-[#ADADAD] text-[12px] font-inter text-center mt-8">
        © 2025 Mor-Selv | Femtech Sphere Tech Pvt. Ltd. | All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
