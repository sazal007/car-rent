"use client";

import React from "react";
import { Vehicle } from "@/types/vehicles";
import { CheckCircle } from "lucide-react";

interface ServiceOptionsProps {
  vehicle: Vehicle;
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const ServiceOptions: React.FC<ServiceOptionsProps> = ({ vehicle }) => {
  // Show for scooters and taxis with guided/unguided options
  const isScooter = vehicle.category?.toLowerCase() === "scooter";
  const isTaxi = vehicle.category?.toLowerCase() === "taxi";
  const hasGuidedOptions = vehicle.guidedOptions && vehicle.guidedOptions.length > 0;
  const hasUnguidedOptions = vehicle.unguidedOptions && vehicle.unguidedOptions.length > 0;

  if ((!isScooter && !isTaxi) || (!hasGuidedOptions && !hasUnguidedOptions)) {
    return null;
  }

  // Helper to check if price is a complex string (for taxis)
  const isComplexPrice = (price: string): boolean => {
    return price.includes("[") || price.includes("max") || price.includes("person");
  };

  // Parse and format complex price strings for taxis
  const parseComplexPrice = (price: string) => {
    // Extract max persons: "[ max 3 person]" -> "max 3 person"
    const maxMatch = price.match(/\[([^\]]+)\]/);
    const maxInfo = maxMatch ? maxMatch[1].trim() : null;

    // Extract individual prices: "$250 for 1 person , 2 $400, 3 $500"
    const prices: Array<{ persons: string; amount: string }> = [];
    
    // Pattern 1: "$250 for 1 person"
    const pattern1 = /\$(\d+)\s+for\s+(\d+)\s+person/g;
    let match;
    while ((match = pattern1.exec(price)) !== null) {
      prices.push({
        persons: match[2],
        amount: match[1],
      });
    }

    // Pattern 2: "2 $400" or "3/4 $400" (after comma)
    const pattern2 = /(\d+(?:\/\d+)?)\s+\$(\d+)/g;
    while ((match = pattern2.exec(price)) !== null) {
      prices.push({
        persons: match[1],
        amount: match[2],
      });
    }

    return { maxInfo, prices };
  };

  // Render price - either formatted number or complex string
  const renderPrice = (price: string) => {
    if (isComplexPrice(price)) {
      const { maxInfo, prices } = parseComplexPrice(price);
      
      return (
        <div className="w-full">
          {maxInfo && (
            <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              {maxInfo}
            </div>
          )}
          <div className="space-y-1.5">
            {prices.length > 0 ? (
              prices.map((item, idx) => (
                <div key={idx} className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-bold text-carent-text">
                    {formatPrice(parseFloat(item.amount))}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    for {item.persons} {item.persons === "1" || item.persons.includes("/") ? "person" : "persons"}
                  </span>
                </div>
              ))
            ) : (
              // Fallback: display as-is if parsing fails
              <div className="text-sm sm:text-base font-medium text-carent-text whitespace-normal leading-relaxed">
                {price}
              </div>
            )}
          </div>
        </div>
      );
    }
    const numPrice = parseFloat(price) || 0;
    return (
      <div className="text-right">
        <span className="text-xl sm:text-2xl font-bold text-carent-text">
          {formatPrice(numPrice)}
        </span>
        <span className="text-xs sm:text-sm text-gray-500 block">per tour</span>
      </div>
    );
  };

  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      <h3 className="text-lg sm:text-xl font-semibold text-carent-text mb-4 sm:mb-5">
        Service Options
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {/* Guided Option */}
        {hasGuidedOptions && vehicle.guidedOptions && vehicle.guidedOptions[0] && (
          <div className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 bg-white hover:border-carent-yellow transition-colors">
            <div className={`mb-3 sm:mb-4 ${isComplexPrice(vehicle.guidedOptions[0].price) ? 'space-y-3' : 'flex items-start justify-between gap-3'}`}>
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-carent-text mb-1">
                  {isTaxi ? "With Guide" : "Guided Tour"}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isTaxi ? "Guide included" : "Rider/guide included"}
                </p>
              </div>
              <div className={isComplexPrice(vehicle.guidedOptions[0].price) ? 'mt-2' : ''}>
                {renderPrice(vehicle.guidedOptions[0].price)}
              </div>
            </div>
            {vehicle.guidedOptions[0].includes && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Includes:
                </p>
                <div className="space-y-1.5">
                  {vehicle.guidedOptions[0].includes
                    .split(",")
                    .map((item, idx) => {
                      const trimmed = item.trim();
                      return trimmed ? (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle
                            size={16}
                            className="text-carent-text fill-transparent shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                          <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {trimmed}
                          </span>
                        </div>
                      ) : null;
                    })
                    .filter(Boolean)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Unguided Option */}
        {hasUnguidedOptions && vehicle.unguidedOptions && vehicle.unguidedOptions[0] && (
          <div className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 bg-white hover:border-carent-yellow transition-colors">
            <div className={`mb-3 sm:mb-4 ${isComplexPrice(vehicle.unguidedOptions[0].price) ? 'space-y-3' : 'flex items-start justify-between gap-3'}`}>
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-carent-text mb-1">
                  {isTaxi ? "Without Guide" : "Self-Ride Tour"}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isTaxi ? "Driver only" : "License required"}
                </p>
              </div>
              <div className={isComplexPrice(vehicle.unguidedOptions[0].price) ? 'mt-2' : ''}>
                {renderPrice(vehicle.unguidedOptions[0].price)}
              </div>
            </div>
            {vehicle.unguidedOptions[0].includes && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Includes:
                </p>
                <div className="space-y-1.5">
                  {vehicle.unguidedOptions[0].includes
                    .split(",")
                    .map((item, idx) => {
                      const trimmed = item.trim();
                      return trimmed ? (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle
                            size={16}
                            className="text-carent-text fill-transparent shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                          <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {trimmed}
                          </span>
                        </div>
                      ) : null;
                    })
                    .filter(Boolean)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

