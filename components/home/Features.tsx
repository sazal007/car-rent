"use client";

import React from "react";
import { Leaf, Shield, Map, Smile } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "Eco-friendly EV Scooters",
    desc: "Ride with zero emissions. Contribute to a cleaner Kathmandu while enjoying a silent, smooth journey.",
  },
  {
    icon: Map,
    title: "Option for Scooter with Guide",
    desc: "No license? No worries. Our expert riders can take you around the heritage sites safely.",
  },
  {
    icon: Shield,
    title: "Safe, Comfortable Taxis",
    desc: "From airport pickups to full-day tours, our A/C taxis ensure a stress-free travel experience.",
  },
  {
    icon: Smile,
    title: "Tourist-friendly Pricing",
    desc: "Transparent, fixed rates. Enjoy premium service without the hassle of bargaining.",
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-batoma-text">
            Enjoy flexibility and unbeatable rates with our city car rentals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="mb-6 p-4 rounded-full border border-gray-100">
                <feature.icon
                  strokeWidth={1.5}
                  size={32}
                  className="text-batoma-text"
                />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-batoma-text">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
