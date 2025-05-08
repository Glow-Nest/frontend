"use client";

import { useState } from "react";
import { useGetAllCategoriesWithServiceQuery } from "@/store/api/serviceApi";
import { ChevronDown } from "lucide-react"; // Optional: lucide-react icons
import { AnimatePresence, motion } from "framer-motion";

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
                className="p-2 text-[#de6412] hover:text-[#a04e12] focus:outline-none cursor-pointer transition-transform duration-300"
              >
                <div
                  className={`transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown size={30} />
                </div>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden flex flex-col md:flex-row gap-6 gap-y-4 justify-center items-center mt-4 px-2"
              >
                {category.mediaUrls?.[0] && (
                  <img
                    src={category.mediaUrls[0]}
                    alt={category.name}
                    className="w-full md:w-96 h-56 rounded-lg object-cover"
                  />
                )}
              
                <div className="flex-1 space-y-3 w-full">
                  {category.services?.map((service) => (
                    <div key={service.serviceId} className="pb-2 border-b">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-medium">{service.name}</span>
                        <span className="text-sm text-gray-700">{service.price} DKK</span>
                      </div>
                      <div className="text-xs text-black-500">{service.formattedDuration}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </section>
  );
}
