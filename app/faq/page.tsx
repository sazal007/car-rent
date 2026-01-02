import FaqView from "./faq-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bato Ma FAQ - Everything About Ev Scooter , Taxi & Customize Tour Packages",
  description:
    "Frequently asked questions about Bato Ma EV rentals. Learn about licenses, booking, safety gear, cancellation policies, and more.",
  openGraph: {
    title: "Frequently Asked Questions - Bato Ma",
    description:
      "Find answers to common questions about electric vehicle rentals, bookings, safety, and tours in Kathmandu.",
  },
};

export default function Faq() {
  return <FaqView />;
}
