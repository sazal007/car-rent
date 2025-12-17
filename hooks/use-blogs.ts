import { blogService } from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost, PaginatedBlogResponse } from "@/types/blog";

export const useGetBlogs = () => {
  return useQuery<PaginatedBlogResponse>({
    queryKey: ["blogs"],
    queryFn: blogService.getBlogs,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetBlogBySlug = (slug: string) => {
  return useQuery<BlogPost>({
    queryKey: ["blog", slug],
    queryFn: () => blogService.getBlogBySlug(slug),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
