"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import StarRating from "./starRating";
import { useGetServiceReviewsByIdQuery, ServiceReview } from "@/store/api/serviceReviewApi";
import { useGetFullNameByClientIdQuery } from "@/store/api/clientApi";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; reviewMessage: string; reviewedBy: string }) => void;
  serviceName: string;
  serviceId: string;
}

function ReviewItem({ review }: { review: ServiceReview }) {
  const { data: userData, isLoading: isLoadingUser } = useGetFullNameByClientIdQuery(review.userId);
  const fullName = userData ? `${userData.firstName} ${userData.lastName}` : "Anonymous";

  return (
    <div className="border p-3 rounded-md shadow-sm">
      <div className="text-sm font-semibold text-[#dba052]">
        {isLoadingUser ? "Loading..." : fullName}
      </div>
      <div className="text-xs text-gray-600">{review.reviewMessage}</div>
      <div className="mt-1">
        <StarRating rating={review.rating} onRatingChange={() => {}} />
      </div>
    </div>
  );
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  serviceName,
  serviceId,
}: ReviewModalProps) {
  const user = useSelector((state: RootState) => state.user);
  const [reviewMessage, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState<"read" | "write">("read");

  const { data: reviewsData, isLoading, refetch } = useGetServiceReviewsByIdQuery(serviceId, {
    skip: !serviceId || !isOpen,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isOpen) {
      setMessage("");
      setRating(0);
      refetch();
    }
  }, [isOpen, serviceId, refetch]);

  const handleSubmit = () => {
    if (!user?.id || !reviewMessage.trim()) return;
    onSubmit({ reviewMessage, rating, reviewedBy: user.id });
    setMessage("");
    setRating(0);
    setActiveTab("read");
  };

  const reviews = reviewsData?.reviews?.filter((review) => review.serviceId === serviceId) || [];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 border border-gray-200">
          <DialogTitle className="text-xl font-semibold mb-4 text-[#dba052]">
            {serviceName} Reviews
          </DialogTitle>

          {/* Tabs */}
          <div className="flex space-x-4 mb-4 border-b">
            <button
              className={`pb-2 cursor-pointer${
                activeTab === "read"
                  ? "border-b-2 border-[#dba052] text-[#dba052] cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }`}
              onClick={() => {
                setActiveTab("read");
                refetch();
              }}
            >
              Read Reviews
            </button>
            <button
              className={`pb-2 cursor-pointer${
                activeTab === "write"
                  ? "border-b-2 border-[#dba052] text-[#dba052] cursor-pointer"
                  : "text-gray-600 cursor-pointer"
              }`}
              onClick={() => setActiveTab("write")}
            >
              Write Review
            </button>
          </div>

          {activeTab === "write" ? (
            <>
              {!user?.id && (
                <p className="text-sm text-red-500 mb-4">Please log in to write a review.</p>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review *
                </label>
                <input
                  type="text"
                  value={reviewMessage}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={!user?.id}
                  className={`w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-[#dba052] ${
                    !user?.id ? "cursor-not-allowed opacity-50 bg-gray-100" : ""
                  }`}
                  placeholder="Write your review here"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                <div className={!user?.id ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}>
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-gray-100 text-sm font-medium hover:bg-gray-200 border border-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!reviewMessage.trim() || !user?.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    reviewMessage.trim() && user?.id
                      ? "bg-[#dba052] text-white hover:bg-[#c58e41]"
                      : "bg-gray-300 text-white cursor-not-allowed"
                  }`}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {isLoading ? (
                <p className="text-sm text-gray-500">Loading reviews...</p>
              ) : reviews.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-600 mb-2">
                    No reviews yet for this service.
                  </p>
                  <p className="text-base font-medium text-[#dba052]">
                    Be the first one to share your experience!
                  </p>
                </div>
              ) : (
                reviews.map((review: ServiceReview, idx: number) => (
                  <ReviewItem key={`${review.serviceReviewId}-${idx}`} review={review} />
                ))
              )}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
