import React, { useEffect, useState } from "react";
import PartnerSection from "../home/PartnerSection";
import HeaderSectionService from "../service/HeaderSecionService";
import AboutBusinessSection from "./AboutBussiness";
import ServicePopup from "./ServiceDetailPopup";
import { useParams, useLocation, Link } from "react-router-dom";
import providers from "../../api/providers";
import Seo from "../utils/Seo";
import { localBusinessSchema } from "../../seo/siteConfig";

const ServiceDetail = () => {
  const { providerID } = useParams();
  const { pathname } = useLocation();
  const [dataSet, setDataset] = useState({});
  const [selectedServiceID, setSelectedServiceID] = useState(-1);
  const [serviceDataset, setServiceDataset] = useState([]);
  const [imagesDataset, setImagesDataset] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [status, setStatus] = useState("loading");
  
  const openPopup = (ID) => {
    setSelectedServiceID(ID);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  
  useEffect(() => {
    if (!providerID) return;
    let active = true;
    setStatus("loading");
    providers
      .getProviderDetails({ providerID })
      .then((res) => {
        if (!active) return;
        // getProviderByID returns an empty first result set for a provider that
        // is not publicly visible. Reading [0][0] blindly set state to
        // undefined and the render then threw on dataSet.Name, blanking the
        // page. Treat "no row" as not-found instead.
        const provider = res?.data?.[0]?.[0];
        if (!provider) {
          setStatus("missing");
          return;
        }
        setDataset(provider);
        setServiceDataset(res.data[1] ?? []);
        setImagesDataset(res.data[2] ?? []);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("missing");
      });
    return () => {
      active = false;
    };
  }, [providerID]);
  
  if (status === "missing") {
    return (
      <div className="flex mx-auto flex-col w-full">
        <Seo
          title="Provider not available"
          description="This Morselv listing is no longer available."
          noindex
        />
        <div className="max-w-[720px] mx-auto px-4 py-20 text-center">
          <h1 className="text-[#2D2D2D] font-montserrat font-semibold text-[26px] sm:text-[32px]">
            This listing is no longer available
          </h1>
          <p className="text-[#4D4D4D] font-montserrat text-[14px] sm:text-[16px] mt-4">
            The business you are looking for has been removed or is not
            currently listed on Morselv.
          </p>
          <Link
            to="/"
            className="inline-block mt-8 rounded-[10px] bg-[#2D2D2D] text-white font-montserrat font-semibold text-[14px] px-8 py-3 hover:opacity-90 transition"
          >
            Browse services
          </Link>
        </div>
        <div className="w-full bg-[#fbfbfb]">
          <div className="max-w-[1450px] mx-auto">
            <PartnerSection />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mx-auto flex-col w-full">
      <Seo
        title={dataSet.Name || "Service Provider"}
        description={
          dataSet.Description ||
            `Explore services, timings and location for ${dataSet.Name || "this provider"} on Morselv.`
        }
        type="profile"
        schema={localBusinessSchema(dataSet, pathname)}
      />
      {/* Content with padding */}
      <div className="px-3 sm:px-4 md:px-5">
        <HeaderSectionService dataSet={dataSet} imagesDataset={imagesDataset} />
        <ServicePopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          dealID={-1}
          serviceID={selectedServiceID}
          providerID={-1}
        />
        
        {/* Desktop Version - Yoga services offerings */}
        <div
          className="hidden xl:block relative mt-[52px] mx-auto w-auto"
          style={{ maxWidth: "1280px", width: "98%" }}
        >
          <h2
            className="text-[#2D2D2D] mt-30 font-montserrat font-semibold text-[32px] mb-6"
            style={{ lineHeight: "44.8px" }}
          >
            Main Offerings
          </h2>

          <div
            className="rounded-[20px] bg-[#F3D0A1] p-8 mb-[52px] h-auto"
            style={{ width: "100%" }}
          >
            {serviceDataset.map(
              (service, idx) =>
                service.Name != "" && (
                  <div key={service.ID}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="max-w-4xl">
                        <h3 className="text-[#2D2D2D] font-montserrat text-[24px] font-semibold uppercase">
                          {service.Name}
                        </h3>
                        <p className="text-[#4D4D4D] font-montserrat font-normal text-[16px] font-400 mt-[14px]">
                          {service.Description}
                        </p>
                      </div>
                      <button
                        onClick={(e) => openPopup(service.ID)}
                        className="bg-white text-[#000] rounded-lg font-montserrat text-[16px] xl:text-[18px] font-semibold px-8 py-4 mt-4"
                      >
                        BOOK NOW
                      </button>
                    </div>
                    {idx < 3 && serviceDataset[idx + 1]?.Name && (
                      <div className="w-full h-px bg-white my-[38px]"></div>
                    )}
                  </div>
                )
            )}
          </div>
          <div
            className="h-px bg-[#A2A2A2] mb-10"
            style={{ width: "100%" }}
          ></div>
        </div>

        {/* Laptop Version (lg) - For screens between 1024px and 1279px */}
        <div className="hidden lg:block xl:hidden relative mt-[12px] mx-auto w-full px-5">
          <h2 className="text-[#2D2D2D] mt-30 font-montserrat font-semibold text-[28px] mb-6">
            Main Offerings
          </h2>

          <div className="rounded-[20px] bg-[#F3D0A1] p-8 mb-12 w-full">
            {serviceDataset.map(
              (service, idx) =>
                service.Name != "" && (
                  <div key={service.ID}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="max-w-3xl">
                        <h3 className="text-[#2D2D2D] font-montserrat text-[20px] font-semibold uppercase">
                          {service.Name}
                        </h3>
                        <p className="text-[#4D4D4D] font-400 font-normal font-montserrat text-[14px] mt-[13px]">
                          {service.Description}
                        </p>
                      </div>
                      <button
                        onClick={(e) => openPopup(service.ID)}
                        className="bg-white text-black rounded-lg font-montserrat text-[14px] font-semibold py-3 px-6 mt-6 flex-shrink-0 hover:bg-gray-100 transition whitespace-nowrap"
                      >
                        BOOK NOW
                      </button>
                    </div>
                    {idx < 3 && serviceDataset[idx + 1]?.Name && (
                      <div className="w-full h-px white my-[35px]"></div>
                    )}
                  </div>
                )
            )}
          </div>
          <div className="h-px w-full bg-[#A2A2A2] mb-10 "></div>
        </div>

        {/* Tablet Version (md) */}
        <div className="hidden md:block lg:hidden w-full mt-[12px] px-8">
          <h2 className="text-[#2D2D2D] font-inter font-semibold text-[24px] mb-6">
            Main Offerings
          </h2>

          <div className="rounded-[12px] bg-[#F3D0A1] p-6 space-y-6 w-full">
            {serviceDataset.map(
              (service, idx) =>
                service.Name != "" && (
                  <div key={service.ID}>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[#2D2D2D] font-montserrat text-[18px] font-semibold uppercase">
                        {service.Name}
                      </h3>
                      <p className="text-[#4D4D4D] font-400 font-normal font-montserrat text-[14px] mt-[12px]">
                        {service.Description}
                      </p>
                      <button
                        onClick={(e) => openPopup(service.ID)}
                        className="bg-white text-[#000] rounded-lg text-sm font-semibold px-8 py-2 w-max hover:bg-gray-100 transition"
                      >
                        BOOK NOW
                      </button>
                    </div>
                    {idx < 3 && serviceDataset[idx + 1]?.Name && (
                      <div className="h-px bg-white my-[30px]"></div>
                    )}
                  </div>
                )
            )}
          </div>
          <div className="h-px bg-[#A2A2A2] mt-8"></div>
        </div>

        {/* Mobile Version */}
        <div className="block md:hidden w-full px-2">
          <h2 className="text-[#2D2D2D] font-inter font-semibold text-[20px] mb-4">
            Main Offerings
          </h2>
          <div className="bg-[#F3D0A1] rounded-lg p-4 space-y-4 w-full h-auto">
            {serviceDataset.map(
              (service, idx) =>
                service.Name != "" && (
                  <div key={service.ID} className="flex flex-col gap-2">
                    <h3 className="text-[#2D2D2D] mx-2 font-montserrat text-[16px] font-semibold mt-[29px]">
                      {service.Name}
                    </h3>
                    <p className="text-[#2D2D2D] font-400 mx-2 font-montserrat text-[12px] mt-2">
                      {service.Description}
                    </p>
                    <button
                      onClick={(e) => openPopup(service.ID)}
                      className="bg-white text-[#000] rounded-[10px] text-[14px] font-semibold px-[30px] py-2 mt-2 w-max hover:bg-gray-100 transition mb-[29px]"
                    >
                      BOOK NOW
                    </button>
                    {idx < 3 && serviceDataset[idx + 1]?.Name && (
                      <div className="h-px my-2 bg-white"></div>
                    )}
                  </div>
                )
            )}
          </div>
          <div className="w-screen -ml-6 h-px bg-[#A2A2A2] mt-6"></div>
        </div>
        
        <AboutBusinessSection
          desc={dataSet.Description}
          providerID={dataSet.ID}
        />
      </div>

      {/* PartnerSection with full width but maintaining its internal structure */}
      <div className="w-full bg-[#fbfbfb]">
        <div className="max-w-[1450px] mx-auto">
          <PartnerSection />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;