// ============================================================
// FM2 EMPIRE — ABOUT PAGE (route: /about)
// Server component for metadata; renders the client content.
// ============================================================

import type { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "FM2 Empire is a media, content, talent development, and creative ecosystem built for Africa's next generation of artists and creators.",
};

export default function AboutPage() {
  return <AboutContent />;
}