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
