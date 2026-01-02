import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import { WhatsApp } from "@/components/whatsapp/whatsapp";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bato Ma - Your Trusted EV Rental Partner",
    template: "%s | Bato Ma",
  },
  description:
    "Book your perfect rental EV with ease. Quick, affordable, and reliable EV rental services in Kathmandu, Nepal. Electric scooters, taxis, and guided tours.",
  keywords: [
    "EV rental",
    "electric vehicle rental",
    "scooter rental",
    "car rental Nepal",
    "Kathmandu tours",
    "electric taxi",
    "guided tours",
    "Bato Ma",
  ],
  authors: [{ name: "Bato Ma" }],
  creator: "Bato Ma",
  publisher: "Bato Ma",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://batomatours.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Bato Ma",
    title: "Bato Ma - Your Trusted EV Rental Partner",
    description:
      "Book your perfect rental EV with ease. Quick, affordable, and reliable EV rental services in Kathmandu, Nepal.",
    images: [
      {
        url: "/images/kathmandu-himals.jpg",
        width: 1200,
        height: 630,
        alt: "Bato Ma - EV Rental Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bato Ma - Your Trusted EV Rental Partner",
    description:
      "Book your perfect rental EV with ease. Quick, affordable, and reliable EV rental services in Kathmandu, Nepal.",
    images: ["/images/kathmandu-himals.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} font-sans text-carent-text bg-white overflow-x-hidden antialiased`}
      >
        <QueryProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsApp />
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={3000}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
