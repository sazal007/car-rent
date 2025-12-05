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
            Founded with a passion for making city travel easy and accessible,
            we have grown to become a trusted car rental service in the area.
            Our mission is to provide seamless and affordable transportation
            options for every occasion, from daily commutes to special events.
            With a fleet of diverse, well-maintained vehicles and a commitment
            to customer satisfaction, we strive to make every rental experience
            smooth and stress-free.
          </p>
        </div>
      </div>
    </section>
  );
};
