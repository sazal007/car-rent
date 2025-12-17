"use client";

import React from "react";

export const Steps: React.FC = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row min-h-[600px]">
      {/* Left Image */}
      <div className="lg:w-1/2 w-full h-[200px] lg:h-auto relative">
        <img
          src="/images/basantapur.avif"
          alt="Car in nature"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="lg:w-1/2 w-full bg-carent-dark text-white p-12 lg:p-20 flex flex-col justify-center">
        <h2 className="text-4xl lg:text-5xl font-semibold mb-12">
          Rent your car in 3 easy steps
        </h2>

        <div className="space-y-10">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-carent-yellow text-carent-dark font-bold flex items-center justify-center">
              01
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Choose your car</h3>
              <p className="text-gray-400 leading-relaxed">
                Browse our wide selection of vehicles, from compact city cars to
                spacious SUVs. Pick the perfect ride that suits your needs.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-carent-yellow text-carent-dark font-bold flex items-center justify-center">
              02
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Book online</h3>
              <p className="text-gray-400 leading-relaxed">
                Reserve your car in just a few clicks with our user-friendly
                booking system. Select your dates, and locations, and confirm
                your reservation instantly.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-carent-yellow text-carent-dark font-bold flex items-center justify-center">
              03
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Pick up & drive</h3>
              <p className="text-gray-400 leading-relaxed">
                Head to the nearest pickup location and grab your keys. Enjoy a
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
