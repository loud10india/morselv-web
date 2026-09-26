import React from "react";
import { Link } from "react-router-dom";

/**
 * Crawlable breadcrumb trail. `items` are [{ name, path }] from the home page
 * to the current page — the same list the page's BreadcrumbList schema is
 * built from, so the visible trail and the structured data agree.
 */
function Breadcrumbs({ items = [], className = "" }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="no-scrollbar flex items-center gap-x-1.5 overflow-x-auto whitespace-nowrap font-montserrat text-[12px] sm:text-[13px] leading-5 text-[#6B6B6B]">
        {items.map((crumb, i) => {
          const last = i === items.length - 1;
          return (
            <li key={crumb.path} className="flex shrink-0 items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-[#A2A2A2]">
                  ›
                </span>
              )}
              {last ? (
                <span
                  aria-current="page"
                  className="text-[#2D2D2D] font-medium"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="whitespace-nowrap hover:text-[#DE9636] hover:underline underline-offset-2"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
