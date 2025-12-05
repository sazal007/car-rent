'use client';

import React from 'react';
import { Car, Smartphone, Wallet, Headset } from 'lucide-react';

const FEATURES = [
  {
    icon: Car,
    title: "Well maintained vehicles",
    desc: "All our cars are well-maintained and regularly serviced, ensuring safe and smooth driving."
  },
  {
    icon: Smartphone,
    title: "Easy online booking",
    desc: "Book your car in minutes with our user-friendly online platform. Fast, simple, and convenient!"
  },
  {
    icon: Wallet,
    title: "Affordable pricing",
    desc: "Enjoy competitive rates with no hidden fees. Rent the perfect car without breaking the bank."
  },
  {
    icon: Headset,
    title: "24/7 support",
    desc: "We're here to assist you anytime, anywhere. Drive with peace of mind knowing help is just a call away."
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-carent-text">
            Enjoy flexibility and unbeatable rates with our city car rentals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4">
              <div className="mb-6 p-4 rounded-full border border-gray-100">
                <feature.icon strokeWidth={1.5} size={32} className="text-carent-text" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-carent-text">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

