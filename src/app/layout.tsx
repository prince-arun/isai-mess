import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://billisai.com";

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Billisai — Turn Your Favourite Songs Into a Hotel Bill",
    template: "%s | Billisai",
  },
  description:
    "Search your favourite Tamil and Indian music albums and turn their songs into a fun hotel-style bill. Generate, download in 4K, and share your music receipt with friends.",
  keywords: [
    "Billisai",
    "music bill generator",
    "hotel bill",
    "receiptify",
    "album receipt",
    "Tamil songs bill",
    "Indian music receipt",
    "song duration prices",
    "music receipt maker",
  ],
  authors: [{ name: "Billisai" }],
  creator: "Billisai",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Billisai",
    title: "Billisai — Turn Your Favourite Songs Into a Hotel Bill",
    description:
      "Search an album, generate a funny hotel-style bill from its songs, and share it with your friends.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Billisai — Turn Your Favourite Songs into a Hotel Bill",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Billisai — Turn Your Favourite Songs Into a Hotel Bill",
    description: "Turn your favourite songs into a funny hotel-style bill.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Billisai",
    url: siteUrl,
    description:
      "Turn your favourite music albums into fun hotel-style bills.",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-stone-950">{children}</body>
    </html>
  );
}

