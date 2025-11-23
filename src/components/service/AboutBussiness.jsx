import React, { useState } from "react";
import ServicePopup from "./ServiceDetailPopup";

const AboutBusinessSection = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      {/* Desktop Version - Business description section */}
      <ServicePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        dealID={-1}
        serviceID={-1}
        providerID={props.providerID}
      />
      <div
        className="hidden xl:block relative bg-white md:px-3 mx-auto w-full"
        style={{ maxWidth: "1280px" }}
      >
        <div className="w-full mb-12">
          <h2 className="text-[#000] font-inter text-[32px] font-semibold mb-[21px]">
            About the business
          </h2>
          <div className="text-[#4D4D4D] font-inter text-[16px] leading-normal max-w-7xl">
            <p> {props.desc}</p>
          </div>
        </div>
        <button
          onClick={openPopup}
          className="bg-[#121212] text-white px-10 py-4 rounded-lg font-montserrat text-[20px] font-500 mb-[51.98px] hover:text-gray-200 transition-colors duration-300 transform hover:scale-105"
        >
          Contact
        </button>
        <div className="h-px bg-[#A2A2A2] w-full"></div>
      </div>

      {/* Laptop Version (lg) - For screens between 1024px and 1279px */}
      <div className="hidden lg:block xl:hidden relative bg-white mx-auto w-full px-6">
        <div className="w-full mb-10">
          <h2 className="text-[#000] font-inter text-[28px] font-semibold mb-5">
            About the business
          </h2>
          <div className="text-[#4D4D4D] font-inter text-[15px] leading-normal">
            <p className="mb-4"> {props.desc}</p>
          </div>
        </div>
        <button
          onClick={openPopup}
          className="bg-[#121212] text-white px-8 py-3 rounded-lg font-montserrat text-[18px] font-500 mb-8 hover:text-gray-200 transition-colors duration-300 transform hover:scale-105"
        >
          Contact
        </button>
        <div className="w-full h-px bg-[#A2A2A2] mt-4 mb-4"></div>
      </div>

      {/* Tablet Version (md) - For screens between 768px and 1023px */}
      <div className="hidden md:block lg:hidden bg-white px-3 mx-5">
        <div className="w-full mb-10">
          <h2 className="text-[#000] font-inter text-[24px] font-semibold mb-4 mt-6">
            About the business
          </h2>
          <div className="text-[#4D4D4D] font-inter text-[15px] leading-normal space-y-3 mb-6">
            <p> {props.desc}</p>
          </div>
        </div>
        <button
          onClick={openPopup}
          className="bg-[#121212] text-white px-8 py-3 rounded-lg font-montserrat text-[16px] font-medium mb-8 hover:text-gray-200 transition-colors duration-300 transform hover:scale-105"
        >
          Contact
        </button>
        <div className="w-full h-px bg-[#A2A2A2] mt-4 mb-4"></div>
      </div>

      {/* Mobile Version - Compact business info */}
      <div className="block md:hidden bg-white px-4">
        <h2 className="text-[#000] font-inter text-[20px] font-semibold mt-6 mb-4">
          About the business
        </h2>
        <div className="text-[#4D4D4D] font-inter text-[12px] leading-normal space-y-2 mb-6">
          <p> {props.desc}</p>
        </div>
        <button
          onClick={openPopup}
          className="bg-[#121212] text-[14px] text-white px-6 py-3 rounded-md font-500 mb-8 hover:text-gray-200 transition-colors duration-300 transform hover:scale-105"
        >
          Contact
        </button>
        <div className="w-screen -ml-8 h-px bg-[#A2A2A2] mb-6"></div>
      </div>

      <div
        className="absolute left-0 flex gap-[22px]"
        style={{
          top: "0",
          fontFamily: '"Sukhumvit Set", "Kanit", sans-serif',
          width: "100%",
          maxWidth: "1280px",
          padding: "0 120px",
          boxSizing: "border-box",
        }}
      ></div>
    </>
  );
};
export default AboutBusinessSection;
