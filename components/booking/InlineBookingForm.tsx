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
              pricePerDay={vehicle.price}
              days={totals.days}
              total={totals.total}
              formatPrice={formatPrice}
              isSubmitting={bookingStatus === "submitting" || isPending}
              variant="compact"
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

