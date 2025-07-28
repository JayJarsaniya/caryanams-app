"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchFromAPI } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FaCar, FaMoneyBillWave, FaCogs } from "react-icons/fa";

interface Model {
  _id: string;
  companyId: string;
  sectionData: {
    newModel: {
      name: string;
      price: string;
      url: string;
      type: string;
      range: string;
      variantCount: number;
      image?: string; // Added image to the interface
    };
  };
}

interface NewBrand {
  _id: string;
  sectionData: {
    newBrand: {
      brandname: string;
      url: string;
      modelCount: number;
    };
  };
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const slugToBrandName = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

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
  <div className="bg-white rounded-lg border shadow-sm w-full">
    <div
      className="flex justify-between items-center px-4 py-2 border-b cursor-pointer hover:bg-gray-50 transition"
      onClick={() => setIsOpen(!isOpen)}
      aria-label={`Toggle ${title} filter`}
    >
      <span className="font-semibold text-sm text-gray-800">{title}</span>
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

const ModelCardSkeleton = () => (
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
      </div>
      <div className="h-10 bg-gray-300 rounded-md w-full"></div>
    </div>
  </div>
);

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

const Page = () => {
  const { slug } = useParams();
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedVariantCounts, setSelectedVariantCounts] = useState<string[]>(
    []
  );
  const [sortOption, setSortOption] = useState<string>("name-asc");
  const modelsPerPage = 12;

  useEffect(() => {
    const fetchModels = async () => {
      if (!slug) return;

      const decodedSlug = slugToBrandName(slug.toString());
      setBrandName(decodedSlug);

      const cached = localStorage.getItem("newBrandsData");
      if (!cached) {
        console.warn("No newBrandsData found in localStorage");
        return;
      }

      const parsed = JSON.parse(cached);
      const matchedBrand = parsed.data.find((b: NewBrand) => {
        return (
          b.sectionData.newBrand.brandname.toLowerCase().trim() ===
          decodedSlug.toLowerCase().trim()
        );
      });

      if (!matchedBrand) {
        console.warn("Brand not found for slug:", decodedSlug);
        return;
      }

      const brandId = matchedBrand._id;

      const allModels = await fetchFromAPI<Model>({
        dbName: "caryanams",
        collectionName: "newmodel",
        limit: 0,
      });

      const filtered = allModels.filter((m) => m.companyId === brandId);
      setModels(filtered);
      setFilteredModels(filtered);
      setLoading(false);
    };

    fetchModels();
  }, [slug]);

