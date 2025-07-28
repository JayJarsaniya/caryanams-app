'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchFromAPI } from '@/lib/api';

interface BrandImageItem {
  image: string;
}

interface TopBrandsResponse {
  sectionData: {
    'Top Brand Image Table': {
      imageDetails: BrandImageItem[];
    };
  };
}

export default function Brands() {
  const [brandImages, setBrandImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const result: TopBrandsResponse[] = await fetchFromAPI<TopBrandsResponse>({
          dbName: 'caryanams',
          collectionName: 'topbrandsimages',
          limit: 0,
        });

        console.log('Fetched top brands data:', result);

        const imageDetails: BrandImageItem[] | undefined =
          result?.[0]?.sectionData?.['Top Brand Image Table']?.imageDetails;

        if (imageDetails && Array.isArray(imageDetails)) {
          const images = imageDetails.map((item) => item.image);
          setBrandImages(images);
        } else {
          console.warn('No valid imageDetails found in response:', imageDetails);
          setBrandImages([]);
        }
      } catch (error) {
        console.error('Failed to fetch brand images:', error);
        setBrandImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="py-10 px-13">
      {/* Header aligned to full left */}
      <div className="mb-6 pl-12">
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
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[15%] min-w-[100px] aspect-square bg-gray-200 rounded-sm animate-pulse"
                ></div>
              ))
            : brandImages.length > 0
            ? brandImages.map((image, index) => (
                <div
                  key={index}
                  className="w-[15%] min-w-[100px] aspect-square bg-white border border-gray-200 rounded-sm flex items-center justify-center hover:shadow-md hover:opacity-100 transition opacity-80"
                >
                  <div className="w-2/3 h-2/3 relative">
                    <Image
                      src={image}
                      alt={`Brand ${index + 1}`}
                      fill
                      className="object-contain"
                      suppressHydrationWarning={true}
                      aria-label={`Brand logo ${index + 1}`}
                    />
                  </div>
                </div>
              ))
            : (
              <p className="text-gray-600">No brand images available.</p>
            )}
        </div>
      </div>
    </section>
  );
}
