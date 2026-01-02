import { Hero } from "../components/home/Hero";
import { CarCollection } from "@/components/home/CarCollection";
import { Categories } from "@/components/home/Categories";
import { Steps } from "@/components/home/Steps";
import { Testimonials } from "@/components/home/Testimonials";
import { AboutStats } from "@/components/home/AboutStats";
import { TourPackages } from "@/components/home/TourPakages";
import { Services } from "@/components/home/Services";
import { BookingForm } from "@/components/home/BookingForm";
import FeaturesSection2 from "@/components/home/features2";
import { BlogContactForm } from "@/components/blog/BlogContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bato Ma - Rent Ev Scooter , Taxi & Customize Tour Packages With Bato Ma",
  description:
    "Bato Ma offers electric vehicle rentals in Kathmandu, Nepal. Rent EV scooters, taxis, and join guided tours. Sustainable, safe, and reliable transportation solutions.",
  openGraph: {
    title: "Bato Ma - Electric Vehicle Rentals in Kathmandu",
    description:
      "Rent electric scooters, taxis, and join guided tours in Kathmandu. Sustainable transportation with 24/7 support.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <BookingForm />
      <AboutStats />
      <Services />
      {/* <Features /> */}
      <Categories />
      <FeaturesSection2 />
      <CarCollection />
      <TourPackages />
      <Steps />
      <Testimonials />
      <BlogContactForm />
    </>
  );
}
