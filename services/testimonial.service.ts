import { Testimonial } from "@/types/testimonials";
import apiClient from "@/api/axios";

export const testimonialService = {
  getTestimonials: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get("/api/testimonial/");
    return response.data as Testimonial[];
  },
};
