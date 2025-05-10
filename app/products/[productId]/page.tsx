import React, { } from 'react';
import Navbar from '@/components/common/MainNavbar';
import IndividualProduct from '@/components/products/individualProduct';
import Cart from '@/components/products/cart';

function ProductDetail() {

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#fbe9dd] via-transparent to-[#de6412] opacity-60"></div>

      <Navbar />

      <div className="flex py-10 mt-10 min-h-screen">
        {/* Individual Product*/}
        <div className="w-full md:w-3/4 px-4">
          <IndividualProduct />
        </div>

        {/* Cart*/}
        <div className="hidden md:block w-full md:w-1/4 px-4 mb-8">
          <Cart />
        </div>
      </div>

    </div>
  );
}

export default ProductDetail;
