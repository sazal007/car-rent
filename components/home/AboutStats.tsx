'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../shared/Button';

export const AboutStats: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-semibold text-carent-text mb-6">
              Driving excellence in car rental services
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              With a diverse fleet of vehicles and a commitment to customer satisfaction, we strive to make your journey smooth and enjoyable.
            </p>
            <Link href="/about">
              <Button>Know more about us</Button>
            </Link>

            <div className="grid grid-cols-2 gap-12 mt-16">
              <div>
                <span className="block text-5xl font-bold text-carent-text mb-2">5K+</span>
                <p className="text-sm text-gray-600">Happy customers who have trusted us</p>
              </div>
              <div>
                <span className="block text-5xl font-bold text-carent-text mb-2">99%</span>
                <p className="text-sm text-gray-600">Our customers agree with our offer value</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="rounded-2xl overflow-hidden h-[400px] lg:h-[500px]">
               <img 
                 src="https://picsum.photos/seed/sportscar/800/600" 
                 alt="Luxury car rear view" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

