import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ServiceCard from "../utils/ServiceCard";
import { useLoc } from "../context/LocationContext";
import providers from "../../api/providers";

const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

function ServicesHeading() {
  const scrollRef = useRef();
  const { location } = useLoc();
  const [dataset, setDataset] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.lat && location.lng) {
      providers.getNearbyProviders(location).then((res) => {
        setDataset(
          res.data?.map((x) => ({
            id: x.ID,
            image: x.imageURL,
            subCatName: x.subCatName,
            providerName: x.providerName,
            city: x.city,
            area: x.area,
          }))
        );
      });
    }
  }, [location]);
  const handleCardClick = (provider) => {
    navigate(`/provider/${toSlug(provider.providerName)}/${provider.id}`);
  };
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FBFBFB] py-10 relative overflow-hidden mt-0">
      {/* Background Text */}
      <h2
        className="hidden lg:block absolute left-0 top-[17%] -translate-y-1/2 
               text-[140px] font-bold text-gray-100 uppercase select-none 
               z-0 tracking-widest leading-none w-full px-4 text-left"
      >
        SERVICES
      </h2>

      <div className="relative w-[90%] mx-auto py-8 md:py-20 z-10">
        {/* Heading + Line + View all */}
        <div className="flex items-center w-full">
          <h3 className="sm:text-xl md:text-2xl lg:text-4xl font-bold text-black tracking-wider whitespace-nowrap">
            SERVICE AROUND YOU
          </h3>
          <div className="flex-1 mx-4 h-[2px] bg-black"></div>
          <Link to="/service">
            <button className="text-sm sm:text-base text-[#de9636] whitespace-nowrap font-bold">
              View all
            </button>
          </Link>
        </div>

        {/* Cards Slider */}
        <div className="relative mt-14 w-100%">
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
          >
            <ChevronLeft size={24} />
          </button>
          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth gap-4
              px-4 pb-2"
            style={{ scrollSnapType: "x mandatory"}}
          >
            {dataset.map((service) => (
              <div
                key={service.id}
                // to={`/services/${service.id}`}
                onClick={() => handleCardClick(service)}
                className="flex-shrink-0 w-[233.28px] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] scroll-snap-align-start mb-3"
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
          {/* Right Button */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
          >
            <ChevronRight size={24} />
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default ServicesHeading;
