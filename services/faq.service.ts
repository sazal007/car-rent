import apiClient from "@/api/axios";
import { FAQ } from "@/types/faq";

export const faqService = {
  getFAQs: async (): Promise<FAQ[]> => {
    const response = await apiClient.get("/api/faq/");
    return response.data as FAQ[];
  },
};
