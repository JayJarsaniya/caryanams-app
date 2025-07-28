"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inspectionPoints = [
  ["Transmission", "Steering", "Engine"],
  ["Tires", "Lighting", "Interior"],
  ["Suspension", "Exterior", "Brakes"],
  ["Air Conditioning", "Engine Diagnostics", "Wheel Alignment"],
];

export default function CarInspection() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-12 bg-white max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Image */}
        <div className="w-full md:w-1/2 relative">
          <Image
            src="/car-in-red.png"
            alt="Car Inspection"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Right Text Content */}
        <div className="w-full md:w-1/2">
          <p className="text-gray-500 italic mb-2">Want To Sell Your Car?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            CAR INSPECTION
          </h2>
          <p className="text-gray-700 mb-6">
            Our CarSure experts inspect the car on over 200 checkpoints so you get
            complete satisfaction and peace of mind before buying.
          </p>

          {/* Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 mb-6">
            {inspectionPoints.flat().map((point, i) => (
              <p key={i} className="flex items-center text-gray-800 text-sm">
                <FaCheck className="text-green-600 mr-2" />
                {point}
              </p>
            ))}
          </div>

          {/* CTA Button */}
          {isClient && (
            <button
              onClick={() => router.push("/carevaluation")}
              className="w-auto bg-gradient-to-r from-[#004C97] to-[#D2AE42] text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition"
              aria-label="Schedule a car inspection"
            >
              Schedule Inspection
            </button>
          )}
        </div>
      </div>
    </section>
  );
}