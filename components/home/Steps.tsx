"use client";

import React from "react";

export const Steps: React.FC = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      {/* Left Image */}
      <div className="lg:w-1/2 w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-auto relative">
        <img
          src="/images/basantapur.avif"
          alt="Car in nature"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="lg:w-1/2 w-full bg-carent-dark text-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-20 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 sm:mb-10 md:mb-12">
          Rent your vehicle in 3 easy steps
        </h2>

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          <div className="flex gap-4 sm:gap-5 md:gap-6">
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-carent-yellow text-carent-dark font-bold text-sm sm:text-base flex items-center justify-center">
              01
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-1.5 sm:mb-2">Choose your vehicle</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Browse our wide selection of vehicles, from compact city vehicles to
                spacious SUVs. Pick the perfect ride that suits your needs.
              </p>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-5 md:gap-6">
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-carent-yellow text-carent-dark font-bold text-sm sm:text-base flex items-center justify-center">
              02
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-1.5 sm:mb-2">Book online</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Reserve your vehicle in just a few clicks with our user-friendly
                booking system. Select your dates, and locations, and confirm
                your reservation instantly.
              </p>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-5 md:gap-6">
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-carent-yellow text-carent-dark font-bold text-sm sm:text-base flex items-center justify-center">
              03
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-1.5 sm:mb-2">Pick up & drive</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Head to the nearest pickup location and grab your vehicle. Enjoy a
                smooth ride through the city with our reliable and
                well-maintained vehicles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
