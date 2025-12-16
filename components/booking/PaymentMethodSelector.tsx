"use client";

import React from "react";
import { CreditCard, Wallet, Banknote } from "lucide-react";

export type PaymentMethod = "cash" | "digital" | "card";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  variant?: "default" | "compact";
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  value,
  onChange,
  variant = "default",
}) => {
  const options = [
    { id: "cash" as const, icon: Banknote, label: "Cash" },
    {
      id: "digital" as const,
      icon: Wallet,
      label: variant === "compact" ? "Digital Wallet" : "Digital",
    },
    { id: "card" as const, icon: CreditCard, label: "Card" },
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">
        Payment Method
      </h4>
      <div className="grid grid-cols-3 gap-3">
        {options.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
              value === id
                ? "border-carent-yellow bg-carent-yellow/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Icon size={24} className="mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

