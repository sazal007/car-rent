import React from "react";
import { TOURS } from "@/constants";
import { Button } from "@/components/shared/Button";
import { Clock, Check } from "lucide-react";

const formatNpr = (value: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(value);

export const TourPackages: React.FC = () => {
  return (
    <section className="py-24 bg-carent-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold text-carent-text mb-4">
              Optional Tour Packages
            </h2>
            <p className="text-gray-600">
              Curated experiences to help you discover the soul of the city.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOURS.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-carent-dark">
                  {formatNpr(tour.price)}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-carent-text mb-2">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
                  <Clock size={16} />
                  <span>{tour.duration}</span>
                </div>
                <p className="text-gray-600 mb-6 grow">{tour.description}</p>

                <div className="mb-8">
                  <h4 className="font-semibold text-sm mb-3 text-carent-text uppercase tracking-wide">
                    Includes:
                  </h4>
                  <ul className="space-y-2">
                    {tour.includes.map((inc, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >
                        <Check size={14} className="text-carent-yellow" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full justify-center">
                  Book This Tour
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
