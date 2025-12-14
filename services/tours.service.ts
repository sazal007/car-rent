import apiClient from "@/api/axios";
import { ApiListResponse, TourEntry } from "@/types/tours";

export const getTours = async (): Promise<ApiListResponse<TourEntry>> => {
  const response = await apiClient.get("/api/collections/tours/data/");
  return response.data;
};
