import React from "react";
import { Link } from "react-router-dom";
import Seo from "../utils/Seo";
import { breadcrumbSchema } from "../../seo/siteConfig";
import { whatsappLink, WHATSAPP_MESSAGES } from "../../constants/contact";

// Content transcribed from the Mor-Selv brochure (5-page package deck).
const VALUES = [
  "Strength",
  "Power",
  "Branding",
  "Empowerment",
  "Collaboration",
  "Courage",
];

const TIERS = [
  {
    tier: "Package Tier 01",
    name: "Growing Talent",
    price: "₹15,000",
    cadence: "per month",
    tagline: "Your first step to iconic",
    features: [
      { lead: "Premium profile setup" },
      { lead: "11 Days", rest: "of branding highlights & active deals branding" },
      { lead: "Standard social media", rest: "promotional campaigns" },
      { lead: "15 Days", rest: "homepage banner placement on the Mor-Selv website" },
      { lead: "1 Month branding in deals", rest: "— active exposure across the platform" },
      { lead: "Dedicated space", rest: "on the official Mor-Selv website" },
    ],
  },
  {
    tier: "Package Tier 02",
    name: "Premium Luxury",
    price: "₹25,000",
    cadence: "per month",
    badge: "Most Popular",
    featured: true,
    tagline: "Elevate your complete presence",
    features: [
      { lead: "Premium profile setup" },
      { lead: "30 Days high-impact", rest: "active deals branding" },
      { lead: "Advanced cross-platform", rest: "social media campaigns" },
      { lead: "30 Days main header banner feature", rest: "— dedicated space on the Mor-Selv website" },
      { lead: "30 Days", rest: "of branding highlights" },
      { lead: "2 Month branding in deals", rest: "— active exposure across the platform" },
    ],
  },
  {
    tier: "Package Tier 03",
    name: "Signature Elite",
    price: "₹35,000",
    cadence: "per month",
    badge: "Elite Flagship",
    tagline: "Complete digital presence & executive strategy",
    highlights: [
      { lead: "Free Custom Website", rest: "— responsive, fully branded personal or business portfolio" },
      { lead: "1 Month Business Consultation", rest: "— strategic 1-on-1 guidance from our top industry experts" },
    ],
    features: [
      { lead: "Premium profile setup" },
      { lead: "30 Days high-impact", rest: "active deals branding" },
      { lead: "Advanced cross-platform", rest: "social media campaigns" },
      { lead: "30 Days main header banner feature", rest: "— dedicated space on the Mor-Selv website" },
      { lead: "30 Days", rest: "of branding highlights" },
      { lead: "2 Month branding in deals", rest: "— active exposure across the platform" },
    ],
  },
];

const BESPOKE = [
  {
    title: "Comprehensive Scope",
    body: "Includes everything in the Luxury package, completely customizable to your goals and timelines. Choose your media, your pace, your vision.",
  },
  {
    title: "Adaptive Timeline",
    body: "Flexible strategizing and completely bespoke execution duration — aligned with your unique brand journey and goals.",
  },
  {
    title: "Elite Exposure",
    body: "Full featured homepage placement & elite VIP exposure across all Mor-Selv platforms and partner networks.",
  },
  {
    title: "VIP Management",
    body: "Direct 1-on-1 assistance with a Dedicated Account Manager — your personal brand architect on call.",
  },
];

const Diamond = ({ className = "" }) => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 10 10"
    aria-hidden="true"
    focusable="false"
    className={`mt-[7px] shrink-0 ${className}`}
  >
    <path d="M5 0l5 5-5 5-5-5z" fill="currentColor" />
  </svg>
);

const FeatureItem = ({ item, tone = "dark" }) => (
  <li className="flex gap-3 py-[11px]">
    <Diamond className={tone === "gold" ? "text-[#DE9636]" : "text-[#C9A227]"} />
    <span className="font-montserrat text-[14px] leading-[22px] text-[#3D3D3D]">
      <span className="font-semibold text-[#1A1A1A]">{item.lead}</span>
      {item.rest ? ` ${item.rest}` : ""}
    </span>
  </li>
);

