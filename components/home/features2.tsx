import React from "react";
import Image from "next/image";

const FeaturesSection2 = () => {
  return (
    <section className="bg-white py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#333c4e] mb-4">
            Why <span className="text-[#ffb400]">Bato Ma?</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Experienced rental company in Kathmandu with a proven track record
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 items-center">
          <div className="flex flex-col gap-12 lg:gap-20 order-2 lg:order-1">
            <div className="text-center lg:text-right transform lg:-translate-x-12 transition-transform duration-500">
              <div className="flex items-center justify-center lg:justify-end gap-3 mb-1">
                <h3 className="text-lg font-bold text-[#333c4e]">
                  Expertise and Experience
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb400] shrink-0 shadow-sm"></span>
              </div>
              <p className="text-xs text-gray-400 max-w-[190px] mx-auto lg:mr-0">
                Years of experience planning trips.
              </p>
            </div>

            <div className="text-center lg:text-right transform lg:-translate-x-20 transition-transform duration-500">
              <div className="flex items-center justify-center lg:justify-end gap-3 mb-1">
                <h3 className="text-lg font-bold text-[#333c4e]">
                  Best Price Guarantee
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-[#2daae1] shrink-0 shadow-sm"></span>
              </div>
              <p className="text-xs text-gray-400 max-w-[190px] mx-auto lg:mr-0">
                Get the best prices on your booking.
              </p>
            </div>

            <div className="text-center lg:text-right transform lg:-translate-x-12 transition-transform duration-500">
              <div className="flex items-center justify-center lg:justify-end gap-3 mb-1">
                <h3 className="text-lg font-bold text-[#333c4e]">
                  Flexible Booking Options
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb400] shrink-0 shadow-sm"></span>
              </div>
              <p className="text-xs text-gray-400 max-w-[190px] mx-auto lg:mr-0">
                Change or cancel bookings with no penalty.
              </p>
            </div>
          </div>

          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[320px] lg:max-w-[400px]">
              <img
                src="/images/tata.png"
                alt="Hiking Illustration"
                className="w-full h-auto drop-shadow-xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-12 lg:gap-20 order-3">
            <div className="text-center lg:text-left transform lg:translate-x-12 transition-transform duration-500">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb400] shrink-0 shadow-sm"></span>
                <h3 className="text-lg font-bold text-[#333c4e]">
                  24/7 Customer Support
                </h3>
              </div>
              <p className="text-xs text-gray-400 max-w-[190px] mx-auto lg:ml-0">
                Assistance available at any time. We are always here.
              </p>
            </div>

            <div className="text-center lg:text-left transform lg:translate-x-20 transition-transform duration-500">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2daae1] shrink-0 shadow-sm"></span>
                <h3 className="text-lg font-bold text-[#333c4e]">
                  Safety and Security
                </h3>
              </div>
              <p className="text-xs text-gray-400 max-w-[190px] mx-auto lg:ml-0">
                Prioritize your safety and security travel partner.
              </p>
            </div>

            <div className="text-center lg:text-left transform lg:translate-x-12 transition-transform duration-500">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb400] shrink-0 shadow-sm"></span>
                <h3 className="text-lg font-bold text-[#333c4e]">
                  Dedicated Travel Guides
                </h3>
              </div>
              <p className="text-xs text-gray-400 max-w-[190px] mx-auto lg:ml-0">
                Experienced guides for all kinds of tours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection2;
