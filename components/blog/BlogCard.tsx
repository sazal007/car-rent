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
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group cursor-pointer flex flex-col gap-3 sm:gap-4"
    >
      <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] w-full relative">
        <Image
          src={post.thumbnail_image || '/images/kathmandu.jpeg'}
          alt={post.thumbnail_image_alt_description || post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>
      
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-carent-text group-hover:text-carent-yellow transition-colors duration-200 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm">
          {formatDate(post.created_at)}
        </p>
      </div>
    </Link>
  );
};

