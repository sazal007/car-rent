'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Create slug from title
  const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <Link 
      href={`/blog/${post.id}-${slug}`}
      className="group cursor-pointer flex flex-col gap-4"
    >
      <div className="rounded-2xl overflow-hidden aspect-[4/3] w-full relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-carent-text group-hover:text-carent-yellow transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm">
          {post.date}
        </p>
      </div>
    </Link>
  );
};

