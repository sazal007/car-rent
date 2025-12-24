"use client";

import React from "react";
import Link from "next/link";
import { Car } from "../../types";
import { Armchair, Settings, Briefcase } from "lucide-react";

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  // Use slug from car if available, otherwise generate from name
  const slug =
    car.slug ||
    car.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <Link href={`/cars/${car.id}-${slug}`} className="group block h-full">
      <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
        {/* Car Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-linear-to-b from-gray-50 to-white">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-contain p-4 sm:p-5 md:p-6 transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col grow p-4 sm:p-5 md:p-6">
          {/* Name */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-carent-primary transition-colors">
              {car.name}
            </h3>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-4 sm:mb-5"></div>

          {/* Top 2 Features */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-carent-primary/10 transition-colors">
                <Armchair
                  size={18}
                  className="sm:w-5 sm:h-5 text-gray-600 group-hover:text-carent-primary transition-colors"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                  Seats
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {car.seats} Passengers
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-carent-primary/10 transition-colors">
                <Settings
                  size={18}
                  className="sm:w-5 sm:h-5 text-gray-600 group-hover:text-carent-primary transition-colors"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                  Transmission
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {car.transmission}
                </div>
              </div>
            </div>
          </div>

          {/* Rest of Features */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-carent-primary/10 transition-colors">
                <Briefcase
                  size={18}
                  className="sm:w-5 sm:h-5 text-gray-600 group-hover:text-carent-primary transition-colors"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                  Luggage
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {car.luggage} Bags
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
