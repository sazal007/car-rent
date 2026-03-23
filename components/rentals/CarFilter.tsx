"use client";

import React from "react";

interface CarFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const CarFilter: React.FC<CarFilterProps> = ({
  activeCategory,
  onCategoryChange,
  categories,
}) => {
  // Always include "All" as the first option
  const allCategories = ["All", ...categories];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12">
      {allCategories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-sm font-medium text-sm sm:text-base transition-colors duration-300 cursor-pointer
              ${
                isActive
                  ? "bg-carent-dark text-white"
                  : "bg-carent-yellow text-carent-dark hover:bg-yellow-400"
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
