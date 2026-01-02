import type { Metadata } from "next";
import ToursViewPage from "./tours-view";

export const metadata: Metadata = {
  title: "Tour Packages | Explore Kathmandu with Bato Ma",
  description:
    "Explore Kathmandu with Bato Ma’s guided EV tour packages. Discover heritage sites, food spots, and city rides with electric vehicles.",

  openGraph: {
    title: "Tour Packages | Bato Ma EV Tours",
    description:
      "Book guided electric vehicle tours in Kathmandu with Bato Ma. Enjoy heritage tours, food tours, and city experiences.",
    type: "website",
  },
};

export default function ToursPage() {
  return <ToursViewPage />;
}
