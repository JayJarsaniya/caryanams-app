'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function InsuranceSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    carName: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetOTP = () => {
    alert(`OTP sent to ${formData.contact}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div
      id="insurance-form"
      className="bg-white max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
        {/* Left: Features */}
        <div>
          <h2 className="text-3xl font-bold mb-5">Car Insurance</h2>
          <div className="space-y-3">
            {['Online Application', 'Get Instant Support', 'Get Best Deals'].map(
              (feature, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-[#c9d6ff] to-[#e2e2e2] px-4 py-3 rounded text-sm font-semibold text-gray-800 shadow-sm"
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </div>

        {/* Middle: Image */}
        <div className="flex justify-center">
          <Image
            src="/insurance_banner.png"
            alt="Car Insurance Banner"
            width={300}
            height={300}
            className="object-contain w-full max-w-[250px] md:max-w-[300px]"
            suppressHydrationWarning={true}
            aria-label="Car Insurance Banner"
          />
        </div>

        {/* Right: Form */}
        <div className="w-full bg-white">
          <div className="max-w-md mx-auto p-4 sm:p-6 bg-gray-50 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Get Your Car Insurance
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-label="Enter your name"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-label="Enter your email"
              />

              <div className="relative">
                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-24 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  aria-label="Enter your contact number"
                />
                <button
                  type="button"
                  onClick={handleGetOTP}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white text-xs font-semibold px-3 py-1.5 rounded-md"
                  aria-label="Request OTP"
                >
                  GET OTP
                </button>
              </div>

              <input
                type="text"
                name="carName"
                placeholder="Car Name"
                value={formData.carName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enter your car name"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md"
                aria-label="Submit insurance form"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
