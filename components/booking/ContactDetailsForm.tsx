"use client";

import React from "react";

interface ContactDetailsFormProps {
  fullName: string;
  email: string;
  phone: string;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

export const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  fullName,
  email,
  phone,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">
        Contact Details
      </h4>
      <input
        type="text"
        placeholder="Full Name"
        required
        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-carent-yellow focus-visible:ring-0"
        value={fullName}
        onChange={(e) => onFullNameChange(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-carent-yellow focus-visible:ring-0"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone / WhatsApp"
          required
          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-carent-yellow focus-visible:ring-0"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
      </div>
    </div>
  );
};

