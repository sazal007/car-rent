import CarsViewPage from "./cars-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our EV Fleet - Rent Scooters & Taxis in Kathmandu",
  description:
    "Browse our fleet of electric vehicles for rent in Kathmandu. Choose from EV scooters, sedans, SUVs, and guided tours. Book online today!",
  openGraph: {
    title: "Electric Vehicle Rentals - Bato Ma",
    description:
      "Rent electric scooters, taxis, and join guided tours in Kathmandu. Browse our fleet and book your perfect EV rental.",
  },
};

export default function CarsPage() {
  return <CarsViewPage />;
}
