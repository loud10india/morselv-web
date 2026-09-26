import React, { useState } from "react";
import { Link } from "react-router-dom";
// import logoDots from '../assets/Group 1000001933.svg';
import img from "../assets/weui_arrow-filled (1).svg";
import location from "../assets/location.svg";
import LeadForm from "./DealPopup";
import useMediaQuery, { minWidth } from "../../hooks/useMediaQuery";
import { cloudinaryUrl, IMAGE_WIDTH } from "../../seo/siteConfig";
import { onImageError } from "../../utils/imageFallback";

const DEAL_IMAGE_SHADE =
  "linear-gradient(180deg, rgba(0,0,0,0) 77.4%, rgba(0,0,0,0.5) 100%)";

/**
 * Deal photo as a real <img> (it was a CSS background, which image search
 * cannot see and which has no alt text), with the same bottom shade on top.
 */
const DealImage = ({ src, alt }) =>
  src ? (
    <>
      <img
        src={cloudinaryUrl(src, IMAGE_WIDTH.detail)}
        data-original={src}
        onError={onImageError}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: DEAL_IMAGE_SHADE }} />
    </>
  ) : null;

// "by <provider>" links to the provider's page when the deal has one.
const ProviderName = ({ href, className, children }) =>
  href ? (
    <Link to={href} className={`${className} hover:text-[#DE9636]`}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );

