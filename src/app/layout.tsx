import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Billisai — Turn Music Albums into Hotel Bills",
  description: "Turn your favourite Tamil and Indian music albums into ridiculous hotel bills. Shareable thermal receipts with song duration prices!",
  keywords: ["Billisai", "Tamil music", "hotel bill", "receiptify", "A.R. Rahman", "Harris Jayaraj", "Anirudh", "Ilaiyaraaja"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-950">{children}</body>
    </html>
  );
}
