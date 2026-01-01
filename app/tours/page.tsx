import ToursViewPage from "./tours-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Explore Kathmandu with our guided electric vehicle tours. Heritage sites, food tours, and evening city rides. Book your adventure today!",
  openGraph: {
    title: "Guided Tours in Kathmandu - Batoma",
    description:
      "Join our guided EV tours in Kathmandu. Visit heritage sites, enjoy food tours, and experience the city on electric vehicles.",
    url: "/tours",
  },
};

export default function ToursPage() {
  return <ToursViewPage />;
}
