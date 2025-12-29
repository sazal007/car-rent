"use client";

import React from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";
import { Loader } from "@/components/shared/loader";

export const Categories: React.FC = () => {
  const { data: categories = [], isLoading } = useCategories();

  // Image mapping for categories
  const getCategoryImage = (categoryName: string): string => {
    const name = categoryName.toLowerCase();
    if (name.includes("scooter") && !name.includes("guide")) {
      return "/images/self-ride.jpeg";
    }
    if (name.includes("taxi") || name.includes("cab")) {
      return "/images/batoma-cab.jpeg";
    }
    if (name.includes("tour")) {
      return "/images/roads.jpg";
    }
    if (name.includes("guide")) {
      return "/images/batoma-guide.jpeg";
    }
    // Default fallback
    return "/images/roads.jpg";
  };

  // Add Tours category if it doesn't exist
  const toursCategory = {
    id: "tours",
    name: "Book a Tour",
    slug: "tours",
    image: "/images/roads.jpg",
  };

  // Check if Tours already exists in categories
  const hasTours = categories.some(
    (cat) =>
      cat.slug?.toLowerCase() === "tours" ||
      cat.name.toLowerCase().includes("tour")
  );

  // Combine categories with Tours if it doesn't exist and map images
  const allCategories = (
    hasTours ? categories : [...categories, toursCategory]
  ).map((cat) => ({
    ...cat,
    image: getCategoryImage(cat.name),
  }));

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b to-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Title Section - Centered like Services */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          <div className="max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-carent-text mb-3 sm:mb-4">
              Our Rental Categories
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Choose from our diverse range of rental options
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="w-full">
          {isLoading ? (
            <div className="text-center py-20 flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {allCategories.map((cat) => {
                // Determine navigation URL based on slug or name
                const isTourCategory =
                  cat.slug?.toLowerCase() === "tours" ||
                  cat.name.toLowerCase().includes("tour");
                const href = isTourCategory
                  ? "/tours"
                  : `/cars?category=${encodeURIComponent(cat.name)}`;

                return (
                  <Link
                    key={cat.id}
                    href={href}
                    className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 border border-gray-100 hover:border-yellow-400 aspect-[4/3]"
                  >
                    {/* Background Image */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    {/* Category Name - Bottom Center */}
                    <span className="absolute bottom-0 left-0 right-0 text-base sm:text-lg md:text-xl font-bold text-white pl-6 pb-4 sm:pb-5 md:pb-6 group-hover:text-yellow-400 transition-colors">
                      {isTourCategory ? cat.name : `Rent a ${cat.name}`}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