function Packages() {
  return (
    <main className="w-full bg-white">
      <Seo
        title="Packages"
        path="/packages"
        description="Mor-Selv branding packages for businesses — Growing Talent, Premium Luxury and Signature Elite, from ₹15,000/month, plus fully bespoke plans."
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ])}
      />

      {/* ---------------- Hero ---------------- */}
      <section className="relative w-full bg-[#121212] pt-[130px] pb-16 md:pt-[160px] md:pb-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 0%, rgba(254,205,140,0.22) 0%, rgba(18,18,18,0) 70%)",
          }}
        />
        <div className="relative mx-auto w-[90%] max-w-[1100px] text-center">
          <p className="font-montserrat text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.35em] text-[#FECD8C]">
            Mor-Selv — Woman &amp; Beauty
          </p>
          <h1 className="mt-5 font-inter text-[38px] md:text-[62px] font-semibold leading-[1.1] text-white">
            Your journey to an{" "}
            <span className="relative inline-block">
              <span className="relative z-10">iconic legacy</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 z-0 h-[10px] md:h-[14px] bg-[#FECD8C]/70"
              />
            </span>{" "}
            begins here
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] font-montserrat text-[16px] md:text-[18px] leading-[28px] text-[#CFCFCF]">
            A curated elite program designed to elevate talent, perfect branding,
            and amplify your reach. Redefine your presence — and let the world see
            you as you truly are.
          </p>

          <ul className="mx-auto mt-10 flex max-w-[860px] flex-wrap justify-center gap-2.5 list-none p-0">
            {VALUES.map((v) => (
              <li
                key={v}
                className="rounded-full border border-[#FECD8C]/35 px-4 py-2 font-montserrat text-[11px] md:text-[12px] font-medium uppercase tracking-[0.18em] text-[#FECD8C]"
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Tiers ---------------- */}
      <section
        aria-labelledby="tiers-heading"
        className="mx-auto w-[90%] max-w-[1240px] py-16 md:py-24"
      >
        <div className="text-center">
          <h2
            id="tiers-heading"
            className="font-inter text-[30px] md:text-[42px] font-semibold text-[#121212]"
          >
            Choose your package
          </h2>
          <p className="mx-auto mt-3 max-w-[620px] font-montserrat text-[15px] md:text-[16px] leading-[26px] text-[#5D5D5D]">
            Three levels of visibility on India&rsquo;s women-centric marketplace.
            Every plan is billed monthly.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3 list-none p-0 m-0 items-start">
          {TIERS.map((tier) => (
            <li
              key={tier.name}
              className={`relative flex h-full flex-col overflow-hidden rounded-[18px] bg-white transition-shadow ${
                tier.featured
                  ? "border-2 border-[#FECD8C] shadow-[0_10px_40px_rgba(0,0,0,0.12)] lg:-mt-4"
                  : "border border-[#E6E6E6] shadow-[0_3px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
              }`}
            >
              {/* Dark price head, echoing the brochure */}
              <div className="bg-[#121212] px-7 py-9 text-center">
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FECD8C]">
                  {tier.tier}
                </p>
                <h3 className="mt-3 font-inter text-[28px] md:text-[32px] font-semibold text-white">
                  {tier.name}
                </h3>
                <p className="mt-4 font-inter text-[40px] md:text-[46px] font-bold leading-none text-[#FECD8C]">
                  {tier.price}
                </p>
                <p className="mt-2 font-montserrat text-[11px] uppercase tracking-[0.22em] text-[#9A9A9A]">
                  {tier.cadence}
                </p>
                {/* Tiers without a badge still reserve the row so all three
                    dark heads line up across the grid. */}
                {tier.badge ? (
                  <span className="mt-5 inline-block rounded-[4px] border border-[#FECD8C] px-4 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FECD8C]">
                    ★ {tier.badge}
                  </span>
                ) : (
                  <span aria-hidden="true" className="mt-5 inline-block rounded-[4px] border border-transparent px-4 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] opacity-0 select-none">
                    placeholder
                  </span>
                )}
                <p className="mt-5 font-inter text-[15px] italic text-[#E3E3E3]">
                  {tier.tagline}
                </p>
              </div>

              {/* Feature list */}
              <div className="flex flex-grow flex-col px-7 py-7">
                {tier.highlights && (
                  <ul className="mb-5 list-none p-0 m-0 rounded-[12px] bg-[#FFF8EC] px-4 py-2 ring-1 ring-[#FECD8C]/50">
                    {tier.highlights.map((h) => (
                      <li
                        key={h.lead}
                        className="flex gap-3 border-b border-[#FECD8C]/30 py-3 last:border-b-0"
                      >
                        <span aria-hidden="true" className="mt-[2px] text-[#DE9636]">
                          ★
                        </span>
                        <span className="font-montserrat text-[14px] leading-[22px] text-[#3D3D3D]">
                          <span className="font-semibold text-[#1A1A1A]">
                            {h.lead}
                          </span>
                          {h.rest ? ` ${h.rest}` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#DE9636]">
                  What&rsquo;s included
                </p>
                <ul className="mt-2 divide-y divide-[#F0F0F0] list-none p-0 m-0 flex-grow">
                  {tier.features.map((f) => (
                    <FeatureItem key={f.lead + (f.rest || "")} item={f} />
                  ))}
                </ul>

                <a
                  href={whatsappLink(WHATSAPP_MESSAGES.packageEnquiry(tier.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  className={`mt-7 inline-flex h-[54px] items-center justify-center rounded-[10px] px-8 font-montserrat text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    tier.featured
                      ? "bg-[#DE9636] text-white hover:bg-[#c9832c]"
                      : "bg-[#121212] text-white hover:bg-[#333]"
                  }`}
                >
                  Choose this plan
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Bespoke ---------------- */}
      <section
        aria-labelledby="bespoke-heading"
        className="w-full bg-[#121212] py-16 md:py-24"
      >
        <div className="mx-auto w-[90%] max-w-[1100px]">
          <div className="text-center">
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FECD8C]">
              Tailored for you | Custom branding blueprint
            </p>
            <h2
              id="bespoke-heading"
              className="mt-4 font-inter text-[32px] md:text-[48px] font-semibold text-white"
            >
              Bespoke Design
            </h2>
            <p className="mx-auto mt-5 max-w-[820px] font-montserrat text-[15px] md:text-[17px] leading-[28px] text-[#CFCFCF]">
              For individuals and legacy brands seeking a completely customizable
              strategy. Handpick the precise media, duration, and representation
              scope you require. Your vision — executed with the precision of an
              elite team.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 list-none p-0 m-0">
            {BESPOKE.map((b) => (
              <li
                key={b.title}
                className="rounded-[14px] border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="font-montserrat text-[13px] font-semibold uppercase tracking-[0.18em] text-[#FECD8C]">
                  {b.title}
                </h3>
                <p className="mt-3 font-montserrat text-[14px] leading-[24px] text-[#CFCFCF]">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 text-center">
            <p className="font-inter text-[22px] md:text-[28px] font-semibold text-white">
              Are you ready to build your legacy?
            </p>
            <p className="mx-auto mt-3 max-w-[640px] font-montserrat text-[15px] leading-[25px] text-[#ADADAD]">
              Contact us today to construct your custom blueprint and begin your
              journey to iconic.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(WHATSAPP_MESSAGES.bespoke)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                className="inline-flex h-[56px] items-center justify-center gap-2 rounded-[10px] bg-[#FECD8C] px-9 font-montserrat text-[13px] font-semibold uppercase tracking-[0.16em] text-[#121212] transition-colors hover:bg-[#f0bd78]"
              >
                Contact us on WhatsApp
              </a>
              <Link
                to="/ListYourBusiness"
                style={{ textDecoration: "none" }}
                className="inline-flex h-[56px] items-center justify-center rounded-[10px] border border-white/30 px-9 font-montserrat text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
              >
                Send an enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Packages;
