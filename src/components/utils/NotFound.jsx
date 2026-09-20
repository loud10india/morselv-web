import React from "react";
import { Link } from "react-router-dom";
import Seo from "./Seo";

/**
 * Catch-all for unmatched routes.
 *
 * Without this, an unknown path matched no route at all — not even the layout —
 * so the browser rendered a completely blank page with a 200 status. Stale
 * links and typos now get a real page, and crawlers get noindex.
 */
const NotFound = () => (
  <div className="flex mx-auto flex-col w-full">
    <Seo
      title="Page not found"
      description="The page you are looking for is not available on Morselv."
      noindex
    />
    <div className="max-w-[720px] mx-auto px-4 py-20 text-center">
      <p className="font-montserrat font-semibold text-[#DE9636] text-[14px] tracking-[0.12em] uppercase">
        Error 404
      </p>
      <h1 className="text-[#2D2D2D] font-montserrat font-semibold text-[26px] sm:text-[34px] mt-3">
        We couldn&apos;t find that page
      </h1>
      <p className="text-[#4D4D4D] font-montserrat text-[14px] sm:text-[16px] mt-4">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <Link
          to="/"
          className="rounded-[10px] bg-[#2D2D2D] text-white font-montserrat font-semibold text-[14px] px-8 py-3 hover:opacity-90 transition"
        >
          Go to home
        </Link>
        <Link
          to="/service"
          className="rounded-[10px] border border-[#2D2D2D] text-[#2D2D2D] font-montserrat font-semibold text-[14px] px-8 py-3 hover:bg-[#2D2D2D] hover:text-white transition"
        >
          Browse services
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
