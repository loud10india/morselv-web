import React from "react";

function Careers() {
  const jobs = [
    { title: "Product Designer", dept: "Design & User experience", level: "Mid-level", type: "Remote/Full-time" },
    { title: "UX Researcher", dept: "User Research & Strategy", level: "Senior", type: "Onsite/Part-time" },
    { title: "UI Developer", dept: "Interface Design", level: "Junior", type: "Hybrid/Contract" },
    { title: "Creative Director", dept: "Branding & Conceptual Design", level: "Lead", type: "Remote/Freelance" },
    { title: "Product Creator", dept: "Design & User Interaction", level: "Intermediate level", type: "Remote/Full-time Position" },
    { title: "UX Researcher", dept: "User Research & Planning", level: "Senior Level", type: "Onsite/Part-time Position" },
    { title: "UI Developer", dept: "Interface Creation", level: "Entry Level", type: "Hybrid/Contract Position" },
    { title: "Artistic Director", dept: "Brand Development", level: "Lead Designer", type: "Remote/Freelance Work" },
  ];

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
          CAREERS
        </p>
        <h1 className="font-inter text-[48px] md:text-[64px] font-semibold leading-[60px] md:leading-[80px] text-[#000] flex gap-3">
          Join our{" "}
          <span className="relative inline-block">
            <span className="relative z-10">team</span>
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

        <p className="max-w-[1280px] text-center text-[#5D5D5D] font-montserrat text-[18px] md:text-[20px] font-normal leading-[25px] mt-6 px-4">
          At Morselv, we’re building a trusted space for women to access holistic
          wellness and connect with experts who care. We’re <br /> looking for people
          who share our passion for making a real difference.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[1280px] h-[3px] bg-[#EBEBEB] mt-10"></div>

      {/* Current Openings */}
      <h2 className="mt-10 w-full max-w-[1280px] px-4 text-left text-[#000] font-montserrat text-[28px] md:text-[32px] font-semibold leading-[40px]">
          Current Openings
      </h2>

      {/* Job Cards Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1280px] w-full px-4">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="p-[23px] px-[27px] flex flex-col gap-[22px] rounded-[20px] bg-white shadow-[0_4px_19.1px_0_rgba(0,0,0,0.15)]"
          >
            <h3 className="text-[#000] font-montserrat text-[22px] md:text-[24px] font-semibold leading-[30px]">
              {job.title}
            </h3>
            <p className="text-[#585858] font-montserrat text-[16px] font-medium leading-[20px]">
              {job.dept}
            </p>
            <ul className="list-disc list-inside text-[#585858] font-montserrat text-[16px] font-medium leading-[20px] space-y-1 pl-[10px]">
              <li>{job.level}</li>
              <li>{job.type}</li>
            </ul>
            <div className="flex justify-end items-center gap-2 pr-6">
              <span className="text-[#0064B5] font-montserrat text-[18px] md:text-[20px] font-normal leading-[25px]">
                Apply Now
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="35"
                viewBox="0 0 18 35"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3119 18.5369L7.06208 26.7866L5 24.7246L12.2188 17.5058L5 10.2871L7.06208 8.22498L15.3119 16.4748C15.5853 16.7482 15.7389 17.1191 15.7389 17.5058C15.7389 17.8925 15.5853 18.2634 15.3119 18.5369Z"
                  fill="#0064B5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <button className="mt-12 inline-flex h-[60px] px-[44px] justify-center items-center gap-2 rounded-[10px] bg-[#121212] text-[#FFF] font-montserrat text-[18px] md:text-[20px] font-medium leading-[22px] mb-[145px]">
        Load More
      </button>
    </div>
  );
}
export default Careers;