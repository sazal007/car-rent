"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/constants";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/shared/Button";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Extract blog ID from slug (format: "id-slug")
  const blogId = slug.split("-")[0];
  const post = BLOG_POSTS.find((b) => b.id === blogId);

  // Get recent posts (exclude current)
  const recentPosts = BLOG_POSTS.filter((b) => b.id !== blogId).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen pt-56 text-center">
        <h2 className="text-3xl font-bold">Post not found</h2>
        <Link href="/blog">
          <Button className="mt-4">Go to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-56 pb-24">
      {/* Article Content */}
      <article className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header info */}
        <div className="mb-8">
          <span className="inline-block bg-carent-yellow px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            {post.date}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-carent-text mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">{post.intro}</p>
        </div>

        {/* Main Image */}
        <div className="rounded-2xl overflow-hidden w-full h-[300px] md:h-[500px] mb-12">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Blocks */}
        <div className="space-y-8">
          {post.content.map((block, idx) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={idx}
                    className="text-2xl md:text-3xl font-bold text-carent-text pt-4"
                  >
                    {block.content}
                  </h2>
                );
              case "paragraph":
                return (
                  <p
                    key={idx}
                    className="text-gray-600 text-lg leading-relaxed"
                  >
                    {block.content}
                  </p>
                );
              case "list":
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2">
                    {(block.content as string[]).map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-600 text-lg leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              case "quote":
                return (
                  <div
                    key={idx}
                    className="bg-gray-200/60 p-8 md:p-12 rounded-xl my-8"
                  >
                    <p className="text-xl md:text-2xl font-medium text-center leading-relaxed text-carent-text">
                      {block.content}
                    </p>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </article>

      {/* Recent Blog Section */}
      <div className="container mx-auto px-4 md:px-6 mt-32">
        <h2 className="text-4xl font-semibold mb-12 text-carent-text border-b border-gray-200 pb-4">
          Recent Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {recentPosts.map((recent) => (
            <BlogCard key={recent.id} post={recent} />
          ))}
        </div>
      </div>
    </div>
  );
}
