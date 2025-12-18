'use client';

import React from 'react';
import { ABOUT_STATS } from '../../constants';

export const AboutStats: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ABOUT_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col pl-3 sm:pl-4 md:pl-6 border-l-4 border-carent-yellow">
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-carent-text mb-1 sm:mb-2">{stat.value}</span>
              <p className="text-gray-600 text-sm sm:text-base leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

