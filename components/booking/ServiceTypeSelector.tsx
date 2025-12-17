"use client";

import React from "react";

export type ServiceType = "selfRide" | "guided" | "taxi";

interface ServiceTypeSelectorProps {
  value: ServiceType;
  onChange: (value: ServiceType) => void;
  variant?: "default" | "compact";
}

const serviceOptions = [
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

export const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({
  value,
  onChange,
  variant = "default",
}) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">
        Choose Service
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {serviceOptions.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              value === option.id
                ? "border-carent-yellow bg-carent-yellow/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="block font-medium text-carent-text">
              {variant === "compact" ? option.compactLabel : option.label}
            </span>
            <span className="text-xs text-gray-500">
              {variant === "compact" ? option.compactDesc : option.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

