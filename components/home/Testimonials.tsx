"use client";

import React from "react";
import { REVIEWS } from "../../constants";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-semibold text-center mb-16 text-carent-text">
          Feedback from satisfied renters
        </h2>

        {/* Masonry Layout approximation using CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="break-inside-avoid bg-carent-gray p-8 rounded-sm"
            >
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                &quot;{review.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-sm text-carent-text">
                  {review.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
