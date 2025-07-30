// src/app/used/[...slug]/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaPhoneAlt,
  FaArrowLeft,
  FaCalendarAlt,
  FaPalette,
  FaCheckCircle,
  FaTimesCircle,
  FaRoad,
  FaUser,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { fetchFromAPI } from "@/lib/api";

// Interfaces (unchanged)
interface CarDetails {
  id: string;
  name: string;
  company: string;
  companyId: string;
  model: string;
  modelId: string;
  variant: string;
  variantId: string;
  price: string;
  images: string[];
  fuel: string;
  kms: string;
  transmission: string;
  location: string;
  owner: string;
  registrationYear: string;
  registrationMonth?: string;
  registrationState: string;
  registrationRto: string;
  color: string;
  accident: boolean;
  insuranceType: string;
  rcBook: boolean;
  duplicateKey: boolean;
  vinPlate: boolean;
  chassisNumberEmbossing: boolean;
  frontLeft: string;
  frontRight: string;
  backLeft: string;
  backRight: string;
  numberPlate: string;
  underHpa: boolean;
  financeNoc: boolean;
  urlslug: string;
  manufacturingYear?: string;
  manufacturingMonth?: string;
  fitnessUpto?: string;
  carHealth?: string;
  inspectionScore?: number;
  shortDescription?: string;
  interior?: string;
  exterior?: string;
  engine?: string;
  body?: string;
  tyre?: string;
  lastService?: string;
  insuranceCompany?: string;
  insuranceStartDate?: string;
  insuranceEndDate?: string;
  idvNumber?: string;
  cngType?: string;
  cngRetestingCertificate?: boolean;
  cngRetestingExpireDate?: string;
}

interface UsedCarData {
  company: string;
  model: string;
  variant: string;
  carname?: string;
  baseprice?: string | number;
  images?: string[];
  fueltype?: string;
  kilometerdriven?: number;
  transmission?: string;
  registrationcity?: string;
  ownership?: string;
  registrationyear?: string;
  registrationmonth?: string;
  registrationstate?: string;
  registrationrto?: string;
  color?: string;
  accident?: boolean;
  insurancetype?: string;
  rcbook?: boolean;
  duplicatekey?: boolean;
  vinplate?: boolean;
  chassisnumberembossing?: boolean;
  frontleft?: string;
  frontright?: string;
  backleft?: string;
  backright?: string;
  numberplate?: string;
  underhpa?: boolean;
  financenoc?: boolean;
  urlslug?: string;
  manufacturingyear?: string;
  manufacturingmonth?: string;
  fitnessupto?: string;
  carhealth?: string;
  inspectionscore?: number;
  shortdescription?: string;
  interior?: string;
  exterior?: string;
  engine?: string;
  body?: string;
  tyre?: string;
  lastservice?: string;
  insurancecompany?: string;
  insurancestartdate?: string;
  insuranceenddate?: string;
  idvnumber?: string;
  cngtype?: string;
  cngretestingcertificate?: boolean;
  cngretestingexpiredate?: string;
}

