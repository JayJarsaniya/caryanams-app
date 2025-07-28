'use client';

import React, { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: '1. How do I get an estimate for my car?',
    answer: 'Visit our platform, enter your car’s details, and receive an approximate price instantly.',
  },
  {
    question: '2. Is the car inspection free?',
    answer: 'Yes, our professional inspection is completely free of charge.',
  },
  {
    question: '3. How long does the auction process take?',
    answer: 'Typically, the auction process takes 1-3 days depending on demand.',
  },
  {
    question: '4. What happens if my car doesn’t sell at auction?',
    answer: 'It will be listed on our marketplace for direct buyers.',
  },
  {
    question: '5. Can I sell my car without participating in the auction?',
    answer: 'Yes, you can opt for direct listing instead of the auction route.',
  },
  {
    question: '6. Do I need to pay any fees to list my car?',
    answer: 'No fees are required to list your vehicle on our platform.',
  },
  {
    question: '7. How do I schedule a car inspection?',
    answer: 'Simply fill out the booking form on our platform and select a time slot.',
  },
  {
    question: '8. Who handles the paperwork after the sale?',
    answer: 'Our team will take care of all documentation and legal processes.',
  },
  {
    question: '9. Is my car guaranteed to sell?',
    answer: 'While we ensure maximum visibility, a sale cannot be 100% guaranteed.',
  },
   {
    question: '10. How Soon Do I Get Paid after the sell?',
    answer: 'Payment is typically processed within 48 hours of the sale being completed.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-greay px-4 py-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 inline-block">Caryanams Faq’s</h2>
      <div className="space-y-2">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center w-full py-4 text-left text-gray-800 font-medium hover:text-purple-700"
            >
              <span className="text-sm md:text-base">{item.question}</span>
              <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="bg-gray-50 p-4 text-sm text-gray-600">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
