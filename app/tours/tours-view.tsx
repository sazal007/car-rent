"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Clock, Check } from "lucide-react";
import { useTours } from "@/hooks/use-tours";
import { Loader } from "@/components/shared/loader";
import { PriceTier } from "@/types/tours";
import { BlogContactForm } from "@/components/blog/BlogContactForm";

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

// Parse price JSON string and get the starting price (highest price for smallest group)
const getStartingPrice = (priceString: string): number => {
  try {
    const priceTiers: PriceTier[] = JSON.parse(priceString || "[]");
    if (priceTiers.length === 0) return 0;
    // Return the highest price (usually for smallest group size)
    return Math.max(...priceTiers.map((tier) => tier.price_per_person));
  } catch {
    // Fallback: try to parse as number for backward compatibility
    const numPrice = Number(priceString);
    return isNaN(numPrice) ? 0 : numPrice;
  }
};

export default function ToursViewPage() {
  const { data: tours, isLoading } = useTours();

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text">
              Tour Packages
            </h1>
          </div>
          <div className="text-center py-20 flex items-center justify-center">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  const tourList = tours?.results || [];

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="max-w-5xl mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text mb-2 sm:mb-3">
            Tour Packages from Bato Ma Tours
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Customize tours package with experience travel guides , dinner , breakfast , lauch every thinks included.
          </p>
        </div>

        {/* Tour Cards Grid */}
        {tourList.length === 0 ? (
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <div className="text-gray-500 text-sm sm:text-base md:text-lg">
              No tour packages available.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {tourList.map((tour) => {
              const includes = JSON.parse(
                tour.data.includes || "[]"
              ) as string[];
              const slug = tour.data.slug || tour.id.toString();

              return (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.id}-${slug}`}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 h-full">
                    {/* Tour Image */}
                    <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                      <img
                        src={tour.data.image}
                        alt={tour.data.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {tour.data.name}
                      </h3>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-gray-500 mb-3 sm:mb-4">
                        <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="text-xs sm:text-sm font-medium">
                          {tour.data.duration}
                        </span>
                      </div>

                      {/* Description */}
                      <div
                        className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 md:mb-6 grow [&_pre]:whitespace-normal [&_pre]:bg-transparent [&_pre]:border-0 [&_pre]:p-0 [&_pre]:m-0 [&_code]:text-gray-600 [&_code]:font-normal [&_code]:text-xs [&_code]:sm:text-sm"
                        dangerouslySetInnerHTML={{ __html: tour.data.content }}
                      />

                      {/* Includes Section */}
                      {includes.length > 0 && (
                        <div className="mb-4 sm:mb-5 md:mb-6">
                          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2 sm:mb-3">
                            What&apos;s Included
                          </h4>
                          <ul className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1.5 sm:gap-y-2">
                            {includes.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600"
                              >
                                <Check
                                  size={14}
                                  className="sm:w-4 sm:h-4 text-carent-yellow shrink-0 mt-0.5"
                                />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button className="w-full justify-center mt-auto text-sm sm:text-base group-hover:bg-carent-yellow group-hover:text-white transition-colors">
                        Book This Tour
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <BlogContactForm />
    </div>
  );
}
