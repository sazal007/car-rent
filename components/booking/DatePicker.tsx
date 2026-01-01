"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  type?: "date" | "datetime-local";
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  min,
  type = "date",
  required = false,
}) => {
  if (type === "date") {
    return (
      <div className="flex-1">
        <label className="block text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
          {label}
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={min}
            required={required}
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl border border-gray-200 hover:border-gray-300 transition-colors text-gray-900 font-medium focus:outline-none focus:border-carent-yellow focus:ring-2 focus:ring-carent-yellow/20"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <label className="text-xs sm:text-sm font-bold text-gray-700">{label}</label>
      <input
        type="datetime-local"
        required={required}
        className="w-full p-2.5 sm:p-3 text-xs sm:text-sm md:text-base rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-carent-yellow focus:ring-1 focus:ring-carent-yellow transition-all focus-visible:ring-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

