"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fetchFromAPI } from "@/lib/api";

interface Brand {
  _id: string;
  sectionData: {
    brand: {
      brandname: string;
      brandimage: string;
      trending?: boolean;
    };
  };
}

interface ImageItem {
  image: string;
}

interface CacheData<T> {
  data: T;
  timestamp: number;
}

const LOCAL_STORAGE_CACHE_KEY = "brandsData"; // Match Header's cache key
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours, matching Header

const getLocalStorageCache = <T,>(key: string): CacheData<T> | null => {
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

export default function PremiumClients() {
  const [brandImages, setBrandImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getImages = async () => {
      try {
        setLoading(true);

        // Check localStorage for cached brand data
        const cachedBrands = getLocalStorageCache<Brand[]>(
          LOCAL_STORAGE_CACHE_KEY
        );
        if (cachedBrands) {
          const trendingBrands = cachedBrands.data.filter(
            (item) => item.sectionData.brand.trending === true
          );
          const images = trendingBrands
            .filter((brand) => brand.sectionData.brand.brandimage)
            .map((brand) => ({ image: brand.sectionData.brand.brandimage }));
          console.log(
            "Using localStorage brands cache (filtered trending):",
            images.map((item) => item.image)
          );
          setBrandImages(images);
        } else {
          // Fallback to API if no cache
          const result: Brand[] = await fetchFromAPI<Brand>({
            dbName: "caryanams",
            collectionName: "brand",
            filters: { "sectionData.brand.trending": true },
            limit: 0,
          });

          console.log(
            "Fetched brands data from API (filtered trending):",
            result.map((brand) => ({
              _id: brand._id,
              brandname: brand.sectionData.brand.brandname,
              brandimage: brand.sectionData.brand.brandimage,
              trending: brand.sectionData.brand.trending,
            }))
          );

          if (result && Array.isArray(result)) {
            const images = result
              .filter((brand) => brand.sectionData.brand.brandimage)
              .map((brand) => ({ image: brand.sectionData.brand.brandimage }));
            setBrandImages(images);
          } else {
            console.warn("No valid brand data found in response:", result);
            setBrandImages([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch brand images:", err);
        setBrandImages([]);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    const itemCount = brandImages.length;
    if (!slider || itemCount < 5) return;

    let currentIndex = 0;

    const interval = setInterval(() => {
      const itemWidth = slider.offsetWidth / 5;
      currentIndex = (currentIndex + 1) % (itemCount - 4);

      slider.scrollTo({
        left: currentIndex * itemWidth,
        behavior: "smooth",
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [brandImages]);

  return (
    <section className="py-10 px-6 bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Text Section */}
        <div className="md:w-1/3 text-left pl-20 shrink-0">
          <p className="italic text-gray-600 text-sm">Why Choose Us</p>
          <h2 className="text-2xl font-bold text-gray-900 uppercase">
            Our Premium Clients
          </h2>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="md:w-2/3 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          <div className="flex gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[18%] min-w-[18%] h-24 bg-gray-300 animate-pulse rounded-md shrink-0"
                  />
                ))
              : brandImages.map((item, index) => (
                  <div
                    key={index}
                    className="w-[18%] min-w-[18%] h-24 flex items-center justify-center shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={`Client ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
