import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Batoma - Your Trusted EV Rental Partner",
  description:
    "Book your perfect rental EV with ease. Quick, affordable, and reliable EV rental services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans text-carent-text bg-white overflow-x-hidden antialiased`}
      >
        <QueryProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
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
