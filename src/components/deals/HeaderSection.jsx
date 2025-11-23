import React, { useEffect, useState } from "react";
import imageToDisplay from "../assets/1a42454ed0b5f558b2ab7f2478aefbb4d03a89c7.jpg";
// import logoDots from '../assets/Group 1000001933.svg';
import img from "../assets/weui_arrow-filled (1).svg";
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
    <div className="w-full flex flex-col items-center">
      <LeadForm
        isOpen={isPopupOpen}
        onClose={closePopup}
        dealID={dealID}
        serviceID={-1}
        providerID={-1}
      />
      <div className="justify-between hidden lg:flex relative bg-white w-full max-w-[1280px] h-auto md:h-[530px] mt-[26px] overflow-visible ml-[150px] xl:ml-[50px] md:flex md:flex-col md:items-center md:w-full md:mt-[24px]">
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

        <div className="absolute top-5 -left-[90px] pl-[470px] md:pl-[550px] pr-6 h-full flex flex-col justify-start w-full mt-2">
          <h1 className="text-[#2D2D2D] font-montserrat font-bold text-[48px]  xl:text-[48px] leading-[140%] text-left max-w-[783px]">
            <span className="whitespace-wrap">
              {/* Midweek Calm – 20% Off All Bookings */}
              {dataSet.DealName}
            </span>
          </h1>

          <p className="text-[#4D4D4D] font-montserrat text-[16px] xl:text-[18px] font-normal mb-2 max-w-[700px] text-left">
            {/* Take a mindful pause midweek. Book any session and enjoy 20%
            off—because calm
            <br /> shouldn't wait for the weekend.{" "} */}
            {dataSet.Description}
          </p>

          <p className="font-montserrat font-normal text-[15px] xl:text-[20px] leading-[125%] text-[#4D4D4D] -mb-2">
            by{" "}
            <span
              className="font-montserrat 
          font-bold text-[#2D2D2D]"
            >
              {/* INNERSTUDIO GLOW */}
              {dataSet.ProviderName}
            </span>
          </p>
          <br />
          {/* Fitness &amp; Body Movement / Yoga */}
          <p>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] xl:text-[16px] font-bold underline underline-offset-4 mb-4 max-w-[700px] text-left">
              {dataSet.CatName}
            </span>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] xl:text-[16px] font-bold mb-4 max-w-[700px] text-left">
              {" "}
              /{" "}
            </span>
            <span className="text-[#4D4D4D] font-montserrat text-[14px] xl:text-[16px] font-bold underline underline-offset-4 mb-4 max-w-[700px] text-left">
              {dataSet.SubCatName}
            </span>
          </p>

          <div className="flex items-center gap-2 mb-4 mt-2 max-w-[700px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-[55px] h-[35px]"
              viewBox="0 0 30 35"
              fill="none"
            >
              <path
                d="M17.4993 16.7708C16.5324 16.7708 15.6051 16.3867 14.9214 15.703C14.2376 15.0192 13.8535 14.0919 13.8535 13.125C13.8535 12.158 14.2376 11.2307 14.9214 10.547C15.6051 9.86324 16.5324 9.47913 17.4993 9.47913C18.4663 9.47913 19.3936 9.86324 20.0773 10.547C20.7611 11.2307 21.1452 12.158 21.1452 13.125C21.1452 13.6037 21.0509 14.0778 20.8677 14.5202C20.6844 14.9625 20.4159 15.3644 20.0773 15.703C19.7388 16.0415 19.3369 16.3101 18.8945 16.4933C18.4522 16.6765 17.9781 16.7708 17.4993 16.7708ZM17.4993 2.91663C14.7919 2.91663 12.1954 3.99214 10.281 5.90658C8.36653 7.82101 7.29102 10.4175 7.29102 13.125C7.29102 20.7812 17.4993 32.0833 17.4993 32.0833C17.4993 32.0833 27.7077 20.7812 27.7077 13.125C27.7077 10.4175 26.6322 7.82101 24.7177 5.90658C22.8033 3.99214 20.2068 2.91663 17.4993 2.91663Z"
                fill="#DE9636"
              />
            </svg>
            <p className="text-[#4D4D4D] font-montserrat text-[16px] font-normal leading-[110%]">
              {/* Sector 45, Gurugram, Haryana 122018, India */}
              {dataSet.FullAddress}
            </p>
          </div>

          <button
            onClick={openPopup}
            className=" flex flex-row items-center justify-center bg-[#121212] text-white text-[16px] md:text-[18px] px-6 py-3 rounded-md hover:bg-gray-800 transition w-[180px] md:w-[200px] h-[50px] md:h-[60px]"
          >
            GET THIS DEAL{" "}
            <img
              className="w-[10px] md:w-[11px] h-[18px] md:h-[20px] ml-2 opacity-100"
              src={img}
            ></img>
          </button>
        </div>
      </div>
      <div className="hidden lg:block w-full max-w-[1280px] h-px bg-[#A2A2A2] mx-auto my-[50px] px-8"></div>

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
          <h1 className="text-[#2D2D2D] font-inter font-extrabold text-[24px] mb-[10px] leading-tight">
            {dataSet.DealName}
          </h1>

          <p className="text-[#4D4D4D] font-montserrat text-[12px] font-normal mb-[12px]">
            {dataSet.Description}
          </p>

          <p className="font-montserrat font-normal text-[12px] text-[#4D4D4D]">
            by{" "}
            <span
              className="font-montserrat font-bold text-[12px] text-[#2D2D2D]"
            >
              {dataSet.ProviderName}
            </span>
          </p>

          <p>
            <span className="text-[#2D2D2D] font-montserrat text-[14px] mt-3 font-bold underline underline-offset-2">
              {dataSet.CatName} 
            </span>
            <span className="text-[#2D2D2D] font-montserrat text-[14px] font-bold">
              {" "}
              /{" "}
            </span>
            <span className="text-[#2D2D2D] font-montserrat text-[14px] font-bold underline underline-offset-2">
              {dataSet.SubCatName}
            </span>
          </p>

          <div className="flex items-start gap-2 mb-4 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path d="M10.5 10.0625C9.91984 10.0625 9.36344 9.83203 8.9532 9.4218C8.54297 9.01156 8.3125 8.45516 8.3125 7.875C8.3125 7.29484 8.54297 6.73844 8.9532 6.3282C9.36344 5.91797 9.91984 5.6875 10.5 5.6875C11.0802 5.6875 11.6366 5.91797 12.0468 6.3282C12.457 6.73844 12.6875 7.29484 12.6875 7.875C12.6875 8.16227 12.6309 8.44672 12.521 8.71212C12.4111 8.97752 12.2499 9.21867 12.0468 9.4218C11.8437 9.62493 11.6025 9.78606 11.3371 9.89599C11.0717 10.0059 10.7873 10.0625 10.5 10.0625ZM10.5 1.75C8.87555 1.75 7.31763 2.39531 6.16897 3.54397C5.02031 4.69263 4.375 6.25055 4.375 7.875C4.375 12.4688 10.5 19.25 10.5 19.25C10.5 19.25 16.625 12.4688 16.625 7.875C16.625 6.25055 15.9797 4.69263 14.831 3.54397C13.6824 2.39531 12.1245 1.75 10.5 1.75Z" fill="#D4AF37"/>
           </svg>
            <p className="text-[#4D4D4D] font-montserrat text-[12px] font-normal">
              {dataSet.FullAddress}
            </p>
          </div>
          <button
            onClick={openPopup}
            className="flex flex-row items-center justify-center bg-[#121212] text-white text-[14px] px-5 py-2 rounded-md mb-6 w-full max-w-[200px]"
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
