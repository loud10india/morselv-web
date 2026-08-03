import React from "react";

function ListYourBusiness() {
  return (
    <div className="w-full min-h-screen mt-[100px] flex flex-col items-center">
      <div
        className="w-full h-[330px] flex flex-col items-center justify-center -mt-8 md:-mt-2.5"
        style={{
          background:
            "linear-gradient(180deg, rgba(254,205,140,0.40) 0%, rgba(163,163,163,0.00) 100%)",
        }}
      >
        <p className="text-[#FECD8C] font-montserrat text-[24px] font-semibold leading-[30px] mt-[118px]">
          LIST YOUR BUSINESS
        </p>
        <h1 className="font-inter text-[40px] md:text-[64px] font-semibold leading-[48px] md:leading-[80px] text-[#000] text-center max-w-[900px] px-4">
          Join India's Women-Centric Business{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Marketplace</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="163"
              height="28"
              viewBox="0 0 163 28"
              fill="none"
              className="absolute bottom-2 left-2.5 z-0 opacity-100"
            >
              <path
                d="M7.89346 0H163L155.107 28H0L7.89346 0Z"
                fill="#FECD8C"
              />
            </svg>
          </span>
        </h1>

        <p className="max-w-[900px] text-center text-[#5D5D5D] font-montserrat text-[18px] md:text-[20px] font-normal leading-[25px] mt-6 px-4">
          Showcase your business to women actively searching for trusted
          wellness, beauty, healthcare, fitness, education, legal, and
          lifestyle services. Build credibility, attract more enquiries, and
          grow your customer base with Morselv.
        </p>
      </div>

      <a
        href="https://wa.me/919818257300?text=Hi%20Morselv%20Team%2C%20I'm%20interested%20in%20listing%20my%20business%20on%20Morselv.%20Please%20share%20the%20registration%20process%20and%20available%20listing%20plans."
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-flex h-[60px] px-[44px] justify-center items-center gap-2 rounded-[10px] bg-[#121212] text-[#FFF] font-montserrat text-[18px] md:text-[20px] font-medium leading-[22px] mb-[145px]"
      >
        Get Started Free
      </a>
    </div>
  );
}

export default ListYourBusiness;
