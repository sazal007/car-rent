'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../../constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10 sm:mb-12 md:mb-16 text-carent-text">Feedback from satisfied renters</h2>
        
        {/* Masonry Layout approximation using CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-5 md:gap-6 space-y-4 sm:space-y-5 md:space-y-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className="break-inside-avoid bg-carent-gray p-5 sm:p-6 md:p-8 rounded-sm">
              <div className="flex gap-1 mb-3 sm:mb-4 text-black">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={11}
                    className={`sm:w-3 sm:h-3 ${i < review.rating ? "fill-black text-black" : "fill-none text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                "{review.text}"
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <img 
                  src={review.avatar} 
                  alt={review.author} 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <span className="font-medium text-xs sm:text-sm text-carent-text">{review.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

