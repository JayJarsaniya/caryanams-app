'use client';

import Image from 'next/image';
import React from 'react';

const steps = [
  {
    title: 'Get an Instant Estimate',
    description:
      'Enter your car’s details on our platform and receive an approximate price instantly, based on market trends.',
    image: '/2.png', // Add this to your public folder
  },
  {
    title: 'Expert Evaluation',
    description:
      'A professional evaluator will inspect your car at your location for free, providing a detailed report on its condition.',
    image: '/1.png', // Add this to your public folder
  },
  {
    title: 'Auction or Marketplace Sale',
    description:
      'Your car will be listed in our dealer auction, where thousands of car dealers will bid for the best price. If not sold, your car will be listed on our marketplace for direct buyers.',
    image: '/3.png', // Add this to your public folder
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-0 pb-9 ">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-12">
          How it works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-28 h-28 relative mb-6">
                <Image
                  src={step.image}
                  alt={step.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
