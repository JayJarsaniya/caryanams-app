"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchFromAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

// Type definitions for API data
interface Brand {
  _id: string;
  sectionData: {
    brand: {
      brandname: string;
    };
  };
}

interface Model {
  _id: string;
  sectionData: {
    model: {
      name: string;
      companyId: string;
    };
  };
}

// Type guard for Brand
function isBrand(item: unknown): item is Brand {
  if (
    typeof item !== "object" ||
    item === null ||
    !("sectionData" in item) ||
    typeof item.sectionData !== "object" ||
    item.sectionData === null ||
    !("brand" in item.sectionData) ||
    typeof item.sectionData.brand !== "object" ||
    item.sectionData.brand === null ||
    !("brandname" in item.sectionData.brand) ||
    typeof item.sectionData.brand.brandname !== "string"
  ) {
    return false;
  }
  return true;
}

// Type guard for Model
function isModel(item: unknown): item is Model {
  if (
    typeof item !== "object" ||
    item === null ||
    !("sectionData" in item) ||
    typeof item.sectionData !== "object" ||
    item.sectionData === null ||
    !("model" in item.sectionData) ||
    typeof item.sectionData.model !== "object" ||
    item.sectionData.model === null ||
    !("name" in item.sectionData.model) ||
    typeof item.sectionData.model.name !== "string" ||
    !("companyId" in item.sectionData.model) ||
    typeof item.sectionData.model.companyId !== "string"
  ) {
    return false;
  }
  return true;
}

// LocalStorage cache management
interface CacheData<T> {
  data: T;
  timestamp: number;
}

const CACHE_KEY_BRANDS = "brandsData"; // Match Header's cache key
const CACHE_KEY_MODELS = "caryanams_models";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const getCachedData = <T,>(key: string): CacheData<T> | null => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const parsed = JSON.parse(cached);
    if (
      parsed.data &&
      parsed.timestamp &&
      Date.now() - parsed.timestamp < CACHE_DURATION
    ) {
      return parsed;
    }
    localStorage.removeItem(key);
    return null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

const setCachedData = <T,>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (err) {
    console.error("Error caching data:", err);
  }
};

export default function SearchBar() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Fetch or load cached data for brands and models
  useEffect(() => {
    const loadData = async () => {
      setIsFetching(true);
      setError(null);

      // Check cache for brands (reusing Header's cache)
      const cachedBrands = getCachedData<Brand[]>(CACHE_KEY_BRANDS);
      if (cachedBrands) {
        const brandData = cachedBrands.data.filter(isBrand);
        setBrands(brandData);
        
      } else {
        // Fallback to API if no cache (should be rare since Header fetches it)
        try {
          const brandResponse = await fetchFromAPI({
            dbName: "caryanams",
            collectionName: "brand",
            limit: 0,
          });
          if (Array.isArray(brandResponse)) {
            const brandData = brandResponse.filter(isBrand);
            setBrands(brandData);
            setCachedData(CACHE_KEY_BRANDS, brandData);
           
          }
        } catch (err) {
          setError("Failed to load brands");
          console.error("Error fetching brands:", err);
        }
      }

      // Check cache for models
      const cachedModels = getCachedData<Model[]>(CACHE_KEY_MODELS);
      if (cachedModels) {
        const modelData = cachedModels.data.filter(isModel);
        setModels(modelData);
      
      } else {
        // Fetch models if no cache
        try {
          const modelResponse = await fetchFromAPI({
            dbName: "caryanams",
            collectionName: "model",
            limit: 0,
          });
          if (Array.isArray(modelResponse)) {
            const modelData = modelResponse.filter(isModel);
            setModels(modelData);
            setCachedData(CACHE_KEY_MODELS, modelData);
           
          }
        } catch (err) {
          setError("Failed to load models");
          console.error("Error fetching models:", err);
        }
      }

      setIsFetching(false);
    };

    loadData();
  }, []);

  // Filter models based on selected brand and remove duplicates
  const filterModels = useCallback(() => {
    if (make) {
      const selectedBrand = brands.find(
        (b) =>
          b.sectionData.brand.brandname.toLowerCase().trim() ===
          make.toLowerCase().trim()
      );
      if (selectedBrand) {
        const filtered = models.filter(
          (m) => m.sectionData.model.companyId === selectedBrand._id
        );
        const uniqueModels = Array.from(
          new Map(
            filtered.map((m) => [
              m.sectionData.model.name.toLowerCase().trim(),
              m,
            ])
          ).values()
        );
       
        setFilteredModels(uniqueModels);
      } else {
        setFilteredModels([]);
      }
    } else {
      setFilteredModels([]);
    }
    setModel("");
  }, [make, brands, models]);

  useEffect(() => {
    filterModels();
  }, [filterModels]);

  const handleSearch = () => {
    if (!make && !model && !city) {
      alert("Please select at least one filter");
      return;
    }

    // Construct slug with names
    const searchUrl = `/buy-used${make ? `/${encodeURIComponent(make)}` : ""}${
      model ? `/${encodeURIComponent(model)}` : ""
    }${city ? `/${encodeURIComponent(city)}` : ""}`;
    router.push(searchUrl);
  };

  return (
    <div className="w-full bg-white p-6 shadow-md rounded-lg flex flex-wrap justify-between gap-4">
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Make Dropdown (Brand) */}
      <div className="flex flex-col w-full sm:w-1/4">
        <label className="text-sm font-semibold text-gray-800 mb-1">
          Select (Brand)
        </label>
        {isFetching ? (
          <div className="h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : (
          <select
            value={make}
            onChange={(e) => {
              setMake(e.target.value);
              setModel("");
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
            suppressHydrationWarning={true}
            aria-label="Select car brand"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.sectionData.brand.brandname}>
                {brand.sectionData.brand.brandname || "Unknown Brand"}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Model Dropdown */}
      <div className="flex flex-col w-full sm:w-1/4">
        <label className="text-sm font-semibold text-gray-800 mb-1">
          Model
        </label>
        {isFetching ? (
          <div className="h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : (
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!make}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
            suppressHydrationWarning={true}
            aria-label="Select car model"
          >
            <option value="">Select Model</option>
            {filteredModels.length === 0 && make && (
              <option disabled>No Models Found</option>
            )}
            {filteredModels.map((m) => (
              <option key={m._id} value={m.sectionData.model.name}>
                {m.sectionData.model.name || "Unknown Model"}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* City Dropdown */}
      <div className="flex flex-col w-full sm:w-1/4">
        <label className="text-sm font-semibold text-gray-800 mb-1">
          Location
        </label>
        {isFetching ? (
          <div className="h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : (
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
            suppressHydrationWarning={true}
            aria-label="Select city"
          >
            <option value="">Select Location</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Surat">Surat</option>
            <option value="Rajkot">Rajkot</option>
            <option value="Junagadh">Junagadh</option>
            <option value="Porbander">Porbander</option>
            <option value="Himmatnagar">Himmatnagar</option>
          </select>
        )}
      </div>

      {/* Search Button */}
      <div className="flex items-end w-full sm:w-1/6">
        {isFetching ? (
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md"></div>
        ) : (
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-[#d2ae42] to-[#004c97] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:opacity-90"
            suppressHydrationWarning={true}
            aria-label="Search for cars"
          >
            SEARCH NOW
          </button>
        )}
      </div>
    </div>
  );
}