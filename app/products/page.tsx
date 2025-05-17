"use client";

import { useEffect, useState } from 'react';
import Cart from '@/components/products/cart';
import Navbar from '@/components/common/MainNavbar';
import ProductsHero from '@/components/products/productHero';
import ProductsList from '@/components/products/productsList';

function Products() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setShowDrawer(true);
    } else {
      const timer = setTimeout(() => setShowDrawer(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  return (
    <div className="relative overflow-hidden inset-0 -z-0 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#ffffff]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#fbe9dd] via-transparent to-[#de6412] opacity-60"></div>

      <Navbar />
      <ProductsHero />

      {/* Mobile Cart Toggle */}
      <div className="md:hidden px-4 mb-4">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold shadow hover:bg-amber-600"
        >
          View Cart
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 px-4">
          <ProductsList />
        </div>
        <div className="hidden md:block w-full md:w-1/4 px-4 mb-8">
          <Cart />
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-center md:hidden bg-opacity-50 transition-opacity duration-300">
          <div
            className={`
              fixed bottom-0 w-full max-h-[90vh] bg-white rounded-t-2xl shadow-lg p-4 overflow-y-auto
              transform transition-transform duration-300 ease-in-out
              ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <Cart />
          </div>
        </div>
      )}

    </div>
  );
}

export default Products;