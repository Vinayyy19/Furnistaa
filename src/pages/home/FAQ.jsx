import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openKey, setOpenKey] = useState(null);

  const questions = [
    {
      key: 1,
      questions: "What types of furniture do you offer?",
      ans: "We offer sofas, beds, dining tables, wardrobes, TV units, office furniture, and home décor items.",
    },
    {
      key: 2,
      questions: "Do you deliver across India?",
      ans: "Yes, we deliver to most major cities and towns across India. Availability depends on your pin code.",
    },
    {
      key: 3,
      questions: "Is Cash on Delivery (COD) available?",
      ans: "COD is available for select products and locations. This option will be shown at checkout.",
    },
    {
      key: 4,
      questions: "How long does delivery take?",
      ans: "Delivery typically takes 5–15 business days depending on your location and product type.",
    },
    {
      key: 5,
      questions: "Is installation included?",
      ans: "Yes, installation is provided for eligible products and is handled by trained professionals.",
    },
    {
      key: 6,
      questions: "What materials are used in your furniture?",
      ans: "Our furniture is crafted using solid wood, engineered wood, metal, and high-quality upholstery.",
    },
    {
      key: 7,
      questions: "Do you provide warranty on furniture?",
      ans: "Yes, most products come with a manufacturer warranty ranging from 6 months to 1 year.",
    },
    {
      key: 8,
      questions: "Are EMI options available?",
      ans: "Yes, EMI options are available through selected banks and payment partners.",
    },
    {
      key: 9,
      questions: "What is your return or replacement policy?",
      ans: "We offer easy returns or replacements for damaged or defective items as per our policy.",
    },
    {
      key: 10,
      questions: "How can I contact customer support?",
      ans: "You can reach us via phone, email, or the support section on our website.",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-neutral-50">
          Frequently asked Questions
        </h1>
        <p className="mt-2 text-neutral-300">
          Answers to questions customers have already asked us
        </p>
      </div>

      <div className="max-w-6xl mx-auto rounded-2xl border border-neutral-200 overflow-hidden">
        {questions.map((item, index) => {
          const isOpen = openKey === item.key;
          return (
            <div
              key={item.key}
              className={`px-6 py-5 ${
                index !== questions.length - 1
                  ? "border-b border-neutral-200"
                  : ""
              }`}
            >
              <button
                onClick={() => setOpenKey(isOpen ? null : item.key)}
                className="w-full flex justify-between items-center text-left cursor-pointer"
              >
                <span className="text-base font-medium text-white">
                  {item.questions}
                </span>

                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <p className="mt-4 text-sm text-white leading-relaxed">
                  {item.ans}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
