'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useGetProductByIdQuery } from '@/store/api/productApi';
import { setProduct } from '@/store/slices/product/productSlice';
import { addProductToOrder, removeProductFromOrder } from '@/store/slices/order/orderSlice';
import { ShoppingCart, Trash2 } from 'lucide-react';

function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  max
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max: number;
}) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium block mb-2 text-gray-700">
        Quantity <span className="text-gray-500">({max} available)</span>
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-max shadow-sm">
        <button
          onClick={onDecrease}
          className="w-10 h-10 text-lg font-bold hover:bg-gray-100 text-gray-700 cursor-pointer"
        >
          –
        </button>
        <span className="px-5 text-md font-medium text-gray-800">{quantity}</span>
        <button
          onClick={onIncrease}
          disabled={quantity >= max}
          className="w-10 h-10 text-lg font-bold hover:bg-gray-100 text-gray-700 disabled:opacity-50 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}


function IndividualProduct() {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams() as { productId: string };

  const productFromStore = useAppSelector((state) => state.product[productId]);

  const { data: productData, isLoading, isError } = useGetProductByIdQuery(
    { productId },
    { skip: !!productFromStore }
  );

  const product = productFromStore || productData;

  const existingOrderItem = useAppSelector((state) =>
    state.order.orderItems.find((p) => p.productId === product.productId)
  );

  const isInCart = !!existingOrderItem;

  useEffect(() => {
    if (productData && !productFromStore) {
      dispatch(setProduct(productData));
    }
  }, [productData, productFromStore, dispatch]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !product) return <p className="text-center mt-10 text-red-600">Failed to load product.</p>;

  const handleAddToCart = () => {
    dispatch(addProductToOrder({
      productId: product.productId,
      priceWhenOrdering: product.price,
      quantity
    }));
  };

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

      {/* Product Info */}
      <div className="flex flex-col justify-center gap-6">
        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-2xl text-amber-600 font-semibold">
          {new Intl.NumberFormat('da-DK', {
            style: 'currency',
            currency: 'DKK',
          }).format(product.price)}
        </p>
        {/* <p className="text-sm text-gray-600">In Stock: {product.inventoryCount}</p> */}

        {/* Quantity */}
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity(q => Math.min(q + 1, product.inventoryCount))}
          onDecrease={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
          max={product.inventoryCount}
        />

        <div className='flex items-center gap-4'>
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.inventoryCount === 0}
            className={`flex cursor-pointer items-center justify-center gap-2 w-52 py-3 rounded-md font-semibold text-white text-base transition duration-200 shadow-md
    ${product.inventoryCount === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 active:scale-95'}`}
          >
            <ShoppingCart className="w-5 h-5" />
            {product.inventoryCount === 0
              ? 'Out of Stock'
              : isInCart
                ? 'Update Quantity'
                : 'Add to Cart'}
          </button>

          {isInCart && (
            <Trash2
              className="text-red-500 hover:text-red-700 active:scale-95 transition-transform duration-200 cursor-pointer"
              onClick={() => {
                dispatch(removeProductFromOrder(product.productId));
              }}
              aria-label="Remove from cart"
            />
          )}

        </div>



        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default IndividualProduct;
