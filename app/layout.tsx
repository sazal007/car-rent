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
    default: "Batoma - Your Trusted EV Rental Partner",
    template: "%s | Batoma",
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
    "Batoma",
  ],
  authors: [{ name: "Batoma" }],
  creator: "Batoma",
  publisher: "Batoma",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://batoma.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Batoma",
    title: "Batoma - Your Trusted EV Rental Partner",
    description:
      "Book your perfect rental EV with ease. Quick, affordable, and reliable EV rental services in Kathmandu, Nepal.",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Batoma - EV Rental Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Batoma - Your Trusted EV Rental Partner",
    description:
      "Book your perfect rental EV with ease. Quick, affordable, and reliable EV rental services in Kathmandu, Nepal.",
    images: ["/logo/logo.png"],
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
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
