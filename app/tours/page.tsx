import ToursViewPage from "./tours-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided EV Tours - Explore Kathmandu with Bato Ma",
  description:
    "Explore Kathmandu with our guided electric vehicle tours. Heritage sites, food tours, and evening city rides. Book your adventure today!",
  openGraph: {
    title: "Guided Tours in Kathmandu - Bato Ma",
    description:
      "Join our guided EV tours in Kathmandu. Visit heritage sites, enjoy food tours, and experience the city on electric vehicles.",
  },
};

export default function ToursPage() {
  return <ToursViewPage />;
}
