"use client";

import React from "react";

export const AboutHero: React.FC = () => {
  return (
    <section className="pt-56 pb-20 bg-white text-center">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-5xl md:text-6xl font-semibold text-carent-text mb-8">
          Who we are
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed">
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
