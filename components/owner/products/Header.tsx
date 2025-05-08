"use client"

import { PlusIcon } from "lucide-react"; 

export function ProductHeader({
  onAddProduct,
}: {
  onAddProduct: () => void;
}) {
  return (
    <div className="px-4 py-3 flex justify-end items-center">
      <div className="flex gap-2">
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 bg-[#dba052] text-white px-5 py-3 rounded shadow hover:bg-[#c48a3a]">
          <PlusIcon size={16} />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );
}