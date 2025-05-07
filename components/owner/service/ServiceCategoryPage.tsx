"use client";

import React, { useState } from "react";
import { Plus, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import {
  useAddServiceToCategoryMutation,
  useCreateCategoryMutation,
  useGetAllCategoriesWithServiceQuery,
} from "@/store/api/serviceApi";
import CreateCategoryModal from "./CreateCategory";
import CreateServiceForm from "./AddService";
import { formatDuration, convertMinutesStringToDuration } from "libs/helpers";
import { AnimatePresence, motion } from "framer-motion";

interface Category {
  categoryId: string;
  name: string;
  description: string;
  mediaUrls?: string[];
  services?: {
    name: string;
    price: number;
    duration: string;
  }[];
}

export default function ServiceCategoryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const { data: categoryData, refetch } = useGetAllCategoriesWithServiceQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [addServiceToCategory] = useAddServiceToCategoryMutation();

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleAddCategory = async (data: { name: string; description: string; mediaUrls?: string }) => {
    try {
      await createCategory({
        Name: data.name,
        Description: data.description,
        MediaUrls: data.mediaUrls ? [data.mediaUrls] : [],
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to create category", err);
    } finally {
      setModalOpen(false);
    }
  };

  const handleAddService = async ({
    categoryId,
    name,
    price,
    duration,
  }: {
    categoryId: string;
    name: string;
    price: number;
    duration: string;
  }) => {
    try {
      await addServiceToCategory({ categoryId, name, price, duration }).unwrap();
      refetch();
      setServiceModalOpen(false);
    } catch (error) {
      console.error("Failed to add service", error);
    }
  };

  const formatFlexibleDuration = (duration: string) => {
      if (duration.includes(":")) return formatDuration(duration);
      const minutes = parseInt(duration, 10);
      return !isNaN(minutes) ? convertMinutesStringToDuration(minutes) : duration;
    };

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <Header
          onAddCategory={() => setModalOpen(true)}
          onAddService={() => setServiceModalOpen(true)}
        />
        <div className="p-6 space-y-6">
          {categoryData?.categories?.length ? (
            categoryData.categories.map((cat) => {
              const isOpen = openCategories[cat.categoryId] ?? true;

              return (
                <div key={cat.categoryId} className="border rounded p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#dba052]">{cat.name}</h3>
                    <button onClick={() => toggleCategory(cat.categoryId)}
                    className="p-2 text-[#de6412] hover:text-[#a04e12] focus:outline-none cursor-pointer transition-transform duration-300">
                      <div className={`transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      >
                        <ChevronDown size={30} />
                        </div>
                        </button>
                        </div>
                        <p className="text-gray-600">{cat.description}</p>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden flex gap-6 justify-center items-center mt-2">
                              {cat.mediaUrls?.[0] && (
                                <img
                                src={cat.mediaUrls[0]}
                                alt={cat.name}
                                className="w-96 h-56 rounded-lg object-cover"/>
                                )}
                                
                                <div className="flex-1 space-y-3">
                                  {cat.services?.map((service) => (
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
                                </motion.div>
                              )}
                        </AnimatePresence>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No categories found.</p>
          )}
        </div>
      </div>

      {/* Create Category Modal */}
      <CreateCategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddCategory}
      />

      {/* Add Service Modal */}
      <CreateServiceForm
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        onSubmit={({ categoryId, name, price, duration }) =>
          handleAddService({ categoryId, name, price, duration })
        }
        categories={categoryData?.categories || []}
      />
    </div>
  );
}

function Header({
  onAddCategory,
  onAddService,
}: {
  onAddCategory: () => void;
  onAddService: () => void;
}) {
  return (
    <div className="px-4 py-3 flex justify-end items-center">
      <div className="flex gap-2">
        <button
          onClick={onAddCategory}
          className="flex items-center gap-2 bg-[#dba052] text-white px-5 py-3 rounded shadow hover:bg-[#c48a3a]"
        >
          <Plus size={16} /> Add Category
        </button>
        <button
          onClick={onAddService}
          className="flex items-center gap-2 bg-[#dba052] text-white px-5 py-3 rounded shadow hover:bg-[#c48a3a]"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>
    </div>
  );
}
