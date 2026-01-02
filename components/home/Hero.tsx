"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "../shared/Button";
import { useVehicles } from "@/hooks/use-vehicles";
import { Vehicle } from "@/types/vehicles";
import { BookingDialogModal } from "../booking/BookingDialogModal";
import { ChevronRight } from "lucide-react";

export const Hero: React.FC = () => {
  const { data: vehicles = [], isLoading } = useVehicles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayedVehicles = vehicles.slice(0, 6);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  useEffect(() => {
    if (displayedVehicles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedVehicles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [displayedVehicles.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + displayedVehicles.length) % displayedVehicles.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayedVehicles.length);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/kathmandu-himals.jpg"
          alt="Mountain view from Kathmandu from a taxi booked in Bato Ma"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 lg:py-24 mt-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">

          {/* Left Column - Content */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-8 text-center lg:text-left">

            {/* Heading */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                Rent Ev Scooter , Taxi & Customize Tour Packages With Bato Ma.
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-gray-300 text-sm sm:text-sm lg:text-base xl:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Bato Ma is a trustable and affordable rental service provider for two and four wheelers Ev's in Kathmandu, Nepal. Book with us and get the best experience.
              </p>
            </div>

            {/* Service Options */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <span className="bg-gray-800/60 border border-gray-700 rounded-full px-3 py-2 sm:px-5 sm:py-2.5 text-gray-200 text-xs sm:text-sm font-medium">
                Self-Ride
              </span>
              <span className="bg-gray-800/60 border border-gray-700 rounded-full px-3 py-2 sm:px-5 sm:py-2.5 text-gray-200 text-xs sm:text-sm font-medium">
                Guided Tours
              </span>
              <span className="bg-gray-800/60 border border-gray-700 rounded-full px-3 py-2 sm:px-5 sm:py-2.5 text-gray-200 text-xs sm:text-sm font-medium">
                Customize Guided Tours              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button
                onClick={() => setShowBookingDialog(true)}
                className="bg-carent-yellow hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Book Your Ride
              </Button>

              <Link
                href="/rentals"
                className="inline-flex items-center justify-center gap-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto"
              >
                Explore Rentals
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>

          {/* Right Column - Vehicle Carousel (Hidden on Mobile) */}
          {!isLoading && displayedVehicles.length > 0 && (
            <div className="hidden lg:block relative w-full max-w-xl ml-auto">
              {/* Carousel Container */}
              <div className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">

                {/* Vehicle Display */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-700/30 to-gray-800/30 overflow-hidden">
                  {displayedVehicles.map((vehicle: Vehicle, index) => (
                    <Link
                      key={vehicle.id}
                      href={`/rentals/${vehicle.id}-${vehicle.slug}`}
                      className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                      <div className="w-full h-full flex flex-col p-6 sm:p-8">
                        {/* Vehicle Image */}
                        <div className="flex-1 flex items-center justify-center">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-contain max-h-[280px] sm:max-h-[320px]"
                          />
                        </div>

                        {/* Vehicle Info */}
                        <div className="mt-4 text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                            {vehicle.name}
                          </h3>
                          <span className="inline-flex items-center gap-2 text-carent-yellow text-sm font-medium">
                            View Details
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-gray-900 text-white p-3 rounded-full transition-colors duration-200"
                    aria-label="Previous vehicle"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-gray-900 text-white p-3 rounded-full transition-colors duration-200"
                    aria-label="Next vehicle"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex items-center justify-center gap-2 py-5 bg-gray-800/60">
                  {displayedVehicles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                        ? "bg-carent-yellow w-8"
                        : "bg-gray-600 w-2 hover:bg-gray-500"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Dialog */}
      <BookingDialogModal
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
      />
    </section>
  );
};