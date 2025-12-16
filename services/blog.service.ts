import apiClient from "@/api/axios";
import { BlogPost, PaginatedBlogResponse } from "@/types/blog";

export const blogService = {
  getBlogs: async (): Promise<PaginatedBlogResponse> => {
    const response = await apiClient.get("/api/blogs/");
    return response.data as PaginatedBlogResponse;
  },

  getBlogBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await apiClient.get(`/api/blogs/${slug}/`);
    return response.data as BlogPost;
  },
};
