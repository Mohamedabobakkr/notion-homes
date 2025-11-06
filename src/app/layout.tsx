import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "Notion Homes | Luxury Egyptian Properties for UK Clients",
  description: "Premier UK-based property company specializing in luxury vacation homes and investment properties in Hurghada, Egypt. Your trusted bridge between UK and Egyptian real estate.",
  keywords: ["Egypt property", "Hurghada homes", "vacation rentals Egypt", "Egyptian real estate", "UK to Egypt property", "luxury villas Egypt"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
