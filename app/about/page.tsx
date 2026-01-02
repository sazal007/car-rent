import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutShowcase } from "@/components/about/AboutShowcase";
import { AboutMissionValues } from "@/components/about/AboutMissionValues";
import { AboutGallery } from "@/components/about/AboutGallery";
import type { Metadata } from "next";
import { BlogContactForm } from "@/components/blog/BlogContactForm";

export const metadata: Metadata = {
  title: "About Bato Ma - Leading Sustainable EV Rentals",
  description:
    "Learn about Bato Ma - Kathmandu's leading electric vehicle rental service. Our mission, values, and commitment to sustainable transportation.",
  openGraph: {
    title: "About Bato Ma - Sustainable EV Rental Services",
    description:
      "Discover Bato Ma's mission to provide sustainable, safe, and reliable electric vehicle rentals in Kathmandu, Nepal.",
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
