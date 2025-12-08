"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { CARS } from "../../constants";
import { Button } from "../shared/Button";
import { CarCard } from "../cars/CarCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CarCollectionProps {
  title?: string;
  limit?: number;
  excludeId?: string;
}

export const CarCollection: React.FC<CarCollectionProps> = ({
  title = "Our rental collection",
  limit,
  excludeId,
}) => {
  const filteredCars = CARS.filter((c) => c.id !== excludeId).slice(
    0,
    limit || CARS.length
  );
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = 600;
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
    setIsDragging(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      setIsDragging(true);
    }
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="cars" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-row items-end justify-between mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-carent-text max-w-xl leading-tight">
            {title}
          </h2>
          <div className="hidden md:block">
            <Link href="/cars">
              <Button icon={true}>View all vehicles</Button>
            </Link>
          </div>
        </div>

        {/* Cars Slider */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 md:-mx-6 md:px-6 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="min-w-[90vw] sm:min-w-[450px] md:min-w-[550px] flex-shrink-0"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-6">
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-carent-text hover:bg-black hover:text-white hover:border-black transition-all duration-300"
              aria-label="Scroll left"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-carent-text hover:bg-black hover:text-white hover:border-black transition-all duration-300"
              aria-label="Scroll right"
            >
              <ArrowRight size={24} />
            </button>
          </div>

          {/* Mobile View All Button */}
          <div className="md:hidden">
            <Link href="/cars">
              <Button className="px-6 py-2 text-sm">View all</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
