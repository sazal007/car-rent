"use client";

import React from "react";
import { X } from "lucide-react";
import { Vehicle } from "@/types/vehicles";
import { ServiceTypeSelector, ServiceType } from "./ServiceTypeSelector";
import { LicenseUpload } from "./LicenseUpload";
import { ContactDetailsForm } from "./ContactDetailsForm";
import { DatePicker } from "./DatePicker";
import { BookingSummary } from "./BookingSummary";
import { BookingSuccess } from "./BookingSuccess";

interface BookingDialogProps {
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
  };
  onFormDataChange: (updates: Partial<BookingDialogProps["formData"]>) => void;
  onSubmit: (e: React.FormEvent) => void;
  bookingStatus: "idle" | "submitting" | "success";
  isPending: boolean;
  totals: { days: number; total: number } | null;
  formatPrice: (value: number) => string;
  selectedLabel: string;
}

export const BookingDialog: React.FC<BookingDialogProps> = ({
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
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => {
          onClose();
        }}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            {selectedLabel}
          </h3>

          {bookingStatus === "success" ? (
            <BookingSuccess
              email={formData.email}
              phone={formData.phone}
              isSelfRide={isSelfRideSelected}
              onClose={onClose}
              variant="dialog"
            />
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <ServiceTypeSelector
                value={formData.serviceType}
                onChange={(value) => onFormDataChange({ serviceType: value })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  label="Pickup Date & Time"
                  value={formData.pickupDate}
                  onChange={(value) => onFormDataChange({ pickupDate: value })}
                  type="datetime-local"
                  required
                />
                <DatePicker
                  label="Return Date & Time"
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


              {totals && (
                <BookingSummary
                  pricePerDay={vehicle.price}
                  days={totals.days}
                  total={totals.total}
                  formatPrice={formatPrice}
                  isSubmitting={bookingStatus === "submitting" || isPending}
                />
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

