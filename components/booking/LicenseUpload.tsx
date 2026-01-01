"use client";

import React from "react";
import { Upload, ShieldCheck } from "lucide-react";

interface LicenseUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

export const LicenseUpload: React.FC<LicenseUploadProps> = ({
  file,
  onChange,
  required = false,
}) => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 transition-all duration-300 ease-out">
      <label className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
        <ShieldCheck size={16} className="sm:w-[18px] sm:h-[18px] text-blue-600 shrink-0" />
        <span>Upload Driving License</span>
        {required && (
          <span className="text-[10px] sm:text-xs font-normal text-gray-500">
            (Required for self-ride)
          </span>
        )}
      </label>
      <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center hover:bg-white transition-all duration-300 ease-out cursor-pointer relative focus-within:border-blue-300">
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          required={required}
          accept="image/*,.pdf"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
        <Upload size={20} className="sm:w-6 sm:h-6 text-blue-400 mb-1.5 sm:mb-2" />
        <span className="text-xs sm:text-sm text-blue-600 font-medium break-words text-center px-2">
          {file ? file.name : "Click to upload License / ID"}
        </span>
      </div>
    </div>
  );
};

