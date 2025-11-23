import React, { useState, useEffect } from "react";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import banner from "../../api/banner";

const PartnerSection = () => {
  const [banners, setBanners] = useState([
    { ID: 1, link: "" },
    { ID: 2, link: "" },
    { ID: 3, link: "" },
  ]);

  useEffect(() => {
    banner.getAllBanner().then((res) => {
      if (res.data) setBanners(res.data[0]);
    });
  }, []);

  return (
  <div className="bg-[#fbfbfb]">
    <div className="w-full lg:px-6 xl:px-6 py-8 -px-1">
      {/* lg+ : one row only */}
      <div className="hidden lg:flex gap-6 justify-center lg:w-[90%] mx-auto">
        {/* First image - 33/16 */}
        <div
          className="flex-[2] rounded-lg shadow-md border border-gray-200 bg-center bg-cover object-contain aspect-[33/16] max-h-[350px]"
          style={{ backgroundImage: `url(${banners[0].ImageName})` }}
          onClick={() => window.open(banners[0].link, "_blank")}
        />

        {/* Second image - square */}
        <div
          className="flex-1 rounded-lg shadow-md border border-gray-200 bg-center bg-cover aspect-square max-h-[350px]"
          style={{ backgroundImage: `url(${banners[1].ImageName})` }}
          onClick={() => window.open(banners[1].link, "_blank")}
        />

        {/* Third image - square */}
        <div
          className="flex-1 rounded-lg shadow-md border border-gray-200 bg-center bg-cover aspect-square max-h-[350px]"
          style={{ backgroundImage: `url(${banners[2].ImageName})` }}
          onClick={() => window.open(banners[2].link, "_blank")}
        />
      </div>

      {/* below lg : stacked in 2 rows */}
      <div className="flex flex-col lg:hidden gap-4 w-full max-w-[90%] mx-auto mt-6 ">
        {/* Banner on top */}
        <div
          className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 aspect-[33/16] max-h-[350px]"
          style={{
            backgroundImage: `url(${banners[0].ImageName})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => window.open(banners[0].link, "_blank")}
        />

        {/* Squares row */}
        <div className="flex gap-4 w-full">
          <div
            className="flex-1 rounded-lg overflow-hidden shadow-md border border-gray-200 aspect-square max-h-[350px]"
            style={{
              backgroundImage: `url(${banners[1].ImageName})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => window.open(banners[1].link, "_blank")}
          />
          <div
            className="flex-1 rounded-lg overflow-hidden shadow-md border border-gray-200 aspect-square max-h-[350px]"
            style={{
              backgroundImage: `url(${banners[2].ImageName})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => window.open(banners[2].link, "_blank")}
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default PartnerSection;
