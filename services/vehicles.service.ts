import { apiClient } from "@/api/axios";
import {
  Vehicle,
  VehiclesApiResponse,
  VehicleApiResponse,
} from "@/types/vehicles";

// Helper function to parse JSON strings safely
// Handles malformed JSON with trailing commas and extra whitespace
const parseJsonString = (jsonString: string | null | undefined): string[] => {
  if (!jsonString) return [];

  try {
    // Clean up the string: remove extra whitespace and trailing commas
    let cleaned = jsonString.trim();

    // Remove trailing commas before closing brackets/braces
    // This handles cases like: [ "item1", "item2", ]
    cleaned = cleaned.replace(/,(\s*[}\]])/g, "$1");

    // Try to parse the cleaned JSON
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      // Filter out empty strings and trim each item
      return parsed
        .map((item) =>
          typeof item === "string" ? item.trim() : String(item).trim()
        )
        .filter((item) => item.length > 0);
    }
    return [];
  } catch {
    // If JSON parsing fails, try to extract array-like content manually
    // This is a fallback for severely malformed JSON
    try {
      // Extract all quoted strings from the JSON-like string
      const regex = /"([^"\\]*(\\.[^"\\]*)*)"/g;
      const matches: string[] = [];
      let match;

      while ((match = regex.exec(jsonString)) !== null) {
        const value = match[1].replace(/\\"/g, '"').trim();
        if (value.length > 0) {
          matches.push(value);
        }
      }

      if (matches.length > 0) {
        return matches;
      }
    } catch (fallbackError) {
      console.warn(
        "Failed to parse JSON string with fallback:",
        jsonString,
        fallbackError
      );
    }

    return [];
  }
};

// Helper function to normalize gallery (can be array or JSON string)
const normalizeGallery = (
  gallery: string | string[] | null | undefined
): string[] => {
  if (!gallery) return [];

  // If it's already an array, return it directly
  if (Array.isArray(gallery)) {
    return gallery
      .map((item) =>
        typeof item === "string" ? item.trim() : String(item).trim()
      )
      .filter((item) => item.length > 0);
  }

  // If it's a string, parse it as JSON
  if (typeof gallery === "string") {
    return parseJsonString(gallery);
  }

  return [];
};

// Transform API response to Vehicle format
const transformVehicle = (apiVehicle: VehicleApiResponse): Vehicle => {
  const { id, data } = apiVehicle;

  const features = parseJsonString(data.features);
  const gallery = normalizeGallery(data.gallery);

  // Debug logging (can be removed in production)
  if (process.env.NODE_ENV === "development") {
    if (features.length === 0 && data.features) {
      console.warn("Failed to parse features:", data.features);
    }
    if (gallery.length === 0 && data.gallery) {
      console.warn("Failed to parse gallery:", data.gallery);
    }
  }

  return {
    id: id.toString(),
    name: data.name,
    type: data.type,
    price: data.price,
    image: data.image,
    seats: data.seats,
    transmission: data.transmission as "Manual" | "Automatic",
    luggage: parseInt(data.luggage) || 0,
    slug: data.slug,
    brand: data.brand,
    year: data.year,
    fuel: data.fuel,
    description: data.description,
    features,
    gallery,
    category: data.category,
  };
};

export const getVehicles = async (category?: string): Promise<Vehicle[]> => {
  const url =
    category && category !== "All"
      ? `/api/collections/vehicles/data/?category=${encodeURIComponent(
          category
        )}`
      : "/api/collections/vehicles/data/";

  const response = await apiClient.get<VehiclesApiResponse>(url);
  return response.data.results.map(transformVehicle);
};

export const getVehicleById = async (id: string): Promise<Vehicle> => {
  const response = await apiClient.get<VehicleApiResponse>(
    `/api/collections/vehicles/data/${id}`
  );
  return transformVehicle(response.data);
};

export const getVehicleBySlug = async (
  slug: string
): Promise<Vehicle | null> => {
  try {
    const vehicles = await getVehicles();
    return vehicles.find((v) => v.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching vehicle by slug:", error);
    return null;
  }
};
