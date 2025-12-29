import { Hero } from "../components/home/Hero";
import { Features } from "@/components/home/Features";
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
