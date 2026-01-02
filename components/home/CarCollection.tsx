"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "../shared/Button";
import { CarCard } from "../rentals/CarCard";
import { useVehicles } from "@/hooks/use-vehicles";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";

interface CarCollectionProps {
  title?: string;
  limit?: number;
  excludeId?: string;
}

export const CarCollection: React.FC<CarCollectionProps> = ({
  title = "Our Rental Collection",
  limit,
  excludeId,
}) => {
  const { data: vehicles = [], isLoading } = useVehicles();
  const filteredCars = vehicles
    .filter((c) => c.id !== excludeId)
    .slice(0, limit || vehicles.length);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      // Calculate scroll amount based on viewport width (one card per screen)
      // Account for padding: 20px on 320px (10px each side), 24px on mobile (12px each side), 32px on sm (16px each side)
      const isSmallMobile = window.innerWidth < 375;
      const isMobile = window.innerWidth < 640;
      const padding = isSmallMobile ? 20 : isMobile ? 24 : 32;
      const cardWidth = window.innerWidth - padding;
      const gap = isSmallMobile ? 16 : isMobile ? 24 : 28; // gap-4 = 16px, gap-6 = 24px, gap-7 = 28px
      const scrollAmount = cardWidth + gap;

      const targetScroll =
        direction === "left"
          ? current.scrollLeft - scrollAmount
          : current.scrollLeft + scrollAmount;

      current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      id="cars"
      className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-2.5 sm:px-3 md:px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-row items-end justify-between mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-carent-text max-w-xl leading-tight">
            {title}
          </h2>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Navigation Arrows - Left side of button */}
            {!isLoading && filteredCars.length > 0 && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-gray-200 flex items-center justify-center text-carent-text hover:bg-black hover:text-white hover:border-black transition-all duration-300 shrink-0"
                  aria-label="Scroll left"
                >
                  <ArrowLeft
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 lg:w-6 lg:h-6"
                  />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-gray-200 flex items-center justify-center text-carent-text hover:bg-black hover:text-white hover:border-black transition-all duration-300 shrink-0"
                  aria-label="Scroll right"
                >
                  <ArrowRight
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 lg:w-6 lg:h-6"
                  />
                </button>
              </>
            )}
            {/* View All Button - Hidden on mobile */}
            <div className="shrink-0 hidden md:block">
              <Link href="/rentals">
                <Button icon={true} className="text-sm sm:text-base">
                  View all vehicles
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Cars Slider */}
        {isLoading ? (
          <div className="text-center py-16 sm:py-20 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 md:gap-7 lg:gap-8 overflow-x-auto no-scrollbar pb-4 sm:pb-6 md:pb-7 lg:pb-8 -mx-2.5 sm:-mx-3 md:-mx-4 px-2.5 sm:px-3 md:px-4 lg:-mx-6 lg:px-6 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="w-[calc(100vw-20px)] sm:w-[calc(100vw-24px)] md:w-[calc(100vw-32px)] lg:w-[400px] xl:w-[450px] shrink-0 snap-center"
                >
                  <CarCard car={car} />
                </div>
              ))
            ) : (
              <div className="text-center py-10 sm:py-12 md:py-16 lg:py-20 w-full">
                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg">
                  No vehicles available.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
