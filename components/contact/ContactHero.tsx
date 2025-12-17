"use client";

import React from "react";

export const ContactHero: React.FC = () => {
  return (
    <div className="pb-10 sm:pb-12 md:pb-14 lg:pb-16 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-carent-text mb-4 sm:mb-5 md:mb-6">
          Contact us!
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
          Whether you have questions, feedback, or need assistance, our team is
          here to help. Call, WhatsApp, or drop a note—we&apos;ll confirm your
          booking and next steps quickly.
        </p>
      </div>
    </div>
  );
};
