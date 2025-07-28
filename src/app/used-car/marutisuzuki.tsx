"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaGasPump,
  FaTachometerAlt,
  FaCogs,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

export default function MarutiSuzuki() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [relatedSearchOpen, setRelatedSearchOpen] = useState(false);
  const [transmissionOpen, setTransmissionOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [regYearOpen, setRegYearOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  const cars = Array(15)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
      image: "/c1.png",
      title: `Maruti Suzuki Baleno ${index % 2 === 0 ? "Alpha" : "Delta"}`,
      fuel: "Petrol",
      kms: `${5000 + index * 100} km`,
      transmission: index % 2 === 0 ? "Automatic (AMT)" : "Manual",
      price: index % 2 === 0 ? "₹ 9,88,000" : "₹ 8,00,000",
      location: "Surat",
      owner: "First",
    }));

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const paginatedCars = cars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  const filterSection = (
    title: string,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    options: string[]
  ) => (
    <div className="bg-white rounded border w-[260px]">
      <div
        className="flex justify-between items-center px-4 py-1 border-b cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Toggle ${title} filter`}
      >
        <span className="font-medium text-sm">{title}</span>
        <span className="text-red-600 font-bold text-lg">
          {isOpen ? "−" : "+"}
        </span>
      </div>
      {isOpen && (
        <div className="p-4 space-y-2 text-sm text-gray-700 max-h-[300px] overflow-y-auto">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="checkbox"
                suppressHydrationWarning={true}
                aria-label={`Filter by ${opt}`}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-4 lg:p-10 relative">
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold"
          suppressHydrationWarning={true}
          aria-label={sidebarOpen ? "Close filters" : "Show filters"}
        >
          {sidebarOpen ? "Close Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 relative">
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-1/4 space-y-4 bg-white lg:bg-transparent p-4 lg:p-0 rounded lg:rounded-none shadow-lg lg:shadow-none absolute top-0 left-0 z-40 lg:static`}
        >
          {filterSection(
            "Related Search",
            relatedSearchOpen,
            setRelatedSearchOpen,
            [
              "Baleno",
              "Brezza",
              "Celerio",
              "Ciaz",
              "Dzire",
              "Eeco",
              "Ertiga",
              "Fronx",
              "Grand Vitara",
              "Ignis",
              "Invicto",
              "Jimny",
              "S-Presso",
              "Swift",
              "Wagon R",
              "XL6",
            ]
          )}
          {filterSection(
            "Transmission",
            transmissionOpen,
            setTransmissionOpen,
            [
              "Manual Transmission",
              "Automatic Transmission",
              "CVT",
              "Semi-Automatic Transmission",
              "Dual-Clutch Transmission",
            ]
          )}
          {filterSection("Fuel Type", fuelOpen, setFuelOpen, [
            "Petrol",
            "Diesel",
            "CNG+PETROL",
            "Electric",
          ])}
          {filterSection("Price", priceOpen, setPriceOpen, [
            "Below ₹5 Lakh",
            "₹5 - ₹10 Lakh",
            "₹10 - ₹15 Lakh",
            "Above ₹15 Lakh",
          ])}
          {filterSection("City", cityOpen, setCityOpen, [
            "Ahmedabad",
            "Surat",
            "Rajkot",
            "Vadodara",
            "Mumbai",
            "Pune",
          ])}
          {filterSection("Registration Year", regYearOpen, setRegYearOpen, [
            "2024",
            "2023",
            "2022",
            "2021",
            "2020 & Earlier",
          ])}
          {filterSection("Color", colorOpen, setColorOpen, [
            "White",
            "Black",
            "Silver",
            "Blue",
            "Red",
            "Grey",
          ])}
        </div>

        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedCars.map((car) => (
              <div
                key={car.id}
                className="group bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative w-full h-56 overflow-hidden group">
                  <Image
                    src={car.image}
                    alt={car.title}
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
                    {car.title}
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
                    <button
                      className="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 text-xs rounded hover:bg-red-100 transition"
                      suppressHydrationWarning={true}
                      aria-label={`Make an offer for ${car.title}`}
                    >
                      <MdLocalOffer className="text-sm" />
                      MAKE OFFER
                    </button>
                  </div>

                  <Link
                    href="/contact-seller"
                    aria-label={`Contact seller for ${car.title}`}
                  >
                    <button
                      className="mt-4 w-full text-white text-sm py-2 rounded-sm flex justify-center items-center gap-2 bg-gradient-to-r from-[#d2ae42] to-[#004c97] hover:opacity-90 transition"
                      suppressHydrationWarning={true}
                      aria-label={`Contact seller for ${car.title}`}
                    >
                      <FaPhoneAlt />
                      CONTACT SELLER
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <nav aria-label="Page navigation">
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <button
                    className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === 1 && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    suppressHydrationWarning={true}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <li key={page}>
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 leading-tight border border-gray-300 ${
                          page === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                        suppressHydrationWarning={true}
                        aria-label={`Go to page ${page}`}
                      >
                        {page}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === totalPages &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    suppressHydrationWarning={true}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
