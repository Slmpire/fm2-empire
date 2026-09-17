// ============================================================
// FM2 EMPIRE — EVENTS SECTION (reads from Supabase CMS)
// ============================================================

import { getPublishedEvents } from "@/lib/cms";
import type { CMSEvent } from "@/lib/cms";
import EventsSectionClient from "@/components/sections/EventsSectionClient";

export default async function Events() {
  let events: CMSEvent[] = [];

  try {
    events = await getPublishedEvents();
  } catch {
    events = [];
  }

  const featured = events.find((e) => e.is_featured) ?? events[0] ?? null;
  const upcoming = events.filter((e) => !e.is_featured).slice(0, 3);

  return <EventsSectionClient featured={featured} upcoming={upcoming} />;
}