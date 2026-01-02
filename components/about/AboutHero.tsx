"use client";

import React from "react";

export const AboutHero: React.FC = () => {
  return (
    <section className="pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-20 bg-white text-center">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text mb-4 sm:mb-6 md:mb-8">
          Bato Ma - Who Are We
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0">
           Bato Ma is lauched to provide best rental services for all kinds of travellers in Kathmandu, Nepal. Our Main focus is to provide safe and experience rich travel services to our customers.
           We are a tour company based in Kathmandu, Nepal. We offer a wide range of tours to help you explore the beauty of the city and its surroundings. Our tours are designed to be fun and engaging, and we make sure that you have a great time. We also offer a variety of activities to help you make the most of your trip. Whether you are looking for a day trip or a longer stay, we have the perfect tour for you.
          </p>
        </div>
      </div>
    </section>
  );
};
