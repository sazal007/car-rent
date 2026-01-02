import type { Metadata } from "next";
import CarsViewPage from "./rentals-view";

export const metadata: Metadata = {
  title: "Rental Categories | EV Scooters & Taxis in Kathmandu",
  description:
    "Explore Bato Ma’s EV rental categories in Kathmandu. Choose from electric scooters, taxis, and tour-friendly vehicles for a smooth and eco-friendly ride.",

  openGraph: {
    title: "Rental Categories | Bato Ma EV Rentals",
    description:
      "Browse electric scooters and taxis for rent in Kathmandu with Bato Ma. Find the right EV and book your ride easily.",
    type: "website",
  },
};

export default function CarsPage() {
  return <CarsViewPage />;
}
