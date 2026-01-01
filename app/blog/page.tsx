import BlogView from "./blog-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest articles about electric vehicles, travel tips, and guides for exploring Kathmandu. Stay informed about EV rentals and sustainable transportation.",
  openGraph: {
    title: "Blog - Batoma EV Rental",
    description:
      "Discover travel tips, EV guides, and insights about exploring Kathmandu with electric vehicles.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return <BlogView />;
}
