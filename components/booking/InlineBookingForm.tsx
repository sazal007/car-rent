"use client";

import React from "react";
import { X } from "lucide-react";
import { Vehicle } from "@/types/vehicles";
import { ServiceTypeSelector, ServiceType } from "./ServiceTypeSelector";
import { PaymentMethodSelector, PaymentMethod } from "./PaymentMethodSelector";
import { LicenseUpload } from "./LicenseUpload";
import { ContactDetailsForm } from "./ContactDetailsForm";
import { DatePicker } from "./DatePicker";
import { BookingSummary } from "./BookingSummary";
import { BookingSuccess } from "./BookingSuccess";

interface InlineBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  formData: {
    serviceType: ServiceType;
    pickupDate: string;
    returnDate: string;
    fullName: string;
    email: string;
    phone: string;
    licenseFile: File | null;
    paymentMethod: PaymentMethod;
  };
  onFormDataChange: (updates: Partial<InlineBookingFormProps["formData"]>) => void;
  onSubmit: (e: React.FormEvent) => void;
  bookingStatus: "idle" | "submitting" | "success";
  isPending: boolean;
  totals: { days: number; total: number } | null;
  formatPrice: (value: number) => string;
  selectedLabel: string;
}

export const InlineBookingForm: React.FC<InlineBookingFormProps> = ({
  isOpen,
  onClose,
  vehicle,
  formData,
  onFormDataChange,
  onSubmit,
  bookingStatus,
  isPending,
  totals,
  formatPrice,
  selectedLabel,
}) => {
  if (!isOpen || !vehicle) return null;

  const isSelfRideSelected = formData.serviceType === "selfRide";

  // Helper to extract numeric price from complex price strings (for taxis)
  const extractPrice = (priceString: string): number => {
    // If it's a simple number, parse it
    const simpleNum = parseFloat(priceString);
    if (!isNaN(simpleNum)) return simpleNum;

    // For complex strings like "[ max 3 person] - $250 for 1 person , 2 $400, 3 $500"
    // Extract the first price found
    const priceMatch = priceString.match(/\$(\d+)/);
    if (priceMatch && priceMatch[1]) {
      return parseFloat(priceMatch[1]) || 0;
    }

    return 0;
  };

  // Get the effective price based on vehicle type and service type
  const getEffectivePrice = (): number => {
    const isScooter = vehicle.category?.toLowerCase() === "scooter";
    const isTaxi = vehicle.category?.toLowerCase() === "taxi";

    // For scooters and taxis with guided/unguided options, use those prices
    if ((isScooter || isTaxi) && vehicle.price === 0) {
      // Guided option (with guide)
      if (formData.serviceType === "guided" && vehicle.guidedOptions && vehicle.guidedOptions.length > 0) {
        return extractPrice(vehicle.guidedOptions[0].price);
      }
      // Unguided options (without guide)
      // For scooters: selfRide = unguided
      // For taxis: taxi = unguided (without guide)
      if (
        (formData.serviceType === "selfRide" || (isTaxi && formData.serviceType === "taxi")) &&
        vehicle.unguidedOptions &&
        vehicle.unguidedOptions.length > 0
      ) {
        return extractPrice(vehicle.unguidedOptions[0].price);
      }
    }
    
    // For other vehicles or fallback, use the regular price
    return vehicle.price || 0;
  };

  const effectivePrice = getEffectivePrice();
  
  // For scooters and taxis with tour pricing, don't show days breakdown
  const isScooterTour = vehicle.category?.toLowerCase() === "scooter" && vehicle.price === 0;
  const isTaxiTour = vehicle.category?.toLowerCase() === "taxi" && vehicle.price === 0;
  const showDaysBreakdown = totals && !isScooterTour && !isTaxiTour ? totals.days : undefined;

  return (
    <div className="bg-white shadow-xl p-6 md:p-8 rounded-2xl border border-gray-100 transition-all duration-300 ease-out relative">
      <button
        onClick={() => {
          onClose();
        }}
        className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-0"
        aria-label="Close booking form"
      >
        <X size={24} />
      </button>

      <h3 className="text-2xl font-bold mb-6 text-carent-text border-b border-gray-100 pb-4">
        {selectedLabel}
      </h3>

      {bookingStatus === "success" ? (
        <BookingSuccess
          email={formData.email}
          phone={formData.phone}
          isSelfRide={isSelfRideSelected}
          paymentMethod={formData.paymentMethod}
          onClose={onClose}
          variant="inline"
        />
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <ServiceTypeSelector
            value={formData.serviceType}
            onChange={(value) => onFormDataChange({ serviceType: value })}
            variant="compact"
            vehicle={vehicle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DatePicker
              label="Pickup Date &amp; Time"
              value={formData.pickupDate}
              onChange={(value) => onFormDataChange({ pickupDate: value })}
              type="datetime-local"
              required
            />
            <DatePicker
              label="Return Date &amp; Time"
              value={formData.returnDate}
              onChange={(value) => onFormDataChange({ returnDate: value })}
              type="datetime-local"
              required
            />
          </div>

          {isSelfRideSelected && (
            <LicenseUpload
              file={formData.licenseFile}
              onChange={(file) => onFormDataChange({ licenseFile: file })}
              required
            />
          )}

          <ContactDetailsForm
            fullName={formData.fullName}
            email={formData.email}
            phone={formData.phone}
            onFullNameChange={(value) =>
              onFormDataChange({ fullName: value })
            }
            onEmailChange={(value) => onFormDataChange({ email: value })}
            onPhoneChange={(value) => onFormDataChange({ phone: value })}
          />

          <PaymentMethodSelector
            value={formData.paymentMethod}
            onChange={(value) => onFormDataChange({ paymentMethod: value })}
            variant="compact"
          />

          {totals ? (
            <BookingSummary
              pricePerDay={effectivePrice}
              days={showDaysBreakdown}
              total={totals.total}
              formatPrice={formatPrice}
              isSubmitting={bookingStatus === "submitting" || isPending}
              variant="compact"
              label={isScooterTour ? "tour" : undefined}
            />
          ) : (
            <div className="text-center py-2 text-gray-400 text-sm">
              Select dates to see price
            </div>
          )}
        </form>
      )}
    </div>
  );
};

