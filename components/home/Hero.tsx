"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../shared/Button";

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/kathmandu.jpeg"
          alt="Car on a forest road"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-40">
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold text-white leading-[1.1] mb-6">
            Explore Kathmandu <br />
            <span className="text-carent-yellow text-4xl  block mt-2">
              With Premium EV Scooters & Comfortable Taxis.
            </span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            The eco-friendly way to see the city. Choose self-ride freedom,
            guided tours, or professional taxi service.
          </p>
          <Link href="/cars">
            <Button>Book your ride now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
