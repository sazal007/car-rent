"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CARS } from "@/constants";
import { CarFilter } from "@/components/cars/CarFilter";
import { CarCard } from "@/components/cars/CarCard";
import { CarPagination } from "@/components/cars/CarPagination";

const ITEMS_PER_PAGE = 4;

function VehiclesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(
    categoryParam || "All cars"
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Update category if URL param changes
  useEffect(() => {
    if (categoryParam) {
      setTimeout(() => {
        setActiveCategory(categoryParam);
      }, 0);
    }
  }, [categoryParam]);

  // Filter cars based on category
  const filteredCars = CARS.filter((car) => {
    if (activeCategory === "All cars") return true;
    return car.category === activeCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCars = filteredCars.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to page 1 when category changes
  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 0);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Filter */}
      <CarFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {currentCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Empty State */}
      {currentCars.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No vehicles found in this category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredCars.length > ITEMS_PER_PAGE && (
        <CarPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}

export default function VehiclesPage() {
  return (
    <div className="pt-56 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-semibold text-carent-text mb-4">Cars</h1>
        </div>

        {/* Content with Suspense */}
        <Suspense
          fallback={
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Loading...</p>
            </div>
          }
        >
          <VehiclesContent />
        </Suspense>
      </div>
    </div>
  );
}
