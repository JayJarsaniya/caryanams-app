"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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

// Define interfaces
interface CarDetails {
  id: string;
  name: string;
  company: string;
  model: string;
  variant: string;
  price: string;
  images: string[];
  fuel: string;
  kms: string;
  transmission: string;
  location: string;
  owner: string;
  registrationYear: string;
  registrationMonth?: string;
  manufacturingYear?: string;
  manufacturingMonth?: string;
  fitnessUpto?: string;
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
  registrationState: string;
  registrationRto: string;
  underHpa: boolean;
  financeNoc: boolean;
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

interface RawCarData {
  _id: string;
  sectionData?: {
    usedcar?: {
      carname?: string;
      company?: string;
      model?: string;
      variant?: string;
      baseprice?: string | number;
      images?: string[];
      fueltype?: string;
      kilometerdriven?: number;
      transmission?: string;
      registrationcity?: string;
      ownership?: string;
      registrationyear?: string;
      registrationmonth?: string;
      manufacturingyear?: string;
      manufacturingmonth?: string;
      fitnessupto?: string;
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
      registrationstate?: string;
      registrationrto?: string;
      underhpa?: boolean;
      financenoc?: boolean;
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
      urlslug?: string;
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
  company: string;
}

export default function CarDetailsPage() {
  const params = useParams<{ id: string; company: string }>();
  const router = useRouter();
  const [car, setCar] = useState<CarDetails | null>(null);
  const [relatedCars, setRelatedCars] = useState<RelatedCar[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Loan Calculator state
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(1);

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

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!params?.id) {
        setError("Invalid car ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch car by ID (try direct filter first)
        let rawData: RawCarData[] = await fetchFromAPI<RawCarData>({
          dbName: "caryanams",
          collectionName: "usedcar",
          query: { _id: params.id },
        });

        console.log("API Response for _id filter:", params.id, rawData);

        // If direct filter fails, fall back to fetching all cars
        if (!rawData || rawData.length === 0) {
          console.log("Direct _id filter failed, fetching all cars...");
          rawData = await fetchFromAPI<RawCarData>({
            dbName: "caryanams",
            collectionName: "usedcar",
            limit: 0,
          });

          if (!rawData || rawData.length === 0) {
            setError("No cars found in database");
            setLoading(false);
            return;
          }
        }

        console.log("Total cars fetched:", rawData.length);
        console.log(
          "Available car IDs (first 10):",
          rawData.slice(0, 10).map((car: RawCarData) => car._id)
        );

        // Find the specific car by ID
        const item = rawData.find((car: RawCarData) => {
          const match = car._id === params.id;
          if (match) {
            console.log(
              "Found matching car:",
              car._id,
              car.sectionData?.usedcar?.carname,
              "urlslug:",
              car.sectionData?.usedcar?.urlslug
            );
          }
          return match;
        });

        if (!item) {
          console.error("Car not found with ID:", params.id);
          console.log(
            "First 5 available cars:",
            rawData.slice(0, 5).map((car: RawCarData) => ({
              id: car._id,
              name: car.sectionData?.usedcar?.carname,
              urlslug: car.sectionData?.usedcar?.urlslug,
            }))
          );
          setError(`Car with ID ${params.id} not found`);
          setLoading(false);
          return;
        }

        const carData = item.sectionData?.usedcar || {};

        const formattedCar: CarDetails = {
          id: item._id,
          name: carData.carname || "Unknown Car",
          company: carData.company || "Unknown",
          model: carData.model || "Unknown",
          variant: carData.variant || "Unknown",
          price: `₹ ${Number(carData.baseprice || 0).toLocaleString("en-IN")}`,
          images: carData.images || ["/c1.png"],
          fuel: carData.fueltype || "N/A",
          kms: `${carData.kilometerdriven || 0} km`,
          transmission: carData.transmission || "N/A",
          location: carData.registrationcity || "N/A",
          owner: carData.ownership || "N/A",
          registrationYear: carData.registrationyear || "N/A",
          registrationMonth: carData.registrationmonth || "N/A",
          manufacturingYear: carData.manufacturingyear || "N/A",
          manufacturingMonth: carData.manufacturingmonth || "N/A",
          fitnessUpto: carData.fitnessupto || "N/A",
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
          registrationState: carData.registrationstate || "N/A",
          registrationRto: carData.registrationrto || "N/A",
          underHpa: carData.underhpa || false,
          financeNoc: carData.financenoc || false,
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

        // Fetch related cars
        const relatedRawData = await fetchFromAPI<RawCarData>({
          dbName: "caryanams",
          collectionName: "usedcar",
          limit: 3,
          query: {
            "sectionData.usedcar.company": carData.company,
            _id: { $ne: params.id },
          },
        });

        const formattedRelatedCars: RelatedCar[] = (relatedRawData || []).map(
          (item: RawCarData) => ({
            id: item._id,
            name: item.sectionData?.usedcar?.carname || "Unknown Car",
            image: item.sectionData?.usedcar?.images?.[0] || "/c1.png",
            location: item.sectionData?.usedcar?.registrationcity || "N/A",
            owner: item.sectionData?.usedcar?.ownership || "N/A",
            price: `₹ ${Number(
              item.sectionData?.usedcar?.baseprice || 0
            ).toLocaleString("en-IN")}`,
            company:
              item.sectionData?.usedcar?.urlslug ||
              item.sectionData?.usedcar?.carname
                ?.toLowerCase()
                .replace(/\s+/g, "-") ||
              "unknown-company",
          })
        );

        setRelatedCars(formattedRelatedCars);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f6]">
        {/* Skeleton Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skeleton Image Gallery */}
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

            {/* Skeleton Car Specs */}
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

            {/* Skeleton Car Overview */}
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

            {/* Skeleton Document Status */}
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

            {/* Skeleton Tire Condition */}
            <div className="bg-white rounded shadow p-6">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index}>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
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

        {/* Skeleton Loan Calculator */}
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

        {/* Skeleton Related Cars */}
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
            suppressHydrationWarning={true}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-800 transition"
            aria-label="Back to car listings"
            suppressHydrationWarning={true}
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
          <div className="bg-white rounded shadow overflow-hidden">
            <div className="aspect-video bg-gray-100">
              <Image
                src={car.images[currentImageIndex]}
                alt={`${car.name} - Main Image`}
                width={800}
                height={450}
                className="object-contain max-h-[400px] w-full"
                suppressHydrationWarning={true}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto p-4">
              {car.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-20 w-40 border rounded overflow-hidden ${
                    currentImageIndex === index
                      ? "border-blue-700"
                      : "border-gray-200"
                  }`}
                  aria-label={`Select image ${index + 1} of ${car.name}`}
                  suppressHydrationWarning={true}
                >
                  <Image
                    src={img}
                    alt={`${car.name} - Image ${index + 1}`}
                    width={112}
                    height={80}
                    className="object-cover h-full w-full"
                    suppressHydrationWarning={true}
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

          {/* Additional Information */}
          {(car.carHealth !== "N/A" ||
            car.shortDescription !== "No description available") && (
            <div className="bg-white rounded shadow p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">
                Additional Information
              </h2>
              <div className="space-y-4">
                {car.shortDescription !== "No description available" && (
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="font-semibold">{car.shortDescription}</p>
                  </div>
                )}
                {car.carHealth !== "N/A" && (
                  <div>
                    <p className="text-sm text-gray-600">Car Health</p>
                    <p className="font-semibold">{car.carHealth}</p>
                  </div>
                )}
                {car.inspectionScore !== 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Inspection Score</p>
                    <p className="font-semibold">{car.inspectionScore}</p>
                  </div>
                )}
              </div>
            </div>
          )}
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
              suppressHydrationWarning={true}
            >
              <FaPhoneAlt />
              Contact Seller
            </button>
            <button
              className="mt-3 w-full border border-red-500 text-red-600 py-2 rounded-sm flex justify-center items-center gap-2 hover:bg-red-50 transition"
              aria-label={`Make an offer for ${car.name}`}
              suppressHydrationWarning={true}
            >
              <MdLocalOffer />
              Make Offer
            </button>
            <button
              className="mt-3 w-full border border-gray-300 text-gray-700 py-2 rounded-sm hover:bg-gray-50 transition"
              aria-label={`Schedule test drive for ${car.name}`}
              suppressHydrationWarning={true}
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
                  suppressHydrationWarning={true}
                  aria-label="Filter by Caryanams"
                >
                  By Caryanams
                </button>
                <button
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm"
                  suppressHydrationWarning={true}
                  aria-label={`Filter by ${car.company}`}
                >
                  By Company {car.company}
                </button>
              </div>
              <div className="space-y-3">
                {relatedCars.map((relatedCar) => (
                  <Link
                    key={relatedCar.id}
                    href={`/cars/${relatedCar.company}/${relatedCar.id}`}
                    className="flex items-center gap-3 border p-2 rounded hover:shadow-sm cursor-pointer"
                    aria-label={`View details for ${relatedCar.name}`}
                  >
                    <Image
                      src={relatedCar.image}
                      alt={`${relatedCar.name} - Thumbnail`}
                      width={80}
                      height={50}
                      className="rounded"
                      suppressHydrationWarning={true}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start border bg-white lg:p-9">
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
                suppressHydrationWarning={true}
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
                suppressHydrationWarning={true}
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
                suppressHydrationWarning={true}
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
                    suppressHydrationWarning={true}
                  />
                  {relatedCar.id === car.id && (
                    <div className="absolute top-2 right-[-44px] w-[120px] rotate-45 bg-red-600 text-white text-[8px] text-center font-bold py-[2px] shadow-md z-10 pointer-events-none">
                      FEATURED
                    </div>
                  )}
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
                      suppressHydrationWarning={true}
                    >
                      <MdLocalOffer className="text-sm" />
                      MAKE OFFER
                    </button>
                  </div>
                  <Link
                    href={`/cars/${relatedCar.company}/${relatedCar.id}`}
                    aria-label={`Contact seller for ${relatedCar.name}`}
                  >
                    <button
                      className="mt-4 w-full text-white text-sm py-2 rounded-sm flex justify-center items-center gap-2 bg-gradient-to-r from-[#d2ae42] to-[#004c97] hover:opacity-90 transition"
                      aria-label={`Contact seller for ${relatedCar.name}`}
                      suppressHydrationWarning={true}
                    >
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
}
