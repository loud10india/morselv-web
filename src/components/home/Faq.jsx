import React, { useState } from "react";
import Seo from "../utils/Seo";
import { breadcrumbSchema, faqSchema } from "../../seo/siteConfig";

const faqs = [
  {
    question: "What is Morselv?",
    answer:
      "It is an online platform to discover, compare, and book appointments at local beauty salons, spas, and wellness centers.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Search for a service like salon, Spa, Yoga or any other services on the platform, raise an inquiry with convenient date and time slot, and our executive will confirm you the required details.",
  },
  {
    question: "Are there extra fees for booking through Morselv?",
    answer:
      "No. The prices listed are set directly by the salon partners, and Morselv does not charge hidden convenience fees.",
  },
  {
    question: "How do I pay for my service?",
    answer:
      "You can pay securely online via UPI, debit/credit cards, or net banking. Some partners also allow a \"Pay at Venue\" option.",
  },
  {
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes, you can manage or cancel your appointment directly through the MorSelv Partners confirmation.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations must be made within the Morselv Partner’s specified time window (usually a few hours before the slot) to avoid penalties.",
  },
  {
    question: "How do refunds work?",
    answer:
      "Eligible cancellation refunds are automatically processed back to your original payment method within 5 to 7 business days.",
  },
  {
    question: "How can businesses join Morselv?",
    answer:
      "Women entrepreneurs or business owners can register their business on the platform to access scheduling tools and local marketing.",
  },
  {
    question: "Are business partners locked into long-term contracts?",
    answer:
      "No, partnerships are flexible and designed to scale according to their required business operational needs without rigid lock-ins.",
  },
  {
    question: "How do I contact support?",
    answer:
      "For immediate help with a booking, you can email connect@morselv.com or call +91-9818257300.",
  },
  {
    question: "Can I choose a specific or any service on Morselv platform?",
    answer: "Yes, you can choose any Partners who are listed on Morselv.",
  },
  {
    question: "Can I book an appointment for someone else?",
    answer:
      "Yes, just enter the correct person's name and contact number when completing the booking details.",
  },
  {
    question: "How far in advance can I book?",
    answer:
      "Most salon partners allow you to book appointments anywhere from a few hours up to 7 days in advance.",
  },
  {
    question: "What should I do if a Morselv partners refuses my booking?",
    answer:
      "Contact Morselv support immediately at connect@morselv.com so they can rebook you or issue an instant refund.",
  },
  {
    question: "Does Morselv offer home services for Salon, Spa or any other services?",
    answer:
      "Currently, the platform focuses strictly on bookings at physical outlets some of the like salon, yoga or counselling can be availed for home services or online.",
  },
  {
    question: "Is my personal and payment data safe?",
    answer:
      "Yes, Morselv uses secure, industry-standard encrypted gateways to ensure your transaction and account data stay safe.",
  },
  {
    question: "Are the prices on the app identical to the offline menu prices at the salon?",
    answer: "Yes",
  },
  {
    question: "Can I pay in cash directly at the venue after booking online?",
    answer: "Yes",
  },
  {
    question: "Who do I contact if the partner establishment does not honor the discount shown on the site?",
    answer: "Contact Morselv support immediately at connect@morselv.com with all the details.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="xl:pt-20 lg:pt-20 md:pt-10 pt-10 flex flex-col h-auto">
      <Seo
        title="FAQs"
        path="/faq"
        description="Answers to common questions about booking services, payments, cancellations, refunds and listing your business on Morselv."
        schema={faqSchema(faqs)}
      />
      <div
        className="w-full flex flex-col items-center justify-center text-center px-4 py-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(254, 205, 140, 0.40) 0%, rgba(163, 163, 163, 0.00) 100%)",
        }}
      >
      <main className="flex-grow max-w-3xl mx-auto p-6 pt-70">
        <h1 className="xl:text-5xl text-3xl font-semibold text-center text-[#000] mb-8">
          Frequently asked questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold font-montserrat text-[#5D5D5D] text-[20px] focus:outline-none"
              >
                {faq.question}
                <span className="text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-[16px] text-[#5D5D5D] text-montserrat">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </main>
      </div>
    </div>
  );
}