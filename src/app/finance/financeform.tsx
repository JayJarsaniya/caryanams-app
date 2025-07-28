'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const CarFinanceForm = () => {
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
    if (formData.contact.length >= 10) {
      alert('OTP sent to your mobile number!');
    } else {
      alert('Please enter a valid contact number');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Finance application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Image */}
            <div className="h-64 sm:h-80 md:h-[400px] lg:h-auto w-full lg:w-3/5 relative">
              <Image 
                src="/finance_banner.png"
                alt="Car Protection Finance"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Right: Form Section */}
            <div className="w-full lg:w-2/5 p-6 sm:p-10 bg-white">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                  Get your car finance
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
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <div className="relative">
                    <input
                      type="tel"
                      name="contact"
                      placeholder="Contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-28 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleGetOTP}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white text-xs font-semibold px-3 py-1.5 rounded-md"
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
                  />

                  <input
                    type="number"
                    name="amount"
                    placeholder="Finance Required Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

        <button
           type="submit"
           className="w-full bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold py-3 rounded-lg from-[#d2ae42] to-[#004c97]transition-all duration-200 shadow-md"
        >
        SUBMIT
        </button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFinanceForm;
