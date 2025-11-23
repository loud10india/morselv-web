import React, { useEffect, useRef } from "react";
import Home from "./Home";
import SecondSection from "./SecondSection";
import PartnerSection from "./PartnerSection";
import Service from "./Service";
import Deals from "./Deals";
import Popular from "./Popular";
import { useLoc } from "../context/LocationContext";
import HomeError from "./HomeError";
import NotServicable from "./NotServicable";

function HomePage() {
  const homeRef = useRef(null);
  const dealsRef = useRef(null);
  const serviceRef = useRef(null);
  const contactRef = useRef(null);
  const { location, noservice } = useLoc();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      let targetRef;
      switch (hash) {
        case "#Deals":
          targetRef = dealsRef;
          break;
        case "#Service":
          targetRef = serviceRef;
          break;
        case "#Contact":
          targetRef = contactRef;
          break;
        default:
          targetRef = homeRef;
      }
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="w-full">
      <div ref={homeRef}>
        <Home />
      </div>
      <>
        <div>
          <SecondSection />
        </div>
        <div className="bg-[#fbfbfb]">
          <PartnerSection />
        </div>
        <div ref={dealsRef}>
          <Deals />
        </div>
        <div ref={serviceRef}>
          <Service />
        </div>
      </>

      <div>
        <Popular />
      </div>
    </div>
  );
}
export default HomePage;
