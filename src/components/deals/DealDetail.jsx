import React from "react";
import HeaderSection from "./HeaderSection";
import PartnerSection from "../home/PartnerSection";

const DealDetail = () => {
  return (
    <div className="pt-20 flex min-h-[100%]  flex-col">
      <HeaderSection />
      <div className="mb-20">
        <PartnerSection />
      </div>
    </div>
  );
};

export default DealDetail;
