import React from "react";
import bgImg from "../assets/bgImg.png";
import overlay from "../assets/contentoverlay.png";
import SearchBar from "../home/SearchBar";
import tick from "../assets/tick.png";
import bgimgmobile from "../assets/bgimgmobile.png";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Version */}
      <div 
        className="hidden md:flex relative w-full pt-20 flex-col items-center min-h-screen"
        style={{ 
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
        }}
      >        <div className="flex-1 flex flex-col items-center w-full">
          <img 
            src={overlay} 
            alt=""
            className="w-[281px] h-[99px] mb-6 translate-y-10"
          />
          
          <h1 className="leading-[125%] tracking-[0%] font-montserrat font-light text-[#FECD8C] 
           mx-auto text-center md:text-7xl md:w-[80%] lg:w-[100%]"
             >WE KNOW WHAT WOMEN NEED</h1>
          <p className=" font-Montserrat sm:text-base text-[18px] pb-12 h-[23px] leading-[125%] tracking-[0%] md:text-lg text-[#FFFFFF] 
           sm:mb-10 px-2 sm:px-4 text-center md:w-[70%] lg:w-[100%] mt-8
">
            From therapy to nutrition to coaching — discover services from trusted businesses, 
            built around your life
          </p>
          
          <div className="w-full max-w-[70%] mb-10">
            <SearchBar/>
          </div>

          <div className="w-[350px] sm:w-[500px] md:w-[650px] 
     flex flex-row flex-nowrap items-center justify-between gap-2
     text-white mt-10 font-montserrat font-normal leading-[100%] tracking-[0%]">

  <div className="flex flex-row items-center gap-2 md:-mt-10 lg:-mt-2">
    <img className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" alt="" src={tick}/>
    <span className="text-[12px] sm:text-sm md:text-base whitespace-nowrap">
      Exclusive Perks & Deals
    </span>
  </div>

  <div className="flex flex-row items-center gap-2 md:-mt-10 lg:-mt-0">
    <img className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" alt="" src={tick}/>
    <span className="text-[12px] sm:text-sm md:text-base whitespace-nowrap">
      One-Stop Ease & Support
    </span>
  </div>
</div>
          
        </div>
        {/* Button half on hero, half below */}
        <div className="absolute bottom-[-35px] w-full flex justify-center">
          <div className="w-[686px] max-w-[90%] h-[70px] flex items-center justify-center rounded-[24px] bg-white"
               style={{ 
                 borderImage: "linear-gradient(90deg, #FFFFFF 0%, #D4AF37 50%, #FFFFFF 100%) 1"
               }}>
            <p className="text-[40px] font-montserrat font-semibold text-[#484848]">
              Trusted. Tracked. Transparent.
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Version */}
      <div className="md:hidden relative w-full pt-12 flex flex-col items-center min-h-screen"
           style={{ backgroundImage: `url(${bgimgmobile})`, backgroundSize: 'cover' }}>
        <img src={overlay} alt="" className="w-[350px] h-auto mb-4 pt-[70px]" />
       
        <h1 className="leading-[125%] tracking-[0%]
           text-6xl sm:text-6xl font-montserrat font-light text-[#FECD8C] 
           mx-auto mb-6 sm:mb-8 px-2 text-center">
          WE KNOW WHAT WOMEN NEED
        </h1>

        <p className="text-center font-montserrat text-[16px] text-white max-w-[75%] h-[23px] leading-[125%] tracking-[0%] 
           mb-12 sm:mb-10 px-2 sm:-mt-2 sm:px-4 -mt-4">
          From therapy to nutrition to coaching — discover services from trusted businesses, 
          built around your life
        </p>
     <br></br>
          <SearchBar/>
        <div className="flex flex-row gap-6 text-[#ffff] mt-10 font-montserrat text-sm max-w-[90%]">
          <div className="flex gap-2 items-center text-sm sm:text-[15px]">
            <img className="w-[13px] h-[13px]" alt="" src={tick}/>
            Exclusive Perks & Deals
          </div>
          <div className="flex gap-2 items-center text-sm  sm:text-[15px]">
            <img className="w-[13px] h-[13px]" alt="" src={tick}/>
            One-Stop Ease & Support
         </div>
        </div>
        {/* Button half on hero, half below for mobile */}
        <div className="absolute bottom-[-25px] w-full flex justify-center">
          <div className="w-full max-w-[90%] h-[50px] flex items-center justify-center rounded-[18px] bg-white"
               style={{ 
               borderImage:"linear-gradient(90deg, #FFFFFF 0%, #D4AF37 50%, #FFFFFF 100%) 1"
               }}>
            <p className="text-[24px] font-montserrat font-semibold text-[#484848]">
              Trusted.Tracked.Transparent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}export default Home;  

  