import { useQuery } from "@tanstack/react-query";
import { whatsappService } from "@/services/whatsapp.service";
import { WhatsApp } from "@/types/whatsapp";

export const useGetWhatsapp = () => {
  return useQuery<WhatsApp[]>({
    queryKey: ["whatsapp"],
    queryFn: () => whatsappService.getWhatsapp(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
