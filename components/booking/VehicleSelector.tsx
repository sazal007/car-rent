"use client";

import React, { useState } from "react";
import { Car, ChevronDown } from "lucide-react";
import { Vehicle } from "@/types/vehicles";

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
  isLoading?: boolean;
  formatPrice: (value: number) => string;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  isLoading = false,
  formatPrice,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex-1 relative">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
        Select Vehicle
      </label>
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full flex items-center justify-between gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors bg-white"
      >
        <div className="flex items-center gap-3 flex-1 text-left">
          <Car className="text-gray-400 w-5 h-5 shrink-0" />
          <span
            className={
              selectedVehicle
                ? "text-gray-900 font-medium"
                : "text-gray-400"
            }
          >
            {selectedVehicle
              ? `${selectedVehicle.name} - ${formatPrice(
                  selectedVehicle.price
                )}/day`
              : "Choose a vehicle"}
          </span>
        </div>
        <ChevronDown
          className={`text-gray-400 w-5 h-5 transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-20">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">
                Loading vehicles...
              </div>
            ) : vehicles.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No vehicles available
              </div>
            ) : (
              vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => {
                    onSelectVehicle(vehicle);
                    setShowDropdown(false);
                  }}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                    selectedVehicle?.id === vehicle.id
                      ? "bg-carent-yellow/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {vehicle.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {vehicle.seats} seats • {vehicle.transmission}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-bold text-gray-900">
                        {formatPrice(vehicle.price)}
                      </div>
                      <div className="text-xs text-gray-500">/day</div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

