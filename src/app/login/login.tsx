"use client";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Login() {
  const [activeTab, setActiveTab] = useState<"dealer" | "seller">("dealer");
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {activeTab === "dealer" ? "Dealer Login" : "Seller Login"}
        </title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`flex-1 text-center py-2 font-semibold ${
                activeTab === "dealer"
                  ? "text-blue-800 border-b-2 border-blue-800"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("dealer")}
              suppressHydrationWarning={true}
              aria-label="Switch to dealer login"
            >
              Dealer
            </button>
            <button
              className={`flex-1 text-center py-2 font-semibold ${
                activeTab === "seller"
                  ? "text-blue-800 border-b-2 border-blue-800"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("seller")}
              suppressHydrationWarning={true}
              aria-label="Switch to seller login"
            >
              Seller
            </button>
          </div>

          {/* Shared form */}
          <h2 className="text-lg font-semibold mb-4">
            Login for {activeTab === "dealer" ? "Dealer" : "Seller"} Dashboard
          </h2>

          <label className="block text-sm font-medium mb-1">
            Enter your registered mobile number
          </label>
          <input
            type="text"
            placeholder="Enter 10-digit mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 outline-none"
            suppressHydrationWarning={true}
            aria-label="Enter your registered mobile number"
          />

          <label className="block text-sm font-medium mb-1">Enter OTP</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 bg-gray-100 text-gray-500 cursor-not-allowed"
            suppressHydrationWarning={true}
            aria-label="Enter 6-digit OTP (disabled)"
          />

          <button
            className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-rfrom-[#d2ae42] to-[#004c97]"
            suppressHydrationWarning={true}
            aria-label="Request OTP"
          >
            Get OTP
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-gray-400 text-sm">
              Don&apos;t have account
            </span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <button
            onClick={() => router.push("/register")}
            className="w-full py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
            suppressHydrationWarning={true}
            aria-label="Create a new account"
          >
            Create new account
          </button>
        </div>
      </div>
    </>
  );
}