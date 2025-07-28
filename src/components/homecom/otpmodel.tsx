'use client';

import React, { useState } from 'react';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OtpModal({ isOpen, onClose }: OtpModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-sm mx-4 p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Please Submit Details</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Mobile + OTP Button */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mobile</label>
          <div className="flex">
            <input
              type="tel"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number"
            />
            <button className="bg-teal-600 text-white px-4 py-2 rounded-r hover:bg-teal-700 text-sm font-semibold">
              GET OTP
            </button>
          </div>
        </div>

        {/* OTP Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
          />
        </div>
      </div>
    </div>
  );
}
