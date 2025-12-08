"use client";

import Image from "next/image";
import React from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=900&q=80",
    alt: "Boudhanath Stupa sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    alt: "EV scooter on city street",
  },
  {
    src: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    alt: "EV taxi interior",
  },
  {
    src: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
    alt: "Evening city ride",
  },
  {
    src: "https://images.unsplash.com/photo-1502877828070-33b167ad6860?auto=format&fit=crop&w=900&q=80",
    alt: "EV SUV for families",
  },
  {
    src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
    alt: "City scooter ride",
  },
  {
    src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    alt: "EV dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1529429617124-aee3c7c2f2ad?auto=format&fit=crop&w=900&q=80",
    alt: "Dual battery scooter",
  },
  {
    src: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    alt: "City lite scooter",
  },
  {
    src: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
    alt: "Local food stop on tour",
  },
  {
    src: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=900&q=80",
    alt: "Stupa sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
    alt: "Heritage tour stop",
  },
];

export const AboutGallery: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-semibold text-center text-carent-text mb-12">
          Our Journey in Pictures
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
          {images.map((image, idx) => (
            <div
              key={image.src + idx}
              className="relative overflow-hidden rounded-2xl shadow-sm bg-gray-50 aspect-4/3"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
