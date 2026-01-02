import type { Metadata } from "next";
import { blogService } from "@/services/blog.service";
import BlogDetailView from "./blog-detail-view";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await blogService.getBlogBySlug(slug);

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    return {
      title: `${post.title} | Bato Ma`,
      description: post.meta_description || post.title,
      openGraph: {
        title: post.title,
        description: post.meta_description || post.title,
        images: post.thumbnail_image ? [{ url: post.thumbnail_image }] : [],
      },
    };
  } catch {
    return {
      title: "Blog - Bato Ma",
    };
  }
}

export default function BlogDetailsPage() {
  return <BlogDetailView />;
}
