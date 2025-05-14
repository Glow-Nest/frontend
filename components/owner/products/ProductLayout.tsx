"use client"

import { useState, useEffect } from "react";
import { ProductHeader } from "@/components/owner/products/Header";
import CreateProductForm from "./AddProductModal";
import UpdateProductForm from "./UpdateProduct";
import ConfirmationDialog from "../service/DeleteConfirmationModal";
import SalonOwnerProductCard from "./ProductCardOwner";
import { 
  useCreateProductMutation, 
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useUpdateProductNameMutation,
  useUpdateProductDescriptionMutation,
  useUpdateProductImageUrlMutation,
  useUpdateProductInventoryCountMutation,
  useUpdateProductPriceMutation,
  useDeleteProductMutation
} from "@/store/api/productApi";

interface Product {
  productId: string;
  name: string;
  description: string;
  imageUrl: string;
  inventoryCount: number;
  price: number;
}

type ProductSummary = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductLayout() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetails, setProductDetails] = useState<{[key: string]: Product}>({});
  
  // Get all products (summary)
  const { data: productsData, isLoading: isLoadingProducts, refetch } = 
    useGetAllProductsQuery({ page: 1, pageSize: 100 });
  const productSummaries = productsData?.products || [];
  
  // Function to get full product details
  const [getProductById] = useLazyGetProductByIdQuery();
  
  useEffect(() => {
    // Fetch full details for each product summary
    const fetchProductDetails = async () => {
      const details: {[key: string]: Product} = {};
      
      for (const product of productSummaries) {
        try {
          const result = await getProductById({ productId: product.productId }).unwrap();
          if (result) {
            details[product.productId] = {
              ...result,
              productId: product.productId
            };
          }
        } catch (error) {
          console.error(`Failed to fetch details for product ${product.productId}:`, error);
        }
      }
      
      setProductDetails(details);
    };
    
    if (productSummaries.length > 0) {
      fetchProductDetails();
    }
  }, [productSummaries, getProductById]);
  
  const [createProduct] = useCreateProductMutation();
  const [updateProductName] = useUpdateProductNameMutation();
  const [updateProductDescription] = useUpdateProductDescriptionMutation();
  const [updateProductImageUrl] = useUpdateProductImageUrlMutation();
  const [updateProductInventoryCount] = useUpdateProductInventoryCountMutation();
  const [updateProductPrice] = useUpdateProductPriceMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Handle Add Product
  const handleAddProduct = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
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
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        inventoryCount: data.inventoryCount,
        price: data.price
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  // Handle Edit Product
  const handleEditProduct = async (productSummary: ProductSummary) => {
    let fullProduct = productDetails[productSummary.productId];
    
    // If we don't have the full product details yet, fetch them
    if (!fullProduct) {
      try {
        const productData = await getProductById({ productId: productSummary.productId }).unwrap();
        fullProduct = {
          ...productData,
          productId: productSummary.productId
        };
        // Update our cache
        setProductDetails(prev => ({
          ...prev,
          [productSummary.productId]: fullProduct
        }));
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        return;
      }
    }
    
    setSelectedProduct(fullProduct);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateProduct = async (data: { 
    name: string; 
    description: string; 
    imageUrl: string; 
    inventoryCount: number;
    price: number;
  }) => {
    if (!selectedProduct) return;
    
    try {
      // Use separate update APIs for each field
      const updatePromises = [];
      
      // Update name if changed
      if (data.name !== selectedProduct.name) {
        updatePromises.push(
          updateProductName({ 
            Id: selectedProduct.productId, 
            Name: data.name 
          }).unwrap()
        );
      }
      
      // Update description if changed
      if (data.description !== selectedProduct.description) {
        updatePromises.push(
          updateProductDescription({ 
            Id: selectedProduct.productId, 
            Description: data.description 
          }).unwrap()
        );
      }
      
      // Update imageUrl if changed
      if (data.imageUrl !== selectedProduct.imageUrl) {
        updatePromises.push(
          updateProductImageUrl({ 
            Id: selectedProduct.productId, 
            ImageUrl: data.imageUrl 
          }).unwrap()
        );
      }
      
      // Update inventoryCount if changed
      if (data.inventoryCount !== selectedProduct.inventoryCount) {
        updatePromises.push(
          updateProductInventoryCount({ 
            Id: selectedProduct.productId, 
            InventoryCount: data.inventoryCount 
          }).unwrap()
        );
      }
      
      // Update price if changed
      if (data.price !== selectedProduct.price) {
        updatePromises.push(
          updateProductPrice({ 
            productId: selectedProduct.productId, 
            Price: data.price 
          }).unwrap()
        );
      }
      
      // Wait for all updates to complete
      await Promise.all(updatePromises);
      
      // Update our local cache
      if (updatePromises.length > 0) {
        const updatedProduct = {
          ...selectedProduct,
          ...data
        };
        setProductDetails(prev => ({
          ...prev,
          [selectedProduct.productId]: updatedProduct
        }));
      }
      
      refetch();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  // Handle Delete Product
  const handleDeleteClick = (productSummary: ProductSummary) => {
    const fullProduct = productDetails[productSummary.productId] || {
      ...productSummary,
      description: "",
      inventoryCount: 0
    };
    
    setSelectedProduct(fullProduct);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    
    try {
      await deleteProduct({ Id: selectedProduct.productId }).unwrap();
      
      // Remove from our local cache
      const newProductDetails = { ...productDetails };
      delete newProductDetails[selectedProduct.productId];
      setProductDetails(newProductDetails);
      
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
      refetch();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  // Determine if we're still loading initial data
  const isInitialLoading = isLoadingProducts || 
    (productSummaries.length > 0 && Object.keys(productDetails).length === 0);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 10px)" }}>
      <ProductHeader onAddProduct={handleAddProduct} />
      
      <div className="flex-1 p-6 overflow-y-auto">
        {isInitialLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : productSummaries.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No products found. Add some products to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {productSummaries.map((productSummary: ProductSummary) => {
              // Find full product details if available
              const fullProduct = productDetails[productSummary.productId];
              
              return (
                <SalonOwnerProductCard
                  key={productSummary.productId}
                  id={productSummary.productId}
                  name={productSummary.name}
                  price={productSummary.price}
                  imageUrl={productSummary.imageUrl}
                  // Use default values if full product details aren't loaded yet
                  inventory={fullProduct?.inventoryCount || 0}
                  description={fullProduct?.description || "Loading product details..."}
                  onEdit={() => handleEditProduct(productSummary)}
                  onDelete={() => handleDeleteClick(productSummary)}
                />
              );
            })}
          </div>
        )}
      </div>
      
      {/* Create Product Modal */}
      <CreateProductForm
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleSubmitProduct}
      />
      
      {/* Update Product Modal */}
      {selectedProduct && (
        <UpdateProductForm
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateProduct}
          product={selectedProduct}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete ${selectedProduct?.name}? This action cannot be undone.`}
      />
    </div>
  );
}