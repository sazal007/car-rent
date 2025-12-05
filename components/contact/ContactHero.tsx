"use client";

import React from "react";

export const ContactHero: React.FC = () => {
  return (
    <div className="pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-carent-text mb-6">
          Contact us!
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Whether you have questions, feedback, or need assistance, our team is
          here to help. Reach out to us through any of the channels below, and
          we&apos;ll get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
};
