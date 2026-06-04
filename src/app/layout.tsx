import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atelier Interiors | Premium Interior Design",
  description: "Bespoke interior design for modern spaces. Where shadow meets the quiet glow of brass.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
