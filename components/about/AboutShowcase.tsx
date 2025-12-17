"use client";

import React from "react";

export const AboutShowcase: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden relative">
          <img
            src="https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?_gl=1*t3h6pd*_ga*MTg3NDA4MjA3Mi4xNzY1Njk3NTgw*_ga_8JE65Q40S6*czE3NjU3MDk1MjMkbzMkZzEkdDE3NjU3MDk1MzgkajQ1JGwwJGgw"
            alt="EV scooters in Kathmandu evening streets"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
};
