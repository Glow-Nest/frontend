"use client";

import { useGetAllProductsQuery, useGetProductsByNameQuery } from '@/store/api/productApi';
import SearchBar from './searchBar'
import React, { useEffect, useState } from 'react';
import ProductPagination from './productionPagination';
import toast from 'react-hot-toast';
import ProductCard from './productCard';

function ProductsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 20;

    // Default products query
    const { 
        data: allProductsData, 
        isLoading: isAllProductsLoading, 
        isError: isAllProductsError 
    } = useGetAllProductsQuery(
        { page: currentPage, pageSize },
        { 
            selectFromResult: (res) => res,
            skip: searchQuery !== ''
        }
    );

    const { 
        data: searchProductsData, 
        isLoading: isSearchLoading,
        isError: isSearchError 
    } = useGetProductsByNameQuery(
        { productName: searchQuery },
        { 
            skip: searchQuery === '' 
        }
    );

    const productsToShow = searchQuery 
  ? searchProductsData?.products 
  : allProductsData?.products;

    
    const isLoading = searchQuery ? isSearchLoading : isAllProductsLoading;
    const isError = searchQuery ? isSearchError : isAllProductsError;

    useEffect(() => {
        if (isLoading) {
            toast.loading("Loading products...", { id: "loading-toast" });
        } else {
            toast.dismiss("loading-toast");
        }
    }, [isLoading]);

    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };  

    if (isAllProductsLoading) return null;

    return (
        <section className="w-full px-4 sm:px-6 md:px-10">
            <h2 className="text-2xl font-bold mb-6">Products</h2>
            <SearchBar onSearch={handleSearch} />

            <div className="flex justify-center">
                {productsToShow && productsToShow.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl">
                        {productsToShow.map((product) => (
                            <ProductCard
                                key={product.productId}
                                id={product.productId}
                                name={product.name}
                                price={product.price}
                                imageUrl={product.imageUrl} 
                                onAddToCart={() => {
                                    console.log("Add to cart:", product.productId);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        {isError ? "Error loading products" : "No products found"}
                    </p>
                )}
            </div>

            {!searchQuery && (
                <div className="mt-10 flex justify-center">
                    <ProductPagination
                        currentPage={currentPage}
                        totalPages={Math.ceil((allProductsData?.totalCount ?? 0) / pageSize)}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </section>
    );
}

export default ProductsList;