interface RawCarData {
  _id: string;
  sectionData?: {
    usedcar?: UsedCarData;
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

interface RawModelData {
  _id: string;
  sectionData?: {
    model?: {
      name?: string;
      companyId?: string;
    };
  };
}

interface RawVariantData {
  _id: string;
  sectionData?: {
    variant?: {
      name?: string;
      model?: string;
      brandname?: string;
    };
  };
}

interface RelatedCar {
  id: string;
  name: string;
  image: string;
  location: string;
  owner: string;
  price: string;
  slug: string;
}

// Define a union type for cached items
type CachedDataItem = RawCarData | RawBrandData | RawModelData | RawVariantData;

// Simple in-memory cache
const cache: { [key: string]: { data: CachedDataItem[]; timestamp: number } } =
  {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cached API fetch
const cachedFetchFromAPI = async <T extends CachedDataItem>(params: {
  dbName: string;
  collectionName: string;
  limit?: number;
  query?: Record<string, unknown>;
}): Promise<T[]> => {
  const cacheKey = JSON.stringify(params);
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T[];
  }
  const flatData = await fetchFromAPI<T[]>(params);
  const data = flatData.flat(); // Ensures it becomes T[] instead of T[][]

  cache[cacheKey] = { data, timestamp: Date.now() };

  return data;
};

// Skeleton Loader Component (unchanged)
const CarDetailsSkeleton = () => (
  <div className="min-h-screen bg-[#f6f6f6]">
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="aspect-video bg-gray-200 animate-pulse"></div>
          <div className="flex gap-2 p-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-20 w-40 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 border rounded bg-white animate-pulse"
            >
              <div className="h-6 w-6 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <hr className="mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex justify-between py-1">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white rounded shadow p-6 sticky top-4">
          <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="h-6 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-full mx-auto bg-[#f6f6f6] p-4 sm:p-6 lg:p-8">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border bg-white lg:p-9">
        <div>
          <div className="h-10 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex justify-between border p-3 rounded-md"
              >
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-2 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded mt-2 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="h-60 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
    <div className="py-10 px-4 max-w-full mx-auto bg-[#f6f6f6]">
      <div className="h-8 w-64 bg-gray-200 rounded mb-6 animate-pulse"></div>
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden"
          >
            <div className="relative w-full h-56 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CarDetailsContent = () => {
  const params = useParams<{ slug: string[] }>();
  const router = useRouter();
  const [car, setCar] = useState<CarDetails | null>(null);
  const [relatedCars, setRelatedCars] = useState<RelatedCar[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Loan Calculator state (unchanged)
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(1);

  // Loan calculations (unchanged)
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

  useEffect(() => {
    const fetchCarDetails = async () => {
      const fullSlug = params.slug?.join("/") || "";
      const lastSlugPart = params.slug?.[params.slug.length - 1] || "";

      if (!fullSlug) {
        setError("Invalid URL: Car slug is required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let rawCarData: RawCarData[] | null = null;

        if (lastSlugPart) {
          rawCarData = await cachedFetchFromAPI<RawCarData>({
            dbName: "caryanams",
            collectionName: "usedcar",
            query: { _id: lastSlugPart },
            limit: 1,
          });
        }

        // 2. If not found by _id or not a potential ID, fetch by urlslug
        if (!rawCarData || rawCarData.length === 0) {
          rawCarData = await cachedFetchFromAPI<RawCarData>({
            dbName: "caryanams",
            collectionName: "usedcar",
            query: { "sectionData.usedcar.urlslug": fullSlug },
          });
        }

        // 3. Fallback: Match by carname and registrationyear
        if (!rawCarData || rawCarData.length === 0) {
          const [carNamePart, yearPart] = fullSlug.split("-").reduce(
            (acc, part, index, arr) => {
              if (index === arr.length - 1) {
                acc[1] = part;
              } else {
                acc[0] += (index > 0 ? "-" : "") + part;
              }
              return acc;
            },
            ["", ""]
          );

          rawCarData = await cachedFetchFromAPI<RawCarData>({
            dbName: "caryanams",
            collectionName: "usedcar",
            query: {
              "sectionData.usedcar.carname": {
                $regex: `${carNamePart.replace(/-/g, " ")}`,
                $options: "i",
              },
              "sectionData.usedcar.registrationyear": yearPart,
            },
          });
        }

        if (!rawCarData || rawCarData.length === 0) {
          setError(`No car found for slug ${fullSlug}`);
          setLoading(false);
          return;
        }

        const item =
          rawCarData.find((car) => car._id === lastSlugPart) || rawCarData[0];

        if (!item || !item.sectionData?.usedcar) {
          setError("Car data is incomplete.");
          setLoading(false);
          return;
        }

        const carData: UsedCarData = item.sectionData.usedcar;

        // Validate required fields
        if (!carData.company || !carData.model || !carData.variant) {
          const missingFields = [
            !carData.company && "company",
            !carData.model && "model",
            !carData.variant && "variant",
          ]
            .filter(Boolean)
            .join(", ");
          setError(`Incomplete car data: Missing ${missingFields}.`);
          setLoading(false);
          return;
        }

        // Fetch brand name from localStorage
        let brandName = "Unknown";
        try {
          const brandsDataString = localStorage.getItem("brandsData");
          if (brandsDataString) {
            const brandsData = JSON.parse(brandsDataString);
            const brand = brandsData.data.find(
              (b: RawBrandData) => b._id === carData.company
            );
            brandName = brand?.sectionData?.brand?.brandname || "Unknown";
          } else {
            // Fallback to API if localStorage is empty
            const brandData = await cachedFetchFromAPI<RawBrandData>({
              dbName: "caryanams",
              collectionName: "brand",
              query: { _id: carData.company },
            });
            brandName =
              brandData.find((b) => b._id === carData.company)?.sectionData
                ?.brand?.brandname || "Unknown";
          }
        } catch (error) {
          console.error("Error accessing brandsData from localStorage:", error);
          // Fallback to API
          const brandData = await cachedFetchFromAPI<RawBrandData>({
            dbName: "caryanams",
            collectionName: "brand",
            query: { _id: carData.company },
          });
          brandName =
            brandData.find((b) => b._id === carData.company)?.sectionData?.brand
              ?.brandname || "Unknown";
        }

        // Fetch model name from localStorage
        let modelName = "Unknown";
        try {
          const modelsDataString = localStorage.getItem("modelsData");
          if (modelsDataString) {
            const modelsData = JSON.parse(modelsDataString);
            const model = modelsData.data.find(
              (m: RawModelData) => m._id === carData.model
            );
            modelName = model?.sectionData?.model?.name || "Unknown";
          } else {
            // Fallback to API if localStorage is empty
            const modelData = await cachedFetchFromAPI<RawModelData>({
              dbName: "caryanams",
              collectionName: "model",
              query: { _id: carData.model },
            });
            modelName =
              modelData.find((m) => m._id === carData.model)?.sectionData?.model
                ?.name || "Unknown";
          }
        } catch (error) {
          console.error("Error accessing modelsData from localStorage:", error);
          // Fallback to API
          const modelData = await cachedFetchFromAPI<RawModelData>({
            dbName: "caryanams",
            collectionName: "model",
            query: { _id: carData.model },
          });
          modelName =
            modelData.find((m) => m._id === carData.model)?.sectionData?.model
              ?.name || "Unknown";
        }

        // Fetch variant name (unchanged, as no variant data provided in localStorage)
        const variantData = await cachedFetchFromAPI<RawVariantData>({
          dbName: "caryanams",
          collectionName: "variant",
          query: { _id: carData.variant },
        });

        const variantName =
          variantData.find((v) => v._id === carData.variant)?.sectionData
            ?.variant?.name || "Unknown";

        const formattedCar: CarDetails = {
          id: item._id,
          name: carData.carname || "Unknown Car",
          company: brandName,
          companyId: carData.company,
          model: modelName,
          modelId: carData.model,
          variant: variantName,
          variantId: carData.variant,
          price: `₹ ${Number(carData.baseprice || 0).toLocaleString("en-IN")}`,
          images: carData.images || ["/c1.png"],
          fuel: carData.fueltype || "N/A",
          kms: `${carData.kilometerdriven || 0} km`,
          transmission: carData.transmission || "N/A",
          location: carData.registrationcity || "N/A",
          owner: carData.ownership || "N/A",
          registrationYear: carData.registrationyear || "N/A",
          registrationMonth: carData.registrationmonth || "N/A",
          registrationState: carData.registrationstate || "N/A",
          registrationRto: carData.registrationrto || "N/A",
          color: carData.color || "N/A",
          accident: carData.accident || false,
          insuranceType: carData.insurancetype || "N/A",
          rcBook: carData.rcbook || false,
          duplicateKey: carData.duplicatekey || false,
          vinPlate: carData.vinplate || false,
          chassisNumberEmbossing: carData.chassisnumberembossing || false,
          frontLeft: carData.frontleft || "N/A",
          frontRight: carData.frontright || "N/A",
          backLeft: carData.backleft || "N/A",
          backRight: carData.backright || "N/A",
          numberPlate: carData.numberplate || "N/A",
          underHpa: carData.underhpa || false,
          financeNoc: carData.financenoc || false,
          urlslug: carData.urlslug || fullSlug,
          manufacturingYear: carData.manufacturingyear || "N/A",
          manufacturingMonth: carData.manufacturingmonth || "N/A",
          fitnessUpto: carData.fitnessupto || "N/A",
          carHealth: carData.carhealth || "N/A",
          inspectionScore: carData.inspectionscore || 0,
          shortDescription:
            carData.shortdescription || "No description available",
          interior: carData.interior || "N/A",
          exterior: carData.exterior || "N/A",
          engine: carData.engine || "N/A",
          body: carData.body || "N/A",
          tyre: carData.tyre || "N/A",
          lastService: carData.lastservice || "N/A",
          insuranceCompany: carData.insurancecompany || "N/A",
          insuranceStartDate: carData.insurancestartdate || "N/A",
          insuranceEndDate: carData.insuranceenddate || "N/A",
          idvNumber: carData.idvnumber || "N/A",
          cngType: carData.cngtype || "N/A",
          cngRetestingCertificate: carData.cngretestingcertificate || false,
          cngRetestingExpireDate: carData.cngretestingexpiredate || "N/A",
        };

        setCar(formattedCar);

        // Fetch related cars (unchanged)
        const relatedRawData = await cachedFetchFromAPI<RawCarData>({
          dbName: "caryanams",
          collectionName: "usedcar",
          limit: 3,
          query: {
            "sectionData.usedcar.company": carData.company,
            _id: { $ne: item._id },
          },
        });

        const formattedRelatedCars: RelatedCar[] = await Promise.all(
          (relatedRawData || []).map(async (item: RawCarData) => {
            const relatedCarData = (item.sectionData?.usedcar ||
              {}) as UsedCarData;
            return {
              id: item._id,
              name: relatedCarData.carname || "Unknown Car",
              image: relatedCarData.images?.[0] || "/c1.png",
              location: relatedCarData.registrationcity || "N/A",
              owner: relatedCarData.ownership || "N/A",
              price: `₹ ${Number(relatedCarData.baseprice || 0).toLocaleString(
                "en-IN"
              )}`,
              slug:
                relatedCarData.urlslug ||
                `${relatedCarData.carname
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}-${relatedCarData.registrationyear}` ||
                "unknown-car-slug",
            };
          })
        );

        setRelatedCars(formattedRelatedCars);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.slug]);

  if (loading) {
    return <CarDetailsSkeleton />;
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Car not found"}
          </h2>
          <p className="text-gray-600 mb-4">
            The car you are looking for does not exist or there was an error
            loading the details.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Rest of the component remains unchanged
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 transition"
            aria-label="Back to car listings"
          >
            <FaArrowLeft />
            Back to listings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images, Specs, Overview */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] aspect-[4/3] bg-gray-100">
              <Image
                src={car.images[currentImageIndex]}
                alt={`${car.name} - Main Image`}
                fill
                className="object-contain w-full h-full"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
              />
            </div>
            <div className="flex flex-nowrap overflow-x-auto gap-3 p-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 cursor-grab select-none">
              {car.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 border-2 rounded-md overflow-hidden transition-all duration-200 hover:border-blue-500 snap-start ${
                    currentImageIndex === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                  aria-label={`Select image ${index + 1} of ${car.name}`}
                >
                  <Image
                    src={img}
                    alt={`${car.name} - Image ${index + 1}`}
                    fill
                    className="object-contain w-full h-full"
                    loading="lazy"
                    sizes="(max-width: 640px) 20vw, 96px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
            <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
              <FaGasPump className="text-xl text-blue-600" />
              <span className="text-sm font-medium mt-1">{car.fuel}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
              <FaRoad className="text-xl text-blue-600" />
              <span className="text-sm font-medium mt-1">{car.kms}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
              <FaCalendarAlt className="text-xl text-blue-600" />
              <span className="text-sm font-medium mt-1">
                {car.registrationYear}
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
              <FaCogs className="text-xl text-blue-600" />
              <span className="text-sm font-medium mt-1">
                {car.transmission}
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-3 border rounded shadow bg-white">
              <FaPalette className="text-xl text-blue-600" />
              <span className="text-sm font-medium mt-1">{car.color}</span>
            </div>
          </div>

          {/* Car Overview */}
          <div className="bg-white rounded shadow p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Car Overview</h2>
            <hr className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-sm">
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Company</span>
                <span className="font-medium text-right">{car.company}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Kilometer</span>
                <span className="font-medium text-right">{car.kms}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Model</span>
                <span className="font-medium text-right">{car.model}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">RTO</span>
                <span className="font-medium text-right">
                  {car.registrationRto}
                </span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Variant</span>
                <span className="font-medium text-right">{car.variant}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Duplicate Key</span>
                <span className="font-medium text-right">
                  {car.duplicateKey ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Transmission</span>
                <span className="font-medium text-right">
                  {car.transmission}
                </span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Insurance</span>
                <span className="font-medium text-right">
                  {car.insuranceType}
                </span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Registration State</span>
                <span className="font-medium text-right">
                  {car.registrationState}
                </span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Registration City</span>
                <span className="font-medium text-right">{car.location}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Registration Year</span>
                <span className="font-medium text-right">
                  {car.registrationYear}
                </span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Fuel Type</span>
                <span className="font-medium text-right">{car.fuel}</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span className="text-gray-500">Ownership</span>
                <span className="font-medium text-right">{car.owner}</span>
              </div>
              {car.registrationMonth !== "N/A" && (
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Registration Month</span>
                  <span className="font-medium text-right">
                    {car.registrationMonth}
                  </span>
                </div>
              )}
              {car.manufacturingYear !== "N/A" && (
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Manufacturing Year</span>
                  <span className="font-medium text-right">
                    {car.manufacturingYear}
                  </span>
                </div>
              )}
              {car.fitnessUpto !== "N/A" && (
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Fitness Upto</span>
                  <span className="font-medium text-right">
                    {car.fitnessUpto}
                  </span>
                </div>
              )}
              {car.carHealth !== "N/A" && (
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Car Health</span>
                  <span className="font-medium text-right">
                    {car.carHealth}
                  </span>
                </div>
              )}
              {car.inspectionScore !== 0 && (
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Inspection Score</span>
                  <span className="font-medium text-right">
                    {car.inspectionScore}
                  </span>
                </div>
              )}
              {car.shortDescription !== "No description available" && (
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Description</span>
                  <span className="font-medium text-right">
                    {car.shortDescription}
                  </span>
                </div>
              )}
              {car.insuranceCompany !== "N/A" && (
                <div className="flex justify-between border-b py-1">
                  <span className="text-gray-500">Insurance Company</span>
                  <span className="font-medium text-right">
                    {car.insuranceCompany}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Document Status */}
          <div className="bg-white rounded shadow p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Document Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                {car.rcBook ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span className="text-sm">RC Book Available</span>
              </div>
              <div className="flex items-center gap-3">
                {car.duplicateKey ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span className="text-sm">Duplicate Key Available</span>
              </div>
              <div className="flex items-center gap-3">
                {car.vinPlate ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span className="text-sm">VIN Plate</span>
              </div>
              <div className="flex items-center gap-3">
                {car.chassisNumberEmbossing ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span className="text-sm">Chassis Number Embossing</span>
              </div>
              <div className="flex items-center gap-3">
                {!car.underHpa ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span className="text-sm">Not Under HPA</span>
              </div>
              <div className="flex items-center gap-3">
                {!car.accident ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span className="text-sm">No Accident History</span>
              </div>
              {car.cngRetestingCertificate && (
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-600" />
                  <span className="text-sm">CNG Retesting Certificate</span>
                </div>
              )}
            </div>
          </div>

          {/* Tire Condition */}
          <div className="bg-white rounded shadow p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Tire Condition</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Front Left</p>
                <p className="font-semibold">{car.frontLeft}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Front Right</p>
                <p className="font-semibold">{car.frontRight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Back Left</p>
                <p className="font-semibold">{car.backLeft}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Back Right</p>
                <p className="font-semibold">{car.backRight}</p>
              </div>
              {car.tyre !== "N/A" && (
                <div>
                  <p className="text-sm text-gray-600">Tyre Condition</p>
                  <p className="font-semibold">{car.tyre}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Seller Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded shadow p-5 top-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>{car.location}</span>
            </div>
            <h2 className="text-lg font-semibold">{car.name}</h2>
            <p className="text-xl text-blue-600 font-bold mb-4">{car.price}</p>
            <hr className="h-px my-4 bg-gray-200 border-0" />
            <div className="flex items-center gap-2 mb-3">
              <FaUser className="text-gray-500" />
              <div>
                <p className="font-medium">Seller Name</p>
                <p className="text-sm text-gray-500">
                  Contact Seller for Details
                </p>
              </div>
            </div>
            <button
              className="w-full text-white text-sm py-2 rounded-sm flex justify-center items-center gap-2 bg-gradient-to-r from-blue-800 to-green-500 hover:opacity-90 transition"
              aria-label={`Contact seller for ${car.name}`}
            >
              <FaPhoneAlt />
              Contact Seller
            </button>
            <button
              className="mt-3 w-full border border-red-500 text-red-600 py-2 rounded-sm flex justify-center items-center gap-2 hover:bg-red-50 transition"
              aria-label={`Make an offer for ${car.name}`}
            >
              <MdLocalOffer />
              Make Offer
            </button>
            <button
              className="mt-3 w-full border border-gray-300 text-gray-700 py-2 rounded-sm hover:bg-gray-50 transition"
              aria-label={`Schedule test drive for ${car.name}`}
            >
              Schedule Test Drive
            </button>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Quick Features
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FaGasPump className="text-gray-600" />
                  <span>{car.fuel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTachometerAlt className="text-gray-600" />
                  <span>{car.kms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCogs className="text-gray-600" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-600" />
                  <span>{car.registrationYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Cars */}
          {relatedCars.length > 0 && (
            <div className="bg-white p-5 rounded shadow mt-6">
              <h3 className="text-md font-semibold mb-4">Related Cars</h3>
              <div className="flex gap-2 mb-3">
                <button
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
                  aria-label="Filter by Caryanams"
                >
                  By Caryanams
                </button>
                <button
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm"
                  aria-label={`Filter by ${car.company}`}
                >
                  By Company {car.company}
                </button>
              </div>
              <div className="space-y-3">
                {relatedCars.map((relatedCar) => (
                  <Link
                    key={relatedCar.id}
                    href={`/used/${relatedCar.slug}`}
                    className="flex items-center gap-3 border p-2 rounded hover:shadow-sm cursor-pointer"
                    aria-label={`View details for ${relatedCar.name}`}
                  >
                    <Image
                      src={relatedCar.image}
                      alt={`${relatedCar.name} - Thumbnail`}
                      width={80}
                      height={50}
                      className="rounded"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-medium">{relatedCar.name}</p>
                      <p className="text-xs text-gray-500">
                        {relatedCar.location} • {relatedCar.owner} Owner
                      </p>
                      <p className="text-sm font-bold">{relatedCar.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loan Calculator */}
      <div className="max-w-full mx-auto bg-[#f6f6f6] p-4 sm:p-6 lg:p-8 shadow-sm rounded-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Car Loan Calculator
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border bg-white lg:p-9">
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6">
              ₹{emi.toFixed(2)}
            </h3>
            <div className="space-y-2 mb-6 text-sm sm:text-base">
              <div className="flex justify-between border p-3 rounded-md">
                <span>Principal Loan Amount</span>
                <span className="font-medium">
                  ₹{loanAmount.toLocaleString()}
                </span>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoanAmount(Number(e.target.value))
                }
                className="w-full accent-blue-700"
                aria-label="Adjust loan amount"
              />
              <p className="mt-1 text-blue-800 font-semibold">
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInterestRate(Number(e.target.value))
                }
                className="w-full accent-blue-700"
                aria-label="Adjust interest rate"
              />
              <p className="mt-1 text-blue-800 font-semibold">
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTenure(Number(e.target.value))
                }
                className="w-full accent-blue-700"
                aria-label="Adjust loan tenure"
              />
              <p className="mt-1 text-blue-800 font-semibold">
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

      {/* Related Cars Section */}
      {relatedCars.length > 0 && (
        <section className="py-10 px-4 max-w-full mx-auto bg-[#f6f6f6]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-700">Similar</span> {car.company} cars
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedCars.map((relatedCar) => (
              <div
                key={relatedCar.id}
                className="group bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative w-full h-56 overflow-hidden group">
                  <Image
                    src={relatedCar.image}
                    alt={`${relatedCar.name} - Main Image`}
                    fill
                    className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-300 ease-in-out"
                    loading="lazy"
                  />
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
                    {relatedCar.name}
                  </h3>
                  <div className="text-xs text-black flex items-center gap-2 mb-6">
                    <FaMapMarkerAlt className="text-black" />{" "}
                    {relatedCar.location}
                    <span className="text-black">| {relatedCar.owner}</span>
                  </div>
                  <hr className="h-px my-4 bg-gray-200 border-0" />
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-blue-900 font-bold text-lg">
                      {relatedCar.price}
                    </div>
                    <button
                      className="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 text-xs rounded hover:bg-red-100 transition"
                      aria-label={`Make an offer for ${relatedCar.name}`}
                    >
                      <MdLocalOffer className="text-sm" />
                      MAKE OFFER
                    </button>
                  </div>
                  <Link
                    href={`/used/${relatedCar.slug}`}
                    aria-label={`Contact seller for ${relatedCar.name}`}
                  >
                    <button className="mt-4 w-full text-white text-sm py-2 rounded-sm flex justify-center items-center gap-2 bg-gradient-to-r from-[#d2ae42] to-[#004c97] hover:opacity-90 transition">
                      <FaPhoneAlt />
                      CONTACT SELLER
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <CarDetailsContent />
    </Suspense>
  );
}
