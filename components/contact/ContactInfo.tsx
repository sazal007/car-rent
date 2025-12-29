"use client";

import React from "react";
import { Headphones, MapPin, Hourglass } from "lucide-react";

export const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12">
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-carent-text mb-6 sm:mb-7 md:mb-8">
        Our contact details
      </h2>

      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        {/* Support */}
        <div className="flex gap-3 sm:gap-4">
          <div className="mt-0.5 sm:mt-1 shrink-0">
            <Headphones
              size={24}
              className="sm:w-7 sm:h-7 text-carent-text"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-carent-text mb-1.5 sm:mb-2">
              Support
            </h3>
            <p className="text-gray-600 mb-1 text-sm sm:text-base">
              bato1111ma@gmail.com
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Call: (+977) 9705471232
            </p>
          </div>
        </div>

        {/* WhatsApp */}
        {/* <div className="flex gap-3 sm:gap-4">
          <div className="mt-0.5 sm:mt-1 shrink-0">
            <MessageCircle
              size={24}
              className="sm:w-7 sm:h-7 text-carent-text"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-carent-text mb-1.5 sm:mb-2">
              WhatsApp
            </h3>
            <p className="text-gray-600 mb-1 text-sm sm:text-base">
              Chat for quick confirmations
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              (+977) 980-9876543
            </p>
          </div>
        </div> */}

        {/* Address */}
        <div className="flex gap-3 sm:gap-4">
          <div className="mt-0.5 sm:mt-1 shrink-0">
            <MapPin
              size={24}
              className="sm:w-7 sm:h-7 text-carent-text"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-carent-text mb-1.5 sm:mb-2">
              Address
            </h3>
            <p className="text-gray-600 mb-1 text-sm sm:text-base">
              Rudramati Marg
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Kathmandu 44600
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex gap-3 sm:gap-4">
          <div className="mt-0.5 sm:mt-1 shrink-0">
            <Hourglass
              size={24}
              className="sm:w-7 sm:h-7 text-carent-text"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-carent-text mb-1.5 sm:mb-2">
              Working hours
            </h3>
            <p className="text-gray-600 mb-1 text-sm sm:text-base">
              Everyday: 7:00 AM - 9:00 PM
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Airport pickups: 24/7 on request
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
