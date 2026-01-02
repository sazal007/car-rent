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
import FaqView from "./faq/faq-view";
import Script from "next/script";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bato Ma",
  "url": "https://batomatours.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://batomatours.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const corporationSchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "Bato Ma",
  "url": "https://batomatours.com",
  "logo": "https://batomatours.com/logo/logowhite.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+9779705471232",
    "contactType": "customer service",
    "email": "bato1111ma@gmail.com",
    "areaServed": "NP",
    "availableLanguage": ["en", "ne"]
  },
  "sameAs": [
    "https://facebook.com/batoma",
    "https://instagram.com/batoma",
    "https://linkedin.com/company/batoma"
  ]
};

export const metadata: Metadata = {
  title: "Bato Ma | Rent EV Scooters & Taxis in Kathmandu",
  description:
    "Eco-friendly electric vehicle rentals and guided tours in Kathmandu. Choose from EV scooters, taxis, and custom tour packages for a sustainable travel experience.",
  openGraph: {
    title: "Bato Ma | Rent EV Scooters & Taxis in Kathmandu",
    description:
      "Eco-friendly electric vehicle rentals and guided tours in Kathmandu. Join us for a sustainable travel experience.",
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
      <FaqView />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-corporation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationSchema) }}
      />
    </>
  );
}
