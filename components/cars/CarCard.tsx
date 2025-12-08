"use client";

import React from "react";
import Link from "next/link";
import { Car } from "../../types";
import { Armchair, Settings, Briefcase } from "lucide-react";

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  // Create slug from car name
  const slug = car.name
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
    <Link
      href={`/cars/${car.id}-${slug}`}
      className="bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer h-full border border-gray-100"
    >
      {/* Car Image - Reduced height */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-white">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col">
        {/* Name and Price Section */}
        <div className="flex justify-between items-end px-5 pt-5 pb-4">
          <h3 className="text-xl md:text-2xl font-semibold text-carent-text leading-tight">
            {car.name}
          </h3>
          <div className="text-right">
            <span className="text-xl md:text-2xl font-bold text-carent-text">
              {formatPrice(car.price)}
            </span>
            <span className="text-sm text-gray-500 ml-1">/{priceLabel}</span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-200"></div>

        {/* Features Section */}
        <div className="px-5 py-4 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1">
            <Armchair size={24} strokeWidth={1.5} className="text-gray-600" />
            <span className="text-xs text-gray-600 mt-1">Seat</span>
            <span className="text-base font-semibold text-carent-text">
              {car.seats}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Settings size={24} strokeWidth={1.5} className="text-gray-600" />
            <span className="text-xs text-gray-600 mt-1">Gearbox</span>
            <span className="text-base font-semibold text-carent-text">
              {car.transmission}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Briefcase size={24} strokeWidth={1.5} className="text-gray-600" />
            <span className="text-xs text-gray-600 mt-1">Luggage</span>
            <span className="text-base font-semibold text-carent-text">
              {car.luggage} bags
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
