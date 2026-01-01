"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0, right: 0 });

  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const padding = 8;
      const calculatedRight = Math.max(padding, viewportWidth - rect.left - rect.width);
      
      setDropdownPosition({
        top: rect.bottom + 8, // 8px gap below button
        left: Math.max(padding, rect.left),
        width: rect.width,
        right: calculatedRight,
      });
    }
  }, [showDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className="flex-1 relative">
      <label className="block text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
        Select Vehicle
      </label>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-gray-300 transition-colors bg-white"
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-1 text-left min-w-0">
          <Car className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span
            className={`text-xs sm:text-sm md:text-base truncate ${
              selectedVehicle
                ? "text-gray-900 font-medium"
                : "text-gray-400"
            }`}
          >
            {selectedVehicle
              ? selectedVehicle.price > 0
                ? `${selectedVehicle.name} - ${formatPrice(
                    selectedVehicle.price
                  )}/day`
                : selectedVehicle.name
              : "Choose a vehicle"}
          </span>
        </div>
        <ChevronDown
          className={`text-gray-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-[55] bg-transparent"
            onClick={() => setShowDropdown(false)}
          />
          <div
            ref={dropdownRef}
            className="fixed bg-white rounded-lg sm:rounded-xl shadow-xl border border-gray-200 max-h-[60vh] sm:max-h-80 overflow-y-auto z-[60]"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              right: `${dropdownPosition.right}px`,
              width: `calc(100vw - ${dropdownPosition.left + dropdownPosition.right}px)`,
              maxWidth: `${dropdownPosition.width || 300}px`,
              minWidth: '200px',
            }}
          >
            {isLoading ? (
              <div className="p-4 sm:p-6 text-center text-gray-500 text-sm">
                Loading vehicles...
              </div>
            ) : vehicles.length === 0 ? (
              <div className="p-4 sm:p-6 text-center text-gray-500 text-sm">
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
                  className={`w-full p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                    selectedVehicle?.id === vehicle.id
                      ? "bg-carent-yellow/10"
                      : ""
                  }`}
                >
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {vehicle.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                          {vehicle.seats} seats • {vehicle.transmission}
                        </div>
                      </div>
                      {vehicle.price > 0 && (
                        <div className="text-right ml-2 sm:ml-4 shrink-0">
                          <div className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">
                            {formatPrice(vehicle.price)}
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-500">/day</div>
                        </div>
                      )}
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

