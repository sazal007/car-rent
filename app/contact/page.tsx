import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactMap } from "@/components/contact/ContactMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Bato Ma - 24/7 EV Support & Bookings",
  description:
    "Get in touch with Bato Ma for EV rentals, tours, and inquiries. We're here to help you with your transportation needs in Kathmandu.",
  openGraph: {
    title: "Contact Bato Ma - EV Rental Support",
    description:
      "Contact Bato Ma for electric vehicle rentals, guided tours, and customer support. Available 24/7 for your convenience.",
  },
};

export default function Contact() {
  return (
    <div className="bg-white pt-32 sm:pt-40 lg:pt-60 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Hero and Info */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16">
            <ContactHero />
            <ContactInfo />
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 pt-10">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Bottom Section: Map */}
        <div className="mt-16 sm:mt-24 md:mt-32">
          <ContactMap />
        </div>
      </div>
    </div>
  );
}
