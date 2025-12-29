"use client";

import React from "react";
import Image from "next/image";
import { Vehicle } from "@/types/vehicles";

interface CarGalleryProps {
  vehicle: Vehicle;
}

export const CarGallery: React.FC<CarGalleryProps> = ({ vehicle }) => {
  const galleryImages =
    vehicle.gallery && vehicle.gallery.length > 0
      ? vehicle.gallery
      : [vehicle.image, vehicle.image, vehicle.image];

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10 md:mb-12 text-center text-carent-text">
          Vehicle gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[400px] hover:opacity-95 transition-opacity bg-gray-50"
            >
              <Image
                src={img}
                alt={`Gallery ${idx}`}
                width={800}
                height={600}
                className="w-full h-full object-contain p-4 sm:p-6"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

