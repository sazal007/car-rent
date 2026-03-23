import type { Metadata } from "next";
import { getVehicleBySlug } from "@/services/vehicles.service";
import CarsDetailsView from "./rentals-details-view";

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
    const car = await getVehicleBySlug(actualSlug);

    if (!car) {
      return {
        title: "Vehicle Not Found",
      };
    }

    const { name, description, image, brand, type, year } = car;

    return {
      title: `${name} | Bato Ma`,
      description: description || `Rent the ${year} ${brand} ${name} (${type}) in Kathmandu. Eco-friendly and reliable transportation.`,
      openGraph: {
        title: `${name} | Bato Ma`,
        description: description || `Rent the ${year} ${brand} ${name} in Kathmandu.`,
        images: image ? [{ url: image }] : [],
      },
    };
  } catch {
    return {
      title: "Our EV Fleet - Bato Ma",
    };
  }
}

export default function CarsDetailsPage() {
  return <CarsDetailsView />;
}
