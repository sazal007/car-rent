import { faqService } from "@/services/faq.service";
import { FAQ } from "@/types/faq";
import { useQuery } from "@tanstack/react-query";

export const useGetFAQs = () => {
  return useQuery<FAQ[]>({
    queryKey: ["FAQs"],
    queryFn: faqService.getFAQs,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
