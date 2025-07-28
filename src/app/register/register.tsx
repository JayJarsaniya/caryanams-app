'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function Register() {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <>
      <Head>
        <title>Register | Caryanams</title>
      </Head>

      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Left: Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>

            <form className="space-y-4">
              {[
                { label: 'First name', name: 'firstName', placeholder: 'First name' },
                { label: 'Last name', name: 'lastName', placeholder: 'Last name' },
                { label: 'Email', name: 'email', placeholder: 'Email' },
                { label: 'State', name: 'state', placeholder: 'State' },
                { label: 'City', name: 'city', placeholder: 'City' },
                {
                  label: 'Enter your register mobile number',
                  name: 'mobile',
                  placeholder: 'Enter your register mobile number',
                },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

              {/* Get OTP */}
              <button
                type="button"
                className="w-full py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#d2ae42] to-[#004c97] hover:opacity-90 transition"
                onClick={() => setOtpSent(true)}
              >
                Get OTP
              </button>

              {/* OTP Input */}
              <input
                type="text"
                placeholder="Enter OTP"
                disabled={!otpSent}
                className={`w-full px-4 py-2 border rounded-md ${
                  otpSent
                    ? 'bg-white border-gray-300 text-black'
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                }`}
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 rounded-md font-semibold text-white bg-gradient-to-r from-[#d2ae42] to-[#004c97] hover:opacity-90 transition"
              >
                Create Account
              </button>

              {/* Already have account */}
              <div className="flex items-center justify-center my-4 text-sm text-gray-500">
                <hr className="flex-grow border-gray-300 mx-2" />
                <span>Already have an account</span>
                <hr className="flex-grow border-gray-300 mx-2" />
              </div>
            </form>
          </div>
        </div>

        {/* Right: Promotional Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-gray-100 text-center margin-top:15% pb-40">
          <div className="max-w-lg pb-44">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Sell your cars on <span className="text-black-700">caryanams.com</span> and get more clients
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Manage & Sell your all car at <strong>one</strong> place it’s just easy and quick.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}