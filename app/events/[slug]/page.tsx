// ============================================================
// FM2 EMPIRE — EVENT DETAIL PAGE (route: /events/[slug])
// One page per event. generateStaticParams pre-builds a page
// for every event in lib/data.ts.
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allEvents } from "@/lib/data";
import EventDetailContent from "@/components/pages/EventDetailContent";

export async function generateStaticParams() {
  return allEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = allEvents.find((e) => e.slug === slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = allEvents.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetailContent event={event} />;
}