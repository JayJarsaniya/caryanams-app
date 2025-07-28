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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded shadow-xl w-[95%] max-w-md p-6 relative">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-semibold">Please Submit Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mobile</label>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none"
              />
              <button className="bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white px-4 py-2 rounded-r text-sm font-semibold hover:opacity-90">
                GET OTP
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
