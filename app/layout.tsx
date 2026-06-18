// ============================================================
// FM2 EMPIRE — ROOT LAYOUT
// This wraps every single page on the platform.
// Fonts are loaded here once — not repeated in components.
// Metadata here is the default — individual pages override it.
// Security headers are set in next.config.ts (coming later).
// ============================================================

import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// ------------------------------------------------------------
// FONTS
// Next.js loads Google Fonts at build time — no runtime fetch,
// no layout shift, no external request from the browser.
// Both fonts are subset to Latin to keep bundle size lean.
// ------------------------------------------------------------

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

// ------------------------------------------------------------
// METADATA
// Default metadata for the entire site.
// Individual pages override title, description, and OG image.
// This is what appears in Google, WhatsApp link previews,
// and Twitter/X cards when FM2 links are shared.
// ------------------------------------------------------------

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
      "FM2 Empire is a media, content, talent development, and creative ecosystem. We produce, develop, and amplify Africa's next generation of creative talent.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FM2 Empire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FM2 Empire — Media, Talent & Creative Ecosystem",
    description:
      "FM2 Empire is a media, content, talent development, and creative ecosystem.",
    images: ["/images/og-image.jpg"],
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

// ------------------------------------------------------------
// VIEWPORT
// Separated from metadata as required by Next.js 14+
// ------------------------------------------------------------

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ------------------------------------------------------------
// ROOT LAYOUT
// ------------------------------------------------------------

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
        {children}
      </body>
    </html>
  );
}