"use client"

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface CreateProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; description: string; imageUrl: string; inventoryCount: number, price: number }) => void;
  }

  export default function CreateProductForm({
    isOpen,
    onClose,
    onSubmit,
  }: CreateProductFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [inventoryCount, setInventoryCount] = useState(0);
    const [price, setPrice] = useState(0);
  
    const handleSubmit = () => {
      if (!name.trim() || !description.trim()) return;
      onSubmit({ name, description, imageUrl, inventoryCount, price });
      resetForm();
      onClose();
    };
  
    const resetForm = () => {
      setName('');
      setDescription('');
      setImageUrl('');
      setInventoryCount(0);
      setPrice(0);
    };
  
    const isValid = name.trim() && description.trim() && imageUrl.trim() && inventoryCount > 0 && price > 0;
  
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 border border-gray-200">
            <DialogTitle className="text-xl font-semibold mb-6 text-[#dba052] flex items-center gap-2">
              Create New Product
            </DialogTitle>
  
            <div className="grid gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Product Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
                  placeholder="Enter Product name"
                />
              </div>
  
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              {/* Price*/}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Price *</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
                  placeholder="Enter product price"
                />
              </div>

              {/* Inventory Count*/}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Inventory Count *</label>
                <input
                  type="text"
                  value={inventoryCount}
                  onChange={(e) => setInventoryCount(Number(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
                  placeholder="Enter inventory count"
                />
              </div>
  
              {/* Media URL  */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Media URL *</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
                  placeholder="https://example.com/image.png"
                />
              </div>
            </div>
  
            {/* Buttons */}
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
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${isValid
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