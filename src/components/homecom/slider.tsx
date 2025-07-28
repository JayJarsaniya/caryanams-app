"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fetchFromAPI } from "@/lib/api";

// Define the structure of the API response based on actual data
interface ImageItem {
  image: string;
}

interface TopBrandImageTable {
  imageDetails: ImageItem[];
}

interface SectionData {
  "Top Brand Image Table": TopBrandImageTable;
}

interface ApiResponse {
  sectionData?: SectionData;
}

export default function PremiumClients() {
  const [brandImages, setBrandImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getImages = async () => {
      try {
        setLoading(true);
        const res = await fetchFromAPI<ApiResponse>({
          dbName: "caryanams",
          collectionName: "topbrandsimages",
          limit: 0,
        });

        console.log("API Response:", JSON.stringify(res, null, 2));

        const images =
          res[0]?.sectionData?.["Top Brand Image Table"]?.imageDetails || [];

        setBrandImages(images);           
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
