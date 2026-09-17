import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug, getPublishedEvents } from "@/lib/cms";
import EventDetailContent from "@/components/pages/EventDetailContent";

export async function generateStaticParams() {
  try {
    const events = await getPublishedEvents();
    return events.map((e) => ({ slug: e.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event    = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return { title: event.title, description: event.description ?? undefined };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event    = await getEventBySlug(slug);
  if (!event) notFound();

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

  return <EventDetailContent event={eventForDetail} />;
}