  useEffect(() => {
    let filtered = models.filter((model) => {
      const { newModel } = model.sectionData;
      const priceMatch = newModel.price.match(/₹\s*([\d.]+)/);
      const price = priceMatch ? parseFloat(priceMatch[1]) * 100000 : 0;
      return (
        (!selectedTypes.length ||
          selectedTypes.some(
            (type) =>
              type.toLowerCase().trim() === newModel.type.toLowerCase().trim()
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
        (!selectedVariantCounts.length ||
          selectedVariantCounts.some(
            (variant) => parseInt(variant) === newModel.variantCount
          ))
      );
    });

    filtered = filtered.sort((a, b) => {
      const { newModel: aModel } = a.sectionData;
      const { newModel: bModel } = b.sectionData;
      switch (sortOption) {
        case "name-asc":
          return aModel.name.localeCompare(bModel.name);
        case "name-desc":
          return bModel.name.localeCompare(aModel.name);
        case "price-asc":
          return (
            parseFloat(aModel.price.match(/₹\s*([\d.]+)/)?.[1] || "0") *
              100000 -
            parseFloat(bModel.price.match(/₹\s*([\d.]+)/)?.[1] || "0") * 100000
          );
        case "price-desc":
          return (
            parseFloat(bModel.price.match(/₹\s*([\d.]+)/)?.[1] || "0") *
              100000 -
            parseFloat(aModel.price.match(/₹\s*([\d.]+)/)?.[1] || "0") * 100000
          );
        case "variants-asc":
          return aModel.variantCount - bModel.variantCount;
        case "variants-desc":
          return bModel.variantCount - aModel.variantCount;
        default:
          return 0;
      }
    });

    setFilteredModels(filtered);
    setCurrentPage(1);
  }, [
    models,
    selectedTypes,
    selectedPriceRanges,
    selectedVariantCounts,
    sortOption,
  ]);

  const uniqueTypes = Array.from(
    new Set(
      models.map((model) => model.sectionData.newModel.type.trim())
    ).values()
  ).sort();
  const uniqueVariantCounts = Array.from(
    new Set(
      models.map((model) => model.sectionData.newModel.variantCount.toString())
    ).values()
  ).sort((a, b) => parseInt(a) - parseInt(b));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  const paginatedModels = filteredModels.slice(
    (currentPage - 1) * modelsPerPage,
    currentPage * modelsPerPage
  );

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-4 lg:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {loading
            ? "Loading Models..."
            : `All Models for ${brandName || "Brand"}`}
        </h1>
        <p className="text-sm text-gray-600">
          Filtered by: {brandName || "Unknown Brand"}
        </p>
        <p className="text-sm text-gray-500">
          Found {filteredModels.length} models
        </p>
      </header>

      <div className="flex justify-between items-center mb-4">
        <div className="lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
            aria-label={sidebarOpen ? "Close filters" : "Show filters"}
          >
            {sidebarOpen ? "Close Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-1/4 space-y-4 bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none shadow-lg lg:shadow-none absolute top-0 left-0 z-40 lg:static sticky`}
        >
          <FilterSection
            title="Car Type"
            isOpen={typeOpen}
            setIsOpen={setTypeOpen}
            options={uniqueTypes}
            selectedOptions={selectedTypes}
            setSelectedOptions={setSelectedTypes}
            ariaLabelPrefix="Filter by car type"
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
            title="Variant Count"
            isOpen={variantOpen}
            setIsOpen={setVariantOpen}
            options={uniqueVariantCounts}
            selectedOptions={selectedVariantCounts}
            setSelectedOptions={setSelectedVariantCounts}
            ariaLabelPrefix="Filter by variant count"
          />
        </div>

        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: modelsPerPage }).map((_, index) => (
                <ModelCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredModels.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No models found for the selected filters.
              <button
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedPriceRanges([]);
                  setSelectedVariantCounts([]);
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Reset Filters
              </button>{" "}
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="p-2 border rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
                  aria-label="Sort models"
                >
                  <option value="name-asc">Sort by Name (A-Z)</option>
                  <option value="name-desc">Sort by Name (Z-A)</option>
                  <option value="price-asc">Sort by Price (Low to High)</option>
                  <option value="price-desc">
                    Sort by Price (High to Low)
                  </option>
                  <option value="variants-asc">
                    Sort by Variants (Low to High)
                  </option>
                  <option value="variants-desc">
                    Sort by Variants (High to Low)
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedModels.map((model) => (
                  <div
                    key={model._id}
                    className="bg-white rounded-xl shadow border overflow-hidden"
                  >
                    <Image
                      src={
                        model.sectionData.newModel.image ||
                        "https://admin.caryanams.com/storage/images/used-car/front/67ca21e66032c-1.jpg"
                      }
                      alt={model.sectionData.newModel.name}
                      width={400}
                      height={224}
                      className="object-cover w-full h-56"
                      unoptimized
                    />
                    <div className="p-4">
                      <h2 className="text-sm font-semibold mb-1">
                        {model.sectionData.newModel.name}
                      </h2>
                      <div className="text-xs text-gray-600 flex items-center gap-2 mb-2">
                        <FaCar /> {model.sectionData.newModel.type}
                      </div>
                      <div className="flex gap-3 text-xs text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <FaMoneyBillWave /> {model.sectionData.newModel.price}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCogs /> {model.sectionData.newModel.variantCount}{" "}
                          Variants
                        </span>
                      </div>
                      <Link
                        href={`/new/${model.sectionData.newModel.name}/${model._id}`}
                      >
                        <button className="w-full bg-gradient-to-r from-[#004c97] to-[#d2ae42] text-white py-2 rounded-md flex justify-center items-center gap-2">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
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

export default Page;
