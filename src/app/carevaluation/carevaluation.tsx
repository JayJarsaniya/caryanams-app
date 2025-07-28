'use client';

import React, { useState } from 'react';
import OtpModal from '@/app/carevaluation/otpmodel'; // Adjust if your component path differs

export default function CarEvaluation() {
  const [form, setForm] = useState({
    make: '',
    model: '',
    variant: '',
    year: '',
    kilometer: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 inline-block">
            SIMPLIFIED CAR SELLING
          </h2>
          <ul className="space-y-4 mt-4 text-gray-700">
            {[
              'Get an Instant Estimate',
              'Free Expert Car Evaluation',
              'Dealer Auction & Marketplace',
              'Hassle-Free Process',
            ].map((text, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-green-600 text-lg">✓</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <form onSubmit={handleSubmit} className="bg-white w-full space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Make</label>
              <select
                name="make"
                value={form.make}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Make</option>
                <option value="Maruti">Maruti</option>
                <option value="Hyundai">Hyundai</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <select
                name="model"
                value={form.model}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Model</option>
                <option value="Swift">Swift</option>
                <option value="i10">i10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Variant</label>
              <select
                name="variant"
                value={form.variant}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Variant</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Year</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Kilometer</label>
            <input
              type="text"
              name="kilometer"
              placeholder="Kilometer Driven"
              value={form.kilometer}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition"
          >
            Get Price
          </button>
        </form>
      </div>

      {/* OTP Modal */}
      <OtpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
