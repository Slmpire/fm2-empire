// ============================================================
// FM2 EMPIRE — SITEMAP
// Auto-generates /sitemap.xml. Pulls team and event slugs
// directly from lib/data.ts, so new entries are automatically
// included without touching this file.
// ============================================================

import type { MetadataRoute } from "next";
import { teamMembers, allEvents } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fm2empire.com";

  const staticRoutes = ["", "/about", "/apply", "/contact", "/media", "/privacy", "/terms"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const teamRoutes = teamMembers.map((member) => ({
    url: `${baseUrl}/team/${member.slug}`,
    lastModified: new Date(),
  }));

  const eventRoutes = allEvents.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...teamRoutes, ...eventRoutes];
}