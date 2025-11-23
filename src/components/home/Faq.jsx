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
    <div className="pt-20 flex flex-col h-auto">

      <main className="flex-grow max-w-3xl mx-auto p-6 pt-70">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-lg focus:outline-none"
              >
                {faq.question}
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}