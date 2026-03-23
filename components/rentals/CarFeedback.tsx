"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export const CarFeedback: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10 md:mb-12 max-w-sm leading-tight text-carent-text">
          Feedback from satisfied renter
        </h2>
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          <div className="bg-carent-gray p-6 sm:p-8 md:p-10 rounded-sm w-full md:w-1/2">
            <div className="flex gap-1 mb-3 sm:mb-4">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} className="sm:w-4 sm:h-4 fill-black text-black" />
              ))}
              <Star size={14} className="sm:w-4 sm:h-4 fill-gray-200 text-gray-200" />
            </div>
            <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base md:text-lg">
              &quot;Renting the electric scooter was the highlight of my
              Kathmandu trip. So easy to park and zip around Thamel!&quot;
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="https://picsum.photos/seed/u7/100/100"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                alt="James"
              />
              <span className="font-bold text-carent-text text-sm sm:text-base md:text-lg">
                James Wilson
              </span>
            </div>
          </div>
          <div className="bg-carent-gray p-6 sm:p-8 md:p-10 rounded-sm w-full md:w-1/2">
            <div className="flex gap-1 mb-3 sm:mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className="sm:w-4 sm:h-4 fill-black text-black" />
              ))}
            </div>
            <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base md:text-lg">
              &quot;The guided tour was exceptional. My guide knew all the
              history and safe routes. Highly recommended for
              first-timers.&quot;
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="https://picsum.photos/seed/u2/100/100"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                alt="Sarah"
              />
              <span className="font-bold text-carent-text text-sm sm:text-base md:text-lg">
                Sarah Chen
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

