"use client";

import { BlogCard } from "@/components/blog/BlogCard";
import { useGetBlogs } from "@/hooks/use-blogs";

export default function BlogView() {
  const { data: blogsResponse, isLoading, isError } = useGetBlogs();

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen pt-56 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold text-carent-text">
              Blog
            </h1>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-lg">Loading blogs...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !blogsResponse) {
    return (
      <div className="bg-white min-h-screen pt-56 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold text-carent-text">
              Blog
            </h1>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-red-500 text-lg">
              Failed to load blogs. Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const blogs = blogsResponse.results || [];

  return (
    <div className="bg-white min-h-screen pt-56 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold text-carent-text">
            Blog
          </h1>
        </div>

        {/* Grid */}
        {blogs.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-lg">
              No blog posts available.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
