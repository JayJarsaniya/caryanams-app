'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ReportModal from '@/app/services/reportmodal';

export default function ServiceSliderSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 py-6 bg-[#f7f7f7] min-h-[60vh]">
        {/* Left Swiper Slider */}
        <div className="w-full md:w-2/3">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full"
          >
            <SwiperSlide>
              <Image
                src="/slide1.jpg"
                alt="Service 1"
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/slide2.jpg"
                alt="Service 2"
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/slide3.jpg"
                alt="Service 3"
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Right Info Card */}
        <div className="w-full md:w-[400px] bg-white rounded-lg shadow-md p-6">
          <div className="mb-2">
            <span className="bg-orange-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full">
              AVAIL 40% DISCOUNT
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Car Service History</h3>

          <div className="mb-2">
            <span className="text-lg font-bold text-black mr-2">₹299</span>
            <span className="line-through text-gray-500">₹500</span>
            <span className="text-green-600 font-medium ml-2">40% OFF</span>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Get OEM-verified service history for your car, including information on odometer
            readings, dates of each service, types of services performed, details on parts
            replaced, and much more.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white w-full py-2 rounded text-sm font-semibold"
          >
            GET REPORT
          </button>
        </div>
      </section>

      {/* Modal */}
      <ReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
