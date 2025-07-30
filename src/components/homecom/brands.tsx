'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFromAPI } from '@/lib/api';

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

interface CacheData<T> {
  data: T;
  timestamp: number;
}

const LOCAL_STORAGE_CACHE_KEY = 'brandsData'; // Match Header's cache key
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

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        // Check localStorage for cached brand data
        const cachedBrands = getLocalStorageCache<Brand[]>(LOCAL_STORAGE_CACHE_KEY);
        if (cachedBrands) {
          const trendingBrands = cachedBrands.data.filter(
            (item) => item.sectionData.brand.trending === true
          );
       
          setBrands(trendingBrands);
        } else {
          // Fallback to API if no cache
          const result: Brand[] = await fetchFromAPI<Brand>({
            dbName: 'caryanams',
            collectionName: 'brand',
            query: { 'sectionData.brand.trending': true },
            limit: 0,
          });


          if (result && Array.isArray(result)) {
            // Filter client-side for trending brands (redundant but ensures consistency)
            const trendingBrands = result.filter(
              (item) => item.sectionData.brand.trending === true
            );
            setBrands(trendingBrands);
          } else {
            console.warn('No valid brand data found in response:', result);
            setBrands([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch brand images:', error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="py-10 px-3">
      {/* Header aligned to full left */}
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold">
          <span className="text-[#004c97]">Top</span>{' '}
          <span className="text-[#d2ae42]">Brands</span>
        </h2>
        <div className="mt-1">
          <div className="w-20 h-[1px] bg-black mb-[4px]"></div>
          <div className="w-12 h-[1px] bg-black"></div>
        </div>
      </div>

      {/* Content centered */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-[15%] min-w-[100px] aspect-square bg-gray-200 rounded-sm animate-pulse"
              ></div>
            ))
          ) : brands.length > 0 ? (
            brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/buy-used/${encodeURIComponent(
                  brand.sectionData.brand.brandname.toLowerCase()
                )}`}
                className="w-[15%] min-w-[100px] aspect-square bg-white border border-gray-200 rounded-sm flex items-center justify-center hover:shadow-md hover:opacity-100 transition opacity-80"
              >
                <div className="w-2/3 h-2/3 relative">
                  <Image
                    src={brand.sectionData.brand.brandimage}
                    alt={brand.sectionData.brand.brandname}
                    fill
                    className="object-contain"
                    suppressHydrationWarning={true}
                    aria-label={`Brand logo ${brand.sectionData.brand.brandname}`}
                  />
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600">No trending brand images available.</p>
          )}
        </div>
      </div>
    </section>
  );
}