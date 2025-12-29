import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.fiscalnepal.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "batoma.nepdora.baliyoventures.com",
      },
      {
        protocol: "https",
        hostname: "nepaldrives.com",
      },
      {
        protocol: "https",
        hostname: "tatacars.sipradi.com.np",
      },
    ],
  },
};

export default nextConfig;
