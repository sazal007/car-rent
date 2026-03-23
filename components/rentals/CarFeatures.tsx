"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Vehicle } from "@/types/vehicles";

interface CarFeaturesProps {
  vehicle: Vehicle;
}

export const CarFeatures: React.FC<CarFeaturesProps> = ({ vehicle }) => {
  const features =
    vehicle.features && vehicle.features.length > 0
      ? vehicle.features
      : ["Bluetooth", "A/C", "GPS", "Power Windows"];

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-carent-text">
        Vehicle features
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-4 sm:gap-x-6 md:gap-x-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 sm:gap-3">
            <CheckCircle
              size={18}
              className="sm:w-5 sm:h-5 text-carent-text fill-transparent shrink-0"
              strokeWidth={2}
            />
            <span className="text-sm sm:text-base text-gray-700 font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

