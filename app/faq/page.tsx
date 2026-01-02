import type { Metadata } from "next";
import FaqView from "./faq-view";

export const metadata: Metadata = {
  title: "FAQ | EV Scooter, Taxi & Tour Rentals – Bato Ma",
  description:
    "Find answers to common questions about Bato Ma EV rentals, including booking, licenses, safety, cancellations, and guided tours in Kathmandu.",

  openGraph: {
    title: "FAQ | Bato Ma EV Rentals",
    description:
      "Get clear answers to frequently asked questions about EV scooter and taxi rentals, bookings, and tours with Bato Ma.",
    type: "website",
  },
};

export default function Faq() {
  return <FaqView />;
}
