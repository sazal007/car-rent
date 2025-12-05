import { Hero } from "../components/home/Hero";
import { Features } from "@/components/home/Features";
import { CarCollection } from "@/components/home/CarCollection";
import { Categories } from "@/components/home/Categories";
import { Steps } from "@/components/home/Steps";
import { Testimonials } from "@/components/home/Testimonials";
import { AboutStats } from "@/components/home/AboutStats";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CarCollection />
      <Categories />
      <Steps />
      <Testimonials />
      <AboutStats />
    </>
  );
}
