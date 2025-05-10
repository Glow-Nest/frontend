import Navbar from '@/components/common/MainNavbar'
import Cart from '@/components/products/cart'
import ProductsHero from '@/components/products/productHero'
import ProductsList from '@/components/products/productsList'
import React from 'react'

function Products() {
  return (
    <div className="relative overflow-hidden inset-0 -z-0 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#ffffff]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#fbe9dd] via-transparent to-[#de6412] opacity-60"></div>

      <Navbar />

      <ProductsHero />

      <div className="flex">
        {/* Products List*/}
        <div className="w-full md:w-3/4 px-4">
          <ProductsList />
        </div>

        {/* Cart*/}
        <div className="hidden md:block w-full md:w-1/4 px-4 mb-8">
          <Cart />
        </div>
      </div>


    </div>
  )
}

export default Products