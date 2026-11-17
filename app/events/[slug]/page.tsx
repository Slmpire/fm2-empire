import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug, getPublishedEvents, type CMSEvent } from "@/lib/cms";
import { allEvents as fallbackEvents } from "@/lib/data";
import EventDetailContent from "@/components/pages/EventDetailContent";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const events = await getPublishedEvents();
    return events.map((e) => ({ slug: e.slug }));
  } catch {
    return fallbackEvents.map((e) => ({ slug: e.slug }));
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);

  if (!event) {
    const fallback = fallbackEvents.find((e) => e.slug === slug);
    if (fallback) {
      return { title: fallback.title, description: fallback.description };
    }
    return { title: "Event Not Found" };
  }

  return { title: event.title, description: event.description ?? undefined };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [event, allEvents] = await Promise.all([
    getEventBySlug(slug).catch(() => null),
    getPublishedEvents().catch((): CMSEvent[] => []),
  ]);

  if (!event) {
    const fallback = fallbackEvents.find((e) => e.slug === slug);
    if (!fallback) notFound();
    return <EventDetailContent event={fallback} />;
  }

  // Convert CMSEvent to the shape EventDetailContent expects
  const eventForDetail = {
    id:               event.id,
    slug:             event.slug,
    title:            event.title,
    description:      event.description ?? "",
    longDescription:  event.long_description ?? undefined,
    date:             event.date,
    time:             event.time ?? "",
    venue:            event.venue ?? "",
    address:          event.address ?? undefined,
    city:             event.city ?? "",
    imageUrl:         event.image_url ?? "",
    ticketPrice:      event.ticket_price,
    ticketUrl:        event.ticket_url ?? "#",
    status:           event.status as "upcoming" | "ongoing" | "past" | "cancelled",
    isFeatured:       event.is_featured,
    organiser:        event.organiser ?? "",
    isThirdParty:     event.is_third_party,
    lineup:           event.lineup ?? undefined,
  };

  const moreEvents = (allEvents && allEvents.length > 0)
    ? allEvents
        .filter((e) => e.slug !== event.slug)
        .slice(0, 3)
        .map((e) => ({
          id:               e.id,
          slug:             e.slug,
          title:            e.title,
          description:      e.description ?? "",
          date:             e.date,
          time:             e.time ?? "",
          venue:            e.venue ?? "",
          city:             e.city ?? "",
          imageUrl:         e.image_url ?? "",
          ticketPrice:      e.ticket_price,
          ticketUrl:        e.ticket_url ?? "#",
          status:           e.status as "upcoming" | "ongoing" | "past" | "cancelled",
          isFeatured:       e.is_featured,
          organiser:        e.organiser ?? "",
          isThirdParty:     e.is_third_party,
        }))
    : undefined;

  return <EventDetailContent event={eventForDetail} otherEventsProp={moreEvents} />;
}
