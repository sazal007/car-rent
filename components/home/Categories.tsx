"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "../../constants";

export const Categories: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col xl:flex-row items-start gap-12 xl:gap-20">
          {/* Title Section */}
          <div className="xl:w-[25%] text-left">
            <h2 className="text-4xl md:text-5xl font-semibold text-carent-text leading-tight">
              Our rental <br /> categories
            </h2>
          </div>

          {/* Categories Grid */}
          <div className="xl:w-[75%] w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/cars?category=${encodeURIComponent(cat.name)}`}
                  className="bg-gray-50 rounded-lg py-5 px-4 flex flex-col items-center gap-3 cursor-pointer group hover:bg-carent-yellow transition-all duration-300"
                >
                  <div className="w-36 h-36 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-lg font-bold text-carent-text text-center">
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
