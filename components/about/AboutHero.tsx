"use client";

import React from "react";

export const AboutHero: React.FC = () => {
  return (
    <section className="pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-20 bg-white text-center">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text mb-4 sm:mb-6 md:mb-8">
          Who we are
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0">
            We started in Kathmandu to make eco-friendly travel simple, premium,
            and safe. Today we run an all-electric fleet of scooters with guides
            and comfortable EV taxis so travelers and locals can explore the
            valley responsibly. Our team of local experts focuses on reliable
            service, transparent pricing, and sustainable tourism for the city
            we call home.
          </p>
        </div>
      </div>
    </section>
  );
};
