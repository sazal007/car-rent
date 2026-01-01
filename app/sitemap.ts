import { MetadataRoute } from "next";
import { blogService } from "@/services/blog.service";
import { getVehicles } from "@/services/vehicles.service";
import { getTours } from "@/services/tours.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://batomatours.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic routes - fetch from APIs
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // Fetch blog posts
    const blogsResponse = await blogService.getBlogs();
    if (blogsResponse?.results) {
      blogsResponse.results.forEach((blog) => {
        if (blog.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updated_at
              ? new Date(blog.updated_at)
              : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.warn("Failed to fetch blogs for sitemap:", error);
  }

  try {
    // Fetch vehicles
    const vehicles = await getVehicles();
    vehicles.forEach((vehicle) => {
      if (vehicle.slug) {
        dynamicRoutes.push({
          url: `${baseUrl}/cars/${vehicle.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    });
  } catch (error) {
    console.warn("Failed to fetch vehicles for sitemap:", error);
  }

  try {
    // Fetch tours
    const toursResponse = await getTours();
    if (toursResponse?.results) {
      toursResponse.results.forEach((tour) => {
        if (tour.data?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/tours/${tour.data.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      });
    }
  } catch (error) {
    console.warn("Failed to fetch tours for sitemap:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
