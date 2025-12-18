import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@/types/testimonials";
import { testimonialService } from "@/services/testimonial.service";

export const useGetTestimonials = () => {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: testimonialService.getTestimonials,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
