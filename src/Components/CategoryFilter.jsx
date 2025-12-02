import React from "react";

import { initialProducts } from "../data/product"

import { Tag } from "lucide-react";

const availableCategories = [
  "All", ...new Set(initialProducts.map((p) => p.category)),
];

const CategoryFilter = () => {
  const selectedCategory = "Phone";
  return (
    <>
      <div className="flex flex-wrap gap-3 border b-gray-800 pd-6">
        <Tag className="w-5 h-5 text-orange-500 mt-2 mr-2 hidden sm:block" />
        {availableCategories.map((category) => (
         <button key={category} className={`px-5 py-2 text-bold rounded-full transition duration-200 shadow-md ${selectedCategory == category ? "bg-orange-600 text-white shadow-orange-800/50":  "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-orange-400 border-gray-700"

         }`}
         >
          {category}
          </button>
         ))}
      </div>
    </>
  );
};

export default CategoryFilter;