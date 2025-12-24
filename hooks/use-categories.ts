import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types";

// Mapping category names to images
const categoryImageMap: Record<string, string> = {
  "Scooter": "/images/self-ride.jpeg",
  "Self-ride Scooter": "/images/self-ride.jpeg",
  "Guide with Scooter": "/images/batoma-guide.jpeg",
  "Ev Taxi": "/images/batoma-cab.jpeg",
  "EV Taxi": "/images/batoma-cab.jpeg",
  "Tours": "/images/roads.jpg",
};

// Default image fallback
const DEFAULT_CATEGORY_IMAGE = "/images/roads.jpg";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    select: (data): Category[] => {
      // Transform the API response to Category format
      return data.results.map((item) => {
        const categoryName = item.data.name;
        return {
          id: item.id.toString(),
          name: categoryName,
          slug: item.data.slug,
          image: categoryImageMap[categoryName] || DEFAULT_CATEGORY_IMAGE,
        };
      });
    },
  });
};

