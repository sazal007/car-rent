import apiClient from "@/api/axios";
import { CollectionItemsResponse } from "@/types/category";

export const getCategories = async (): Promise<CollectionItemsResponse> => {
  const response = await apiClient.get(
    "/api/collections/vehicle-category/data/"
  );
  return response.data;
};
