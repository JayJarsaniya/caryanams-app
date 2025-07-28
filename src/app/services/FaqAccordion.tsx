'use client';

import React, { useState } from 'react';

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: 'If I Opt For CarYanams Service History, Will I Get A Record Of All The Services That I Have Opted For In The Past?',
    answer: '',
  },
  {
    question: 'What Information Does The Car Service History Include?',
    answer:
      'The Car Service History includes a comprehensive record of all maintenance and repair work performed on your car, including service dates, types of service, odometer readings, details on parts replaced, and any accidents or damages related to the vehicle.',
  },
  {
    question: "Is My Car's Service History Shared With Any Third Parties?",
    answer: '',
  },
  {
    question: 'How Far Back Does The Service History Record Go?',
    answer: '',
  },
];

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1); // Default open second FAQ

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-0 pb-9">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked questions</h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="w-full flex justify-between items-center py-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                <span className="text-lg text-gray-500">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              {activeIndex === index && faq.answer && (
                <div className="pb-4 text-sm text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
