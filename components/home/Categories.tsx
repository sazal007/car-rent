"use client";

import React from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";
import { Loader } from "@/components/shared/loader";

export const Categories: React.FC = () => {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 sm:gap-10 md:gap-12 xl:gap-16">
          {/* Title Section */}
          <div className="xl:w-[30%] text-center xl:text-left xl:sticky xl:top-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
              Our rental
              <br className="hidden xl:block" /> categories
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 hidden xl:block">
              Choose from our diverse range of rental options
            </p>
          </div>

          {/* Categories Grid */}
          <div className="xl:w-[70%] w-full">
            {isLoading ? (
              <div className="text-center py-20 flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                {categories.map((cat) => {
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
                      className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl p-4 sm:p-5 md:p-6 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 cursor-pointer group transition-all duration-300 border border-gray-100 hover:border-yellow-400"
                    >
                      <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 ring-2 sm:ring-3 md:ring-4 ring-gray-100 group-hover:ring-yellow-400 transition-all duration-300">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 text-center group-hover:text-yellow-600 transition-colors">
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
