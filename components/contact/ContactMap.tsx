"use client";

import React from "react";
import { MapPin } from "lucide-react";

export const ContactMap: React.FC = () => {
  return (
    <div className="mt-16 sm:mt-20 md:mt-24">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">

          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Find Us
          </h3>
        </div>

      </div>

      <div className="relative rounded-lg overflow-hidden border border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none z-10" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2366.3890663283805!2d85.33870759120316!3d27.719452006247984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4a12cc0b6be0b81f%3A0x61036d7c7b48739f!2sBato%20Ma%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1766999682236!5m2!1sen!2snp"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[20%]"
        />
      </div>
    </div>
  );
};