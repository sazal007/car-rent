"use client";

import React from "react";
import { Armchair, Settings, Briefcase, Fuel } from "lucide-react";
import { Vehicle } from "@/types/vehicles";

interface CarSpecsProps {
  vehicle: Vehicle;
}

export const CarSpecs: React.FC<CarSpecsProps> = ({ vehicle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-y border-gray-100 py-6 sm:py-7 md:py-8 mb-8 sm:mb-9 md:mb-10">
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <Armchair
          strokeWidth={1.5}
          className="text-carent-text w-5 h-5 sm:w-6 sm:h-6"
        />
        <span className="text-xs sm:text-sm font-semibold text-carent-text">Seat</span>
        <span className="text-xs sm:text-sm text-gray-500">{vehicle.seats}</span>
      </div>
      <div className="flex flex-col items-center gap-2 sm:gap-3 border-l border-gray-100">
        <Settings
          strokeWidth={1.5}
          className="text-carent-text w-5 h-5 sm:w-6 sm:h-6"
        />
        <span className="text-xs sm:text-sm font-semibold text-carent-text">Gearbox</span>
        <span className="text-xs sm:text-sm text-gray-500">{vehicle.transmission}</span>
      </div>
      <div className="flex flex-col items-center gap-2 sm:gap-3 border-l border-gray-100 sm:border-t sm:border-l-0 border-gray-100">
        <Briefcase
          strokeWidth={1.5}
          className="text-carent-text w-5 h-5 sm:w-6 sm:h-6"
        />
        <span className="text-xs sm:text-sm font-semibold text-carent-text">Luggage</span>
        <span className="text-xs sm:text-sm text-gray-500">{vehicle.luggage} bags</span>
      </div>
      <div className="flex flex-col items-center gap-2 sm:gap-3 border-l border-gray-100 sm:border-t sm:border-l-0 border-gray-100">
        <Fuel strokeWidth={1.5} className="text-carent-text w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-xs sm:text-sm font-semibold text-carent-text">Fuel</span>
        <span className="text-xs sm:text-sm text-gray-500">
          {vehicle.fuel || "Electric"}
        </span>
      </div>
    </div>
  );
};

