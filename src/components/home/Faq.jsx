import React, { useState } from "react";
import Seo from "../utils/Seo";
import { FAQS as faqs } from "../../content/faqs";
import { staticPageMeta } from "../../seo/siteConfig";


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="xl:pt-20 lg:pt-20 md:pt-10 pt-10 flex flex-col h-auto">
      <Seo {...staticPageMeta("/faq")} />
      <div
        className="w-full flex flex-col items-center justify-center text-center px-4 py-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(254, 205, 140, 0.40) 0%, rgba(163, 163, 163, 0.00) 100%)",
        }}
      >
      <section className="flex-grow max-w-3xl mx-auto p-6 pt-70">
        <h1 className="xl:text-5xl text-3xl font-semibold text-center text-[#000] mb-8">
          Frequently asked questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-sm">
              <h2>
                <button
                  type="button"
                  id={`faq-q-${index}`}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold font-montserrat text-[#5D5D5D] text-[20px] focus:outline-none"
                >
                  {faq.question}
                  <span className="text-2xl" aria-hidden="true">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
              </h2>
              {/* Rendered for every question and hidden until opened, so the
                  answers the FAQPage markup lists are in the page. */}
              <div
                id={`faq-a-${index}`}
                role="region"
                aria-labelledby={`faq-q-${index}`}
                hidden={openIndex !== index}
                className="p-4 pt-0 text-[16px] text-[#5D5D5D] text-montserrat"
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}