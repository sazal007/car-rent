import apiClient from "@/api/axios";
import { ApiListResponse, TourEntry } from "@/types/tours";

export const getTours = async (): Promise<ApiListResponse<TourEntry>> => {
  const response = await apiClient.get("/api/collections/tours/data/");
  return response.data;
};

export const getTourBySlug = async (
  slug: string
): Promise<TourEntry | null> => {
  try {
    const tours = await getTours();
    return tours.results.find((t) => t.data.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching tour by slug:", error);
    return null;
  }
};
