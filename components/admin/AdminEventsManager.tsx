// ============================================================
// FM2 EMPIRE — ADMIN EVENTS MANAGER
// Manage events and easily select/update the Featured Event
// directly from the admin dashboard with 1-click.
// Changes reflect on production immediately without redeployment.
// ============================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ExternalLink, Pencil, Calendar, Star, Check, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { CMSEvent } from "@/lib/cms";

type Props = {
  initialEvents: CMSEvent[];
};

const STATUS_COLOURS: Record<string, string> = {
  upcoming:  "#27AE60",
  ongoing:   "#C9A84C",
  past:      "#888880",
  cancelled: "#C0392B",
};

export default function AdminEventsManager({ initialEvents }: Props) {
  const [events, setEvents] = useState<CMSEvent[]>(initialEvents);
  const [settingFeaturedId, setSettingFeaturedId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const featuredEvent = events.find((e) => e.is_featured) ?? null;

  const handleSetFeatured = async (eventId: string, eventTitle: string) => {
    setSettingFeaturedId(eventId);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/cms/events/featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: eventId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to set featured event");

      // Update local state: unset featured on all events, set on this one
      setEvents((prev) =>
        prev.map((e) => ({
          ...e,
          is_featured: e.id === eventId,
        }))
      );

      setMessage({
        text: `"${eventTitle}" is now the active featured event on the homepage. Live immediately!`,
        type: "success",
      });

      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setMessage({
        text: (err as Error).message || "Error setting featured event",
        type: "error",
      });
    } finally {
      setSettingFeaturedId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>
            Events &amp; Featured Event
          </h2>
          <p className="text-sm" style={{ color: "#888880" }}>
            {events.length} event{events.length !== 1 ? "s" : ""} total. Choose which event appears in the hero/featured section on the homepage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/#events"
            target="_blank"
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
            style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", color: "#888880" }}
          >
            <ExternalLink size={13} /> View Public
          </Link>
          <Link
            href="/admin/events/new"
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: "#C9A84C", color: "#080808" }}
          >
            <Plus size={13} /> Add Event
          </Link>
        </div>
      </div>

      {/* Message feedback */}
      {message && (
        <div
          className="p-4 rounded-xl text-sm flex items-center gap-3 animate-in fade-in duration-300"
          style={{
            backgroundColor: message.type === "success" ? "rgba(39, 174, 96, 0.15)" : "rgba(192, 57, 43, 0.15)",
            border: `1px solid ${message.type === "success" ? "#27AE60" : "#C0392B"}`,
            color: message.type === "success" ? "#2ECC71" : "#E74C3C",
          }}
        >
          {message.type === "success" ? <Check size={18} /> : null}
          <span>{message.text}</span>
        </div>
      )}

      {/* Featured Event Spotlight Box */}
      <div
        className="rounded-xl border p-5 flex flex-col gap-3 relative overflow-hidden"
        style={{
          backgroundColor: "#16140D",
          borderColor: "rgba(201, 168, 76, 0.4)",
          boxShadow: "0 4px 20px rgba(201, 168, 76, 0.08)",
        }}
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className="p-1.5 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(201, 168, 76, 0.2)", color: "#C9A84C" }}
            >
              <Star size={16} fill="#C9A84C" />
            </span>
            <span className="text-xs uppercase font-bold tracking-widest" style={{ color: "#C9A84C" }}>
              Active Homepage Featured Event
            </span>
          </div>

          {featuredEvent && (
            <Link
              href={`/admin/events/${featuredEvent.id}/edit`}
              className="text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-md"
              style={{ backgroundColor: "rgba(201, 168, 76, 0.15)", color: "#C9A84C" }}
            >
              <Pencil size={12} /> Edit Featured Event
            </Link>
          )}
        </div>

        {featuredEvent ? (
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-bold text-lg text-white" style={{ fontFamily: "Georgia, serif" }}>
                {featuredEvent.title}
              </h3>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  backgroundColor: `${STATUS_COLOURS[featuredEvent.status] ?? "#888880"}20`,
                  color: STATUS_COLOURS[featuredEvent.status] ?? "#888880",
                }}
              >
                {featuredEvent.status}
              </span>
            </div>
            {featuredEvent.description && (
              <p className="text-sm line-clamp-2" style={{ color: "#B8B8B0" }}>
                {featuredEvent.description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-xs mt-1" style={{ color: "#888880" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} style={{ color: "#C9A84C" }} />
                {formatDate(featuredEvent.date)} {featuredEvent.time && `at ${featuredEvent.time}`}
              </span>
              {featuredEvent.venue && (
                <span>
                  {featuredEvent.venue}, {featuredEvent.city}
                </span>
              )}
              <span>
                Ticket: {featuredEvent.ticket_price === 0 ? "Free Entry" : `₦${featuredEvent.ticket_price.toLocaleString()}`}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm" style={{ color: "#888880" }}>
            No event is currently marked as featured. The first upcoming event will be used as a fallback on the homepage. Click <strong>&quot;Set as Featured&quot;</strong> on any event below to highlight it.
          </p>
        )}
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-400">
          All Events ({events.length})
        </h3>

        {events.length === 0 ? (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              backgroundColor: "#1A1A1A",
              borderRadius: "12px",
              border: "1px solid #2A2A2A",
            }}
          >
            <p style={{ color: "#888880", fontSize: "0.875rem", marginBottom: "1rem" }}>No events yet.</p>
            <Link
              href="/admin/events/new"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.625rem 1.25rem",
                backgroundColor: "#C9A84C",
                borderRadius: "8px",
                color: "#080808",
                fontSize: "0.813rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <Plus size={14} /> Add First Event
            </Link>
          </div>
        ) : (
          events.map((event) => {
            const isFeatured = event.is_featured;
            const isProcessing = settingFeaturedId === event.id;

            return (
              <div
                key={event.id}
                className="rounded-xl border p-5 transition-all duration-200"
                style={{
                  backgroundColor: isFeatured ? "#14130F" : "#1A1A1A",
                  borderColor: isFeatured ? "rgba(201, 168, 76, 0.45)" : "#2A2A2A",
                }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-base" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>
                        {event.title}
                      </span>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          backgroundColor: `${STATUS_COLOURS[event.status] ?? "#888880"}20`,
                          color: STATUS_COLOURS[event.status] ?? "#888880",
                        }}
                      >
                        {event.status}
                      </span>

                      {isFeatured ? (
                        <span
                          className="flex items-center gap-1 font-bold"
                          style={{
                            fontSize: "0.7rem",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "4px",
                            backgroundColor: "rgba(201, 168, 76, 0.2)",
                            color: "#C9A84C",
                            border: "1px solid rgba(201, 168, 76, 0.4)",
                          }}
                        >
                          <Star size={11} fill="#C9A84C" /> Featured on Homepage
                        </span>
                      ) : null}

                      {event.is_third_party && (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            backgroundColor: "#2A2A2A",
                            color: "#888880",
                          }}
                        >
                          Partner
                        </span>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-xs line-clamp-1" style={{ color: "#888880" }}>
                        {event.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#888880" }}>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatDate(event.date)} {event.time && `at ${event.time}`}
                      </span>
                      {event.venue && (
                        <span>
                          {event.venue}, {event.city}
                        </span>
                      )}
                      <span>{event.ticket_price === 0 ? "Free" : `₦${event.ticket_price.toLocaleString()}`}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                    {/* Quick Featured Toggle Button */}
                    {!isFeatured ? (
                      <button
                        type="button"
                        onClick={() => handleSetFeatured(event.id, event.title)}
                        disabled={isProcessing}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                        style={{
                          backgroundColor: "#111111",
                          borderColor: "#333333",
                          color: "#B8B8B0",
                          cursor: isProcessing ? "not-allowed" : "pointer",
                        }}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 size={12} className="animate-spin" /> Setting...
                          </>
                        ) : (
                          <>
                            <Star size={12} /> Set as Featured
                          </>
                        )}
                      </button>
                    ) : (
                      <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                        style={{
                          backgroundColor: "rgba(201, 168, 76, 0.15)",
                          color: "#C9A84C",
                        }}
                      >
                        <Check size={12} /> Current Featured
                      </span>
                    )}

                    <Link
                      href={`/events/${event.slug}`}
                      target="_blank"
                      className="p-1.5 rounded hover:bg-neutral-800 transition-colors"
                      style={{ color: "#888880" }}
                      title="View public event page"
                    >
                      <ExternalLink size={14} />
                    </Link>

                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: "#222222", color: "#C9A84C" }}
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
