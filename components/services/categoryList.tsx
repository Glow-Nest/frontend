"use client";

import { useState } from "react";
import { useGetAllCategoriesWithServiceQuery } from "@/store/api/serviceApi";
import { ChevronDown, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateServiceReviewMutation } from "@/store/api/serviceReviewApi";
import ReviewModal from "./reviewModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type OpenCategories = Record<string, boolean>;

export function CategoryServiceSection() {
  const { data, isLoading, isError } = useGetAllCategoriesWithServiceQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    serviceId: string;
    serviceName: string;
  } | null>(null);

  const user = useSelector((state: RootState) => state.user);
  const [createReview, { isLoading: isSubmitting }] = useCreateServiceReviewMutation();
  const [openCategories, setOpenCategories] = useState<OpenCategories>({});

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openReviewModal = (serviceId: string, serviceName: string) => {
    setSelectedService({ serviceId, serviceName });
    setModalOpen(true);
  };

  const handleWriteReview = async ({
    rating,
    reviewMessage,
    reviewedBy,
  }: {
    rating: number;
    reviewMessage: string;
    reviewedBy: string;
  }) => {
    if (!selectedService) return;
    try {
      await createReview({
        ReviewById: reviewedBy,
        Rating: rating,
        ReviewMessage: reviewMessage,
        ServiceId: selectedService.serviceId,
      }).unwrap();
      
    } catch (error) {
      console.error("Failed to create review:", error);
    } finally {
      // Close the modal after submission (success or failure)
      setModalOpen(false);
      
      // Reset the selected service to ensure fresh data on next open
      setTimeout(() => {
        const currentServiceId = selectedService.serviceId;
        const currentServiceName = selectedService.serviceName;
        setSelectedService(null);
        
        // Re-open with the same service to force a fresh load
        setTimeout(() => {
          setSelectedService({
            serviceId: currentServiceId,
            serviceName: currentServiceName
          });
          setModalOpen(true);
        }, 300);
      }, 300);
    }
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
                className="p-2 text-[#de6412] hover:text-[#a04e12] focus:outline-none"
              >
                <div className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300 cursor-pointer`}>
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
                          <div className="flex items-center gap-2">
      <span className="text-gray-800 font-medium">{service.name}</span>

      {/* Review Icon */}
      <MessageSquare
        size={18}
        className={`text-[#de6412] hover:text-[#a04e12] cursor-pointer`}
        onClick={() =>
          openReviewModal(service.serviceId, service.name)
        }
      />
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
      })}

      {selectedService && (
        <ReviewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleWriteReview}
          serviceName={selectedService.serviceName}
          serviceId={selectedService.serviceId}
        />
      )}
    </section>
  );
}