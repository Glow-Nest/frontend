"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Plus } from "lucide-react";

interface CreateServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { categoryId: string; name: string; price: number; duration: string }) => void;
  categories: { categoryId: string; name: string }[];
}

export default function CreateServiceForm({
  isOpen,
  onClose,
  onSubmit,
  categories,
}: CreateServiceFormProps) {
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [duration, setDuration] = useState("");

  const handleSubmit = () => {
    if (!categoryId || !name.trim() || !price || !duration.trim()) return;
    onSubmit({ categoryId, name, price: Number(price), duration });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCategoryId("");
    setName("");
    setPrice("");
    setDuration("");
  };

  const isValid = categoryId && name.trim() && price && duration.trim();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 border border-gray-200">
          <DialogTitle className="text-xl font-semibold mb-6 text-[#dba052] flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Service
          </DialogTitle>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Service Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Price *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Duration *</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
                placeholder="e.g. 30 min"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 text-sm font-medium hover:bg-gray-200 border border-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                isValid
                  ? "bg-[#dba052] text-white hover:bg-[#c58e41]"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
