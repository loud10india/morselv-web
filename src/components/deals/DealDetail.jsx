import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HeaderSection from "./HeaderSection";
import PartnerSection from "../home/PartnerSection";
import Seo from "../utils/Seo";
import { prerenderedHtml } from "../../utils/prerendered";
import Breadcrumbs from "../utils/Breadcrumbs";
import deals from "../../api/deals";
import { dealMeta } from "../../seo/siteConfig";

const DealDetail = () => {
  const { dealID } = useParams();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  // loading | ready | missing (the API confirmed there is no such deal) |
  // error (the request failed; nothing is known about the deal).
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

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
      // A failed request says nothing about whether the deal exists; treating
      // it as "missing" marked live pages noindex whenever the API faltered.
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [dealID, attempt]);

  // Title, description, canonical path and breadcrumbs — the same code the
  // build-time pre-render uses.
  const meta = useMemo(
    () => (status === "ready" ? dealMeta(deal, dealID) : null),
    [status, deal, dealID]
  );

  // One URL per deal: any other slug, letter case or trailing slash
  // redirects to the canonical path.
  useEffect(() => {
    // Keep the query string and hash: campaign parameters must survive.
    if (meta && pathname !== meta.path) navigate(meta.path + search + hash, { replace: true });
  }, [meta, pathname, search, hash, navigate]);

  // No <Seo> while loading or after a failed request: the pre-rendered HTML
  // already carries this deal's title, canonical and structured data, and a
  // placeholder would replace them with generic values.
  if (status === "loading") {
    return <div className="pt-20 min-h-screen" aria-busy="true" />;
  }

  if (status === "error") {
    // The request failed, so keep showing what the pre-rendered page said
    // about this deal (its heading, details and links) under a retry notice.
    const copy = prerenderedHtml(pathname);
    return (
      <div className="pt-20 flex min-h-[100%] flex-col">
        <div
          role="alert"
          className="mx-auto mt-4 w-full max-w-[1280px] px-4 flex flex-wrap items-center justify-between gap-3 rounded-[10px] bg-[#FFF6E5] py-3 text-[#2D2D2D] font-montserrat text-[14px]"
        >
          <span>We couldn&apos;t load the latest details for this deal. Please check your connection.</span>
          <button
            type="button"
            onClick={() => setAttempt((n) => n + 1)}
            className="rounded-[8px] bg-[#2D2D2D] text-white font-semibold px-5 py-2 hover:opacity-90 transition"
          >
            Try again
          </button>
        </div>
        {copy && <div className="prerendered-copy" dangerouslySetInnerHTML={{ __html: copy }} />}
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
      {meta && <Seo {...meta} />}
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
