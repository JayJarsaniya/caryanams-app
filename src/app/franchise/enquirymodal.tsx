// components/EnquiryModal.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    age: '',
    city: '',
    state: '',
    business: '',
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10); // allow transition to play
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetOTP = () => {
    alert(`OTP sent to ${formData.contact}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div
        className={`bg-white rounded shadow-xl w-full max-w-md p-6 transform transition-all duration-300 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-semibold">Enquiry Now</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm"
          />

          {/* Contact with OTP */}
          <div className="relative col-span-1">
            <input
              type="text"
              name="contact"
              placeholder="Contact No"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border px-3 py-2 pr-24 rounded text-sm"
            />
            <button
              type="button"
              onClick={handleGetOTP}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow"
            >
              GET OTP
            </button>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm"
          />
          <input
            type="text"
            name="business"
            placeholder="Current Business"
            value={formData.business}
            onChange={handleChange}
            className="col-span-full border px-3 py-2 rounded text-sm"
          />
          <button
            type="submit"
            className="col-span-full bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold py-2 rounded transition duration-300 hover:opacity-90"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
