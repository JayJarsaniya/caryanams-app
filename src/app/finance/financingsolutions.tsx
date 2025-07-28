'use client';

import React from 'react';

export default function CarFinancingLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
      `}</style>

      {/* Left Panel */}
      <div className="w-full lg:w-1/3 bg-gray-900 relative overflow-hidden animate-fadeInLeft opacity-0 flex items-center justify-center p-8 lg:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-yellow-600 text-7xl sm:text-8xl md:text-9xl font-bold opacity-20 transform rotate-12">
            LOAN
          </div>
        </div>
        <div className="relative z-10 text-center lg:text-left max-w-md">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-6 leading-tight">
            Our Financing Solutions
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            A shadowy flight into the dangerous world of a man who does not exist. Flying away on a wing and a prayer. Believe it or not it&apos;s just me.
          </p>
        </div>
      </div>

      {/* Right Panel - Cards */}
      <div className="w-full lg:w-2/3 bg-white px-4 sm:px-6 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                id: '01',
                title: 'New Car Financing:',
                desc: 'Whether you\'re buying a brand-new car from the dealership or directly from the manufacturer, we offer competitive financing options with flexible terms.',
                delay: '0.1s',
              },
              {
                id: '02',
                title: 'Used Car Financing:',
                desc: 'Looking to buy a quality pre-owned vehicle? We provide financing solutions for used cars, so you can drive away in a reliable vehicle without breaking the bank.',
                delay: '0.2s',
              },
              {
                id: '03',
                title: 'Refinancing:',
                desc: 'If you\'re looking to refinance your existing car loan for better terms or lower monthly payments, we can help. Our refinancing options are designed to save you money and reduce your financial burden.',
                delay: '0.3s',
              },
              {
                id: '04',
                title: 'Special Financing Programs:',
                desc: 'We offer special financing programs for first-time buyers, students, and individuals with less-than-perfect credit. Our goal is to help you get behind the wheel of your desired car, no matter your financial situation.',
                delay: '0.4s',
              },
            ].map(({ id, title, desc, delay }) => (
              <div
                key={id}
                className="bg-white p-5 sm:p-6 rounded-lg shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out animate-fadeInRight opacity-0 border border-gray-100 hover:border-blue-200 group cursor-pointer"
                style={{ animationDelay: delay, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-blue-600 text-2xl sm:text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {id}.
                  </div>
                  <div className="text-gray-400 mt-1 group-hover:text-blue-500 transition-colors duration-300">
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="group-hover:scale-110 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-3 max-w-xs hidden sm:block">
          <p className="text-sm text-gray-800 font-medium">We&apos;re offline</p>
          <p className="text-xs text-gray-600">Leave a message</p>
        </div>
        <div className="bg-blue-600 rounded-full p-3 shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
