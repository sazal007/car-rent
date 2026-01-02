"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "../shared/Button";
import { BookingDialogModal } from "../booking/BookingDialogModal";

const SERVICES = [
  {
    title: "Self-Ride EV Scooter",
    categoryName: "Scooter",
    highlight: "License required • Helmet included",
    points: [
      "Premium EV scooters with long battery life 100km+ mileage",
      "Best for solo or couple rides around Kathmandu",
      "Upload license during booking, pickup in minutes",
    ],
    cta: {
      label: "Rent a scooter",
    },
  },
  {
    title: "Guided Scooter Ride",
    categoryName: "Scooter",
    highlight: "No license needed • Local rider/guide",
    points: [
      "Hop on with a licensed rider who knows the city",
      "Ideal for heritage sites, food tours, evening rides",
      "Safety gear + rain cover included",
    ],
    cta: {
      label: "Book with guide",
    },
  },
  {
    title: "EV Taxi & SUV Service",
    categoryName: "Taxi",
    highlight: "Comfortable EV sedans & SUVs",
    points: [
      "Airport pickup/drop, half-day or full-day hires",
      "Professional company drivers, A/C, bottled water",
      "Perfect for families and group sightseeing",
    ],
    cta: {
      label: "Book a taxi",
    },
  },
];

export const Services: React.FC = () => {
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Map category names to actual category values used in the system
  const getCategoryValue = (categoryName: string): string => {
    const name = categoryName.toLowerCase();
    if (name === "scooter") return "Scooter";
    if (name === "taxi") return "Taxi";
    return categoryName;
  };

  const handleBookClick = (categoryName: string) => {
    setSelectedCategory(getCategoryValue(categoryName));
    setShowBookingDialog(true);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          <div className="max-w-5xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-carent-text mb-3 sm:mb-4">
              Best Rental Services In Kathmandu
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Choose self-ride freedom, a guided scooter for stress-free
              exploring, or a comfortable EV taxi for family trips.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm  transition-shadow duration-300 flex flex-col text-start"
            >
              <div className="flex flex-col items-start justify-start mb-3 sm:mb-4">
                <div className="">
                  <h3 className="text-lg sm:text-xl font-bold text-carent-text">
                    {service.title}
                  </h3>
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3 text-gray-600 flex-1 text-sm sm:text-base">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2 items-start">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 text-carent-yellow shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-7 md:mt-8">
                <Button
                  onClick={() => handleBookClick(service.categoryName)}
                  className="w-full justify-center text-sm sm:text-base"
                  iconPosition="right"
                >
                  {service.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      <BookingDialogModal
        isOpen={showBookingDialog}
        onClose={() => {
          setShowBookingDialog(false);
          setSelectedCategory(null);
        }}
        preselectedCategory={selectedCategory}
      />
    </section>
  );
};
