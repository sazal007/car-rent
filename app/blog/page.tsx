import BlogView from "./blog-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bato Ma Blog | EV Travel Tips & Rental Guides",
  description:
    "Explore Bato Ma’s blog for EV travel tips, rental guides, and insights on exploring Kathmandu with electric scooters and taxis.",

  openGraph: {
    title: "Bato Ma Blog | EV Travel & Rental Insights",
    description:
      "Read helpful EV travel tips, rental guides, and stories for exploring Kathmandu with Bato Ma.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogView />;
}
