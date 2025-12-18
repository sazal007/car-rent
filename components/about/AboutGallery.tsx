"use client";

import Image from "next/image";
import React from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Boudhanath Stupa sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1693025440505-c882d2796295?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "EV scooter on city street",
  },
  {
    src: "https://images.unsplash.com/photo-1717389279143-886425f42698?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "EV taxi interior",
  },
  {
    src: "https://images.unsplash.com/photo-1592216114245-5104cb68a5ec?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Evening city ride",
  },
  {
    src: "https://images.unsplash.com/photo-1706188370039-e0cf9bd6ea16?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2F0aG1hbmR1fGVufDB8fDB8fHww",
    alt: "EV SUV for families",
  },
  {
    src: "https://images.unsplash.com/photo-1589791933711-d68aae51e609?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGthdGhtYW5kdXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "City scooter ride",
  },
  {
    src: "https://images.unsplash.com/photo-1665435246333-48b2bc7a0018?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGthdGhtYW5kdXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "EV dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1670486303115-5503fb9c5220?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2F0aG1hbmR1JTIwbmVwYWx8ZW58MHx8MHx8fDA%3D",
    alt: "Dual battery scooter",
  },
  {
    src: "https://images.unsplash.com/photo-1665394183024-7a95b156d427?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGthdGhtYW5kdSUyMG5lcGFsfGVufDB8fDB8fHww",
    alt: "City lite scooter",
  },
  {
    src: "https://images.unsplash.com/photo-1731227102390-15f6200d625e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2F0aG1hbmR1JTIwdmFsbGV5fGVufDB8fDB8fHww",
    alt: "Local food stop on tour",
  },
  {
    src: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmVwYWx8ZW58MHx8MHx8fDA%3D",
    alt: "Stupa sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1550642249-6e5605421172?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5lcGFsfGVufDB8fDB8fHww",
    alt: "Heritage tour stop",
  },
];

export const AboutGallery: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-carent-text mb-8 sm:mb-10 md:mb-12">
          Our Journey in Pictures
        </h2>

        <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
          {images.map((image, idx) => (
            <div
              key={image.src + idx}
              className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm bg-gray-50 aspect-4/3"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
