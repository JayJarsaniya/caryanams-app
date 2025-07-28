"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import OtpModal from "@/components/homecom/otpmodal";

export default function SimplifiedSelling() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section
      className="relative bg-cover bg-center min-h-[500px] flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: 'url(/homebg.webp)' }}
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Form Box */}
        {isClient && (
          <div className="bg-white p-6 rounded-xl shadow-lg w-90 max-w-md">
            <h2 className="text-xl font-bold text-center mb-6">
              Simplified Car Selling
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">Make</label>
                <select className="w-full border border-gray-300 px-3 py-2 rounded mt-1 text-sm">
                  <option>Select Make</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Model</label>
                <select className="w-full border border-gray-300 px-3 py-2 rounded mt-1 text-sm">
                  <option>Select Model</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Variant</label>
                <select className="w-full border border-gray-300 px-3 py-2 rounded mt-1 text-sm">
                  <option>Select Variant</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Year</label>
                <select className="w-full border border-gray-300 px-3 py-2 rounded mt-1 text-sm">
                  <option>Select Year</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Kilometer</label>
                <input
                  type="text"
                  placeholder="Kilometer Driven"
                  className="w-full border border-gray-300 px-3 py-2 rounded mt-1 text-sm"
                />
              </div>
              <div className="col-span-2">
                <button
                  onClick={handleClick}
                  className="w-full bg-gradient-to-r from-[#004C97] to-[#D2AE42] text-white py-2 rounded text-sm"
                >
                  GET PRICE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Text Content */}
        <div className="text-white text-center md:text-left">
          <h2 className="text-center text-xl md:text-2xl font-semibold mb-3">
            Find Your Dream Car at{" "}
            <span className="font-bold text-white">caryanams</span>
          </h2>
          <p className="text-sm md:text-base mb-6">
            Where quality meets value! From style to performance, we have it all.
            Drive home your perfect car today!
          </p>
          <div className="text-center">
            {isClient && (
              <Link href="/buy-used-car">
                <button
                  className="bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold px-6 py-2 rounded hover:opacity-90 transition"
                >
                  EXPLORE NOW →
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
