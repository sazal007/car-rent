import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutShowcase } from "@/components/about/AboutShowcase";
import { AboutMissionValues } from "@/components/about/AboutMissionValues";
import { AboutGallery } from "@/components/about/AboutGallery";
import { AboutTeam } from "@/components/about/AboutTeam";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutShowcase />
      <AboutMissionValues />
      <AboutGallery />
      <AboutTeam />
    </>
  );
}
