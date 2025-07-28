"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import OtpModal from "@/components/homecom/otpmodal"; // Ensure this path is correct
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { fetchFromAPI } from "@/lib/api"; // Ensure this path is correct

interface Car {
  id: string;
  image: string;
  images?: string[];
  fuel: string;
  kms: string;
  transmission: string;
  name: string;
  location: string;
  owner: string;
  price: string;
  company: string; // This seems to be used for the URL slug here, might want to rename for clarity
}

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
      images?: string[];
      company?: string; // This is an ID linking to brand
      urlslug?: string;
    };
  };
}

interface RawBrandData {
  _id: string;
  sectionData?: {
    brand?: {
      brandname?: string;
    };
  };
}

const carCache: { [key: string]: { data: RawCarItem[]; timestamp: number } } = {};
const brandCache: { [key: string]: { data: RawBrandData[]; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const cachedFetchCars = async (params: {
  dbName: string;
  collectionName: string;
  limit?: number;
  filters?: { [key: string]: unknown };
}): Promise<RawCarItem[]> => {
  const cacheKey = JSON.stringify(params);
  const cached = carCache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  const data = await fetchFromAPI(params) as RawCarItem[];
  carCache[cacheKey] = { data, timestamp: Date.now() };
  return data;
};

const cachedFetchBrands = async (params: {
  dbName: string;
  collectionName: string;
  filters: { [key: string]: unknown };
}): Promise<RawBrandData[]> => {
  const cacheKey = JSON.stringify(params);
  const cached = brandCache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  const data = await fetchFromAPI(params) as RawBrandData[];
  brandCache[cacheKey] = { data, timestamp: Date.now() };
  return data;
};

export default function Card() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // State for the "MAKE OFFER" modal
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // State for the OTP modal
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const rawData = await cachedFetchCars({
          dbName: "caryanams",
          collectionName: "usedcar",
          limit: 6,
          filters: {
            "sectionData.usedcar.status": "Active",
          },
        });

        const carsWithBrand = await Promise.all(
          rawData.map(async (item: RawCarItem) => {
            const carData = item.sectionData?.usedcar || {};
            let brandName = "Unknown";

            if (carData.company) {
              const brandData = await cachedFetchBrands({
                dbName: "caryanams",
                collectionName: "brand",
                filters: { _id: carData.company },
              });
              brandName = brandData[0]?.sectionData?.brand?.brandname || "Unknown";
            }

            const carNameSlug = carData.carname?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "untitled-car";
            const brandNameSlug = brandName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "unknown-brand";
            const generatedUrlSlug = carData.urlslug || `${brandNameSlug}-${carNameSlug}`;

            return {
              id: item._id,
              image: carData.images?.[0] || "/c1.png",
              fuel: carData.fueltype || "N/A",
              kms: `${carData.kilometerdriven || 0} km`,
              transmission: carData.transmission || "N/A",
              name: carData.carname || "Unknown Car",
              location: carData.registrationcity || "N/A",
              owner: carData.ownership || "N/A",
              price: `₹ ${Number(carData.baseprice || 0).toLocaleString("en-IN")}`,
              company: generatedUrlSlug, // This is used for the URL slug
            };
          })
        );

        setCars(carsWithBrand);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Function to open the "MAKE OFFER" modal
  const openOfferModal = (car: Car) => {
    setSelectedCar(car);
    setIsOfferModalOpen(true);
  };

  // Function to close the "MAKE OFFER" modal
  const closeOfferModal = () => {
    setIsOfferModalOpen(false);
    setSelectedCar(null);
  };

  // Function to handle the "SUBMIT OFFER" button click inside the "MAKE OFFER" modal
  const handleMakeOfferSubmit = () => {
    // Here you would typically process the offer (e.g., send it to an API)
    console.log("Offer submitted for:", selectedCar?.name);
    // After submitting the offer, you open the OTP modal
    setIsOfferModalOpen(false); // Close the offer modal first
    setIsOtpModalOpen(true); // Open the OTP modal
  };

  // Function to close the OTP modal
  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
    // You might also want to reset OTP-related states if they were managed here
  };

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Used Cars</h2>
        <Link
          href="/buy-used-car"
          className="bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white text-sm font-semibold px-5 py-2 rounded-md shadow hover:opacity-90 transition inline-block"
        >
          VIEW ALL CARS
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between text-xs mb-4">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                  <hr className="h-px my-4 bg-gray-200 border-0" />
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))
          : cars.map((car) => (
              <div
                key={car.id}
                className="group bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition"
              >
                <Link href={`/used/${car.company}/${car.id}`} aria-label={`View details for ${car.name}`}>
                  <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                    <Image
                      src={car.image}
                      alt={car.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <FaGasPump className="text-gray-500" /> {car.fuel}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaTachometerAlt className="text-gray-500" /> {car.kms}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCogs className="text-gray-500" /> {car.transmission}
                    </div>
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
                    <div className="text-blue-900 font-bold text-lg">{car.price}</div>
                    <button
                      onClick={() => openOfferModal(car)} // Open the initial offer modal
                      className="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 text-xs rounded hover:bg-red-100 transition"
                    >
                      <MdLocalOffer className="text-sm" />
                      MAKE OFFER
                    </button>
                  </div>

                  <Link href={`/used/${car.company}/${car.id}`}>
                    <button className="mt-4 w-full text-white text-sm py-2 rounded-sm flex justify-center items-center gap-2 bg-gradient-to-r from-[#d2ae42] to-[#004c97] hover:opacity-90 transition">
                      <FaPhoneAlt />
                      CONTACT SELLER
                    </button>
                  </Link>
                </div>
              </div>
            ))}
      </div>

      {/* "MAKE OFFER" Modal - controlled by isOfferModalOpen */}
      {isOfferModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={closeOfferModal} // Closes the offer modal
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">Make Offer</h2>
              <p className="text-gray-700 mb-4">{selectedCar.name}</p>

              {/* Info Box */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Highest offer</span>
                  <span className="text-gray-800">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Offers</span>
                  <span className="text-gray-800">-</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">Car Price</span>
                  <span className="text-green-700 font-bold">{selectedCar.price}</span>
                </div>
              </div>

              {/* Offer Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HOW MUCH DO YOU WANT TO OFFER?
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Select your offer</option>
                  <option>{selectedCar.price}</option>
                  {/* Ensure calculations are robust, consider parsing price accurately */}
                  <option>₹ {(Number(selectedCar.price.replace(/[^0-9]/g, "")) - 50000).toLocaleString("en-IN")}</option>
                  <option>₹ {(Number(selectedCar.price.replace(/[^0-9]/g, "")) - 100000).toLocaleString("en-IN")}</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Please make an offer to the dealer you find suitable
                </p>
              </div>

              {/* Submit Button for the MAKE OFFER modal */}
              <div className="p-4">
                <button
                  onClick={handleMakeOfferSubmit} // This will close this modal and open the OTP modal
                  className="w-full bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-bold py-3 rounded-lg hover:from-[#e0be52] hover:to-[#005ca7] transition duration-300"
                >
                  SUBMIT OFFER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal - controlled by isOtpModalOpen */}
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={handleCloseOtpModal} // Function to close the OTP modal
      />
    </section>
  );
}