"use client"

import { useState } from "react";
import { ProductHeader } from "@/components/owner/products/Header";
import CreateProductForm from "./AddProductModal"
import { useCreateProductMutation } from "@/store/api/productApi";

export function ProductLayout() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleAddProduct = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSubmitProduct = async (data: { 
    name: string; 
    description: string; 
    imageUrl: string; 
    inventoryCount: number;
    price: number;
  }) => {
    try {
      await createProduct({
        Name: data.name,
        Description: data.description,
        ImageUrl: data.imageUrl,
        InventoryCount: data.inventoryCount,
        Price: data.price
      }).unwrap(),
      {
        loading: "Creating product...",
        success: "Product created successfully!",
        error: (err: any) =>
          err?.data?.[0]?.message || "Failed to create product.",
      }
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <>
      <ProductHeader onAddProduct={handleAddProduct} />
      
      <CreateProductForm
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
      />
    </>
  );
}