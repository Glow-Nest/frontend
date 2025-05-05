"use client";

import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Pen } from 'lucide-react';

interface CreateCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; mediaUrl?: string }) => void;
}

export default function CreateCategoryForm({
  isOpen,
  onClose,
  onSubmit,
}: CreateCategoryFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrls, setMediaUrl] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) return;
    onSubmit({ name, description, mediaUrl: mediaUrls || undefined });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setMediaUrl('');
  };

  const isValid = name.trim() && description.trim();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 border border-gray-200">
          <DialogTitle className="text-xl font-semibold mb-6 text-[#dba052] flex items-center gap-2">
            <Pen className="w-5 h-5" />
            Create New Category
          </DialogTitle>

          <div className="grid gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
                placeholder="Enter category name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#dba052]"
                placeholder="Enter category description"
                rows={3}
              />
            </div>

            {/* Media URL (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Media URL (optional)</label>
              <input
                type="text"
                value={mediaUrls}
                onChange={(e) => setMediaUrl(e.target.value)}
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


