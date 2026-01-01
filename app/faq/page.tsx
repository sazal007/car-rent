import FaqView from "./faq-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Batoma EV rentals. Learn about licenses, booking, safety gear, cancellation policies, and more.",
  openGraph: {
    title: "Frequently Asked Questions - Batoma",
    description:
      "Find answers to common questions about electric vehicle rentals, bookings, safety, and tours in Kathmandu.",
    url: "/faq",
  },
};

export default function Faq() {
  return <FaqView />;
}
