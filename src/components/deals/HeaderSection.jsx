import React, { useEffect, useState } from "react";
import imageToDisplay from "../assets/1a42454ed0b5f558b2ab7f2478aefbb4d03a89c7.jpg";
// import logoDots from '../assets/Group 1000001933.svg';
import img from "../assets/weui_arrow-filled (1).svg";
import location from "../assets/location.svg";
import { useParams, useLocation } from "react-router-dom";
import LeadForm from "./DealPopup";
import deals from "../../api/deals";

const HeaderSection = () => {
  // const { dealID } = useLocation().state || {};
  const { dealID } = useParams();
  const [dataSet, setDataset] = useState({});
  useEffect(() => {
    if (dealID) {
      deals.getDealDetails({ dealID }).then((res) => {
        setDataset(res.data[0]);
      });
    }
  }, [dealID]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div className="w-full flex flex-col flex-grow items-center">
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
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 77.4%, rgba(0, 0, 0, 0.5) 100%), url(${dataSet.ImageName})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
          }}
        >
          {/* <img src={logoDots} alt="Logo Dots" className="w-[61.4px] h-[14px] absolute bottom-[23px] left-1/2 -translate-x-1/2 object-contain" /> */}
        </div>

        <div className="absolute top-5 left-0 pl-[450px] md:mt-6 h-full flex flex-col justify-start w-full mt-2 pr-[120px] xl:pr-4">
          <h1 className="text-[#2D2D2D] font-montserrat font-bold md:text-[28px] lg:text-[40px] xl:text-[48px] leading-[140%] text-left w-full break-words">
            <span className="whitespace-wrap">
              {/* Midweek Calm – 20% Off All Bookings */}
              {dataSet.DealName}
            </span>
          </h1>
          <p className="text-[#4D4D4D] font-montserrat text-[16px] xl:text-[16px] font-normal mb-2 max-w-[700px] text-left">
            {/* Take a mindful pause midweek. Book any session and enjoy 20%
            off—because calm
            <br /> shouldn't wait for the weekend.{" "} */}
            {dataSet.Description}
          </p>

          <p className="font-montserrat font-normal text-[20px] xl:text-[20px] leading-[125%] text-[#4D4D4D] -mb-2">
            by{" "}
            <span
              className="font-montserrat 
          font-semibold text-[#2D2D2D]"
            >
              {/* INNERSTUDIO GLOW */}
              {dataSet.ProviderName}
            </span>
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
            <img src={location} alt="loaction" className="w-[30px] h-[30px] aspect-[1/1]" />
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
            ></img>
          </button>
        </div>
      </div>
      <div className="hidden lg:block md:block w-full max-w-[1280px] h-px bg-[#A2A2A2] mx-auto my-[50px] px-8"></div>

      {/* Mobile Version - Compact layout for smaller screens */}
      <div className="block md:hidden lg:hidden bg-white w-full -mt-[10px]">
        <div
          className="relative w-70% h-50% flex justify-center flex-shrink-0 aspect-square"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 77.4%, rgba(0,0,0,0.5) 100%), url(${dataSet.ImageName})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <img src={logoDots} alt="Logo Dots" className="w-[61.4px] h-[14px] absolute bottom-[23px] left-1/2 -translate-x-1/2 object-contain" /> */}
        </div>

        <div className="px-4 py-4">
          <h1 className="text-[#2D2D2D] font-inter font-bold text-[24px] mb-[10px] leading-tight">
            {dataSet.DealName}
          </h1>

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
            <span
              className="font-montserrat font-bold text-[12px] text-[#2D2D2D] underline underline-offset-2"
            >
              {dataSet.ProviderName}
            </span>
          </p>

          
          <div className="flex items-center gap-2 mb-4 mt-3">
            <img src={location} alt="location" className="w-[16.8px] h-[16.8px] flex-shrink-0 aspect-[16.80/16.80]" />
            <p className="text-[#4D4D4D] font-montserrat text-[12px] font-normal">
              {dataSet.FullAddress}
            </p>
          </div>
          <button
            onClick={openPopup}
            className="flex flex-row items-center justify-center bg-[#121212] text-white text-[14px] px-5 py-2 rounded-md mb-6"
          >
            GET THIS DEAL{" "}
            <img className="w-[12px] h-[20px] ml-2 opacity-100" src={img}></img>
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
