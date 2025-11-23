import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import DealCard from "../utils/DealCard";
import { useLoc } from "../context/LocationContext";
import deals from "../../api/deals";

const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

function ServicesHeading() {
  const scrollRef = useRef();
  const { location } = useLoc();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (location.lat && location.lng) {
      deals.getNearbyDeals(location).then((res) => {
        setDataset(
          res.data?.map((x) => ({
            id: x.ID,
            image: x.imageURL,
            subCatName: x.subCatName,
            dealName: x.dealName,
            providerName: x.providerName,
            city: x.city,
            area: x.area,
          }))
        );
      });
    }
  }, [location]);
  const handleCardClick = (deal) => {
    navigate(`/deal/${toSlug(deal.dealName)}/${deal.id}`);
  };

  const scrollLeft = () => {
    const cardWidth = window.innerWidth < 768 ? 233.28 + 24 : 300;
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const cardWidth = window.innerWidth < 768 ? 233.28 + 24 : 300;
    scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FBFBFB] relative overflow-hidden pt-10">
      {/* Background Text */}
      {/* Desktop/Tablet - absolute in background */}
      <h2 className="hidden md:block absolute left-0 top-[60px] text-[80px] lg:text-[140px] font-bold text-gray-100 uppercase select-none z-0 tracking-widest leading-none w-screen px-4">
        DEALS
      </h2>
      {/* Mobile - in normal flow above content
      <h2 className="block  md:hidden text-[40px] sm:text-[60px] font-bold text-gray-200 uppercase select-none tracking-widest leading-none px-4 mb-6">
        DEALS
      </h2> */}

      <div className="relative w-[90%] mx-auto py-8 md:py-20 z-10">
        {/* Heading + Line + View all */}
        <div className="flex items-center w-full">
          <h3 className="sm:text-xl md:text-2xl lg:text-4xl font-bold text-black tracking-wider whitespace-nowrap">
            DEALS AROUND YOU
          </h3>
          <div className="flex-1 mx-4 h-[2px] bg-black"></div>
          <Link to="/deals">
            <button className="text-sm sm:text-base text-[#de9636] whitespace-nowrap font-bold">
              View all
            </button>
          </Link>
        </div>

        {/* Scrollable Deals */}
        <div className="relative mt-14 w-100%">
          {/* Left button - hidden on mobile */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="
               flex overflow-x-auto no-scrollbar scroll-smooth gap-3
              px-4 pb-2
            "
            style={{ scrollSnapType: "x mandatory" }}
          >
            {dataset?.map((deal) => (
              <div
                key={deal.id}
                // to={`/deals/${deal.id}`}
                onClick={() => handleCardClick(deal)}
                className="
                  flex-shrink-0 scroll-snap-align-start
                  w-[233.28px] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)]
                "
              >
                {/* {console.log(deal)} */}
                <DealCard {...deal} />
              </div>
            ))}
          </div>

          {/* Right button - hidden on mobile */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesHeading;
