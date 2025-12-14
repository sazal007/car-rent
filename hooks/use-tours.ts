import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/tours.service";
import { ApiListResponse, TourEntry } from "@/types/tours";

export const useTours = () => {
  return useQuery<ApiListResponse<TourEntry>>({
    queryKey: ["tours"],
    queryFn: getTours,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
