"use client";

import Link from "next/link";
import { CheckCircle, Shield, Map, Car } from "lucide-react";
import { Button } from "../shared/Button";

const SERVICES = [
  {
    title: "Self-Ride EV Scooter",
    highlight: "License required • Helmet included",
    points: [
      "Premium EV scooters with long battery life",
      "Best for solo or couple rides around Kathmandu",
      "Upload license during booking, pickup in minutes",
    ],
    cta: {
      label: "Rent a scooter",
      href: "/cars?category=Self-ride%20Scooter",
    },
    icon: CheckCircle,
  },
  {
    title: "Guided Scooter Ride",
    highlight: "No license needed • Local rider/guide",
    points: [
      "Hop on with a licensed rider who knows the city",
      "Ideal for heritage sites, food tours, evening rides",
      "Safety gear + rain cover included",
    ],
    cta: {
      label: "Book with guide",
      href: "/cars?category=Guide%20with%20Scooter",
    },
    icon: Map,
  },
  {
    title: "EV Taxi Service",
    highlight: "Comfortable EV sedans & SUVs",
    points: [
      "Airport pickup/drop, half-day or full-day hires",
      "Professional company drivers, A/C, bottled water",
      "Perfect for families and group sightseeing",
    ],
    cta: {
      label: "Book a taxi",
      href: "/cars?category=Ev%20Taxi",
    },
    icon: Car,
  },
];

export const Services: React.FC = () => {
  return (
    <section className="py-24 bg-carent-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold text-carent-text mb-4">
              Services built for Kathmandu trips
            </h2>
            <p className="text-gray-600 text-lg">
              Choose self-ride freedom, a guided scooter for stress-free
              exploring, or a comfortable EV taxi for family journeys.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-carent-yellow/20 text-carent-dark flex items-center justify-center">
                  <service.icon size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-carent-text">
                    {service.title}
                  </h3>
                  <p className="text-sm text-carent-dark">{service.highlight}</p>
                </div>
              </div>

              <ul className="space-y-3 text-gray-600 flex-1">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2 items-start">
                    <Shield className="w-4 h-4 mt-1 text-carent-yellow" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href={service.cta.href}>
                  <Button className="w-full justify-center">
                    {service.cta.label}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

