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
      <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Price breakdown</p>
          {showBreakdown ? (
            <p className="text-sm text-gray-600">
              Base rate: {formatPrice(pricePerDay)} × {days} {unitLabel}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Total: {formatPrice(total)}
            </p>
          )}
          <p className="text-2xl font-bold text-carent-text">
            {formatPrice(total)}
          </p>
        </div>
        <Button
          type="submit"
          className="px-8"
          icon={false}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Confirm Booking"}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Price</p>
          {showBreakdown ? (
            <p className="text-sm text-gray-600">
              {formatPrice(pricePerDay)} × {days} {unitLabel}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              {formatPrice(total)}
            </p>
          )}
        </div>
        <p className="text-3xl font-bold text-gray-900">{formatPrice(total)}</p>
      </div>
      <Button
        type="submit"
        className="w-full justify-center"
        icon={false}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Confirm Booking"}
      </Button>
    </div>
  );
};

