import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutShowcase } from "@/components/about/AboutShowcase";
import { AboutMissionValues } from "@/components/about/AboutMissionValues";
import { AboutGallery } from "@/components/about/AboutGallery";
import type { Metadata } from "next";
import { BlogContactForm } from "@/components/blog/BlogContactForm";


export const metadata: Metadata = {
  title: "About Bato Ma | EV Scooter, Taxi & Tour Rentals in Kathmandu",
  description:
    "Bato Ma is a trusted and affordable EV rental service in Kathmandu, Nepal. Rent EV scooters, taxis, and customize guided tour packages for the best travel experience.",

  openGraph: {
    title: "About Bato Ma | Rent EV Scooter, Taxi & Tours in Kathmandu",
    description:
      "Rent EV scooters and taxis in Kathmandu with Bato Ma. Enjoy self-ride, guided tours, and customized tour packages with affordable and reliable service.",
    type: "website",
  },
};


export default function About() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutShowcase />
      <AboutMissionValues />
      <AboutGallery />
      <BlogContactForm />
      {/* <AboutTeam /> */}
    </>
  );
}
