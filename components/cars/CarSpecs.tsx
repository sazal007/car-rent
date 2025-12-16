"use client";

import React from "react";
import { Armchair, Settings, Briefcase, Fuel } from "lucide-react";
import { Vehicle } from "@/types/vehicles";

interface CarSpecsProps {
  vehicle: Vehicle;
}

export const CarSpecs: React.FC<CarSpecsProps> = ({ vehicle }) => {
  return (
    <div className="grid grid-cols-4 gap-4 border-y border-gray-100 py-8 mb-10">
      <div className="flex flex-col items-center gap-3">
        <Armchair
          strokeWidth={1.5}
          className="text-carent-text w-6 h-6"
        />
        <span className="text-sm font-semibold text-carent-text">Seat</span>
        <span className="text-sm text-gray-500">{vehicle.seats}</span>
      </div>
      <div className="flex flex-col items-center gap-3 border-l border-gray-100">
        <Settings
          strokeWidth={1.5}
          className="text-carent-text w-6 h-6"
        />
        <span className="text-sm font-semibold text-carent-text">Gearbox</span>
        <span className="text-sm text-gray-500">{vehicle.transmission}</span>
      </div>
      <div className="flex flex-col items-center gap-3 border-l border-gray-100">
        <Briefcase
          strokeWidth={1.5}
          className="text-carent-text w-6 h-6"
        />
        <span className="text-sm font-semibold text-carent-text">Luggage</span>
        <span className="text-sm text-gray-500">{vehicle.luggage} bags</span>
      </div>
      <div className="flex flex-col items-center gap-3 border-l border-gray-100">
        <Fuel strokeWidth={1.5} className="text-carent-text w-6 h-6" />
        <span className="text-sm font-semibold text-carent-text">Fuel</span>
        <span className="text-sm text-gray-500">
          {vehicle.fuel || "Electric"}
        </span>
      </div>
    </div>
  );
};

