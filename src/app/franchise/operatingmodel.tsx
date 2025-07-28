// components/OperatingModel.tsx
'use client';

import React from 'react';
import Image from 'next/image'; // Recommended for performance

// Define the type for a single feature object
type Feature = {
  title: string;
  icon: string; // Path to the SVG icon
  description: string;
};

// Array of feature objects
const features: Feature[] = [
  {
    title: 'DEALER NETWORK',
    icon: '/logo1.svg', // Ensure this path is relative to the 'public' directory
    description:
      'Franchises undergo a comprehensive onboarding process, including training sessions covering operational procedures, sales techniques, and customer service protocols.',
  },
  {
    title: 'RETURN ON INVESTMENT', // Corrected from 'RETURN OF INTEREST' for better clarity
    icon: '/logo2.svg',
    description:
      'Gain access to our established platform, which connects you with car dealers and buyers, providing a robust network to grow your business.',
  },
  {
    title: 'PROFIT POTENTIAL', // More descriptive than 'PROFIT'
    icon: '/logo3.svg',
    description:
      'Tap into a steady stream of inquiries from users looking to buy or sell cars, giving you a consistent flow of business opportunities.',
  },
  {
    title: 'DIVERSE INCOME STREAM', // More descriptive than 'INCOME STREAM'
    icon: '/logo4.svg',
    description:
      'Utilize our proprietary software for accurate and efficient car evaluations, ensuring fair pricing and transparency for buyers.',
  },
  {
    title: 'MARKET EXPANSION', // More descriptive than 'MARKET GROWTH'
    icon: '/logo5.svg',
    description:
      'Covering the market of C2B and B2B with exclusive insurance and finance on used and new cars. Includes certification and warranty platform targeting expansion in 100 cities by 2025.',
  },
  {
    title: 'NEW CAR MARKETPLACE', // More descriptive than 'NEW CAR MARKET'
    icon: '/logo6.svg',
    description:
      'Reach a broader audience of potential buyers through our online marketplace for new cars, also providing trusted dealership connections.',
  },
];

const OperatingModel = () => {
  return (
    // Section for semantic grouping and background styling
    <section className="py-16 bg-gray-100">
      {/* Max width container for consistent layout and horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title, left-aligned by default, responsive font size */}
       <h2 className="text-3xl sm:text-4xl font-bold text-left mb-10 sm:mb-14">
       <span className="text-[#004c97]">Operating</span>{' '}
       <span className="text-[#d2ae42]">Model</span>
       </h2>


        {/* Grid for features, responsive column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            // Individual feature card
            <div
              key={idx} // Using index as key, consider a unique ID if features are reordered or added/removed
              className="bg-white p-6 rounded-xl shadow-md text-center
                         transition-transform duration-300 hover:scale-105 hover:shadow-lg" // Added hover shadow
            >
              {/* Icon container */}
              <div className="flex justify-center mb-6"> {/* Increased margin-bottom */}
                <div className=" p-4 bg-black rounded-full w-24 h-24 flex items-center justify-center"> {/* Increased size */}
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={64} // Increased image width
                    height={64} // Increased image height
                    className="object-contain" // Ensures the SVG scales correctly within its container
                  // You might need suppressHydrationWarning if you encounter hydration issues
                  // suppressHydrationWarning={true}
                  />
                </div>
              </div>
              {/* Feature title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3"> {/* Increased font size and margin */}
                {feature.title}
              </h3>
              {/* Feature description */}
              <p className="text-base text-gray-600 leading-relaxed"> {/* Increased font size and line height */}
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperatingModel;