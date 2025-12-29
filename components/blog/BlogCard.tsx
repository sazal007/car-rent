

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Format date from API
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block "
    >
      <article className="h-full flex flex-col ">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-4 bg-gray-100">
          <Image
            src={post.thumbnail_image || '/images/kathmandu.jpeg'}
            alt={post.thumbnail_image_alt_description || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 " />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2.5 flex-1 ">
          {/* Date */}
          <time
            dateTime={post.created_at}
            className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider "
          >
            {formatDate(post.created_at)}
          </time>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 leading-snug group-hover:text-carent-yellow transition-colors duration-300 line-clamp-2 ">
            {post.title}
          </h3>
          
        </div>
      </article>
    </Link>
  );
};