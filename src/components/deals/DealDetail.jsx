import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HeaderSection from "./HeaderSection";
import PartnerSection from "../home/PartnerSection";
import Seo from "../utils/Seo";
import Breadcrumbs from "../utils/Breadcrumbs";
import deals from "../../api/deals";
import { dealMeta } from "../../seo/siteConfig";

const DealDetail = () => {
  const { dealID } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!dealID) return undefined;
    let active = true;
    setStatus("loading");
    deals
      .getDealDetails({ dealID })
      .then((res) => {
        if (!active) return;
        // An unknown or withdrawn deal comes back as an empty result set;
        // rendering it anyway meant reading fields off undefined.
        const row = Array.isArray(res?.data) ? res.data[0] : undefined;
        if (!row) {
          setStatus("missing");
          return;
        }
        setDeal(row);
        setStatus("ready");
      })
      .catch(() => active && setStatus("missing"));
    return () => {
      active = false;
    };
  }, [dealID]);

  // Title, description, canonical path and breadcrumbs — the same code the
  // build-time pre-render uses.
  const meta = useMemo(
    () => (status === "ready" ? dealMeta(deal, dealID) : null),
    [status, deal, dealID]
  );

  // One URL per deal: any other slug, letter case or trailing slash
  // redirects to the canonical path.
  useEffect(() => {
    if (meta && pathname !== meta.path) navigate(meta.path, { replace: true });
  }, [meta, pathname, navigate]);

  if (status === "loading") {
    return (
      <div className="pt-20 min-h-screen" aria-busy="true">
        <Seo title="Deal" />
      </div>
    );
  }

  if (status === "missing") {
    return (
      <div className="pt-20 flex min-h-[100%] flex-col">
        <Seo
          title="Deal not available"
          description="This Morselv deal has ended or is no longer available."
          noindex
        />
        <div className="max-w-[720px] mx-auto px-4 py-20 text-center">
          <h1 className="text-[#2D2D2D] font-montserrat font-semibold text-[26px] sm:text-[32px]">
            This deal is no longer available
          </h1>
          <p className="text-[#4D4D4D] font-montserrat text-[14px] sm:text-[16px] mt-4">
            It may have ended, or the provider may have withdrawn it.
          </p>
          <Link
            to="/deals"
            className="inline-block mt-8 rounded-[10px] bg-[#2D2D2D] text-white font-montserrat font-semibold text-[14px] px-8 py-3 hover:opacity-90 transition"
          >
            See current deals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 flex min-h-[100%]  flex-col">
      {meta ? <Seo {...meta} /> : <Seo title="Deal" />}
      <HeaderSection
        dataSet={deal || {}}
        dealID={dealID}
        providerHref={meta?.providerPath}
        breadcrumbs={
          meta && (
            <div className="w-full max-w-[1280px] px-4 xl:px-0 mt-4 mb-5 md:mb-0">
              <Breadcrumbs items={meta.crumbs} />
            </div>
          )
        }
      />
      <div className="mb-20">
        <PartnerSection />
      </div>
    </div>
  );
};

export default DealDetail;
