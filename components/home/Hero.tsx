"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../shared/Button";
import { CheckCircle } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px),
                           repeating-linear-gradient(90deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)`,
          }}
        />
      </div>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-in fade-in duration-700">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4 text-carent-text">
              Explore Kathmandu <br />
              <span className="text-carent-yellow">With Premium</span>{" "}
              EV&apos;s.
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-5 max-w-xl leading-relaxed">
              The eco-friendly way to see the city. Choose self-ride freedom,
              guided tours, or professional taxi service. Experience the best of
              Kathmandu with our premium fleet.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 mb-6">
              <Link href="/cars">
                <Button className="text-xs px-5 py-2.5" icon={true}>
                  Book Your Ride Now
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="text-xs px-5 py-2.5"
                  icon={false}
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
              <span className="flex items-center gap-1.5 text-carent-text">
                <CheckCircle className="w-3.5 h-3.5 text-carent-yellow shrink-0" />
                Eco-Friendly EVs
              </span>
              <span className="flex items-center gap-1.5 text-carent-text">
                <CheckCircle className="w-3.5 h-3.5 text-carent-yellow shrink-0" />
                24/7 Support
              </span>
              <span className="flex items-center gap-1.5 text-carent-text">
                <CheckCircle className="w-3.5 h-3.5 text-carent-yellow shrink-0" />
                Flexible Booking
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block animate-in fade-in duration-700 delay-200">
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/images/kathmandu.jpeg"
                alt="Premium EV scooters and taxis in Kathmandu"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-carent-yellow/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
