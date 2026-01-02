"use client";

import React from "react";
import { Loader } from "../shared/loader";
import { useGetTestimonials } from "@/hooks/use-testimonial";

export const Testimonials: React.FC = () => {
  const { data: testimonials, isLoading } = useGetTestimonials();
  if (isLoading) {
    return (
      <div className="text-center py-20 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-semibold text-center  text-carent-text">
          Hear from  experience of people who rented Bato Ma.
        </h2>
        <p className="text-lg text-center text-gray-600 mb-16">
          See what our customers say about their experience with Bato Ma.
        </p>

        {/* Masonry Layout approximation using CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-5 md:gap-6 space-y-4 sm:space-y-5 md:space-y-6">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              className="break-inside-avoid bg-carent-gray p-8 rounded-sm"
            >
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                &quot;{testimonial.comment}&quot;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || ""}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-sm text-carent-text">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
