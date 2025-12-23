import { WhatsApp } from "@/types/whatsapp";
import { apiClient } from "@/api/axios";

export const whatsappService = {
  getWhatsapp: async (): Promise<WhatsApp[]> => {
    const response = await apiClient.get("/api/whatsapp/");
    return response.data;
  },
};
