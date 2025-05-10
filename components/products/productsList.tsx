"use client";

import { useGetAllProductsQuery } from '@/store/api/productApi';
import React, { useEffect, useState } from 'react';
import ProductPagination from './productionPagination';
import toast from 'react-hot-toast';
import ProductCard from './productCard';

function ProductsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const { data, isLoading, isError } = useGetAllProductsQuery(
        { page: currentPage, pageSize },
        { selectFromResult: (res) => res }
    );

    useEffect(() => {
        if (isLoading) {
            toast.loading("Loading products...", { id: "loading-toast" });
        } else {
            toast.dismiss("loading-toast");
        }
    }, [isLoading]);

    if (isLoading) return null;

    return (
        <section className="w-full px-4 sm:px-6 md:px-10">
            <h2 className="text-2xl font-bold mb-6">Products</h2>

            <div className="flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl">
                    {data?.products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            id={product.productId}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            onAddToCart={() => {
                                console.log("Add to cart:", product.productId);
                            }}  />
                    ))}
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <ProductPagination
                    currentPage={currentPage}
                    totalPages={Math.ceil((data?.totalCount ?? 0) / pageSize)}
                    onPageChange={setCurrentPage}
                />
            </div>
        </section>
    );
}

export default ProductsList;
