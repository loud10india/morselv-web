import React, { useState } from "react";

const faqs = [
  {
    question:
      "bs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.What makes Fresha the leading platform for businesses in beauty and wellness?",
    answer:
      "Driftwood algorithms hum quietly under neon skylines, while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.Fresha offers a complete booking, payment, and marketing solution tailored for salons, spas, and wellness professionals. It combines powerful tools with a global marketplace to attract new clients.",
  },
  {
    question:
      "Driftwood algorithmsubway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.",
    answer:
      "Driftwood algorithms hum quietly under neon skylines, while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.ions with automated scheduling, reminders, and payments.",
  },
  {
    question:
      "Drift platform. Meanwhile, your coffee forgets its own name and still tastes heroic.Are there any hidden costs?",
    answer:
      "Driftwood algorithms hum quietly under neon skylines, while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.No. Fresha is transparent with its pricing. You only pay when you make sales via online bookings or card payments.",
  },
  {
    question:
      "Driftwood algorithms hum quietly under neon. Meanwhile, your coffee forgets its own name and still tastes heroic.Is there a minimum commitment or contract?",
    answer:
      "lorem Driftwood algorithms hum quietly under neon skylines, while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.No minimum commitment is required. You can use Fresha for as long as you like without being tied to a contract.",
  },
  {
    question:
      ", while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.Is there a minimum commitment or contract?",
    answer:
      "lorem Driftwood algorithms hum quietly under neon skylines, while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.No minimum commitment is required. You can use Fresha for as long as you like without being tied to a contract.",
  },
  {
    question:
      "r coffee forgets its own name and still tastes heroic.Is there a minimum commitment or contract?",
    answer:
      "lorem Driftwood algorithms hum quietly under neon skylines, while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.No minimum commitment is required. You can use Fresha for as long as you like without being tied to a contract.",
  },
  {
    question:
      "Driftwood algorithms hum quietly under neon skylines, while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.Is there a minimum commitment or contract?",
    answer:
      "lorem Driftwood algorithms hum quietly under neon skylines, while pigeons debate quantum crumbs on the subway platform. Meanwhile, your coffee forgets its own name and still tastes heroic.No minimum commitment is required. You can use Fresha for as long as you like without being tied to a contract.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="xl:pt-20 lg:pt-20 md:pt-10 pt-10 flex flex-col h-auto">
      <div
        className="w-full flex flex-col items-center justify-center text-center px-4 py-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(254, 205, 140, 0.40) 0%, rgba(163, 163, 163, 0.00) 100%)",
        }}
      >
      <main className="flex-grow max-w-3xl mx-auto p-6 pt-70">
        <h2 className="xl:text-5xl text-3xl font-semibold text-center text-[#000] mb-8">
          Frequently asked questions
        </h2>
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