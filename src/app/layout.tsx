import type { Metadata, Viewport } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mattamundayil Cardamom Reserve | Premium Kerala Green Cardamom Exporters",
  description:
    "Single-origin, high-altitude green cardamom cultivated in the mist-clad Western Ghats of Kerala. Discover our harvest-to-export scrollytelling journey, commercial grading specifications, and global trade partnerships.",
  keywords: [
    "Kerala Green Cardamom",
    "Alleppey Green Extra Bold",
    "AGEB Cardamom",
    "Idukki Cardamom Exporters",
    "Wayanad Spice Traders",
    "Wholesale Cardamom Export",
    "Western Ghats Spices",
    "Indian Green Cardamom 8mm+",
  ],
  authors: [{ name: "Mattamundayil Cardamom Reserve" }],
  openGraph: {
    title: "Mattamundayil Cardamom Reserve | Kerala Green Cardamom",
    description: "Nature's Finest. Traded Worldwide. Premium green cardamom from the heart of the Western Ghats.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#080B07",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080B07] text-[#F2F5F0] selection:bg-[#526B32] selection:text-white">
        {children}
      </body>
    </html>
  );
}
