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
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 transition-all duration-300 ease-out">
      <label className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
        <ShieldCheck size={18} className="text-blue-600" />
        Upload Driving License
        {required && (
          <span className="text-xs font-normal text-gray-500">
            (Required for self-ride)
          </span>
        )}
      </label>
      <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-white transition-all duration-300 ease-out cursor-pointer relative focus-within:border-blue-300">
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          required={required}
          accept="image/*,.pdf"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
        <Upload size={24} className="text-blue-400 mb-2" />
        <span className="text-sm text-blue-600 font-medium">
          {file ? file.name : "Click to upload License / ID"}
        </span>
      </div>
    </div>
  );
};

