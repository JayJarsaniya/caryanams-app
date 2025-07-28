'use client';
import React from 'react';
import { ShieldCheck, Tags, Headphones, RefreshCcw } from 'lucide-react';

const features = [
  {
    title: 'Tailored Coverage',
    description:
      'We offer a range of insurance options to suit your specific needs. From basic coverage to comprehensive plans, we’ll help you find the right policy to protect your vehicle and finances.',
    icon: ShieldCheck,
  },
  {
    title: 'Competitive Rates',
    description:
      'Our insurance policies are competitively priced to ensure you get the best value. Flexible payment options and discounts make it easy to afford coverage without sacrificing quality.',
    icon: Tags,
  },
  {
    title: 'Exceptional Service',
    description:
      'Our expert team is committed to providing outstanding service. Whether you have policy questions or need help filing a claim, we’re here to support you.',
    icon: Headphones,
  },
  {
    title: 'Quick & Easy Claims',
    description:
      'If your vehicle is damaged, our claims process is quick and hassle-free. We’ll guide you step-by-step to ensure a fast resolution.',
    icon: RefreshCcw,
  },
];

export default function InsuranceIntroSection() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Heading Section */}
      <div className="mb-10 text-left">
        <h3 className="text-lg sm:text-xl font-semibold">
        <span className="text-[#004c97]">Welcome to</span>{' '}
         <span className="text-[#d2ae42]">Caryanams Car Finance</span>
        </h3>

        <p className="mt-4 text-gray-600 max-w-4xl text-sm sm:text-base">
          At Caryanams, we understand the importance of protecting your investment.
          That&apos;s why we offer comprehensive insurance solutions tailored to your needs.
          Whether you&apos;re looking to insure your new car or renew your existing policy,
          we&apos;re here to provide you with peace of mind on the road.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <feature.icon className="w-10 h-10 text-white bg-gradient-to-r from-[#d2ae42] to-[#004c97]p-2 rounded-full" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}