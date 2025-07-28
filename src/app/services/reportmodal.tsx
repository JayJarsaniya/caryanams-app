'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-[#004c97] mb-1">
              Get instant report
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Avail services, order updates and reports.
            </p>

            {/* Form */}
            <form className="space-y-4">
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#004c97] focus:outline-none">
                <option>Maruti Suzuki</option>
                <option>Hyundai</option>
                <option>Honda</option>
              </select>
              <input
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#004c97] focus:outline-none"
              />
              <input
                placeholder="Car Name with Number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#004c97] focus:outline-none"
              />
              <input
                placeholder="Engine No"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#004c97] focus:outline-none"
              />
              <input
                placeholder="Chassis No"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#004c97] focus:outline-none"
              />
              <input
                placeholder="Mobile Number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#004c97] focus:outline-none"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
              >
                SUBMIT
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
