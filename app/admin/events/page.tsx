// ============================================================
// FM2 EMPIRE — ADMIN EVENTS PAGE
// Lists all events from lib/data.ts with edit indicators.
// Full event creation/editing via Supabase comes in a later
// iteration — for now this gives visibility and links.
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Ticket, ExternalLink } from "lucide-react";
import { allEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Events" };

const STATUS_COLOURS: Record<string, string> = {
  upcoming:  "#27AE60",
  ongoing:   "#C9A84C",
  past:      "#888880",
  cancelled: "#C0392B",
};

export default function AdminEventsPage() {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="font-bold text-xl mb-1"
            style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}
          >
            Events
          </h2>
          <p className="text-sm" style={{ color: "#888880" }}>
            All FM2 events. Edit content in{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{ backgroundColor: "#2A2A2A", color: "#C9A84C" }}
            >
              lib/data.ts
            </code>{" "}
            until the full CMS is built.
          </p>
        </div>
        <Link
          href="/#events"
          target="_blank"
          className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-colors duration-150"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            color: "#888880",
          }}
        >
          <ExternalLink size={13} /> View Public
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {allEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="font-bold text-base"
                    style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}
                  >
                    {event.title}
                  </span>

                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize"
                    style={{
                      backgroundColor: `${STATUS_COLOURS[event.status] ?? "#888880"}20`,
                      color: STATUS_COLOURS[event.status] ?? "#888880",
                      border: `1px solid ${STATUS_COLOURS[event.status] ?? "#888880"}40`,
                    }}
                  >
                    {event.status}
                  </span>

                  {event.isFeatured && (
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(201,168,76,0.1)",
                        color: "#C9A84C",
                        border: "1px solid rgba(201,168,76,0.3)",
                      }}
                    >
                      Featured
                    </span>
                  )}

                  {event.isThirdParty && (
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "#2A2A2A",
                        color: "#888880",
                      }}
                    >
                      Partner Event
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#888880" }}>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(event.date)} at {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {event.venue}, {event.city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ticket size={12} />
                    {event.ticketPrice === 0
                      ? "Free"
                      : `₦${event.ticketPrice.toLocaleString()}`}
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "#888880" }}>
                  {event.description}
                </p>
              </div>

              <Link
                href={`/events/${event.slug}`}
                target="_blank"
                className="flex items-center gap-1.5 text-xs shrink-0 transition-colors duration-150"
                style={{ color: "#C9A84C" }}
              >
                <ExternalLink size={12} /> View Page
              </Link>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}