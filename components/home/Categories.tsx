"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "../../constants";

export const Categories: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-12 xl:gap-16">
          {/* Title Section */}
          <div className="xl:w-[30%] text-center xl:text-left xl:sticky xl:top-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Our rental
              <br className="hidden xl:block" /> categories
            </h2>
            <p className="text-gray-600 text-lg mt-4 hidden xl:block">
              Choose from our diverse range of rental options
            </p>
          </div>

          {/* Categories Grid */}
          <div className="xl:w-[70%] w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/cars?category=${encodeURIComponent(cat.name)}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl p-6 flex flex-col items-center gap-5 cursor-pointer group transition-all duration-300 border border-gray-100 hover:border-yellow-400"
                >
                  <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100 group-hover:ring-yellow-400 transition-all duration-300">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xl font-bold text-gray-900 text-center group-hover:text-yellow-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
