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
          src="https://picsum.photos/seed/forestroad/1920/1080"
          alt="Car on a forest road"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-40">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8">
            Quick and affordable <br /> car rentals
          </h1>
          <Link href="/cars">
            <Button>Book your ride now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
