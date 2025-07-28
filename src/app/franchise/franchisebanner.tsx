'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import EnquiryModal from '@/app/franchise/enquirymodal';

export default function FranchiseBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative bg-black text-white min-h-[550px] sm:min-h-[600px] lg:min-h-[650px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg_franchise.jpg"
          alt="Franchise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
          <span className="text-[#d2ae42]">Caryanams</span>
          <span className="text-[#004c97]"> Franchise</span>

          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Drive Success, Own The Future!
          </h2>
          <div className="h-0.5 bg-white w-24 sm:w-32 mb-6" />

          <ul className="space-y-3 text-base sm:text-lg mb-6">
            {[
              'Tech Support',
              'Marketplace Platform',
              'Used/New Car Market Coverage',
              'Staff Training',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white rounded-lg font-semibold shadow from-[#d2ae42] to-[#004c97]transition w-full sm:w-auto text-center"
          >
            Grow with Us
          </button>
        </div>
      </div>

      {/* Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
