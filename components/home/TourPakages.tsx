"use client";
import React from "react";
import { Button } from "@/components/shared/Button";
import { Clock, Check } from "lucide-react";
import { useTours } from "@/hooks/use-tours";

const formatNpr = (value: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(value);

export const TourPackages: React.FC = () => {
  const { data: tours } = useTours();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Optional Tour Packages
          </h2>
          <p className="text-gray-600 text-lg">
            Curated experiences to help you discover the soul of the city.
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours?.results.map((tour) => {
            const includes = JSON.parse(tour.data.includes || "[]") as string[];

            return (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
              >
                {/* Tour Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.data.image}
                    alt={tour.data.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
                    <span className="text-lg font-bold text-gray-900">
                      {formatNpr(Number(tour.data.price))}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {tour.data.name}
                  </h3>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Clock size={18} />
                    <span className="text-sm font-medium">
                      {tour.data.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <div
                    className="text-gray-600 text-sm leading-relaxed mb-6 grow [&_pre]:whitespace-normal [&_pre]:bg-transparent [&_pre]:border-0 [&_pre]:p-0 [&_pre]:m-0 [&_code]:text-gray-600 [&_code]:font-normal [&_code]:text-sm"
                    dangerouslySetInnerHTML={{ __html: tour.data.content }}
                  />

                  {/* Includes Section */}
                  {includes.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                        What&apos;s Included
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                        {includes.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <Check
                              size={16}
                              className="text-carent-yellow shrink-0 mt-0.5"
                            />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button className="w-full justify-center mt-auto">
                    Book This Tour
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
