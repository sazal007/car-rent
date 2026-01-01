"use client";

import React from "react";
import { Vehicle } from "@/types/vehicles";

export type ServiceType = "selfRide" | "guided" | "taxi";

interface ServiceTypeSelectorProps {
  value: ServiceType;
  onChange: (value: ServiceType) => void;
  variant?: "default" | "compact";
  vehicle?: Vehicle | null;
}

export const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({
  value,
  onChange,
  variant = "default",
  vehicle,
}) => {
  const isScooter = vehicle?.category?.toLowerCase() === "scooter";
  const isTaxi = vehicle?.category?.toLowerCase() === "taxi";
  const hasGuidedOptions = vehicle?.guidedOptions && vehicle.guidedOptions.length > 0;
  const hasUnguidedOptions = vehicle?.unguidedOptions && vehicle.unguidedOptions.length > 0;

  // For taxis with guide/unguided options, show those options
  // For scooters, show guided/self-ride options
  // For other vehicles, show default options
  const getServiceOptions = () => {
    if (isTaxi && (hasGuidedOptions || hasUnguidedOptions)) {
      return [
        {
          id: "guided" as const,
          label: "With Guide",
          desc: "Guide included",
          compactLabel: "With Guide",
          compactDesc: "Guide included",
        },
        {
          id: "taxi" as const,
          label: "Without Guide",
          desc: "Driver only",
          compactLabel: "Without Guide",
          compactDesc: "Driver only",
        },
      ];
    }

    if (isScooter && (hasGuidedOptions || hasUnguidedOptions)) {
      return [
        {
          id: "guided" as const,
          label: "Guided",
          desc: "Rider/guide included",
          compactLabel: "Guided Scooter",
          compactDesc: "Rider/guide included",
        },
        {
          id: "selfRide" as const,
          label: "Self-Ride",
          desc: "License required",
          compactLabel: "Self-Ride Scooter",
          compactDesc: "License upload required",
        },
      ];
    }

    // Default options for other vehicles
    return [
      {
        id: "selfRide" as const,
        label: "Self-Ride",
        desc: "License required",
        compactLabel: "Self-Ride Scooter",
        compactDesc: "License upload required",
      },
      {
        id: "guided" as const,
        label: "Guided",
        desc: "Rider included",
        compactLabel: "Guided Scooter",
        compactDesc: "Rider/guide included",
      },
      {
        id: "taxi" as const,
        label: "EV Taxi",
        desc: "With driver",
        compactLabel: "EV Taxi",
        compactDesc: "AC sedan/SUV with driver",
      },
    ];
  };

  const serviceOptions = getServiceOptions();

  return (
    <div className="space-y-2 sm:space-y-3">
      <h4 className="text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-100 pb-1.5 sm:pb-2">
        Choose Service
      </h4>
      <div className={`grid grid-cols-1 ${serviceOptions.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-2 sm:gap-3`}>
        {serviceOptions.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`p-2.5 sm:p-3 rounded-lg border text-left transition-all ${
              value === option.id
                ? "border-carent-yellow bg-carent-yellow/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="block font-medium text-carent-text text-xs sm:text-sm md:text-base">
              {variant === "compact" ? option.compactLabel : option.label}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500">
              {variant === "compact" ? option.compactDesc : option.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

