"use client";

import { useGetAllProductsQuery, useGetProductsByNameQuery } from '@/store/api/productApi';
import SearchBar from './searchBar'
import React, { useEffect, useMemo, useState } from 'react';
import ProductPagination from './productionPagination';
import toast from 'react-hot-toast';
import ProductCard from './productCard';

function ProductsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('featured');
    const pageSize = 20;

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
        { skip: searchQuery === '' }
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

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const sortedProducts = useMemo(() => {
        if (!productsToShow) return [];

        const sorted = [...productsToShow];

        switch (sortOption) {
            case 'price_low_high':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price_high_low':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name_asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name_desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return sorted;
        }
    }, [productsToShow, sortOption]);

    return (
        <section className="w-full sm:px-6 md:px-10">
            {/* Responsive Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl font-bold">Products</h2>

                <div className="flex-grow sm:max-w-xs mt-4">
                    <SearchBar onSearch={handleSearch} />
                 </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">

                    <div className="flex items-center">
                        <label className="mr-2 text-sm font-medium text-gray-700">Sort:</label>
                        <select
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price_low_high">Price: Low to High</option>
                            <option value="price_high_low">Price: High to Low</option>
                            <option value="name_asc">Name: A-Z</option>
                            <option value="name_desc">Name: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="flex justify-center">
                {sortedProducts && sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl">
                        {sortedProducts.map((product) => (
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

            {/* Pagination */}
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
