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
  const hasGuidedOptions =
    vehicle.guidedOptions &&
    vehicle.guidedOptions.length > 0 &&
    vehicle.guidedOptions[0].price &&
    vehicle.guidedOptions[0].price.trim() !== "";
  const hasUnguidedOptions =
    vehicle.unguidedOptions &&
    vehicle.unguidedOptions.length > 0 &&
    vehicle.unguidedOptions[0].price &&
    vehicle.unguidedOptions[0].price.trim() !== "";

  // Debug logging
  if (process.env.NODE_ENV === "development") {
    console.log("ServiceOptions - vehicle category:", vehicle.category);
    console.log("ServiceOptions - isScooter:", isScooter, "isTaxi:", isTaxi);
    console.log("ServiceOptions - guidedOptions:", JSON.stringify(vehicle.guidedOptions));
    console.log("ServiceOptions - unguidedOptions:", JSON.stringify(vehicle.unguidedOptions));
    console.log("ServiceOptions - hasGuidedOptions:", hasGuidedOptions, "hasUnguidedOptions:", hasUnguidedOptions);
  }

  const shouldReturnNull = (!isScooter && !isTaxi) || (!hasGuidedOptions && !hasUnguidedOptions);
  
  if (process.env.NODE_ENV === "development") {
    console.log("ServiceOptions - shouldReturnNull:", shouldReturnNull, "reason:", {
      "!isScooter && !isTaxi": (!isScooter && !isTaxi),
      "!hasGuidedOptions && !hasUnguidedOptions": (!hasGuidedOptions && !hasUnguidedOptions),
    });
  }
  
  if (shouldReturnNull) {
    return null;
  }

  // For scooters, show both options if available (don't filter by name)
  let showGuidedForScooter = false;
  let showUnguidedForScooter = false;

  if (isScooter) {
    // Show both guided and unguided options if they exist
    showGuidedForScooter = !!hasGuidedOptions;
    showUnguidedForScooter = !!hasUnguidedOptions;
  }

  // Helper to check if price is a complex string (for taxis)
  const isComplexPrice = (price: string): boolean => {
    return (
      price.includes("[") || price.includes("max") || price.includes("person")
    );
  };

  // Parse and format complex price strings for taxis
  const parseComplexPrice = (price: string) => {
    // Extract max persons: "[ max 3 person]" -> "max 3 person" OR "max 3 person" -> "max 3 person"
    let maxInfo: string | null = null;
    let priceOnly: string = price;

    // Pattern 1: Extract from brackets "[max 3 person]"
    const bracketMatch = price.match(/\[([^\]]+)\]/);
    if (bracketMatch) {
      maxInfo = bracketMatch[1].trim();
      // Remove the bracket part from price string
      priceOnly = price.replace(/\[[^\]]+\]\s*,?\s*/i, "").trim();
    } else {
      // Pattern 2: Extract "max X person" without brackets
      const maxMatch = price.match(/(max\s+\d+\s+person)/i);
      if (maxMatch) {
        maxInfo = maxMatch[1].trim();
        // Remove max person part from price string
        priceOnly = price.replace(/max\s+\d+\s+person\s+/i, "").trim();
      }
    }

    // Extract price amount: "$350 for day" or "$350" or "350" (without $ sign)
    const priceMatch = priceOnly.match(/(?:\$)?(\d+)(?:\s+for\s+day)?/i);
    const priceAmount = priceMatch ? priceMatch[1] : null;

    return { maxInfo, priceAmount, priceOnly };
  };

  // Render price - either formatted number or complex string
  const renderPrice = (price: string) => {
    if (isComplexPrice(price)) {
      const { maxInfo, priceAmount, priceOnly } = parseComplexPrice(price);

      return (
        <div className="w-full">
          {priceAmount ? (
            <div className="text-base sm:text-lg font-bold text-carent-text">
              {formatPrice(parseFloat(priceAmount))} for day
            </div>
          ) : (
            // Fallback: display cleaned price string if parsing fails
            <div className="text-sm sm:text-base font-medium text-carent-text whitespace-normal leading-relaxed">
              {priceOnly}
            </div>
          )}
        </div>
      );
    }
    const numPrice = parseFloat(price) || 0;
    return (
      <div>
        <span className="text-xl sm:text-2xl font-bold text-carent-text">
          {formatPrice(numPrice)}
        </span>
        <span className="text-xs sm:text-sm text-gray-500 block">for day</span>
      </div>
    );
  };

  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      {/* <h3 className="text-lg sm:text-xl font-semibold text-carent-text mb-4 sm:mb-5">
        Service Options
      </h3> */}
      <div
        className={`grid gap-4 sm:gap-5 md:gap-6 ${
          (isScooter &&
            ((showGuidedForScooter && !showUnguidedForScooter) ||
              (!showGuidedForScooter && showUnguidedForScooter))) ||
          (isTaxi &&
            ((hasGuidedOptions && !hasUnguidedOptions) ||
              (!hasGuidedOptions && hasUnguidedOptions)))
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {/* Guided Option */}
        {((isScooter && showGuidedForScooter) ||
          (isTaxi && hasGuidedOptions)) &&
          vehicle.guidedOptions &&
          vehicle.guidedOptions[0] && (
            <div className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 bg-white hover:border-carent-yellow transition-colors">
              <div className="mb-3 sm:mb-4">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-carent-text mb-1">
                    {isTaxi ? "With Guide" : "Guided Tour"}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {isTaxi ? "Guide included" : "Rider/guide included"}
                  </p>
                  {isComplexPrice(vehicle.guidedOptions[0].price) && (
                    <p className="text-sm sm:text-base font-semibold text-carent-text mt-2">
                      {
                        parseComplexPrice(vehicle.guidedOptions[0].price)
                          .maxInfo
                      }
                    </p>
                  )}
                </div>
                <div className="mt-3 sm:mt-4">
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
        {((isScooter && showUnguidedForScooter) ||
          (isTaxi && hasUnguidedOptions)) &&
          vehicle.unguidedOptions &&
          vehicle.unguidedOptions[0] && (
            <div className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 bg-white hover:border-carent-yellow transition-colors">
              <div className="mb-3 sm:mb-4">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-carent-text mb-1">
                    {isTaxi ? "Without Guide" : "Self-Ride Tour"}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {isTaxi ? "Driver only" : "License required"}
                  </p>
                  {isComplexPrice(vehicle.unguidedOptions[0].price) && (
                    <p className="text-sm sm:text-base font-semibold text-carent-text mt-2">
                      {
                        parseComplexPrice(vehicle.unguidedOptions[0].price)
                          .maxInfo
                      }
                    </p>
                  )}
                </div>
                <div className="mt-3 sm:mt-4">
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
