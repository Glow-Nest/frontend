"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Plus } from "lucide-react";

interface Service {
    serviceId: string;
    name: string;
    price: number;
    duration: string;
    formattedDuration?: string;
    categoryId: string;
  }

interface UpdateServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; price: number; duration: string }) => void;
  service: Service;
}

export default function CreateServiceForm({
  isOpen,
  onClose,
  onSubmit,
  service
}: UpdateServiceFormProps) {
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (service) {
      setName(service.name);
      setPrice(service.price);
      setDuration(service.duration);
    }
  }, [service]);

  const handleSubmit = () => {
    if (!categoryId || !name.trim() || !price || !duration.trim()) return;
    onSubmit({ name, price: Number(price), duration });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCategoryId("");
    setName("");
    setPrice("");
    setDuration("");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 border border-gray-200">
          <DialogTitle className="text-xl font-semibold mb-6 text-[#dba052] flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Update Service
          </DialogTitle>

          <div className="grid gap-4">

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
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                "bg-[#dba052] text-white hover:bg-[#c58e41]"
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
