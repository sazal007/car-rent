"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "../shared/Button";
import { useVehicles } from "@/hooks/use-vehicles";
import { Vehicle } from "@/types/vehicles";
import { BookingDialogModal } from "../booking/BookingDialogModal";

export const Hero: React.FC = () => {
  const { data: vehicles = [], isLoading } = useVehicles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayedVehicles = vehicles.slice(0, 6); // Show first 6 vehicles

  // Booking dialog state
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  useEffect(() => {
    if (
      carouselRef.current &&
      displayedVehicles.length > 0 &&
      typeof window !== "undefined"
    ) {
      // Get the actual card width based on screen size
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;
      const cardWidth = isMobile ? 280 : isTablet ? 320 : 360;
      const offset = currentIndex * cardWidth;
      carouselRef.current.style.transform = `translateX(-${offset}px)`;
    }
  }, [currentIndex, displayedVehicles.length]);

  // Auto-scroll functionality
  useEffect(() => {
    if (displayedVehicles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedVehicles.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [displayedVehicles.length]);

  return (
    <section className="relative h-screen w-full flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/kathmandu-himals.jpg"
          alt="Mountain view form kathmandu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-2.5 sm:px-4 md:px-6 relative z-10 pt-16 sm:pt-24 md:pt-32 lg:pt-40">
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            Explore Kathmandu <br />
            <span className="text-carent-yellow text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl block mt-1 sm:mt-2">
              With Premium EV Scooters & Comfortable Taxis.
            </span>
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-lg leading-relaxed">
            The eco-friendly way to see the city. Choose self-ride freedom,
            guided tours, or professional taxi service.
          </p>
          <Button
            onClick={() => setShowBookingDialog(true)}
            className="text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3"
          >
            Book your ride now
          </Button>
        </div>
      </div>

      {/* Vehicle Carousel - Bottom Right - Hidden on mobile */}
      {!isLoading && displayedVehicles.length > 0 && (
        <div className="hidden md:block absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-28 lg:right-28 z-20 w-[320px] md:w-[360px]">
          {/* Carousel Container */}
          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            {/* Cards Container */}
            <div className="relative overflow-hidden">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-in-out"
              >
                {displayedVehicles.map((vehicle: Vehicle) => (
                  <Link
                    key={vehicle.id}
                    href={`/cars/${vehicle.id}-${vehicle.slug}`}
                    className="block w-[280px] sm:w-[320px] md:w-[360px] shrink-0 group"
                  >
                    <div className="p-4 sm:p-5">
                      {/* Vehicle Image */}
                      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-gray-50 rounded-lg">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-contain p-4 sm:p-6 transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      {/* Vehicle Name */}
                      <div className="mt-3 sm:mt-4">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-carent-yellow transition-colors">
                          {vehicle.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-2 px-4 pb-4">
              {/* Dots Indicator */}
              <div className="flex gap-1.5">
                {displayedVehicles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-carent-yellow w-6"
                        : "bg-gray-300 w-1.5 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Dialog */}
      <BookingDialogModal
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
      />
    </section>
  );
};
