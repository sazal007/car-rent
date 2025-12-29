"use client";

import React from "react";

export const ContactMap: React.FC = () => {
  return (
    <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-carent-text">
          Find us on Google Maps
        </h3>
      </div>
      <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2366.3890663283805!2d85.33870759120316!3d27.719452006247984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4a12cc0b6be0b81f%3A0x61036d7c7b48739f!2sBato%20Ma%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1766999682236!5m2!1sen!2snp"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};
