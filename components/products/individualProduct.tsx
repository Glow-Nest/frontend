'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/common/MainNavbar';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useGetProductByIdQuery } from '@/store/api/productApi';
import { setProduct } from '@/store/slices/product/productSlice';
import Cart from '@/components/products/cart';

function IndividualProduct() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const productId = params?.productId as string;

  const existingProduct = useAppSelector((state) => state.product[productId]);
  const { data, isLoading, isError } = useGetProductByIdQuery(
    { productId },
    { skip: !!existingProduct }
  );

  useEffect(() => {
    if (data && !existingProduct) {
      dispatch(setProduct(data));
    }
  }, [data, dispatch, existingProduct]);

  const product = existingProduct || data;
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    if (product?.inventoryCount) {
      setQuantity((prev) => Math.min(prev + 1, product.inventoryCount));
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product?.name} to cart`);
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError || !product) {
    return <p className="text-center mt-10 text-red-600">Failed to load product.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* Product Image */}
      <div className="flex justify-center items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="rounded-xl shadow-lg w-full max-w-md object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-center gap-6">
        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

        <p className="text-2xl text-amber-600 font-semibold">
          {new Intl.NumberFormat('da-DK', {
            style: 'currency',
            currency: 'DKK',
          }).format(product.price)}
        </p>

        <p className="text-sm text-gray-600">In Stock: {product.inventoryCount}</p>

        {/* Quantity Selector */}
        <div>
          <label className="text-sm font-medium mb-1 block">Quantity</label>
          <div className="flex items-center border rounded-lg overflow-hidden w-max">
            <button
              onClick={handleDecrease}
              className="w-10 h-10 text-lg font-bold hover:bg-gray-100"
            >
              –
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= product.inventoryCount}
              className="w-10 h-10 text-lg font-bold hover:bg-gray-100 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={product.inventoryCount === 0}
          className={`w-full py-3 rounded-xl font-medium text-white transition cursor-pointer 
              ${product.inventoryCount === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-600'}`}
        >
          {product.inventoryCount === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>

        {/* Product Description */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );

}

export default IndividualProduct;
