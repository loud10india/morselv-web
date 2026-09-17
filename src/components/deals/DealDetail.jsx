import React from "react";
import HeaderSection from "./HeaderSection";
import PartnerSection from "../home/PartnerSection";
import Seo from "../utils/Seo";

const DealDetail = () => {
  return (
    <div className="pt-20 flex min-h-[100%]  flex-col">
      <Seo
        title="Deal Details"
        description="View full details of this Morselv deal — what is included, the provider offering it, and how to enquire."
      />
      <HeaderSection />
      <div className="mb-20">
        <PartnerSection />
      </div>
    </div>
  );
};

export default DealDetail;
