'use client';

import React from 'react';

export const AboutShowcase: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden relative">
          <img 
            src="https://picsum.photos/seed/showroom/1600/900" 
            alt="Car showroom" 
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
};

