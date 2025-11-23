import React, { useState } from "react";
import imageToDisplay from "../assets/1a42454ed0b5f558b2ab7f2478aefbb4d03a89c7.jpg";
import ServicePopup from "./ServiceDetailPopup";
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

          <div className="flex-grow -mx-4">
            <h1 className="text-[#2D2D2D] font-montserrat font-bold text-[48px] leading-[67.2px] mb-[14px] text-left">
              <span className="whitespace-nowrap">{props.dataSet.Name}</span>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
              >
                <path
                  d="M17.4993 16.7708C16.5324 16.7708 15.6051 16.3867 14.9214 15.703C14.2376 15.0192 13.8535 14.0919 13.8535 13.125C13.8535 12.158 14.2376 11.2307 14.9214 10.547C15.6051 9.86324 16.5324 9.47913 17.4993 9.47913C18.4663 9.47913 19.3936 9.86324 20.0773 10.547C20.7611 11.2307 21.1452 12.158 21.1452 13.125C21.1452 13.6037 21.0509 14.0778 20.8677 14.5202C20.6844 14.9625 20.4159 15.3644 20.0773 15.703C19.7388 16.0415 19.3369 16.3101 18.8945 16.4933C18.4522 16.6765 17.9781 16.7708 17.4993 16.7708ZM17.4993 2.91663C14.7919 2.91663 12.1954 3.99214 10.281 5.90658C8.36653 7.82101 7.29102 10.4175 7.29102 13.125C7.29102 20.7812 17.4993 32.0833 17.4993 32.0833C17.4993 32.0833 27.7077 20.7812 27.7077 13.125C27.7077 10.4175 26.6322 7.82101 24.7177 5.90658C22.8033 3.99214 20.2068 2.91663 17.4993 2.91663Z"
                  fill="#DE9636"
                />
              </svg>
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
          <p className="text-[#4D4D4D] font-montserrat text-base font-400 leading-[140%] mt-[19px]">
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
          <div className="flex-grow pt-4 -mx-4">
            <h1 className="text-[#2D2D2D] font-montserrat font-bold text-[32px] leading-tight mb-[14px]">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
              >
                <path
                  d="M17.5003 16.7708C16.5334 16.7708 15.6061 16.3867 14.9223 15.703C14.2386 15.0192 13.8545 14.0919 13.8545 13.125C13.8545 12.158 14.2386 11.2307 14.9223 10.547C15.6061 9.86324 16.5334 9.47913 17.5003 9.47913C18.4673 9.47913 19.3946 9.86324 20.0783 10.547C20.762 11.2307 21.1462 12.158 21.1462 13.125C21.1462 13.6037 21.0519 14.0778 20.8686 14.5202C20.6854 14.9625 20.4169 15.3644 20.0783 15.703C19.7398 16.0415 19.3379 16.3101 18.8955 16.4933C18.4532 16.6765 17.9791 16.7708 17.5003 16.7708ZM17.5003 2.91663C14.7929 2.91663 12.1964 3.99214 10.2819 5.90658C8.36751 7.82101 7.29199 10.4175 7.29199 13.125C7.29199 20.7812 17.5003 32.0833 17.5003 32.0833C17.5003 32.0833 27.7087 20.7812 27.7087 13.125C27.7087 10.4175 26.6331 7.82101 24.7187 5.90658C22.8043 3.99214 20.2077 2.91663 17.5003 2.91663Z"
                  fill="#DE9636"
                />
              </svg>
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
          <div className="flex-grow pt-4 -mx-4">
            <h1 className="text-[#2D2D2D] font-montserrat font-bold text-[32px] leading-tight mb-[12px]">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
              >
                <path
                  d="M17.5003 16.7708C16.5334 16.7708 15.6061 16.3867 14.9223 15.703C14.2386 15.0192 13.8545 14.0919 13.8545 13.125C13.8545 12.158 14.2386 11.2307 14.9223 10.547C15.6061 9.86324 16.5334 9.47913 17.5003 9.47913C18.4673 9.47913 19.3946 9.86324 20.0783 10.547C20.762 11.2307 21.1462 12.158 21.1462 13.125C21.1462 13.6037 21.0519 14.0778 20.8686 14.5202C20.6854 14.9625 20.4169 15.3644 20.0783 15.703C19.7398 16.0415 19.3379 16.3101 18.8955 16.4933C18.4532 16.6765 17.9791 16.7708 17.5003 16.7708ZM17.5003 2.91663C14.7929 2.91663 12.1964 3.99214 10.2819 5.90658C8.36751 7.82101 7.29199 10.4175 7.29199 13.125C7.29199 20.7812 17.5003 32.0833 17.5003 32.0833C17.5003 32.0833 27.7087 20.7812 27.7087 13.125C27.7087 10.4175 26.6331 7.82101 24.7187 5.90658C22.8043 3.99214 20.2077 2.91663 17.5003 2.91663Z"
                  fill="#DE9636"
                />
              </svg>
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
           <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path d="M10.5 10.0625C9.91984 10.0625 9.36344 9.83203 8.9532 9.4218C8.54297 9.01156 8.3125 8.45516 8.3125 7.875C8.3125 7.29484 8.54297 6.73844 8.9532 6.3282C9.36344 5.91797 9.91984 5.6875 10.5 5.6875C11.0802 5.6875 11.6366 5.91797 12.0468 6.3282C12.457 6.73844 12.6875 7.29484 12.6875 7.875C12.6875 8.16227 12.6309 8.44672 12.521 8.71212C12.4111 8.97752 12.2499 9.21867 12.0468 9.4218C11.8437 9.62493 11.6025 9.78606 11.3371 9.89599C11.0717 10.0059 10.7873 10.0625 10.5 10.0625ZM10.5 1.75C8.87555 1.75 7.31763 2.39531 6.16897 3.54397C5.02031 4.69263 4.375 6.25055 4.375 7.875C4.375 12.4688 10.5 19.25 10.5 19.25C10.5 19.25 16.625 12.4688 16.625 7.875C16.625 6.25055 15.9797 4.69263 14.831 3.54397C13.6824 2.39531 12.1245 1.75 10.5 1.75Z" fill="#D4AF37"/>
           </svg>
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
          <div className="w-screen -ml-6 h-px bg-[#A2A2A2] mb-6"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSectionService;
