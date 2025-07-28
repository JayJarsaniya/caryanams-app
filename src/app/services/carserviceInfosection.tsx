'use client';
import React from 'react';
import Image from 'next/image';

const promises = [
  {
    title: 'Privacy',
    description:
      'Personal information and car records are kept strictly confidential.',
    image: '/promise1.jpg',
  },
  {
    title: 'Support',
    description:
      'Dedicated team available to assist you with any car-related queries.',
    image: '/promise2.jpg',
  },
  {
    title: 'Instant Service',
    description:
      'Book car services anytime, anywhere, with Instant Service at your fingertips!',
    image: '/promise3.jpg',
  },
  {
    title: 'Fair Price',
    description:
      'Enjoy transparent pricing and value-for-money services.',
    image: '/promise4.jpg',
  },
];

export default function CarServiceInfoSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-0 space-y-12 pt-9">
      {/* Caryanams Promise */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-12">
       <h2 className="text-xl md:text-2xl font-bold mb-4">
       <span className="text-[#004c97]">CarYanams</span>{' '}
       <span className="text-[#d2ae42]">Promise</span>
       </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {promises.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl text-center shadow-sm hover:shadow-md transition"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={50}
                height={50}
                className="mx-auto mb-3"
                suppressHydrationWarning={true}
                aria-label={`${item.title} icon`}
              />
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What is Car Service History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg md:text-xl font-bold mb-2">
          What is <span className="text-black">Car Service History?</span>
        </h2>
        <p className="text-gray-700 text-sm mb-4">
          The service history of a car refers to the record of all the maintenance and repair work
          that has been performed on the vehicle throughout its life.
        </p>
        <h3 className="font-semibold text-base mb-1">Features</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          <li>
            <span className="font-medium">Detailed Service History report:</span> Access a comprehensive report of the car&apos;s
            maintenance and repairs, service dates and type of service carried out.
          </li>
          <li>
            <span className="font-medium">Odometer reading:</span> Discover the true mileage of the vehicle, including any
            tampering issues.
          </li>
          <li>
            <span className="font-medium">Car Parts:</span> View replaced or repaired parts and timelines for each service.
          </li>
        </ul>
      </div>
    </div>
  );
}