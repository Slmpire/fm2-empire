import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ExternalLink, Pencil, Calendar } from "lucide-react";
import { adminGetAllEvents } from "@/lib/cms";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Events" };

const STATUS_COLOURS: Record<string, string> = {
  upcoming:  "#27AE60",
  ongoing:   "#C9A84C",
  past:      "#888880",
  cancelled: "#C0392B",
};

export default async function AdminEventsPage() {
  let events: Awaited<ReturnType<typeof adminGetAllEvents>> = [];

  try {
    events = await adminGetAllEvents();
  } catch {
    return <div style={{ color: "#C0392B" }}>Failed to load events. Check your Supabase service role key.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Events</h2>
          <p className="text-sm" style={{ color: "#888880" }}>{events.length} event{events.length !== 1 ? "s" : ""} total.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/#events" target="_blank" className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", color: "#888880" }}>
            <ExternalLink size={13} /> View Public
          </Link>
          <Link href="/admin/events/new" className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg font-semibold" style={{ backgroundColor: "#C9A84C", color: "#080808" }}>
            <Plus size={13} /> Add Event
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {events.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", backgroundColor: "#1A1A1A", borderRadius: "12px", border: "1px solid #2A2A2A" }}>
            <p style={{ color: "#888880", fontSize: "0.875rem", marginBottom: "1rem" }}>No events yet.</p>
            <Link href="/admin/events/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "0.625rem 1.25rem", backgroundColor: "#C9A84C", borderRadius: "8px", color: "#080808", fontSize: "0.813rem", fontWeight: 700, textDecoration: "none" }}>
              <Plus size={14} /> Add First Event
            </Link>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="rounded-xl border p-5" style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-base" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>{event.title}</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "4px", backgroundColor: `${STATUS_COLOURS[event.status] ?? "#888880"}20`, color: STATUS_COLOURS[event.status] ?? "#888880" }}>
                      {event.status}
                    </span>
                    {event.is_featured && <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "4px", backgroundColor: "rgba(201,168,76,0.1)", color: "#C9A84C" }}>Featured</span>}
                    {event.is_third_party && <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: "4px", backgroundColor: "#2A2A2A", color: "#888880" }}>Partner</span>}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#888880" }}>
                    <span className="flex items-center gap-1.5"><Calendar size={12} />{formatDate(event.date)} {event.time && `at ${event.time}`}</span>
                    {event.venue && <span>{event.venue}, {event.city}</span>}
                    <span>{event.ticket_price === 0 ? "Free" : `₦${event.ticket_price.toLocaleString()}`}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link href={`/events/${event.slug}`} target="_blank" style={{ color: "#888880", display: "flex" }}><ExternalLink size={14} /></Link>
                  <Link href={`/admin/events/${event.id}/edit`} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#C9A84C" }}>
                    <Pencil size={12} /> Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}