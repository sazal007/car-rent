'use client';

import React from 'react';
import { COMPANY_VALUES } from '../../constants';

export const AboutMissionValues: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 md:space-y-16">
          
          {/* Mission */}
          <div>
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-carent-text mb-4 sm:mb-5 md:mb-6">Our mission</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
            Deliver eco-friendly, premium, and safe travel across Kathmandu. We pair electric scooters and comfortable EV taxis with local guides, transparent pricing, and reliable support so every ride feels effortless, sustainable, and welcoming.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-carent-text mb-6 sm:mb-7 md:mb-8">Our values</h2>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {COMPANY_VALUES.map((value, idx) => (
                <div key={idx} className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                  <div className="mt-2 sm:mt-2.5 w-1.5 h-1.5 bg-black shrink-0" />
                  <div>
                    <span className="font-bold text-carent-text mr-1 text-sm sm:text-base">{value.title}:</span>
                    <span className="text-gray-600 leading-relaxed text-sm sm:text-base">{value.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

