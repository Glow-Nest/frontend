"use client";

import { useGetAllProductsQuery } from '@/store/api/productApi';
import React, { useState } from 'react';
import ProductPagination from './productionPagination';
import toast from 'react-hot-toast';

function ProductsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const { data, isLoading, isError } = useGetAllProductsQuery(
        { page: currentPage, pageSize },
        { selectFromResult: (res) => res }
    );

    if (isLoading){
        toast.loading("Loading products.......")
    }

    return (
        <>
            <div className="text-xl font-medium mb-4">ProductList</div>
            
            {data?.products.map((product, index) => {
                return (
                    <div key={index}>
                        {product.Name}
                    </div>
                )
            })}

            <ProductPagination
                currentPage={currentPage}
                totalPages={Math.ceil((data?.totalCount ?? 0) / pageSize)}
                onPageChange={setCurrentPage}
            />
        </>
    );
}

export default ProductsList;
