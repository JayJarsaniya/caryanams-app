'use client';
import Image from 'next/image';
import React from 'react';

const FeaturedServices = () => {
  return (
    <div className="py-12 px-4 md:px-16 bg-white text-center">
  
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">
      <span className="text-[#004c97]">Our</span>{' '}
      <span className="text-[#d2ae42]">Featured</span>{' '}
      <span className="text-[#004c97]">Services</span>
      </h2>

      {/* Grid Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Services */}
        <div className="text-left space-y-6 max-w-sm">
          <div>
            <h3 className="text-lg font-semibold">Marketplace</h3>
            <p className="text-gray-600">
              Easily buy or sell cars on our user-friendly platform.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Finance Services:</h3>
            <p className="text-gray-600">
              Access convenient finance options tailored to your car deals through Caryanams.
            </p>
          </div>
        </div>

        {/* Logo Center */}
        <div className="w-60 md:w-72">
          <Image
            src="/logo.png" // Make sure the image is in /public folder
            alt="Caryanams Logo"
            width={300}
            height={150}
            className="mx-auto"
          />
        </div>

        {/* Right Services */}
        <div className="text-left space-y-6 max-w-sm">
          <div>
            <h3 className="text-lg font-semibold">Evaluation Service</h3>
            <p className="text-gray-600">
              Utilize our advanced evaluation app to determine the optimal price for your vehicle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Auction Platform</h3>
            <p className="text-gray-600">
              Dealers can participate in auctions to efficiently procure cars with seamless bidding processes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;
