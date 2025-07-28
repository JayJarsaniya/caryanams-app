'use client';

import React from 'react';
import Image from 'next/image';

const processSteps = [
  {
    title: '1. Select your service',
    description: 'Choose the specific service you need for your car.',
    icon: '/1.jpg',
  },
  {
    title: '2. Enter your car details',
    description: 'Provide the necessary information about your car, such as registration number, make, model, and year.',
    icon: '/2.jpg',
  },
  {
    title: '3. Book your service',
    description: 'Schedule an appointment for the selected service.',
    icon: '/3.jpg',
  },
  {
    title: '4. Pay online and enjoy the service',
    description: 'Make the payment online and enjoy the convenience of the service being provided to your car.',
    icon: '/4.jpg',
  },
];

export default function ServiceInfo() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
      {/* Download Report Button */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-blue-600 font-semibold hover:underline"
        >
          Download Sample Report
        </button>
      </div>

      {/* Note Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Please Note</h2>
        <p className="text-gray-700 text-sm mb-2">
          The Service History of the car is made available in collaboration with OEMs and other Authorised Service Centres.
          This service is typically fulfilled in 3 working days.
        </p>
        <p className="text-gray-700 text-sm">
          The Service History for Luxury Brands (
          <span className="font-medium">
            Audi, BMW, Volvo, Rolls-Royce, Mercedes-Benz, Land Rover, Lexus, Jaguar, Jeep, Morris Garages
          </span>
          ) is available at INR 999 only.
        </p>
       <p
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         className="text-red-600 font-semibold mt-2 hover:underline cursor-pointer"
        >
         View vendor information
      </p>

      </div>

      {/* Process Steps */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">About the Process</h2>
        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 flex-shrink-0">
                <Image
                  src={step.icon}
                  alt={`Step ${index + 1}`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-semibold text-md text-gray-900">{step.title}</p>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
