"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchFromAPI } from "@/lib/api";

interface Variant {
  _id: string;
  companyId: string;
  sectionData: {
    newVariants: {
      name: string;
      price: string;
      url: string;
      fuelType: string;
      transmission: string;
    };
  };
}

interface Model {
  _id: string;
  companyId: string;
  sectionData: {
    newModel: {
      name: string;
      price: string;
      type: string;
      range: string;
      variantCount: number;
    };
  };
}

const ModelDetailPage = () => {
  const params = useParams();
  const slugArray = params.slug as string[];
  const modelId = slugArray?.[1];

  const [model, setModel] = useState<Model | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!modelId) return;

    const fetchData = async () => {
      setLoading(true);

      const allModels = await fetchFromAPI<Model>({
        dbName: "caryanams",
        collectionName: "newmodel",
        limit: 0,
      });

      const selectedModel = allModels.find((m) => m._id === modelId);
      setModel(selectedModel || null);

      if (!selectedModel) {
        setLoading(false);
        return;
      }

      const allVariants = await fetchFromAPI<Variant>({
        dbName: "caryanams",
        collectionName: "newvariants",
        limit: 0,
      });

      const modelVariants = allVariants.filter(
        (v) => v.companyId === selectedModel._id
      );
      setVariants(modelVariants);
      setLoading(false);
    };

    fetchData();
  }, [modelId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Skeleton for Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="h-8 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
            <div className="flex space-x-4">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-4 bg-gray-200 animate-pulse rounded w-16"
                  ></div>
                ))}
            </div>
          </div>

          {/* Skeleton for How is the Tata Nexon car? */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-4 w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="h-5 bg-gray-200 animate-pulse rounded mb-2 w-1/4"></div>
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-4 bg-gray-200 animate-pulse rounded mb-2"
                    ></div>
                  ))}
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="h-5 bg-gray-200 animate-pulse rounded mb-2 w-1/4"></div>
                {Array(2)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-4 bg-gray-200 animate-pulse rounded mb-2"
                    ></div>
                  ))}
              </div>
            </div>
          </div>

          {/* Skeleton for Engine Specifications */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-4 w-1/3 flex items-center">
              <div className="h-4 bg-gray-200 animate-pulse rounded ml-2 w-1/6"></div>
            </div>
            <div className="flex space-x-2 mb-4">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-8 bg-gray-200 animate-pulse rounded-full w-32"
                  ></div>
                ))}
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="h-5 bg-gray-200 animate-pulse rounded mb-2 w-1/6"></div>
              {Array(1)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-4 bg-gray-200 animate-pulse rounded mb-2"
                  ></div>
                ))}
            </div>
          </div>

          {/* Skeleton for Pricing Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-4 w-1/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded mb-4 w-1/2"></div>
            <div className="flex space-x-2 mb-4">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-8 bg-gray-200 animate-pulse rounded-full w-20"
                  ></div>
                ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border-b"></th>
                    <th className="p-2 border-b"></th>
                    <th className="p-2 border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  {Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">
                          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                        </td>
                        <td className="p-2">
                          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                        </td>
                        <td className="p-2">
                          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Skeleton for Convenience, Safety, Exterior */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="h-6 bg-gray-200 animate-pulse rounded mb-4 w-1/2 flex items-center">
                    <div className="h-4 bg-gray-200 animate-pulse rounded ml-2 w-1/6"></div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="h-5 bg-gray-200 animate-pulse rounded mb-2 w-1/6"></div>
                    {Array(2)
                      .fill(null)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className="h-4 bg-gray-200 animate-pulse rounded mb-2"
                        ></div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Static content to display if no data or images are available
  const staticContent = {
    pros: [
      "It has a five-star safety rating and six airbags are standard.",
      "The overall design is modern and it has lots of modern features.",
      "The diesel has strong mid-range and CNG performance is uncompromised.",
      "It offers a comfortable ride and stable high-speed manners.",
      "The Nexon CNG has boot space similar to the petrol/diesel versions.",
    ],
    cons: [
      "The diesel engine can do with more refinement.",
      "The fit and finish in some areas are not aligned with the rest of the car.",
    ],
    engineSpecs: {
      positives: [
        "It has a 113bhp/260Nm 1,497cc, four-cylinder, turbocharged diesel engine that uses either a six-speed manual or six-speed AMT transmission.",
      ],
    },
    convenience: {
      positives: [
        "It has an electric sunroof that can be operated with voice commands and an air purifier.",
      ],
    },
    safety: {
      positives: [
        "The Tata Nexon has received a five-star safety rating from the BNCAP authorities.",
        "Six airbags are standard on this SUV and also has features like a blind-view monitor, auto headlamps, and rain-sensing wipers.",
      ],
    },
    exterior: {
      positives: [
        "It has LED DRLs and headlamps, dual-tone roof, and stylish diamond-cut alloys with aero inserts.",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {model?.sectionData.newModel.name || "Tata Nexon"}
          </h1>
          <p className="text-gray-600 mb-4">
            {model?.sectionData.newModel.type
              ? `Type: ${model.sectionData.newModel.type} | Price: ${model.sectionData.newModel.price} | Variants: ${model.sectionData.newModel.variantCount}`
              : "A spacious and comfortable compact SUV with modern features and a five-star safety rating."}
          </p>
          <div className="flex space-x-4 text-sm text-gray-600">
            <a href="#overview" className="hover:text-blue-600">
              Overview
            </a>
            <a href="#variants" className="hover:text-blue-600">
              Variants
            </a>
            <a href="#offers" className="hover:text-blue-600">
              Offers
            </a>
            <a href="#similar" className="hover:text-blue-600">
              Similar Cars
            </a>
            <a href="#colours" className="hover:text-blue-600">
              Colours
            </a>
          </div>
        </div>

        {/* How is the Tata Nexon car? Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6" id="overview">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            How is the Tata Nexon car?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-green-600 mb-2">Pros</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {variants.length > 0
                  ? staticContent.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))
                  : staticContent.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-orange-600 mb-2">Cons</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {variants.length > 0
                  ? staticContent.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))
                  : staticContent.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Nexon Engine Specifications */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            Nexon Engine Specifications
            <span className="ml-2 text-green-600 text-sm">
              3.9 Expert Rating | 4.5 User Rating (624)
            </span>
          </h2>
          <div className="flex space-x-2 mb-4">
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Diesel 1497cc Turbo
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              CNG 1199cc Turbo
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Petrol 1199cc Turbo
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Positives:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {variants.length > 0
                ? staticContent.engineSpecs.positives.map((pos, index) => (
                    <li key={index}>{pos}</li>
                  ))
                : staticContent.engineSpecs.positives.map((pos, index) => (
                    <li key={index}>{pos}</li>
                  ))}
            </ul>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6" id="variants">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tata Nexon Price
          </h2>
          <p className="text-gray-600 mb-4">
            Tata Nexon price for the base model starts at Rs. 8.00 Lakh and the
            top model price goes upto Rs. 15.60 Lakh (Avg. ex-showroom).
          </p>
          <div className="flex space-x-2 mb-4">
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Petrol
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              CNG
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Diesel
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Manual
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Automatic (AMT)
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Automatic (DCT)
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border-b">Variants</th>
                  <th className="p-2 border-b">Ex-Showroom Price</th>
                  <th className="p-2 border-b">Compare</th>
                </tr>
              </thead>
              <tbody>
                {variants.length > 0 ? (
                  variants.map((variant) => (
                    <tr key={variant._id} className="border-b">
                      <td className="p-2">
                        {variant.sectionData.newVariants.name}
                      </td>
                      <td className="p-2">
                        {variant.sectionData.newVariants.price}
                      </td>
                      <td className="p-2">
                        <input type="checkbox" className="mr-2" /> Compare
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      No variants available. Base price starts at Rs. 8.00 Lakh,
                      top model at Rs. 15.60 Lakh.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Convenience, Safety, and Exterior Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Convenience and Technology */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              Nexon Convenience and Technology
              <span className="ml-2 text-green-600 text-sm">
                4.0 Expert Rating | 4.5 User Rating (624)
              </span>
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Positives:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {variants.length > 0
                  ? staticContent.convenience.positives.map((pos, index) => (
                      <li key={index}>{pos}</li>
                    ))
                  : staticContent.convenience.positives.map((pos, index) => (
                      <li key={index}>{pos}</li>
                    ))}
              </ul>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              Nexon Safety
              <span className="ml-2 text-green-600 text-sm">4.0 Expert Rating</span>
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Positives:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {variants.length > 0
                  ? staticContent.safety.positives.map((pos, index) => (
                      <li key={index}>{pos}</li>
                    ))
                  : staticContent.safety.positives.map((pos, index) => (
                      <li key={index}>{pos}</li>
                    ))}
              </ul>
            </div>
          </div>

          {/* Exterior and Interior Styling */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              Nexon Exterior and Interior Styling
              <span className="ml-2 text-green-600 text-sm">
                4.0 Expert Rating | 4.7 User Rating (624)
              </span>
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Positives:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {variants.length > 0
                  ? staticContent.exterior.positives.map((pos, index) => (
                      <li key={index}>{pos}</li>
                    ))
                  : staticContent.exterior.positives.map((pos, index) => (
                      <li key={index}>{pos}</li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailPage;