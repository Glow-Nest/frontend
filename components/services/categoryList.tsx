"use client";

import { useState } from "react";
import { formatDuration, convertMinutesStringToDuration } from "libs/helpers";
import { useGetAllCategoriesWithServiceQuery } from "@/store/api/serviceApi";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"; // Optional: lucide-react icons

// Explicit type definition for openCategories state
type OpenCategories = Record<string, boolean>;

export function CategoryServiceSection() {
  const { data, isLoading, isError } = useGetAllCategoriesWithServiceQuery();

  const [openCategories, setOpenCategories] = useState<OpenCategories>({});

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading services...</p>;
  if (isError) return <p className="text-center text-red-500">Error fetching services.</p>;

  const formatFlexibleDuration = (duration: string) => {
    if (duration.includes(":")) return formatDuration(duration);
    const minutes = parseInt(duration, 10);
    return !isNaN(minutes) ? convertMinutesStringToDuration(minutes) : duration;
  };

  return (
    <section className="max-w-6xl mx-auto mt-1 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#dba052] mb-10 tracking-wider">
        Discover your personal style
      </h2>

      {data?.categories.map((category) => {
        const categoryId = category.categoryId; 
        const isOpen = openCategories[categoryId] ?? true;

        return (
          <div key={categoryId} className="mb-16">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#de6412] mb-1">{category.name}</h2>
                <p className="text-gray-700 mb-2">{category.description}</p>
              </div>

              <button
                onClick={() => toggleCategory(categoryId)}
                className="p-2 text-[#de6412] hover:text-[#a04e12] focus:outline-none cursor-pointer"
              >
                {isOpen ? (
                  <ChevronDown size={30} />
                ) : (
                  <ChevronLeft size={30} />
                )}
              </button>
            </div>

            {isOpen && (
              <div className="flex gap-6 justify-center items-center mt-2">
                {category.mediaUrls?.[0] && (
                  <img
                    src={category.mediaUrls[0]}
                    alt={category.name}
                    className="w-96 h-56 rounded-lg object-cover"
                  />
                )}

                <div className="flex-1 space-y-3">
                  {category.services?.map((service) => (
                    <div key={service.serviceId} className="pb-2 border-b">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-medium">{service.name}</span>
                        <span className="text-sm text-gray-700">{service.price} DKK</span>
                      </div>
                      <div className="text-xs text-black-500">
                        {formatFlexibleDuration(service.duration)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
