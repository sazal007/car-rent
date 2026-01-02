"use client";

import { BlogCard } from "@/components/blog/BlogCard";
import { useGetBlogs } from "@/hooks/use-blogs";
import { Loader } from "@/components/shared/loader";
import { BlogContactForm } from "@/components/blog/BlogContactForm";

export default function BlogView() {
  const { data: blogsResponse, isLoading, isError } = useGetBlogs();

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text">
              Blog
            </h1>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !blogsResponse) {
    return (
      <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text">
              Bato Ma - Read Our Blog
            </h1>
          </div>
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <div className="text-red-500 text-sm sm:text-base md:text-lg px-4">
              Failed to load blogs. Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const blogs = blogsResponse.results || [];

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text mb-16">
            Bato Ma - Read Our Blog
          </h1>
        </div>

        {/* Grid */}
        {blogs.length === 0 ? (
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <div className="text-gray-500 text-sm sm:text-base md:text-lg">
              No blog posts available.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-20">
        <BlogContactForm />
      </div>
    </div>
  );
}
