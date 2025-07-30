// src/app/search/[...slug]/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchFromAPI } from "@/lib/api";
import {
  FaGasPump,
  FaTachometerAlt,
  FaCogs,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

// Interfaces and other imports remain unchanged
interface UsedCar {
  _id: string;
  sectionData: {
    usedcar: {
      carname: string;
      fueltype: string;
      kilometerdriven: string;
      transmission: string;
      baseprice: string;
      registrationcity: string;
      ownership: string;
      images: string[];
      model: string;
      registrationyear: string;
      color: string;
      isfeatured: boolean;
      company: string;
    };
  };
}

interface Brand {
  _id: string;
  sectionData: { brand: { brandname: string } };
}

interface Model {
  _id: string;
  sectionData: { model: { name: string; companyId: string } };
}

function isUsedCar(obj: unknown): obj is UsedCar {
  return (
    !!obj &&
    typeof (obj as UsedCar)._id === "string" &&
    !!(obj as UsedCar).sectionData?.usedcar &&
    typeof (obj as UsedCar).sectionData.usedcar.carname === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.fueltype === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.kilometerdriven === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.transmission === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.baseprice === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.registrationcity === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.ownership === "string" &&
    Array.isArray((obj as UsedCar).sectionData.usedcar.images) &&
    typeof (obj as UsedCar).sectionData.usedcar.model === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.registrationyear === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.color === "string" &&
    typeof (obj as UsedCar).sectionData.usedcar.isfeatured === "boolean" &&
    typeof (obj as UsedCar).sectionData.usedcar.company === "string"
  );
}

function isBrand(obj: unknown): obj is Brand {
  return (
    !!obj &&
    typeof (obj as Brand)._id === "string" &&
    !!(obj as Brand).sectionData?.brand &&
    typeof (obj as Brand).sectionData.brand.brandname === "string"
  );
}

function isModel(obj: unknown): obj is Model {
  return (
    !!obj &&
    typeof (obj as Model)._id === "string" &&
    !!(obj as Model).sectionData?.model &&
    typeof (obj as Model).sectionData.model.name === "string" &&
    typeof (obj as Model).sectionData.model.companyId === "string"
  );
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pageNumbersToShow = 5;
  const startPage = Math.max(
    1,
    currentPage - Math.floor(pageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav className="flex justify-center mt-6">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${
                page === currentPage
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

const FilterSection = ({
  title,
  isOpen,
  setIsOpen,
  options,
  selectedOptions,
  setSelectedOptions,
  ariaLabelPrefix,
}: {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  ariaLabelPrefix: string;
}) => (
  <div className="bg-white rounded-lg border shadow-sm w-[260px]">
    <div
      className="flex justify-between items-center px-4 py-2 border-b cursor-pointer hover:bg-gray-50 transition"
      onClick={() => setIsOpen(!isOpen)}
      aria-label={`Toggle ${title} filter`}
    >
      <span className="font-semibold text-sm text-gray-800">
        {title}
        {selectedOptions.length > 0 && (
          <span className="ml-2 text-blue-600 text-xs">
            ({selectedOptions.length})
          </span>
        )}
      </span>
      <span className="text-red-600 font-bold text-lg">
        {isOpen ? "−" : "+"}
      </span>
    </div>
    {isOpen && (
      <div className="p-4 space-y-3 text-sm text-gray-700 max-h-[300px] overflow-y-auto">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(opt)}
              onChange={() =>
                setSelectedOptions((prev) =>
                  prev.includes(opt)
                    ? prev.filter((o) => o !== opt)
                    : [...prev, opt]
                )
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              aria-label={`${ariaLabelPrefix} ${opt}`}
            />
            <span className="truncate">{opt}</span>
          </label>
        ))}
      </div>
    )}
  </div>
);

const CarCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow border overflow-hidden animate-pulse">
    <div className="w-full h-56 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="flex gap-3 mb-4">
        <div className="h-3 bg-gray-300 rounded w-1/5"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/5"></div>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded-md w-full"></div>
    </div>
  </div>
);

const FilterPageContent = () => {
  const params = useParams() as { slug?: string[] };
  const slug = params.slug || [];
  const [brandName, modelName, city] = slug.map(decodeURIComponent);

  const [cars, setCars] = useState<UsedCar[]>([]);
  const [filteredCars, setFilteredCars] = useState<UsedCar[]>([]);
  const [displayBrandName, setDisplayBrandName] = useState("");
  const [displayModelName, setDisplayModelName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;

  // Filter states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);
  const [transmissionOpen, setTransmissionOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [regYearOpen, setRegYearOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    []
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRegYears, setSelectedRegYears] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      if (slug.length === 0) {
        setError("Invalid URL: At least one filter (brand) is required.");
        setLoading(false);
        return;
      }

      console.log("Input Slugs:", { brandName, modelName, city });

      try {
        setLoading(true);

        // Load brands and models
        const [brandRes, modelRes] = await Promise.all([
          fetchFromAPI<Brand>({
            dbName: "caryanams",
            collectionName: "brand",
            limit: 0,
          }),
          fetchFromAPI<Model>({
            dbName: "caryanams",
            collectionName: "model",
            limit: 0,
          }),
        ]);

        const brands = Array.isArray(brandRes) ? brandRes.filter(isBrand) : [];
        const models = Array.isArray(modelRes) ? modelRes.filter(isModel) : [];
        console.log("Fetched Brands:", brands);
        console.log("Fetched Models:", models);

        const selectedBrand = brandName
          ? brands.find(
              (b) =>
                b.sectionData.brand.brandname.toLowerCase().trim() ===
                brandName.toLowerCase().trim()
            )
          : null;
        const brandId = selectedBrand ? selectedBrand._id : "";
        setDisplayBrandName(
          selectedBrand
            ? selectedBrand.sectionData.brand.brandname
            : brandName || ""
        );

        const selectedModel = modelName
          ? models.find(
              (m) =>
                m.sectionData.model.name.toLowerCase().trim() ===
                  modelName.toLowerCase().trim() &&
                (!brandId || m.sectionData.model.companyId === brandId)
            )
          : null;
        const modelId = selectedModel ? selectedModel._id : "";
        setDisplayModelName(
          selectedModel ? selectedModel.sectionData.model.name : modelName || ""
        );

        // Build query (renamed from filters)
        const query: {
          [key: string]: string | { $regex: string; $options: string };
        } = {};
        if (brandId) query["sectionData.usedcar.company"] = brandId;
        if (modelId) query["sectionData.usedcar.model"] = modelId;
        if (city)
          query["sectionData.usedcar.registrationcity"] = {
            $regex: `^${city.trim()}$`,
            $options: "i",
          };
        console.log("API Query:", query);

        const data = await fetchFromAPI<UsedCar>({
          dbName: "caryanams",
          collectionName: "usedcar",
          limit: 0,
          query, // Use query instead of filters
        });
        console.log("Raw Car Data:", data);

        const validCars = Array.isArray(data) ? data.filter(isUsedCar) : [];
        console.log("Valid Cars:", validCars);

        const matchedCars = validCars.filter((car) => {
          const { company, model, registrationcity } = car.sectionData.usedcar;
          const brandMatch = brandName
            ? brands
                .find((b) => b._id === company)
                ?.sectionData.brand.brandname.toLowerCase()
                .trim() === brandName.toLowerCase().trim()
            : true;
          const modelMatch = modelName
            ? models
                .find((m) => m._id === model)
                ?.sectionData.model.name.toLowerCase()
                .trim() === modelName.toLowerCase().trim()
            : true;
          const cityMatch = city
            ? registrationcity.toLowerCase().trim() ===
              city.toLowerCase().trim()
            : true;
          return brandMatch && modelMatch && cityMatch;
        });
        console.log("Matched Cars:", matchedCars);

        if (validCars.length > matchedCars.length) {
          console.warn(
            `Filtered out ${
              validCars.length - matchedCars.length
            } cars that did not match the filters:`,
            validCars.filter((car) => {
              const { company, model, registrationcity } =
                car.sectionData.usedcar;
              const brandMatch = brandName
                ? brands
                    .find((b) => b._id === company)
                    ?.sectionData.brand.brandname.toLowerCase()
                    .trim() === brandName.toLowerCase().trim()
                : true;
              const modelMatch = modelName
                ? models
                    .find((m) => m._id === model)
                    ?.sectionData.model.name.toLowerCase()
                    .trim() === modelName.toLowerCase().trim()
                : true;
              const cityMatch = city
                ? registrationcity.toLowerCase().trim() ===
                  city.toLowerCase().trim()
                : true;
              return !(brandMatch && modelMatch && cityMatch);
            })
          );
        }

        setCars(matchedCars);
        setFilteredCars(matchedCars);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [brandName, modelName, city, slug.length]);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const { usedcar } = car.sectionData;
      const price = parseInt(usedcar.baseprice.replace(/[^\d]/g, ""));
      return (
        (!selectedFuelTypes.length ||
          selectedFuelTypes.some(
            (fuelType) =>
              fuelType.toLowerCase().trim() ===
              usedcar.fueltype.toLowerCase().trim()
          )) &&
        (!selectedTransmissions.length ||
          selectedTransmissions.some(
            (transmission) =>
              transmission.toLowerCase().trim() ===
              usedcar.transmission.toLowerCase().trim()
          )) &&
        (!selectedPriceRanges.length ||
          selectedPriceRanges.some((range) => {
            if (range === "Below ₹5 Lakh") return price < 500000;
            if (range === "₹5 - ₹10 Lakh")
              return price >= 500000 && price <= 1000000;
            if (range === "₹10 - ₹15 Lakh")
              return price > 1000000 && price <= 1500000;
            if (range === "Above ₹15 Lakh") return price > 1500000;
            return true;
          })) &&
        (!selectedRegYears.length ||
          selectedRegYears.some(
            (year) =>
              year.toLowerCase().trim() ===
              usedcar.registrationyear.toLowerCase().trim()
          )) &&
        (!selectedColors.length ||
          selectedColors.some(
            (color) =>
              color.toLowerCase().trim() === usedcar.color.toLowerCase().trim()
          ))
      );
    });
    console.log("Sidebar Filtered Cars:", filtered);
    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [
    cars,
    selectedFuelTypes,
    selectedTransmissions,
    selectedPriceRanges,
    selectedRegYears,
    selectedColors,
  ]);

  const uniqueFuelTypes = Array.from(
    new Set(cars.map((car) => car.sectionData.usedcar.fueltype.trim())).values()
  ).sort();
  const uniqueTransmissions = Array.from(
    new Set(
      cars.map((car) => car.sectionData.usedcar.transmission.trim())
    ).values()
  ).sort();
  const uniqueRegYears = Array.from(
    new Set(
      cars.map((car) => car.sectionData.usedcar.registrationyear.trim())
    ).values()
  ).sort((a, b) => parseInt(b) - parseInt(a));
  const uniqueColors = Array.from(
    new Set(cars.map((car) => car.sectionData.usedcar.color.trim())).values()
  ).sort();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  function generateCarSlug(car: UsedCar): string {
    const carData = car.sectionData.usedcar;
    const modelName = carData.carname || "car";
    const year = carData.registrationyear || "year";
    const variant = carData.transmission || "variant";

    const parts = [modelName, variant, year].map((str) =>
      str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );

    return parts.join("-");
  }

  const clearAllFilters = () => {
    setSelectedFuelTypes([]);
    setSelectedTransmissions([]);
    setSelectedPriceRanges([]);
    setSelectedRegYears([]);
    setSelectedColors([]);
    setCurrentPage(1);
  };

  const getTotalSelectedFilters = () => {
    return (
      selectedFuelTypes.length +
      selectedTransmissions.length +
      selectedPriceRanges.length +
      selectedRegYears.length +
      selectedColors.length
    );
  };

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
        <Link href="/" className="text-blue-600 underline mt-4 block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-4 lg:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Find Your Car</h1>
        <p className="text-sm text-gray-600">
          Filtered by:{brandName ? ` ${displayBrandName}` : ""}
          {modelName ? ` ${displayModelName}` : ""}
          {city ? ` in ${city}` : ""}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <p className="text-sm text-gray-500">
            Found {filteredCars.length.toLocaleString()} cars
          </p>
          {getTotalSelectedFilters() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:text-red-800 underline"
            >
              Clear all filters ({getTotalSelectedFilters()})
            </button>
          )}
        </div>
      </header>

      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition relative"
          aria-label={sidebarOpen ? "Close filters" : "Show filters"}
        >
          {sidebarOpen ? "Close Filters" : "Show Filters"}
          {getTotalSelectedFilters() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalSelectedFilters()}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-1/4 space-y-4 bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none shadow-lg lg:shadow-none sticky top-4 z-40 lg:static`}
        >
          <FilterSection
            title="Fuel Type"
            isOpen={fuelOpen}
            setIsOpen={setFuelOpen}
            options={uniqueFuelTypes}
            selectedOptions={selectedFuelTypes}
            setSelectedOptions={setSelectedFuelTypes}
            ariaLabelPrefix="Filter by fuel type"
          />
          <FilterSection
            title="Transmission"
            isOpen={transmissionOpen}
            setIsOpen={setTransmissionOpen}
            options={uniqueTransmissions}
            selectedOptions={selectedTransmissions}
            setSelectedOptions={setSelectedTransmissions}
            ariaLabelPrefix="Filter by transmission"
          />
          <FilterSection
            title="Price"
            isOpen={priceOpen}
            setIsOpen={setPriceOpen}
            options={[
              "Below ₹5 Lakh",
              "₹5 - ₹10 Lakh",
              "₹10 - ₹15 Lakh",
              "Above ₹15 Lakh",
            ]}
            selectedOptions={selectedPriceRanges}
            setSelectedOptions={setSelectedPriceRanges}
            ariaLabelPrefix="Filter by price range"
          />
          <FilterSection
            title="Registration Year"
            isOpen={regYearOpen}
            setIsOpen={setRegYearOpen}
            options={uniqueRegYears}
            selectedOptions={selectedRegYears}
            setSelectedOptions={setSelectedRegYears}
            ariaLabelPrefix="Filter by registration year"
          />
          <FilterSection
            title="Color"
            isOpen={colorOpen}
            setIsOpen={setColorOpen}
            options={uniqueColors}
            selectedOptions={selectedColors}
            setSelectedOptions={setSelectedColors}
            ariaLabelPrefix="Filter by color"
          />
        </div>

        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: carsPerPage }).map((_, index) => (
                <CarCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              <p className="text-lg mb-4">
                No cars found for the selected filters.
              </p>
              {getTotalSelectedFilters() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedCars.map((car) => {
                  const slug = generateCarSlug(car);
                  return (
                    <div
                      key={car._id}
                      className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Image
                        src={
                          car.sectionData.usedcar.images[0] ||
                          "/placeholder.png"
                        }
                        alt={car.sectionData.usedcar.carname}
                        width={400}
                        height={224}
                        className="object-cover w-full h-56"
                      />
                      <div className="p-4">
                        <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                          {car.sectionData.usedcar.carname}
                        </h3>
                        <div className="text-xs text-gray-600 flex items-center gap-2 mb-2">
                          <FaMapMarkerAlt />{" "}
                          {car.sectionData.usedcar.registrationcity}
                          <span>| {car.sectionData.usedcar.ownership}</span>
                        </div>
                        <div className="flex gap-3 text-xs text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <FaGasPump /> {car.sectionData.usedcar.fueltype}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaTachometerAlt />{" "}
                            {car.sectionData.usedcar.kilometerdriven} km
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCogs /> {car.sectionData.usedcar.transmission}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-blue-900 font-bold text-lg">
                            ₹
                            {parseInt(
                              car.sectionData.usedcar.baseprice
                            ).toLocaleString("en-IN")}
                          </span>
                          <button
                            className="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 text-xs rounded hover:bg-red-100 transition"
                            aria-label={`Make an offer for ${car.sectionData.usedcar.carname}`}
                          >
                            <MdLocalOffer /> MAKE OFFER
                          </button>
                        </div>
                        <Link href={`/used/${slug}/${car._id}`}>
                          <button className="w-full bg-gradient-to-r from-[#004c97] to-[#d2ae42] text-white py-2 rounded-md flex justify-center items-center gap-2 hover:opacity-90 transition">
                            <FaPhoneAlt /> Contact Seller
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <FilterPageContent />
    </Suspense>
  );
}
