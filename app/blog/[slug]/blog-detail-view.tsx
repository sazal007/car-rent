"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetBlogBySlug, useGetBlogs } from "@/hooks/use-blogs";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/shared/Button";
import { sanitizeContent } from "@/lib/html-sanitizer";

export default function BlogDetailView() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useGetBlogBySlug(slug);
  const { data: blogsResponse } = useGetBlogs();

  // Get recent posts (exclude current)
  const recentPosts =
    blogsResponse?.results?.filter((b) => b.slug !== slug).slice(0, 3) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Format date from API
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoadingPost) {
    return (
      <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <div className="text-gray-500 text-sm sm:text-base md:text-lg">
              Loading blog post...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isErrorPost || !post) {
    return (
      <div className="min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 text-center px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Post not found
        </h2>
        <Link href="/blog">
          <Button className="mt-4 sm:mt-6">Go to Blog</Button>
        </Link>
      </div>
    );
  }

  // Sanitize HTML content
  const sanitizedContent = sanitizeContent(post.content);

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-24">
      {/* Article Content */}
      <article className="container mx-auto px-3 sm:px-4 md:px-6 max-w-4xl">
        {/* Header info */}
        <div className="mb-6 sm:mb-7 md:mb-8">
          <span className="inline-block bg-carent-yellow px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            {formatDate(post.created_at)}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-carent-text mb-4 sm:mb-5 md:mb-6 leading-tight">
            {post.title}
          </h1>
          {/* {post.meta_description && (
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {post.meta_description}
            </p>
          )} */}
        </div>

        {/* Main Image */}
        {post.thumbnail_image && (
          <div className="rounded-xl sm:rounded-2xl overflow-hidden w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] mb-8 sm:mb-10 md:mb-12">
            <Image
              src={post.thumbnail_image}
              alt={post.thumbnail_image_alt_description || post.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content - Render sanitized HTML */}
        <div
          className="max-w-none prose prose-headings:text-carent-text prose-a:text-carent-yellow prose-img:rounded-xl"
          style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>

      {/* Recent Blog Section */}
      {recentPosts.length > 0 && (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 mt-16 sm:mt-20 md:mt-24 lg:mt-32">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10 md:mb-12 text-carent-text border-b border-gray-200 pb-3 sm:pb-4">
            Recent Blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
            {recentPosts.map((recent) => (
              <BlogCard key={recent.id} post={recent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
