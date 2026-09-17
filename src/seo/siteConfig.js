// Single source of truth for site-wide SEO values.
// Override the origin per environment with VITE_SITE_URL.
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://www.morselv.com"
).replace(/\/$/, "");

export const SITE_NAME = "Morselv";

export const DEFAULT_TITLE =
  "Morselv | India's Women-Centric Marketplace for Wellness, Beauty & Lifestyle";

export const DEFAULT_DESCRIPTION =
  "Discover trusted salons, spas, clinics, fitness studios and lifestyle experts near you. Compare verified providers, book services and unlock exclusive deals on Morselv.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const TWITTER_HANDLE = "@morselv";

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const ORGANIZATION = {
  legalName: "Femtech Sphere Tech Pvt. Ltd.",
  telephone: "+91-9818257300",
  email: "connect@morselv.com",
  address: {
    streetAddress:
      "422, 4th Floor, Tower A, Suncity Success Tower, Golf Course Extension Road, Sector 65",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122005",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100066464515801",
    "https://www.instagram.com/mor.selv/",
    "https://www.linkedin.com/company/mor-selv/home/",
  ],
};

// Organization + WebSite schema, emitted once from the home page.
export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: ORGANIZATION.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      email: ORGANIZATION.email,
      telephone: ORGANIZATION.telephone,
      address: { "@type": "PostalAddress", ...ORGANIZATION.address },
      sameAs: ORGANIZATION.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/service?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
});

// Breadcrumbs: pass [{ name, path }] ordered root -> current.
export const breadcrumbSchema = (crumbs = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const faqSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

// Provider detail pages. Fields map to the get_provider_details result set.
export const localBusinessSchema = (provider = {}, path = "/") => {
  if (!provider?.Name) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.Name,
    description: provider.Description || undefined,
    address: provider.FullAddress
      ? { "@type": "PostalAddress", streetAddress: provider.FullAddress }
      : undefined,
    image: provider.imageURL || undefined,
    url: absoluteUrl(path),
    additionalType: provider.Category || undefined,
  };
};
