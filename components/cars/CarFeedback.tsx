"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export const CarFeedback: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-semibold mb-12 max-w-sm leading-tight text-carent-text">
          Feedback from satisfied renter
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-carent-gray p-10 rounded-sm w-full md:w-1/2">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={16} fill="black" className="text-black" />
              ))}
              <Star size={16} fill="#e5e5e5" className="text-gray-200" />
            </div>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              &quot;Renting the electric scooter was the highlight of my
              Kathmandu trip. So easy to park and zip around Thamel!&quot;
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="https://picsum.photos/seed/u7/100/100"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                alt="James"
              />
              <span className="font-bold text-carent-text text-lg">
                James Wilson
              </span>
            </div>
          </div>
          <div className="bg-carent-gray p-10 rounded-sm w-full md:w-1/2">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="black" className="text-black" />
              ))}
            </div>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              &quot;The guided tour was exceptional. My guide knew all the
              history and safe routes. Highly recommended for
              first-timers.&quot;
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="https://picsum.photos/seed/u2/100/100"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                alt="Sarah"
              />
              <span className="font-bold text-carent-text text-lg">
                Sarah Chen
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

