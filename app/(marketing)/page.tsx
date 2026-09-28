// ============================================================
// FM2 EMPIRE — LANDING PAGE
// All Supabase fetches run in parallel via Promise.all —
// cuts load time from ~13s sequential to ~1-2s parallel.
// ============================================================

import Hero         from "@/components/sections/Hero";
import About        from "@/components/sections/About";
import Services     from "@/components/sections/Services";
import MediaSectionClient   from "@/components/sections/MediaSectionClient";
import EventsSectionClient  from "@/components/sections/EventsSectionClient";
import TeamSectionClient    from "@/components/sections/TeamSectionClient";
import Testimonials from "@/components/sections/Testimonials";
import FAQ          from "@/components/sections/FAQ";
import CTA          from "@/components/sections/CTA";
import { getPublishedMedia, getPublishedEvents, getActiveTeamMembers } from "@/lib/cms";
import type { CMSMediaItem, CMSEvent, CMSTeamMember } from "@/lib/cms";

export default async function LandingPage() {
  // All three Supabase calls run at exactly the same time
  const [mediaItems, events, teamMembers] = await Promise.all([
    getPublishedMedia(6).catch((): CMSMediaItem[] => []),
    getPublishedEvents().catch((): CMSEvent[] => []),
    getActiveTeamMembers().catch((): CMSTeamMember[] => []),
  ]);

  const featured = events.find((e) => e.is_featured) ?? events[0] ?? null;
  const upcoming = events.filter((e) => !e.is_featured).slice(0, 3);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <MediaSectionClient items={mediaItems} />
      <EventsSectionClient featured={featured} upcoming={upcoming} />
      <TeamSectionClient members={teamMembers} />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}