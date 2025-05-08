"use client";

import React, { useState } from "react";
import { Plus, ChevronDown, Pencil } from "lucide-react";
import {
  useAddServiceToCategoryMutation,
  useCreateCategoryMutation,
  useGetAllCategoriesWithServiceQuery,
  useUpdateCategoryMutation,
  useUpdateServiceMutation
} from "@/store/api/serviceApi";
import CreateCategoryModal from "./CreateCategory";
import CreateServiceForm from "./AddService";
import UpdateCategoryForm from "./UpdateCategory";
import UpdateServiceForm from "./UpdateService";
import { AnimatePresence, motion } from "framer-motion";
import type { Category, Service } from "libs/types/ServiceCategory";


export default function ServiceCategoryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [editServiceModalOpen, setEditServiceModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentService, setCurrentService] = useState<Service & { categoryId: string } | null>(null);
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  
  const { data: categoryData, refetch } = useGetAllCategoriesWithServiceQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [addServiceToCategory] = useAddServiceToCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [updateService] = useUpdateServiceMutation();

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

  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setEditCategoryModalOpen(true);
  };

  const handleEditService = (service: Service, categoryId: string) => {
    setCurrentService({ ...service, categoryId });
    setEditServiceModalOpen(true);
  };

  const submitCategoryEdit = async (data: { name: string; description: string; mediaUrl?: string }) => {
    if (!currentCategory) return;
    
    try {
      await updateCategory({
        Id: currentCategory.categoryId,
        Name: data.name,
        Description: data.description,
        MediaUrls: data.mediaUrl ? [data.mediaUrl] : currentCategory.mediaUrls || [],
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update category", err);
    } finally {
      setEditCategoryModalOpen(false);
      setCurrentCategory(null);
    }
  };

  const submitServiceEdit = async ({
    name,
    price,
    duration,
  }: {
    name: string;
    price: number;
    duration: string;
  }) => {
    if (!currentService) return;
    
    try {
      await updateService({
        CategoryId: currentService.categoryId,
        ServiceId: currentService.serviceId,
        Name: name,
        price: price,
        duration: duration,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update service", error);
    } finally {
      setEditServiceModalOpen(false);
      setCurrentService(null);
    }
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
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-[#dba052]">{cat.name}</h3>
                      <button 
                        onClick={() => handleEditCategory(cat)}
                        className="p-1 text-gray-500 hover:text-[#dba052] focus:outline-none"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => toggleCategory(cat.categoryId)}
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
                  <p className="text-gray-600">{cat.description}</p>
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
                      {cat.mediaUrls?.[0] && (
                        <img
                          src={cat.mediaUrls[0]}
                          alt={cat.name}
                          className="w-full md:w-96 h-56 rounded-lg object-cover"
                        />
                      )}
                    
                      <div className="flex-1 space-y-3">
                        {cat.services?.map((service) => (
                          <div key={service.serviceId} className="pb-2 border-b">
                            <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-800 font-medium">{service.name}</span>
                              <button 
                                    onClick={() => handleEditService(service, cat.categoryId)}
                                    className="p-1 text-gray-500 hover:text-[#dba052] focus:outline-none"
                                  >
                                    <Pencil size={14} />
                                  </button>
                            </div>
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

      {/* Update Category Modal */}
      {currentCategory && (
        <UpdateCategoryForm
          isOpen={editCategoryModalOpen}
          onClose={() => {
            setEditCategoryModalOpen(false);
            setCurrentCategory(null);
          }}
          onSubmit={submitCategoryEdit}
          category={currentCategory}
        />
      )}

      


      {/* Update Service Modal */}
      {currentService && (
        <UpdateServiceForm
          isOpen={editServiceModalOpen}
          onClose={() => {
            setEditServiceModalOpen(false);
            setCurrentService(null);
          }}
          onSubmit={submitServiceEdit}
          service={currentService}
        />
      )}
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