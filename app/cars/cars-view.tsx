"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CarFilter } from "@/components/cars/CarFilter";
import { CarCard } from "@/components/cars/CarCard";
import { CarPagination } from "@/components/cars/CarPagination";
import { useVehicles } from "@/hooks/use-vehicles";
import { useCategories } from "@/hooks/use-categories";
import { Loader } from "@/components/shared/loader";
import { BlogContactForm } from "@/components/blog/BlogContactForm";

const ITEMS_PER_PAGE = 4;

function VehiclesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam || "All";

  const { data: vehicles = [], isLoading: isLoadingVehicles } = useVehicles(
    activeCategory === "All" ? undefined : activeCategory
  );
  const { data: categoriesData = [], isLoading: isLoadingCategories } =
    useCategories();
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = isLoadingVehicles || isLoadingCategories;

  // Extract category names and filter out "Tours" category (only show vehicle categories)
  const categories = React.useMemo(() => {
    return categoriesData
      .filter((cat) => {
        const isTourCategory =
          cat.slug?.toLowerCase() === "tours" ||
          cat.name.toLowerCase().includes("tour");
        return !isTourCategory;
      })
      .map((cat) => cat.name);
  }, [categoriesData]);

  // Handle category change - update URL
  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);
    if (category === "All") {
      router.push("/cars");
    } else {
      router.push(`/cars?category=${encodeURIComponent(category)}`);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(vehicles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCars = vehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-20 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Filter */}
      <CarFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
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
      {vehicles.length > ITEMS_PER_PAGE && (
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
      <div className="container mx-auto px-3 sm:px-4 md:px-6 mb-40">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text mb-3 sm:mb-4">
            Bato Ma - Rental Categories
          </h1>
          <p>
            Select and choose from wide range of categories based on your needs.
          </p>
        </div>

        {/* Content with Suspense */}
        <Suspense
          fallback={
            <div className="text-center py-20 flex items-center justify-center">
              <Loader />
            </div>
          }
        >
          <VehiclesContent />
        </Suspense>
      </div>
      <BlogContactForm />
    </div>
  );
}
