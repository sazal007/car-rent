import { useQuery } from "@tanstack/react-query";
import { getTours, getTourBySlug } from "@/services/tours.service";
import { ApiListResponse, TourEntry } from "@/types/tours";

export const useTours = () => {
  return useQuery<ApiListResponse<TourEntry>>({
    queryKey: ["tours"],
    queryFn: getTours,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useTourBySlug = (slug: string) => {
  return useQuery<TourEntry | null>({
    queryKey: ["tour", "slug", slug],
    queryFn: () => getTourBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
