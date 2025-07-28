'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative bg-white pt-10 pb-6 border-t border-gray-200">
      {/* Background Illustration */}
      <div className="absolute inset-x-0 bottom-0 z-0">
        <Image
          src="/bg.png"
          alt="Footer Background"
          width={1920}
          height={150}
          className="w-full h-auto object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Store Buttons */}
        <div>
          <Image src="/logo.png" alt="Caryanams" width={160} height={50} />
          <p className="text-sm text-gray-700 mt-2 font-medium">
            LUXURYA CARS PRIVATE LIMITED
          </p>
          <div className="flex gap-2 mt-4">
            <Image src="/Play-Store.svg" alt="Google Play" width={120} height={40} />
            <Image src="/app-store.svg" alt="App Store" width={110} height={30} />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <FaInstagram className="text-pink-500" />
              Instagram
            </li>
            <li className="flex items-center gap-2">
              <FaFacebookF className="text-blue-600" />
              Facebook
            </li>
            <li className="flex items-center gap-2">
              <FaYoutube className="text-red-600" />
              Youtube
            </li>
            <li className="flex items-center gap-2">
              <FaLinkedinIn className="text-blue-700" />
              Linkedin
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/contact-us">Contact Us</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link href="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">For more information:</h3>
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <FiPhoneCall className="text-xl text-blue-500" />
            <span>
              <span className="font-medium">Call Us Now</span><br />
              <Link href="tel:18002022011" className="text-blue-700 font-bold">18002022011</Link>
            </span>
          </div>
          <p className="text-sm text-gray-700">
            Email: <Link href="mailto:info@caryanams.com" className="text-blue-700">info@caryanams.com</Link>
          </p>
          <p className="text-sm text-gray-700 mt-2">
            <strong>Office Address:</strong><br />
            8th A-805-806 Times Square Arcade 2,<br />
            BODAKDEV ROAD, NR. AVALON HOTEL,<br />
            BODAKDEV, Ahmedabad, Gujarat, 380059
          </p>
          <br />
          <p>
            © 2025 <span className="font-semibold text-black">LUXURYA CARS PRIVATE LIMITED</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
