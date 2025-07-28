"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaGasPump,
  FaRoad,
  FaCalendar,
  FaCog,
  FaPalette,
  FaMapMarkerAlt,
  FaUser,
  FaCogs,
  FaTachometerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { fetchFromAPI } from "@/lib/api";

// Type for formatted car used in UI
interface Car {
  id: string;
  image: string;
  fuel: string;
  kms: string;
  transmission: string;
  name: string;
  location: string;
  owner: string;
  price: string;
}

// Type for raw item returned from API
interface RawCarItem {
  _id: string;
  sectionData?: {
    usedcar?: {
      carname?: string;
      fueltype?: string;
      kilometerdriven?: number;
      transmission?: string;
      registrationcity?: string;
      ownership?: string;
      baseprice?: string | number;
    };
  };
}

const images = [
  "/c1.png",
  "/a1.png",
  "/a2.png",
  "/a3.png",
  "/a4.png",
  "/a5.png",
];

export default function Page() {
  // CarImageGallery state
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // LoanCalculator state
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(1);

  // Card state
  const [cars, setCars] = useState<Car[]>([]);

  // Loan calculations
  const monthlyRate = interestRate / 12 / 100;
  const numPayments = tenure * 12;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = emi * numPayments;
  const totalInterest = totalPayment - loanAmount;

  const pieData = [
    { name: "Principal Amount", value: loanAmount },
    { name: "Total Interest Payable", value: totalInterest },
  ];
  const COLORS = ["#3498db", "#ff6384"];

  // Fetch cars for Card section
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const rawData = await fetchFromAPI({
          dbName: "caryanams",
          collectionName: "usedcar",
          limit: 3,
        });

        const formattedCars: Car[] = (rawData as RawCarItem[]).map((item) => {
          const car = item.sectionData?.usedcar || {};
          return {
            id: item._id,
            image: "/c1.png",
            fuel: car.fueltype || "N/A",
            kms: `${car.kilometerdriven || 0} km`,
            transmission: car.transmission || "N/A",
            name: car.carname || "Unknown",
            location: car.registrationcity || "N/A",
            owner: car.ownership || "N/A",
            price: `₹ ${car.baseprice || "0"}`,
          };
        });

        setCars(formattedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <main>
      {/* Contactseller Section */}
      <div className="bg-[#f6f6f6] min-h-screen py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* CarImageGallery */}
            <div>
              <div className="aspect-video bg-black rounded overflow-hidden mb-4 flex items-center justify-center">
                <Image
                  src={selectedImage}
                  alt="Selected Car"
                  width={800}
                  height={450}
                  className="object-contain max-h-[400px]"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="h-20 w-40 border rounded overflow-hidden cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index}`}
                      width={112}
                      height={80}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CarSpecs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
              <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
                <div className="text-xl text-blue-600">
                  <FaGasPump />
                </div>
                <span className="text-sm font-medium mt-1">Diesel</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
                <div className="text-xl text-blue-600">
                  <FaRoad />
                </div>
                <span className="text-sm font-medium mt-1">62675 Km</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
                <div className="text-xl text-blue-600">
                  <FaCalendar />
                </div>
                <span className="text-sm font-medium mt-1">2017</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
                <div className="text-xl text-blue-600">
                  <FaCog />
                </div>
                <span className="text-sm font-medium mt-1">Automatic</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
                <div className="text-xl text-blue-600">
                  <FaPalette />
                </div>
                <span className="text-sm font-medium mt-1">Black</span>
              </div>
            </div>

            {/* CarOverview */}
            <div className="bg-white rounded shadow p-6 mt-8">
              <h2 className="text-lg font-semibold mb-4">Car Overview</h2>
              <hr className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-sm">
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Company</span>
                  <span className="font-medium text-right">Audi</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Kilometer</span>
                  <span className="font-medium text-right">62675 Km</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Model</span>
                  <span className="font-medium text-right">A6</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">RTO</span>
                  <span className="font-medium text-right">GJ38</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Variant</span>
                  <span className="font-medium text-right">35 TDI Matrix</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Second key</span>
                  <span className="font-medium text-right">Yes</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Transmission</span>
                  <span className="font-medium text-right">Automatic</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Insurance</span>
                  <span className="font-medium text-right">
                    Third Party (T.P)
                  </span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Registration state</span>
                  <span className="font-medium text-right">Gujarat</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Registration city</span>
                  <span className="font-medium text-right">Ahmedabad</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Registration year</span>
                  <span className="font-medium text-right">2017</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Fuel type</span>
                  <span className="font-medium text-right">Diesel</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Ownership</span>
                  <span className="font-medium text-right">1st</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* SellerInfo */}
            <div className="bg-white p-5 rounded shadow">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>Ahmedabad</span>
              </div>
              <h2 className="text-lg font-semibold">
                Audi A6 35 TDI Matrix 2017
              </h2>
              <p className="text-xl text-blue-600 font-bold mb-4">
                ₹ 23,90,000
              </p>
              <hr className="h-px my-4 bg-gray-200 border-0" />
              <div className="flex items-center gap-2 mb-3">
                <FaUser className="text-gray-500" />
                <div>
                  <p className="font-medium">Ritesh Shah</p>
                  <p className="text-sm text-gray-500">+91 94xxxxxxxx</p>
                </div>
              </div>
              <button className="mt-4 w-full text-white text-sm py-2 rounded-sm flex justify-center items-center gap-2 bg-gradient-to-r from-blue-800 to-green-500 hover:opacity-90 transition">
                Contact to Seller
              </button>
            </div>

            {/* RelatedCars */}
            <div className="bg-white p-5 rounded shadow mt-6">
              <h3 className="text-md font-semibold mb-4">Related Cars</h3>
              <div className="flex gap-2 mb-3">
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                  By Caryanams
                </button>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                  By Company Audi
                </button>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border p-2 rounded hover:shadow-sm cursor-pointer"
                  >
                    <Image
                      src="/a1.png"
                      alt="related car"
                      width={80}
                      height={50}
                      className="rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        Audi A6 35 TDI Matrix
                      </p>
                      <p className="text-xs text-gray-500">
                        Ahmedabad • 1st Owner
                      </p>
                      <p className="text-sm font-bold">₹ 23,90,000</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LoanCalculator Section */}
      <div className="max-w-full mx-auto bg-[#f6f6f6] p-4 sm:p-6 lg:p-8 shadow-sm rounded-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Car Loan Calculator
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start border bg-white lg:p-9">
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6">
              ₹{emi.toFixed(2)}
            </h3>
            <div className="space-y-2 mb-6 text-sm sm:text-base">
              <div className="flex justify-between border p-3 rounded-md">
                <span>Principal Loan Amount</span>
                <span className="font-medium">₹{loanAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border p-3 rounded-md">
                <span>Total Interest Payable</span>
                <span className="font-medium">₹{totalInterest.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border p-3 rounded-md">
                <span>Total Amount Payable</span>
                <span className="font-medium">₹{totalPayment.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-5">
              Disclaimer: Applicable rate of interest can vary subject to credit
              profile. Loan approval is at the sole discretion of the finance
              partner.
            </p>
          </div>
          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <label className="block font-medium mb-1">Loan Amount:</label>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-purple-700"
              />
              <p className="mt-1 text-purple-800 font-semibold">
                ₹{loanAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Interest Rate (%):
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-purple-700"
              />
              <p className="mt-1 text-purple-800 font-semibold">
                {interestRate}%
              </p>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Loan Tenure (Years):
              </label>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full accent-purple-700"
              />
              <p className="mt-1 text-purple-800 font-semibold">
                {tenure} Year{tenure > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="w-full h-64 sm:h-72 md:h-80 lg:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <section className="py-10 px-4 max-w-full mx-auto bg-[#f6f6f6]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-700">Similar</span> other Chevrolet
              cars
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="group bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative w-full h-56 overflow-hidden group">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute top-2 right-[-44px] w-[120px] rotate-45 bg-red-600 text-white text-[8px] text-center font-bold py-[2px] shadow-md z-10 pointer-events-none">
                  FEATURED
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-black gap-4 mb-6">
                  <span className="flex items-center gap-1">
                    <FaGasPump className="text-sm" /> {car.fuel}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaTachometerAlt className="text-sm" /> {car.kms}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCogs className="text-sm" /> {car.transmission}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1">
                  {car.name}
                </h3>
                <div className="text-xs text-black flex items-center gap-2 mb-6">
                  <FaMapMarkerAlt className="text-black" /> {car.location}
                  <span className="text-black">| {car.owner}</span>
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-blue-900 font-bold text-lg">
                    {car.price}
                  </div>
                  <button className="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 text-xs rounded hover:bg-red-100 transition">
                    <MdLocalOffer className="text-sm" />
                    MAKE OFFER
                  </button>
                </div>
                <Link href="/contact-seller">
                  <button className="mt-4 w-full text-white text-sm py-2 rounded-sm flex justify-center from-[#d2ae42] to-[#004c97] hover:opacity-90 transition">
                    <FaPhoneAlt />
                    CONTACT SELLER
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
