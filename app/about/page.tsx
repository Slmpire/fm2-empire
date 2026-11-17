// ============================================================
// FM2 EMPIRE — ABOUT PAGE (route: /about)
// Server component for metadata; renders the client content.
// Dynamically fetches active team members from Supabase CMS.
// ============================================================

import type { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";
import { getActiveTeamMembers } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "FM2 Empire is a media, content, talent development, and creative ecosystem built for Africa's next generation of artists and creators.",
};

export default async function AboutPage() {
  const members = await getActiveTeamMembers().catch(() => []);
  return <AboutContent members={members} />;
}
