"use client";

import React from "react";
import { Button } from "../shared/Button";

interface BookingSummaryProps {
  pricePerDay: number;
  days?: number;
  total: number;
  formatPrice: (value: number) => string;
  isSubmitting: boolean;
  variant?: "default" | "compact";
  label?: string; // Custom label instead of "days" (e.g., "people")
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  pricePerDay,
  days,
  total,
  formatPrice,
  isSubmitting,
  variant = "default",
  label,
}) => {
  // If no days provided, don't show the breakdown
  const showBreakdown = days !== undefined;
  const unitLabel = label || (days && days > 1 ? "days" : "day");

  if (variant === "compact") {
    return (
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-xs sm:text-sm text-gray-500">Price breakdown</p>
          {showBreakdown ? (
            <p className="text-xs sm:text-sm text-gray-600">
              Base rate: {formatPrice(pricePerDay)} × {days} {unitLabel}
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-gray-600">
              Total: {formatPrice(total)}
            </p>
          )}
          <p className="text-xl sm:text-2xl font-bold text-carent-text">
            {formatPrice(total)}
          </p>
        </div>
        <Button
          type="submit"
          className="px-4 sm:px-6 md:px-8 text-xs sm:text-sm py-2 sm:py-2.5"
          icon={false}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Confirm Booking"}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-gray-100">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Total Price</p>
          {showBreakdown ? (
            <p className="text-xs sm:text-sm text-gray-600">
              {formatPrice(pricePerDay)} × {days} {unitLabel}
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-gray-600">
              {formatPrice(total)}
            </p>
          )}
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatPrice(total)}</p>
      </div>
      <Button
        type="submit"
        className="w-full justify-center text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-2.5"
        icon={false}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Confirm Booking"}
      </Button>
    </div>
  );
};

