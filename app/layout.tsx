// ============================================================
// FM2 EMPIRE — ROOT LAYOUT
// ConditionalLayout handles whether to show Navbar/Footer.
// Admin pages get their own sidebar/header instead.
// ============================================================

import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FM2 Empire — Media, Talent & Creative Ecosystem",
    template: "%s | FM2 Empire",
  },
  description:
    "FM2 Empire is a media, content, talent development, and creative ecosystem. We produce, develop, and amplify Africa's next generation of creative talent.",
  keywords: [
    "FM2 Empire",
    "talent management Nigeria",
    "media production Nigeria",
    "creative agency Nigeria",
    "artist management",
    "music production",
    "content creation",
    "events Nigeria",
  ],
  authors: [{ name: "FM2 Empire" }],
  creator: "FM2 Empire",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fm2empire.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fm2empire.com",
    siteName: "FM2 Empire",
    title: "FM2 Empire — Media, Talent & Creative Ecosystem",
    description:
      "FM2 Empire is a media, content, talent development, and creative ecosystem.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FM2 Empire — Media, Talent & Creative Ecosystem",
    description:
      "FM2 Empire is a media, content, talent development, and creative ecosystem.",
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

export const viewport: Viewport = {
  themeColor: "#080808",
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
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}