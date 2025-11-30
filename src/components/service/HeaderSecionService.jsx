import React, { useState } from "react";
import imageToDisplay from "../assets/1a42454ed0b5f558b2ab7f2478aefbb4d03a89c7.jpg";
import ServicePopup from "./ServiceDetailPopup";
import location from "../assets/location.svg";
import image2 from "../assets/52d2e4f0c81eac47fe2d06a68cf9a28eeef1aabf.jpg";
import image3 from "../assets/8c9fa45609ace4f02eb036c043ba06d353abc790.png";

const HeaderSectionService = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = props.imagesDataset;
  // const slides = [
  //   { image: imageToDisplay },
  //   { image: image2 },
  //   { image: image3 },
  // ];

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const goToNextSlide = (e) => {
    e?.stopPropagation();
    setCurrentSlide((s) => Math.min(s + 1, slides.length - 1));
  };

  const goToPrevSlide = (e) => {
    e?.stopPropagation();
    setCurrentSlide((s) => Math.max(s - 1, 0));
  };

  const goToSlide = (i) => setCurrentSlide(i);

  return (
    <div className="w-full pt-10 mt-[50px] flex mx-auto flex-col md:px-5">
      <ServicePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        dealID={-1}
        serviceID={-1}
        providerID={props.dataSet.ID}
      />

      {/* Desktop Version */}
      <div
        className="hidden xl:block relative mx-auto w-full pt-[10px]"
        style={{ maxWidth: "1280px" }}
      >
        <div className="flex items-start justify-center pt-8 gap-12">
          <div className="w-[432px] h-[432px] flex-shrink-0 rounded-[20px] overflow-hidden relative">
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${100 * (index - currentSlide)}%)`,
                  }}
                >
                  <img
                    src={slide.url}
                    alt={`slide-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                </div>
              ))}
              <button
                onClick={goToPrevSlide}
                aria-label="Previous slide"
                className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-0 rounded-full bg-black/30 backdrop-blur-sm drop-shadow-sm${
                  currentSlide === 0
                    ? "opacity-60 cursor-default"
                    : "hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="38"
                  viewBox="0 0 18 35"
                  fill="none"
                >
                  <path
                    d="M3.18811 18.5369L11.4379 26.7866L13.5 24.7246L6.2812 17.5058L13.5 10.2871L11.4379 8.22498L3.18811 16.4748C2.91466 16.7482 2.76111 17.1191 2.76111 17.5058C2.76111 17.8925 2.91466 18.2634 3.18811 18.5369Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                aria-label="Next slide"
                className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-0 rounded-full bg-black/30 backdrop-blur-sm drop-shadow-sm ${
                  currentSlide === slides.length - 1
                    ? "opacity-60 cursor-default"
                    : "hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="38"
                  viewBox="0 0 18 35"
                  fill="none"
                >
                  <path
                    d="M14.8119 18.5369L6.56208 26.7866L4.5 24.7246L11.7188 17.5058L4.5 10.2871L6.56208 8.22498L14.8119 16.4748C15.0853 16.7482 15.2389 17.1191 15.2389 17.5058C15.2389 17.8925 15.0853 18.2634 14.8119 18.5369Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentSlide
                        ? "w-3 h-3 bg-white"
                        : "w-2.5 h-2.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex-grow -mx-[10px] 2xl:-mx-[20px]">
            <h1 className="text-[#2D2D2D] font-montserrat font-bold text-[48px] leading-[67.2px] mb-[14px] text-left break-words 2xl:max-w-[850px] xl:max-w-[760px]">
              <span className="whitespace-wrap">{props.dataSet.Name}</span>
            </h1>

            <p>
              <span className="text-[#4D4D4D] font-montserrat text-[16px] font-semibold underline decoration-solid underline-offset-4 mb-4">
                {props.dataSet.Category}
              </span>
              <span className="text-[#4D4D4D] font-montserrat text-[16px] font-400 mb-4">
                {" "}
                /{" "}
              </span>
              <span className="text-[#4D4D4D] font-montserrat text-[16px] font-semibold underline decoration-solid underline-offset-4 mb-4">
                {props.dataSet.SubCategory}
              </span>
            </p>

            <div className="flex items-center gap-2 mt-[22.5px] mb-[22.5px]">
              <img src={location} alt="location" className="w-[35px] h-[35px] aspect-[1/1]" />
             <p className="text-[#4D4D4D] font-montserrat text-[16px] font-normal leading-[110%]">
                {props.dataSet.FullAddress}
              </p>
            </div>

            <button
              onClick={openPopup}
              className="inline-flex h-[60px] px-[44px] py-[20px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[10px] bg-[#121212] text-[#FFF] font-montserrat text-[20px] font-500 leading-[110%] hover:text-gray-200 transition-colors duration-300 transform hover:scale-105"
            >
              Contact
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 mt-8">
          <h2 className="text-[#2D2D2D] font-montserrat font-semibold text-[20px] leading-[110%] uppercase mb-2 mt-[59px]">
            Highlights
          </h2>
          <p className="text-[#4D4D4D] font-montserrat text-[16px] font-400 leading-[140%] mt-[19px]">
            {props.dataSet.highlights}
          </p>
          <div className="w-full h-px bg-[#A2A2A2] max-w-[1280px] mt-[50px]"></div>
        </div>
      </div>

      {/* Laptop Version (lg to xl) */}
      <div className="hidden lg:block xl:hidden relative mx-auto w-full px-2 pt-[30px]">
        <div className="flex w-full items-start gap-8">
          <div className="w-[320px] min-w-[280px] h-auto aspect-square rounded-[20px] overflow-hidden relative">
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${100 * (index - currentSlide)}%)`,
                  }}
                >
                  <img
                    src={slide.url}
                    alt={`slide-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
              ))}
              <button
                onClick={goToPrevSlide}
                aria-label="Previous"
                className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-0 rounded-full bg-black/30 backdrop-blur-sm drop-shadow-sm ${
                  currentSlide === 0
                    ? "opacity-60 cursor-default"
                    : "hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="38"
                  viewBox="0 0 18 35"
                  fill="none"
                >
                  <path
                    d="M3.18811 18.5369L11.4379 26.7866L13.5 24.7246L6.2812 17.5058L13.5 10.2871L11.4379 8.22498L3.18811 16.4748C2.91466 16.7482 2.76111 17.1191 2.76111 17.5058C2.76111 17.8925 2.91466 18.2634 3.18811 18.5369Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                aria-label="Next"
                className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-0 rounded-full bg-black/30 backdrop-blur-sm drop-shadow-sm ${
                  currentSlide === slides.length - 1
                    ? "opacity-60 cursor-default"
                    : "hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="38"
                  viewBox="0 0 18 35"
                  fill="none"
                >
                  <path
                    d="M14.8119 18.5369L6.56208 26.7866L4.5 24.7246L11.7188 17.5058L4.5 10.2871L6.56208 8.22498L14.8119 16.4748C15.0853 16.7482 15.2389 17.1191 15.2389 17.5058C15.2389 17.8925 15.0853 18.2634 14.8119 18.5369Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentSlide
                        ? "w-3 h-3 bg-white"
                        : "w-2.5 h-2.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-grow pt-4">
            <h1 className="text-[#2D2D2D] font-montserrat font-bold text-[32px] leading-tight mb-[14px] break-all w-full">
              {props.dataSet.Name}
            </h1>
            <p>
              <span className="text-[#4D4D4D] font-montserrat text-sm font-semibold underline decoration-solid underline-offset-3 mb-3">
                {props.dataSet.Category}
              </span>
              <span className="text-[#4D4D4D] font-montserrat text-sm font-semibold mb-3">
                {" "}
                /{" "}
              </span>
              <span className="text-[#4D4D4D] font-montserrat text-sm font-semibold underline underline-offset-2 mb-3">
                {props.dataSet.SubCategory}
              </span>
            </p>
            <div className="flex items-start gap-2 mt-[20px] mb-4">
              <img src={location} alt="location" className="w-[35px] h-[35px] aspect-[1/1]" />
              <p className="text-[#4D4D4D] font-montserrat text-[16px]">
                {props.dataSet.FullAddress}
              </p>
            </div>
            <button
              onClick={openPopup}
              className="inline-flex px-6 py-3 justify-center items-center gap-2 rounded-[10px] bg-[#121212] text-white font-montserrat text-base font-medium leading-[110%] mb-6 hover:text-gray-200 transition-colors duration-300 transform hover:scale-105"
            >
              Contact
            </button>
          </div>
        </div>
        <div className="w-full mt-4">
          <h2 className="text-[#2D2D2D] font-montserrat font-semibold text-[18px] leading-[110%] uppercase mb-2 mt-[27px]">
            Highlights
          </h2>
          <p className="text-[#4D4D4D] font-montserrat text-sm mt-[10px]">
            {props.dataSet.highlights}
          </p>
          <div className="w-full h-px bg-[#A2A2A2] mt-[25px]"></div>
        </div>
      </div>

      {/* Tablet Version (md to lg) */}
      <div className="hidden md:flex lg:hidden flex-col items-center w-full pt-[10px]">
        <div className="flex flex-col md:flex-row w-full items-start gap-8 pt-[20px] px-3">
          <div className="w-full md:w-[320px] min-w-[280px] h-auto aspect-square rounded-[20px] overflow-hidden relative">
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${100 * (index - currentSlide)}%)`,
                  }}
                >
                  <img
                    src={slide.url}
                    alt={`slide-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
              ))}
              <button
                onClick={goToPrevSlide}
                aria-label="Previous"
                className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-0 rounded-full bg-black/30 backdrop-blur-sm drop-shadow-sm${
                  currentSlide === 0
                    ? "opacity-60 cursor-default"
                    : "hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="38"
                  viewBox="0 0 18 35"
                  fill="none"
                >
                  <path
                    d="M3.18811 18.5369L11.4379 26.7866L13.5 24.7246L6.2812 17.5058L13.5 10.2871L11.4379 8.22498L3.18811 16.4748C2.91466 16.7482 2.76111 17.1191 2.76111 17.5058C2.76111 17.8925 2.91466 18.2634 3.18811 18.5369Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                aria-label="Next"
                className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-0 rounded-full bg-black/30 backdrop-blur-sm drop-shadow-sm ${
                  currentSlide === slides.length - 1
                    ? "opacity-60 cursor-default"
                    : "hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="38"
                  viewBox="0 0 18 35"
                  fill="none"
                >
                  <path
                    d="M14.8119 18.5369L6.56208 26.7866L4.5 24.7246L11.7188 17.5058L4.5 10.2871L6.56208 8.22498L14.8119 16.4748C15.0853 16.7482 15.2389 17.1191 15.2389 17.5058C15.2389 17.8925 15.0853 18.2634 14.8119 18.5369Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentSlide
                        ? "w-3 h-3 bg-white"
                        : "w-2.5 h-2.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-grow pt-4 ">
            <h1 className="text-[#2D2D2D] font-montserrat font-bold text-[32px] leading-tight mb-[12px] break-all w-full">
              {props.dataSet.Name}
            </h1>
            <p>
              <span className="text-[#4D4D4D] font-montserrat text-sm font-semibold underline underline-offset-2 mb-3">
                {props.dataSet.Category}
              </span>
              <span className="text-[#4D4D4D] font-montserrat text-sm font-semibold mb-3">
                {" "}
                /{" "}
              </span>
              <span className="text-[#4D4D4D] font-montserrat text-sm font-semibold underline underline-offset-2 mb-3">
                {props.dataSet.SubCategory}
              </span>
            </p>
            <div className="flex items-start gap-2 mb-4 mt-[18px]">
              <img src={location} alt="location" className="w-[35px] h-[35px] aspect-[1/1]" />
              <p className="text-[#4D4D4D] font-montserrat text-base">
                {props.dataSet.FullAddress}
              </p>
            </div>
            <button
              onClick={openPopup}
              className="inline-flex px-6 py-3 justify-center items-center gap-2 rounded-[10px] bg-[#121212] text-white font-montserrat text-base font-medium leading-[110%] hover:text-gray-200 transition-colors duration-300 transform hover:scale-105"
            >
              Contact
            </button>
          </div>
        </div>
        <div className="w-full mt-4 px-4">
          <h2 className="text-[#2D2D2D] font-montserrat font-semibold text-[18px] leading-[110%] uppercase mb-2 mt-[27px]">
            Highlights
          </h2>
          <p className="text-[#4D4D4D] font-montserrat text-sm mt-[19px]">
            {props.dataSet.highlights}
          </p>
          <div className="w-full h-px bg-[#A2A2A2] mt-[25px]"></div>
        </div>
      </div>

      {/* Mobile Version - Full width image without any padding */}
      <div className="block md:hidden w-full -mt-[40px]">
        <div
          className="relative w-full overflow-hidden"
          style={{
            marginLeft: "-50vw",
            marginRight: "-50vw",
            left: "50%",
            right: "50%",
            width: "100vw",
            position: "relative",
          }}
        >
          <div className="w-full aspect-square flex-shrink-0 overflow-hidden">
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${100 * (index - currentSlide)}%)`,
                  }}
                >
                  <img
                    src={slide.url}
                    alt={`slide-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
              ))}
              <button
                onClick={goToPrevSlide}
                aria-label="Previous"
                className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-0 rounded-full bg-black/30 backdrop-blur-sm drop-shadow-sm ${
                  currentSlide === 0
                    ? "opacity-60 cursor-default"
                    : "hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="38"
                  viewBox="0 0 18 35"
                  fill="none"
                >
                  <path
                    d="M3.18811 18.5369L11.4379 26.7866L13.5 24.7246L6.2812 17.5058L13.5 10.2871L11.4379 8.22498L3.18811 16.4748C2.91466 16.7482 2.76111 17.1191 2.76111 17.5058C2.76111 17.8925 2.91466 18.2634 3.18811 18.5369Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                aria-label="Next"
                className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-0 rounded-full bg-black/30 backdrop-blur-sm drop-shadow-sm${
                  currentSlide === slides.length - 1
                    ? "opacity-60 cursor-default"
                    : "hover:scale-105"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="38"
                  viewBox="0 0 18 35"
                  fill="none"
                >
                  <path
                    d="M14.8119 18.5369L6.56208 26.7866L4.5 24.7246L11.7188 17.5058L4.5 10.2871L6.56208 8.22498L14.8119 16.4748C15.0853 16.7482 15.2389 17.1191 15.2389 17.5058C15.2389 17.8925 15.0853 18.2634 14.8119 18.5369Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentSlide
                        ? "w-3 h-3 bg-white"
                        : "w-2 h-2 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 mt-4">
          <h1 className="text-[#2D2D2D] font-montserrat font-bold text-[24px] leading-[33.6px]">
            {props.dataSet.Name}
          </h1>
          <p>
            <span className="text-[#4D4D4D] font-montserrat text-[12px] font-semibold underline underline-offset-2">
              {props.dataSet.Category}
            </span>
            <span className="text-[#4D4D4D] font-montserrat text-[12px] font-semibold">
              {" "}
              /{" "}
            </span>
            <span className="text-[#4D4D4D] font-montserrat text-[12px] font-semibold underline underline-offset-2">
              {props.dataSet.SubCategory}
            </span>
          </p>
          <div className="flex items-center gap-2 mb-4 mt-3">
           <img src={location} alt="location" className="w-[16.8px] h-[16.8px] aspect-[16.80/16.80]" />
            <p className="text-[#4D4D4D] font-montserrat text-[12px] font-normal leading-[110%]">
              {props.dataSet.FullAddress}
            </p>
          </div>
          <button
            onClick={openPopup}
            className="inline-flex px-[30px] py-3 justify-center items-center gap-2 rounded-[10px] bg-[#121212] text-[#FFF] font-montserrat text-[14px] font-medium leading-[110%] mb-6 hover:text-gray-200 transition-colors duration-300 trabsform hover:scale-105"
          >
            Contact
          </button>
          <h2 className="text-[#2D2D2D] font-montserrat font-semibold text-[16px] leading-[110%] font-variant-all-small-caps mb-1">
            Highlights
          </h2>
          <p className="text-[#4D4D4D] font-montserrat text-[12px] mb-6">
            {props.dataSet.highlights}
          </p>
          <div className="w-screen -ml-6 h-px font-normal bg-[#A2A2A2] mb-6"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSectionService;
