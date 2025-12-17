"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CarFilter } from "@/components/cars/CarFilter";
import { CarCard } from "@/components/cars/CarCard";
import { CarPagination } from "@/components/cars/CarPagination";
import { useVehicles } from "@/hooks/use-vehicles";

const ITEMS_PER_PAGE = 4;

function VehiclesContent() {
  const { data: vehicles = [], isLoading } = useVehicles();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories from vehicles
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    vehicles.forEach((vehicle) => {
      if (vehicle.category && vehicle.category.trim()) {
        uniqueCategories.add(vehicle.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [vehicles]);

  // Update category if URL param changes
  useEffect(() => {
    if (categoryParam) {
      setTimeout(() => {
        setActiveCategory(categoryParam);
      }, 0);
    }
  }, [categoryParam]);

  // Filter vehicles based on category
  const filteredCars = vehicles.filter((car) => {
    if (activeCategory === "All") return true;
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

  if (isLoading) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <p className="text-gray-500 text-sm sm:text-base md:text-lg">Loading vehicles...</p>
      </div>
    );
  }

  return (
    <>
      {/* Filter */}
      <CarFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categories={categories}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {currentCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Empty State */}
      {currentCars.length === 0 && (
        <div className="text-center py-12 sm:py-16 md:py-20">
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">
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

export default function CarsViewPage() {
  return (
    <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text mb-3 sm:mb-4">
            Our Collections
          </h1>
        </div>

        {/* Content with Suspense */}
        <Suspense
          fallback={
            <div className="text-center py-12 sm:py-16 md:py-20">
              <p className="text-gray-500 text-sm sm:text-base md:text-lg">Loading...</p>
            </div>
          }
        >
          <VehiclesContent />
        </Suspense>
      </div>
    </div>
  );
}
