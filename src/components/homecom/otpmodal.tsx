// components/OtpModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-[90%] max-w-sm p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold text-[#004c97]">Please Submit Details</h2>
              <button
                onClick={onClose}
                className="text-xl text-gray-500 hover:text-red-500 font-bold"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm block mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-[#004c97]"
                />
              </div>

              <div>
                <label className="text-sm block mb-1">Mobile</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-l focus:outline-none"
                  />
                  <button className="bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold text-sm px-4 py-2 rounded-r">
                    GET OTP
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm block mb-1">Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-[#004c97]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OtpModal;
