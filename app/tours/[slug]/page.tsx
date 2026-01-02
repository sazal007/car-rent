import type { Metadata } from "next";
import { getTourBySlug } from "@/services/tours.service";
import TourDetailsView from "./tour-details-view";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: slugParam } = await params;

  // Extract slug from URL (format might be "id-slug" or just "slug")
  const actualSlug =
    slugParam.includes("-") && /^\d+-/.test(slugParam)
      ? slugParam.replace(/^\d+-/, "")
      : slugParam;

  try {
    const tour = await getTourBySlug(actualSlug);

    if (!tour || !tour.data) {
      return {
        title: "Tour Not Found",
      }
    }

    const { name, content, image } = tour.data;

    return {
      title: `${name} | Bato Ma`,
      description: content.replace(/<[^>]*>/g, "").slice(0, 160),
      openGraph: {
        title: name,
        description: content.replace(/<[^>]*>/g, "").slice(0, 160),
        images: image ? [{ url: image }] : [],
      },
    };
  } catch {
    return {
      title: "Tours - Bato Ma",
    };
  }
}

export default function TourPage() {
  return <TourDetailsView />;
}
