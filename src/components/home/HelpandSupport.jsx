import React from "react";
import HelpAndSupportImage from "../assets/helpandsupport.png";

function HelpAndSupport() {
  return (
    <div className="w-full flex flex-col items-center bg-white text-black font-montserrat mt-[94px] px-4 pt-12 md:pt-20">
      {/* Top Section */}
      <div className="w-full max-w-[1282px] flex flex-col md:flex-row justify-between items-start gap-10 md:gap-4 lg:gap-20">
        {/* Left Text Section */}
        <div className="flex flex-col gap-4 lg:gap-6 max-w-[576px] mx-auto md:mx-0 text-center md:text-left">
          <p className="text-[#FECD8C] font-montserrat font-semibold text-[20px] md:text-[24px] leading-[125%] mb-0">
            HELP & SUPPORT
          </p>
          <h1 className="text-[#000] font-inter font-semibold text-[32px] md:text-[48px] lg:text-[64px] leading-[125%] mt-0">
            Need assistance? <br />
            We’re here to
            <span className="relative inline-block">
              <span className="relative z-10 md:ml-2">help.</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 163 28"
                fill="none"
                className="absolute -top-0 -left-1 w-[90px] h-[60px] md:w-[150px] md:h-[90px] lg:w-[220px] lg:h-[130px] md:ml-2"
              >
                <path
                  d="M7.89346 0H163L155.107 28H0L7.89346 0Z"
                  fill="#FECD8C"
                />
              </svg>
            </span>
          </h1>
          <p className="text-[#5D5D5D] font-inter font-normal text-[16px] md:text-[18px] leading-[125%] max-w-[566px] mx-auto md:mx-0">
            Our support team is here to assist you with any questions, <br />
            concerns, or guidance you may need, ensuring a smooth and satisfying experience
            on our platform.
          </p>
        </div>

        {/* Right side Image */}
        <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto -mt-6 md:-mt-10 lg:-mt-16">
          <img
            src={HelpAndSupportImage}
            alt="Help and Support"
            className="w-[260px] h-[260px] md:w-[400px] md:h-[400px] lg:w-[519px] lg:h-[519px] rounded-[10px] object-cover"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="w-full max-w-[1282px] md:max-h-[295px] flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start mt-8 rounded-[20px] border border-[#E0E0E0] bg-[#F9F9F9] px-6 py-8 md:px-12 md:py-10 gap-10 md:gap-4 lg:gap-12 mb-[118px]">
        {/* Call or WhatsApp */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left max-w-[350px]">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 49"
            className="w-[49px] h-[49px] flex-shrink-0 aspect-square"
            fill="none"
          >
            <path
              d="M24.5004 4.90002C27.4603 4.90174 30.3813 5.57379 33.0443 6.86575C35.7073 8.15771 38.0432 10.036 39.8765 12.3598C41.7099 14.6835 42.9931 17.3922 43.63 20.2828C44.2668 23.1733 44.2408 26.1706 43.5537 29.0496C42.8667 31.9286 41.5365 34.6147 39.663 36.9061C37.7895 39.1976 35.4214 41.035 32.7363 42.2804C30.0512 43.5259 27.1189 44.147 24.1594 44.0972C21.2 44.0475 18.2902 43.3281 15.6485 41.993L15.3521 41.8338L6.42184 44.0633C6.24998 44.1065 6.07078 44.1119 5.89662 44.0791C5.72246 44.0464 5.55748 43.9762 5.41307 43.8735C5.26866 43.7708 5.14826 43.638 5.06017 43.4842C4.97208 43.3304 4.9184 43.1594 4.90284 42.9828V42.7819L4.93714 42.5786L7.16664 33.6508L7.01229 33.3568C5.89391 31.1486 5.20392 28.7486 4.97879 26.2836L4.91754 25.3477L4.90039 24.5C4.90039 19.3018 6.96538 14.3164 10.6411 10.6407C14.3168 6.96502 19.3021 4.90002 24.5004 4.90002ZM24.5004 7.35002C21.5076 7.34954 18.5668 8.13222 15.9702 9.62029C13.3736 11.1084 11.2117 13.25 9.69912 15.8324C8.18658 18.4149 7.37614 21.3481 7.34835 24.3408C7.32056 27.3334 8.07637 30.2812 9.54069 32.8913C9.65438 33.0942 9.70791 33.3254 9.69504 33.5577L9.66074 33.788L7.80854 41.1894L15.2173 39.3421C15.3679 39.3049 15.5242 39.2966 15.6779 39.3176L15.9009 39.3691L16.114 39.4646C18.4007 40.7448 20.9504 41.4838 23.5672 41.6251C26.184 41.7663 28.7984 41.306 31.2096 40.2794C33.6208 39.2529 35.7647 37.6874 37.4766 35.7032C39.1886 33.719 40.423 31.3688 41.0851 28.8332C41.7473 26.2976 41.8195 23.644 41.2963 21.0761C40.7731 18.5082 39.6684 16.0944 38.067 14.02C36.4656 11.9456 34.41 10.2658 32.0583 9.10952C29.7065 7.95327 27.121 7.35137 24.5004 7.35002ZM25.7254 26.95C26.0315 26.9495 26.3267 27.0635 26.553 27.2698C26.7792 27.476 26.92 27.7595 26.9476 28.0643C26.9753 28.3692 26.8878 28.6734 26.7024 28.917C26.517 29.1605 26.2471 29.3259 25.9459 29.3804L25.7254 29.4H18.3754C18.0693 29.4006 17.774 29.2865 17.5478 29.0803C17.3216 28.874 17.1808 28.5906 17.1531 28.2857C17.1255 27.9808 17.213 27.6767 17.3984 27.4331C17.5838 27.1895 17.8537 27.0242 18.1549 26.9696L18.3754 26.95H30.6254ZM30.6254 19.6C30.9315 19.5995 31.2267 19.7135 31.453 19.9198C31.6792 20.126 31.82 20.4095 31.8476 20.7143C31.8753 21.0192 31.7878 21.3234 31.6024 21.567C31.417 21.8105 31.1471 21.9759 30.8459 22.0304L30.6254 22.05H18.3754C18.0693 22.0506 17.774 21.9365 17.5478 21.7303C17.3216 21.524 17.1808 21.2406 17.1531 20.9357C17.1255 20.6308 17.213 20.3267 17.3984 20.0831C17.5838 19.8395 17.8537 19.6742 18.1549 19.6196L18.3754 19.6H30.6254Z"
              fill="#FECD8C"
              stroke="#FECD8C"
              strokeWidth="2"
            />
          </svg>
          <h3 className="font-inter text-[#000] font-semibold text-[20px] md:text-[24px]">
            Call or WhatsApp
          </h3>
          <p className="text-[#787878] font-montserrat text-[14px] md:text-[16px] font-normal">
            Quick support on call or chat
          </p>
          <p className="text-[#787878] font-montserrat text-[14px] md:text-[16px] font-semibold">
            +91-9818257300 | +91-8800802349
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left max-w-[350px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="49"
            height="49"
            viewBox="0 0 49 49"
            fill="none"
          >
            <path
              d="M44.9163 12.25C44.9163 10.0042 43.0788 8.16669 40.833 8.16669H8.16634C5.92051 8.16669 4.08301 10.0042 4.08301 12.25V36.75C4.08301 38.9959 5.92051 40.8334 8.16634 40.8334H40.833C43.0788 40.8334 44.9163 38.9959 44.9163 36.75V12.25ZM40.833 12.25L24.4997 22.4584L8.16634 12.25H40.833ZM40.833 36.75H8.16634V16.3334L24.4997 26.5417L40.833 16.3334V36.75Z"
              fill="#FECD8C"
            />
          </svg>
          <h3 className="font-inter text-[#000] font-semibold text-[20px] md:text-[24px]">
            Email us
          </h3>
          <p className="text-[#787878] font-montserrat text-[14px] md:text-[16px] font-normal">
            Send queries anytime
          </p>
          <p className="text-[#787878] font-montserrat text-[14px] md:text-[16px] font-semibold">
            hello@morselv.com
          </p>
        </div>

        {/* Corporate Office */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left max-w-[380px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 49"
            className="w-[49px] h-[49px] flex-shrink-0 aspect-square"
            fill="none"
          >
            <path
              d="M28.583 44.9166V16.3333M28.583 44.9166H16.333C10.5592 44.9166 7.67022 44.9166 5.87763 43.122C4.08301 41.3294 4.08301 38.4405 4.08301 32.6666V16.3333C4.08301 10.5595 4.08301 7.67052 5.87763 5.87794C7.67022 4.08331 10.5592 4.08331 16.333 4.08331C22.1068 4.08331 24.9958 4.08331 26.7884 5.87794C28.583 7.67052 28.583 10.5595 28.583 16.3333M28.583 44.9166H36.7497C40.6003 44.9166 42.5235 44.9166 43.7199 43.7202C44.9163 42.5238 44.9163 40.6006 44.9163 36.75V24.5C44.9163 20.6494 44.9163 18.7261 43.7199 17.5297C42.5235 16.3333 40.6003 16.3333 36.7497 16.3333H28.583M13.2705 22.4583H11.2288M21.4372 22.4583H19.3955M13.2705 14.2916H11.2288M13.2705 30.625H11.2288M21.4372 14.2916H19.3955M21.4372 30.625H19.3955M37.7705 30.625H35.7288M37.7705 22.4583H35.7288"
              stroke="#FECD8C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="font-inter text-[#000] font-semibold text-[20px] md:text-[24px]">
            Corporate Office
          </h3>
          <p className="text-[#787878] font-montserrat text-[12px] md:text-[14px] font-semibold max-w-[380px]">
            Corporate Office: Femtech Sphere Tech Pvt. Ltd. <br />
            TR-242, Suncity Success Tower, Golf Course Extn Rd, <br />
            Badshahpur,Sec-65, Gurugram, Haryana Pin-122101
          </p>
        </div>
      </div>
    </div>
  );
}
export default HelpAndSupport;