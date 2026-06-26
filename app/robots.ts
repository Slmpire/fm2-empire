// ============================================================
// FM2 EMPIRE — ROBOTS.TXT
// Auto-generates /robots.txt. Blocks API routes from being
// indexed; points crawlers to the sitemap.
// ============================================================

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fm2empire.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}