const HeaderSection = ({ dataSet = {}, dealID, breadcrumbs, providerHref }) => {
  // Desktop and mobile layouts are both in the DOM; only the visible one
  // carries the <h1>.
  const isMdUp = useMediaQuery(minWidth("md"));
  const DesktopHeading = isMdUp ? "h1" : "p";
  const MobileHeading = isMdUp ? "p" : "h1";
  const imageAlt = [dataSet.DealName, dataSet.ProviderName].filter(Boolean).join(" at ");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div className="w-full flex flex-col flex-grow items-center">
      {breadcrumbs}
      <LeadForm
        isOpen={isPopupOpen}
        onClose={closePopup}
        dealID={dealID}
        serviceID={-1}
        providerID={-1}
      />
      <div className="justify-between hidden lg:flex relative bg-white w-full max-w-[1280px] min-h-[530px] mt-[26px] overflow-visible ml-[150px] xl:ml-[50px] mr-4 md:flex md:flex-col md:items-center md:w-full md:mt-[24px]">
        <div
          className="relative -left-[20px] w-[432px] h-[432px] flex-shrink-0 rounded-[20px] border border-[#888] overflow-hidden mt-9 inset-0 z-10"
          style={{ position: "absolute" }}
        >
          <DealImage src={dataSet.ImageName} alt={imageAlt} />
          {/* <img src={logoDots} alt="Logo Dots" className="w-[61.4px] h-[14px] absolute bottom-[23px] left-1/2 -translate-x-1/2 object-contain" /> */}
        </div>

        <div className="absolute top-5 left-0 pl-[450px] md:mt-6 h-full flex flex-col justify-start w-full mt-2 pr-[120px] xl:pr-4">
          <DesktopHeading className="text-[#2D2D2D] font-montserrat font-bold md:text-[28px] lg:text-[40px] xl:text-[48px] leading-[140%] text-left w-full break-words">
            <span className="whitespace-wrap">
              {/* Midweek Calm – 20% Off All Bookings */}
              {dataSet.DealName}
            </span>
          </DesktopHeading>
          <p className="text-[#4D4D4D] font-montserrat text-[16px] xl:text-[16px] font-normal mb-2 max-w-[700px] text-left">
            {/* Take a mindful pause midweek. Book any session and enjoy 20%
            off—because calm
            <br /> shouldn't wait for the weekend.{" "} */}
            {dataSet.Description}
          </p>

          <p className="font-montserrat font-normal text-[20px] xl:text-[20px] leading-[125%] text-[#4D4D4D] -mb-2">
            by{" "}
            <ProviderName href={providerHref} className="font-montserrat font-semibold text-[#2D2D2D]">
              {dataSet.ProviderName}
            </ProviderName>
          </p>
          <br />
          {/* Fitness &amp; Body Movement / Yoga */}
          <p>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] xl:text-[16px] font-semibold underline underline-offset-4 mb-4 max-w-[700px] text-left">
              {dataSet.CatName}
            </span>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] xl:text-[16px] font-semibold mb-4 max-w-[700px] text-left">
              {" "}
              /{" "}
            </span>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] xl:text-[16px] font-semibold underline underline-offset-4 mb-4 max-w-[700px] text-left">
              {dataSet.SubCatName}
            </span>
          </p>

          <div className="flex items-center gap-2 mt-[22.5px] mb-[22.5px]">
            <img src={location} alt="" className="w-[30px] h-[30px] aspect-[1/1]" />
            <p className="text-[#4D4D4D] font-montserrat text-[16px] font-normal leading-[110%]">
              {/* Sector 45, Gurugram, Haryana 122018, India */}
              {dataSet.FullAddress}
            </p>
          </div>

          <button
            onClick={openPopup}
            className=" flex flex-row items-center justify-center bg-[#121212] text-white text-[16px] xl:text-[20px] md:text-[16px] px-6 py-3 rounded-[10px] hover:bg-gray-800 transition w-[200px] md:w-[200px] xl:w-[250px] h-[60px] md:h-[60px]"
          >
            GET THIS DEAL{" "}
            <img
              className="w-[10px] md:w-[13px] h-[18px] md:h-[25px] ml-2 opacity-100"
              src={img}
              alt=""
            ></img>
          </button>
        </div>
      </div>
      <div className="hidden lg:block md:block w-full max-w-[1280px] h-px bg-[#A2A2A2] mx-auto my-[50px] px-8"></div>

      {/* Mobile Version - Compact layout for smaller screens */}
      <div className="block md:hidden lg:hidden bg-white w-full -mt-[10px]">
        <div
          className="relative w-70% h-50% flex justify-center flex-shrink-0 aspect-square"
        >
          <DealImage src={dataSet.ImageName} alt={imageAlt} />
          {/* <img src={logoDots} alt="Logo Dots" className="w-[61.4px] h-[14px] absolute bottom-[23px] left-1/2 -translate-x-1/2 object-contain" /> */}
        </div>

        <div className="px-4 py-4">
          <MobileHeading className="text-[#2D2D2D] font-inter font-bold text-[24px] mb-[10px] leading-tight">
            {dataSet.DealName}
          </MobileHeading>

          <p className="text-[#4D4D4D] font-montserrat text-[12px] font-normal mb-[12px]">
            {dataSet.Description}
          </p>

          <p>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] mt-3 font-semibold underline underline-offset-2">
              {dataSet.CatName} 
            </span>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] font-sembold">
              {" "}
              /{" "}
            </span>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] font-semibold underline underline-offset-2">
              {dataSet.SubCatName}
            </span>
          </p>

          <p className="font-montserrat font-normal text-[12px] text-[#4D4D4D] mt-2">
            by{" "}
            <ProviderName
              href={providerHref}
              className="font-montserrat font-bold text-[12px] text-[#2D2D2D] underline underline-offset-2"
            >
              {dataSet.ProviderName}
            </ProviderName>
          </p>

          
          <div className="flex items-center gap-2 mb-4 mt-3">
            <img src={location} alt="" className="w-[16.8px] h-[16.8px] flex-shrink-0 aspect-[16.80/16.80]" />
            <p className="text-[#4D4D4D] font-montserrat text-[12px] font-normal">
              {dataSet.FullAddress}
            </p>
          </div>
          <button
            onClick={openPopup}
            className="flex flex-row items-center justify-center bg-[#121212] text-white text-[14px] px-5 py-2 rounded-md mb-6"
          >
            GET THIS DEAL{" "}
            <img className="w-[12px] h-[20px] ml-2 opacity-100" src={img} alt=""></img>
          </button>
          {/* <h2 className="text-black font-inter font-semibold text-lg mb-1">Highlights</h2>
          <p className="text-[#4D4D4D] font-montserrat text-sm mb-6">
            Female Staff Available | Air Conditioned | Free Parking | Trained Classical Hatha Yoga teachers | Certified by Sadhguru Gurukulam
          </p> */}
          <div className="w-screen h-px bg-[#A2A2A2] -ml-[15px] my-[40px]"></div>
        </div>
      </div>
    </div>
  );
};
export default HeaderSection;
