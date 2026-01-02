"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../shared/Button";

export const AboutStats: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-carent-text mb-4 sm:mb-5 md:mb-6">
    Excellent Rental services with self drive and guided tours.
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-sm sm:text-base">
            With a drivers categories of vechicle from two wheelers EV scooters, four wheelers EV taxi & premium EV SUV's. Our mission is to provide affordable rental services to our customers so they can travel hassle free. Book now and Explore Kathmandu with Bato Ma.
            </p>
            <Link href="/about">
              <Button className="text-sm sm:text-base">
                Know more about Bato Ma
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-10 sm:mt-12 md:mt-14 lg:mt-16">
              <div>
                <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-carent-text mb-1.5 sm:mb-2">
                  1K+
                </span>
                <p className="text-xs sm:text-sm text-gray-600">
                  Happy customers who have trusted us
                </p>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-carent-text mb-1.5 sm:mb-2">
                  95%
                </span>
                <p className="text-xs sm:text-sm text-gray-600">
                  Our customers agree with our offer value
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
              <img
                src="/images/roads.jpg"
                alt="Kathmandu Valley View through Luxury SUV Booked in Bato Ma"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
