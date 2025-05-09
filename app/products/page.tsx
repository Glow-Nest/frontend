import Navbar from '@/components/common/MainNavbar'
import ProductsHero from '@/components/products/productHero'
import ProductsList from '@/components/products/productsList'
import React from 'react'

function Products() {
  return (
    <div className="relative overflow-hidden inset-0 -z-0 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#ffffff]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#fbe9dd] via-transparent to-[#de6412] opacity-60"></div>

      <Navbar />

      <ProductsHero />

      <ProductsList />
    </div>
  )
}

export default Products