"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "../shared/Button";
import { CarCard } from "../cars/CarCard";
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
      // Account for padding: 24px on mobile (12px each side), 32px on sm (16px each side)
      const isMobile = window.innerWidth < 640;
      const padding = isMobile ? 24 : 32;
      const cardWidth = window.innerWidth - padding;
      const gap = isMobile ? 24 : 28; // gap-6 = 24px, gap-7 = 28px
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
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-row items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-5 md:gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-carent-text max-w-xl leading-tight ">
            {title}
          </h2>
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Navigation Arrows - Left side of button */}
            {!isLoading && filteredCars.length > 0 && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center text-carent-text hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                  aria-label="Scroll left"
                >
                  <ArrowLeft
                    size={18}
                    className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                  />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center text-carent-text hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                  aria-label="Scroll right"
                >
                  <ArrowRight
                    size={18}
                    className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                  />
                </button>
              </>
            )}
            {/* View All Button */}
            <div>
              <Link href="/cars">
                <Button
                  icon={true}
                  className="text-sm sm:text-base hidden md:inline-flex"
                >
                  View all vehicles
                </Button>
                <Button className="px-4 sm:px-5 md:px-6 py-2 text-xs sm:text-sm md:hidden">
                  View all
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Cars Slider */}
        {isLoading ? (
          <div className="text-center py-20 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div
            ref={sliderRef}
            className="flex gap-6 sm:gap-7 md:gap-8 overflow-x-auto no-scrollbar pb-6 sm:pb-7 md:pb-8 -mx-3 sm:-mx-4 px-3 sm:px-4 md:-mx-6 md:px-6 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="w-[calc(100vw-24px)] sm:w-[calc(100vw-32px)] md:w-[400px] lg:w-[450px] shrink-0 snap-center"
                >
                  <CarCard car={car} />
                </div>
              ))
            ) : (
              <div className="text-center py-12 sm:py-16 md:py-20 w-full">
                <p className="text-gray-500 text-sm sm:text-base md:text-lg">
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
