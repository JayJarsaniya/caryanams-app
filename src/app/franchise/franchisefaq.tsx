'use client';
import React, { useState } from 'react';

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What is the initial investment required to become a Caryanams franchisee?",
    answer:
      "The initial investment varies based on the location and market size, but it typically includes a franchise fee, setup costs for the office and technology, and initial working capital. Please contact us for specific details.",
  },
  {
    question: "What kind of training and support does Caryanams provide?",
    answer:
      "Caryanams provides onboarding training, ongoing support, and access to sales, marketing, and technical resources.",
  },
  {
    question: "Do I need prior experience in the automotive industry to become a franchisee?",
    answer:
      "No prior experience is necessary. Caryanams offers complete training and ongoing assistance.",
  },
  {
    question: "What is the duration of the franchise agreement?",
    answer:
      "The franchise agreement is typically valid for a period of 5 years with renewal options.",
  },
  {
    question: "How does Caryanams help with marketing and lead generation?",
    answer:
      "Caryanams runs national marketing campaigns and also supports local lead generation efforts.",
  },
  {
    question: "What are the ongoing fees associated with the franchise?",
    answer:
      "There is a regular royalty fee based on monthly revenue, along with optional technology and support subscriptions.",
  },
  {
    question: "Can I own multiple Caryanams franchises?",
    answer:
      "Yes, multi-unit franchise ownership is allowed. You can expand based on your performance and agreement terms.",
  },
  {
    question: "What is the process for selecting a franchise location?",
    answer:
      "Site selection is a collaborative process involving market research and territory analysis to ensure optimal success.",
  },
  {
    question: "What kind of territory protection do franchisees receive?",
    answer:
      "Franchisees receive exclusive territorial rights based on market size and demographics, preventing overlap with others.",
  },
  {
    question: "How soon can I expect to start operations after signing the franchise agreement?",
    answer:
      "Typically, operations can begin within 30–60 days post-agreement, depending on location readiness and training schedules.",
  },
];

const FranchiseFAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
     <h2 className="text-2xl sm:text-3xl font-bold mb-10 border-b-2 border-[#004c97] pb-2">
     <span className="text-[#004c97]">CARYANAMS FRANCHISE</span>{' '}
      <span className="text-[#d2ae42]">FAQS</span>
      </h2>


      <div className="divide-y divide-gray-300">
        {faqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600 transition-all"
            >
              <span className="pr-4">{index + 1}. {faq.question}</span>
              <span className="text-2xl font-light">
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>

            {activeIndex === index && (
              <p className="mt-3 bg-gray-100 text-gray-700 text-sm sm:text-base p-4 rounded-md leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FranchiseFAQ;
