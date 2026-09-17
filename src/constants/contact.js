// Company contact details — single source of truth.
export const PHONE_DISPLAY = "+91-9818257300";
export const PHONE_E164 = "+919818257300";
export const WHATSAPP_NUMBER = "919818257300"; // wa.me format: no +, no spaces
export const EMAIL = "connect@morselv.com";

/**
 * Builds a wa.me link with a pre-filled message.
 * Used by the floating button, the contact page and every package CTA.
 */
export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const WHATSAPP_MESSAGES = {
  general:
    "Hi Morselv! I'm looking to book a service. Could you please help me?",
  support:
    "Hi Morselv Team, I need some help with my enquiry on the Morselv website.",
  listBusiness:
    "Hi Morselv Team, I'm interested in listing my business on Morselv. Please share the registration process and available listing plans.",
  packageEnquiry: (packageName) =>
    `Hi Morselv Team, I'm interested in the ${packageName} package. Could you please share the details and next steps?`,
  bespoke:
    "Hi Morselv Team, I'd like to discuss a custom Bespoke Design package for my brand. Could we set up a consultation?",
};
