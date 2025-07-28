'use client';
import React from 'react';

export default function QuoteBanner() {
  return (
    <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 mt-9">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left Text Section */}
        <div className="w-full lg:max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Get A Free Quote Today!
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-gray-300">
            Ready to protect your vehicle and your peace of mind? Fill out our
            online quote form to get a free insurance quote. If you have any
            questions or need assistance, don&apos;t hesitate to contact our
            friendly team. We&apos;re here to help you find the right insurance
            coverage for your needs!
          </p>
        </div>

        {/* Right Button Section */}
        <div className="w-full sm:w-auto">
          <a
            href="#insurance-form"
            className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold px-6 py-3 rounded-lg from-[#d2ae42] to-[#004c97] transition-all duration-300"
            aria-label="Get started with a free insurance quote"
          >
            GET STARTED NOW »
          </a>
        </div>
      </div>
    </section>
  );
}
