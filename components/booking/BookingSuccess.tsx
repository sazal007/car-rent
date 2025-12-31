"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "../shared/Button";

interface BookingSuccessProps {
  email: string;
  phone: string;
  isSelfRide: boolean;
  onClose: () => void;
  variant?: "dialog" | "inline";
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({
  email,
  phone,
  isSelfRide,
  onClose,
  variant = "dialog",
}) => {
  if (variant === "dialog") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} />
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-3">
          Booking Confirmed!
        </h4>
        <p className="text-gray-600 mb-8 text-lg max-w-md">
          We&apos;ve sent a confirmation to <strong>{email}</strong> and{" "}
          <strong>{phone}</strong>.
        </p>
        <div className="bg-gray-50 p-6 rounded-xl text-left w-full mb-8 border border-gray-100">
          <p className="font-semibold text-gray-900 mb-3">Next Steps:</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle
                size={16}
                className="text-green-600 mt-0.5 shrink-0"
              />
              <span>Check your email for the booking voucher</span>
            </li>
            {isSelfRide && (
              <li className="flex items-start gap-2">
                <CheckCircle
                  size={16}
                  className="text-green-600 mt-0.5 shrink-0"
                />
                <span>Bring your original license and ID</span>
              </li>
            )}
          </ul>
        </div>
        <Button onClick={onClose} variant="outline" icon={false} className="px-8">
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center transition-all duration-300 ease-out">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <CheckCircle size={40} />
      </div>
      <h4 className="text-2xl font-bold text-carent-text mb-2">
        Booking Confirmed!
      </h4>
      <p className="text-gray-600 mb-6 text-lg max-w-md">
        Thank you for choosing Kathmandu EV Rentals. We have sent a
        confirmation email to <strong>{email}</strong> and a WhatsApp note to{" "}
        <strong>{phone}</strong>.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg text-left w-full mb-6">
        <p className="font-semibold text-gray-800">Next Steps:</p>
        <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1 text-sm">
          <li>Check your email for the booking voucher.</li>
          {isSelfRide && (
            <li>
              Bring your original license and ID for verification.
            </li>
          )}
        </ul>
      </div>
      <Button onClick={onClose} variant="outline" icon={false}>
        Close
      </Button>
    </div>
  );
};

