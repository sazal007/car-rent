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

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(value);

  const priceLabel = car.category?.toLowerCase().includes("tour")
    ? "Per tour"
    : "Per day";

  return (
    <Link href={`/cars/${car.id}-${slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
        {/* Car Image */}
        <div className="relative h-56 w-full overflow-hidden bg-linear-to-b from-gray-50 to-white">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col grow p-6">
          {/* Name and Price */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-carent-primary transition-colors">
              {car.name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(car.price)}
              </span>
              <span className="text-sm text-gray-500">/ {priceLabel}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-5"></div>

          {/* Top 2 Features */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-carent-primary/10 transition-colors">
                <Armchair
                  size={20}
                  className="text-gray-600 group-hover:text-carent-primary transition-colors"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                  Seats
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {car.seats} Passengers
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-carent-primary/10 transition-colors">
                <Settings
                  size={20}
                  className="text-gray-600 group-hover:text-carent-primary transition-colors"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                  Transmission
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {car.transmission}
                </div>
              </div>
            </div>
          </div>

          {/* Rest of Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-carent-primary/10 transition-colors">
                <Briefcase
                  size={20}
                  className="text-gray-600 group-hover:text-carent-primary transition-colors"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                  Luggage
                </div>
                <div className="text-sm font-semibold text-gray-900">
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
