"use client";

import React from "react";

export const ContactMap: React.FC = () => {
  return (
    <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-carent-text">
          Find us on Google Maps
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Kathmandu Durbar Square, Ward 18, Kathmandu 44600
        </p>
      </div>
      <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <iframe
          title="Kathmandu EV Rentals location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.364864732185!2d85.3055124!3d27.7041914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1907422c888b%3A0x7f1d4324f50b62bf!2sKathmandu%20Durbar%20Square!5e0!3m2!1sen!2snp!4v1707470400000!5m2!1sen!2snp"
          width="100%"
          height="280"
          className="sm:h-[320px] md:h-[360px] lg:h-[380px] w-full"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
};

