import React from 'react'
import SearchFilter from '../Components/SearchFilter'
import CategoryFilter from '../Components/CategoryFilter'
import ProductCard from '../Components/ProductCard'
import { useCart } from '../context/CartContext.jsx'

const ProductList = () => {
  const { products } = useCart(); // FIXED

  return (
    <>
      <div className="container mx-auto px-4 md:py-8 pt-8">
      
        <SearchFilter />
        <CategoryFilter />

        <h2 className="text-2xl font-extrabold mx-auto px-4 md:px-4 pt-4">
          Featured Gear ({products.length} Items)
        </h2>

        <div className=" mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

      </div>
    </>
  )
}

export default ProductList;
