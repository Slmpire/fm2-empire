// ============================================================
// FM2 EMPIRE — SITEMAP
// Auto-generates /sitemap.xml. Pulls team, event, and news slugs
// dynamically from CMS with fallback to data.ts.
// ============================================================

import type { MetadataRoute } from "next";
import { teamMembers, allEvents } from "@/lib/data";
import { getActiveTeamMembers, getPublishedEvents, getPublishedPosts } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fm2empire.com";

  const staticRoutes = ["", "/about", "/apply", "/book", "/contact", "/media", "/news", "/status", "/privacy", "/terms", "/cookies"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const [cmsTeam, cmsEvents, cmsPosts] = await Promise.all([
    getActiveTeamMembers().catch(() => []),
    getPublishedEvents().catch(() => []),
    getPublishedPosts().catch(() => []),
  ]);

  const teamList = cmsTeam.length > 0 ? cmsTeam : teamMembers;
  const eventList = cmsEvents.length > 0 ? cmsEvents : allEvents;

  const teamRoutes = teamList.map((member) => ({
    url: `${baseUrl}/team/${member.slug}`,
    lastModified: new Date(),
  }));

  const eventRoutes = eventList.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(),
  }));

  const newsRoutes = cmsPosts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...teamRoutes, ...eventRoutes, ...newsRoutes];
}
