"use client";

import React from "react";

interface CarFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = [
  "All",
  "Self-ride Scooter",
  "Guide with Scooter",
  "Ev Taxi",
  "Tours",
];

export const CarFilter: React.FC<CarFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-8 py-3 rounded-sm font-medium transition-colors duration-300 cursor-pointer
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
