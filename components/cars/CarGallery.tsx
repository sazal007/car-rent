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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-semibold mb-12 text-center text-carent-text">
          Vehicle gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden h-64 hover:opacity-95 transition-opacity"
            >
              <Image
                src={img}
                alt={`Gallery ${idx}`}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

