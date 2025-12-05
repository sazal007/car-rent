"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CARS } from "@/constants";
import { Button } from "@/components/shared/Button";
import { CarCollection } from "@/components/home/CarCollection";
import {
  Armchair,
  Settings,
  Briefcase,
  Fuel,
  CheckCircle,
  Star,
} from "lucide-react";

const termsTabs = [
  { id: "insurance", label: "Insurance and Coverage" },
  { id: "requirements", label: "Rental Requirements" },
  { id: "cancellation", label: "Cancellation Policy" },
];

export default function CarDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Extract car ID from slug (format: "id-slug")
  const carId = slug.split("-")[0];
  const car = CARS.find((c) => c.id === carId);

  const [activeTab, setActiveTab] = useState("requirements");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!car) {
    return (
      <div className="min-h-screen pt-56 text-center">
        <h2 className="text-3xl font-bold">Car not found</h2>
        <Link href="/">
          <Button className="mt-4">Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-56 bg-white">
      {/* Top Split Section */}
      <div className="container mx-auto px-4 md:px-6 mb-20">
        <div className="flex flex-col lg:flex-row gap-12 relative items-start">
          {/* Left: Sticky Image */}
          <div className="lg:w-1/2 w-full sticky top-36 self-start">
            <div className="bg-carent-gray rounded-lg overflow-hidden h-[400px] md:h-[500px]">
              <Image
                src={car.image}
                alt={car.name}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2 w-full pt-2">
            <h1 className="text-4xl md:text-5xl font-bold text-carent-text mb-3">
              {car.name}
            </h1>
            <p className="text-gray-500 mb-6 font-medium text-lg">
              {car.brand || "Brand"}{" "}
              <span className="mx-2 text-gray-300">|</span> {car.type}{" "}
              <span className="mx-2 text-gray-300">|</span> {car.year || "2023"}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {car.description ||
                "Experience the ultimate comfort and performance with our premium rental vehicles. Perfect for any journey."}
            </p>

            <div className="flex items-end gap-2 mb-8">
              <span className="text-4xl font-bold text-carent-text">
                ${car.price}
              </span>
              <span className="text-gray-500 mb-1">/Per day</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-12 items-center sm:items-stretch">
              <Button className="w-full sm:w-auto h-14 text-lg">
                Book a car
              </Button>
              <div className="flex items-center gap-2 px-2 py-3">
                <span className="text-carent-text font-medium text-lg">
                  Book by call
                </span>
                <span className="text-carent-text font-medium text-lg">
                  (+91) 125 888 666
                </span>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-4 gap-4 border-y border-gray-100 py-8 mb-10">
              <div className="flex flex-col items-center gap-3">
                <Armchair
                  strokeWidth={1.5}
                  className="text-carent-text w-6 h-6"
                />
                <span className="text-sm font-semibold text-carent-text">
                  Seat
                </span>
                <span className="text-sm text-gray-500">{car.seats}</span>
              </div>
              <div className="flex flex-col items-center gap-3 border-l border-gray-100">
                <Settings
                  strokeWidth={1.5}
                  className="text-carent-text w-6 h-6"
                />
                <span className="text-sm font-semibold text-carent-text">
                  Gearbox
                </span>
                <span className="text-sm text-gray-500">
                  {car.transmission}
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 border-l border-gray-100">
                <Briefcase
                  strokeWidth={1.5}
                  className="text-carent-text w-6 h-6"
                />
                <span className="text-sm font-semibold text-carent-text">
                  Luggage
                </span>
                <span className="text-sm text-gray-500">
                  {car.luggage} bags
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 border-l border-gray-100">
                <Fuel strokeWidth={1.5} className="text-carent-text w-6 h-6" />
                <span className="text-sm font-semibold text-carent-text">
                  Fuel
                </span>
                <span className="text-sm text-gray-500">
                  {car.fuel || "Petrol"}
                </span>
              </div>
            </div>

            {/* Vehicle Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-carent-text">
                Vehicle features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {(
                  car.features || ["Bluetooth", "A/C", "GPS", "Power Windows"]
                ).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-carent-text fill-transparent"
                      strokeWidth={2}
                    />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-semibold mb-12 text-center text-carent-text">
            Vehicle gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(car.gallery || [car.image, car.image, car.image]).map(
              (img, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden h-64 hover:opacity-95 transition-opacity"
                >
                  <Image
                    src={img}
                    alt={`Gallery ${idx}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Terms and Conditions (Dark Section) */}
      <section className="py-24 bg-carent-dark text-white rounded-t-[40px] md:rounded-t-[60px] mx-2 md:mx-4">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold mb-16">Terms and Conditions</h2>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            {/* Left: Tabs */}
            <div className="w-full md:w-1/3 flex flex-col gap-2">
              {termsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    text-left text-xl py-2 pl-0 md:pl-6 border-l-2 transition-all duration-300 font-medium
                    ${
                      activeTab === tab.id
                        ? "border-white text-white"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-2/3">
              {activeTab === "requirements" && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Driver age:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Renters must be at least 21 years old to rent a standard
                      vehicle. Luxury and premium vehicles require a minimum age
                      of 25.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Driver&apos;s license:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      A valid driver&apos;s license, held for a minimum of 1
                      year, is required to rent a vehicle.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Payment:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Full payment is required at the time of booking. We accept
                      major credit cards (Visa, MasterCard, American Express).
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "insurance" && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Insurance and Coverage:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Our vehicles come with standard comprehensive insurance.
                      An excess amount may apply in case of damage. Additional
                      protection packages are available for purchase to reduce
                      liability.
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "cancellation" && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Cancellation Policy:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Free cancellation is available up to 24 hours before the
                      scheduled pickup time. Cancellations made within 24 hours
                      may be subject to a fee equivalent to one day&apos;s
                      rental.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
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
                &quot;I frequently travel for work and have used many rental
                services, but this one stands out. Fast booking, great vehicles,
                and excellent customer support. I&apos;ll be back!&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://picsum.photos/seed/u7/100/100"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="Daniel"
                />
                <span className="font-bold text-carent-text text-lg">
                  Daniel Lee
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
                &quot;I rented a car for a weekend getaway, and everything went
                smoothly. The car was clean, comfortable, and a joy to
                drive.&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://picsum.photos/seed/u2/100/100"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="Lisa"
                />
                <span className="font-bold text-carent-text text-lg">
                  Lisa Anderson
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <CarCollection title="You may also like" limit={2} excludeId={car.id} />
    </div>
  );
}
