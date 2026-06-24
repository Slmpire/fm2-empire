// ============================================================
// FM2 EMPIRE — EVENT DETAIL CONTENT
// Full event info before checkout: date, venue, address,
// lineup, full description — THEN a "Get Tickets" button.
// Buy flow itself is wired to Paystack in a later backend
// phase; for now the button opens a "Coming Soon" state.
// ============================================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft, Ticket, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { allEvents } from "@/lib/data";
import type { Event } from "@/types/index";

export default function EventDetailContent({ event }: { event: Event }) {
  const [showCheckoutNotice, setShowCheckoutNotice] = useState(false);
  const otherEvents = allEvents.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <>
      {/* ---- EVENT HERO IMAGE ---- */}
      <section className="relative pt-20">
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.imageUrl})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.5) 60%, var(--color-fm2-black) 100%)" }}
          />

          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="container-fm2 pb-10">
              <Link
                href="/#events"
                className="inline-flex items-center gap-2 text-sm mb-6 transition-colors duration-200 hover:text-[#C9A84C]"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                <ArrowLeft size={15} /> Back to Events
              </Link>

              {event.isThirdParty && (
                <span
                  className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4"
                  style={{ backgroundColor: "rgba(8,8,8,0.7)", color: "var(--color-fm2-muted)" }}
                >
                  Partner Event
                </span>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display font-bold leading-tight max-w-3xl"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", color: "var(--color-fm2-white)" }}
              >
                {event.title}
              </motion.h1>
            </div>
          </div>
        </div>
      </section>

      {/* ---- EVENT DETAILS ---- */}
      <section className="relative" style={{ backgroundColor: "var(--color-fm2-black)" }}>
        <div className="container-fm2 section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <p className="text-base sm:text-lg leading-8" style={{ color: "var(--color-fm2-muted)" }}>
                {event.longDescription ?? event.description}
              </p>

              {event.lineup && event.lineup.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-fm2-white)" }}>
                    Lineup
                  </h2>
                  <div className="flex flex-col gap-2">
                    {event.lineup.map((act) => (
                      <div
                        key={act}
                        className="flex items-center gap-3 py-3 border-b"
                        style={{ borderColor: "var(--color-fm2-border)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--color-fm2-gold)" }} />
                        <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>
                          {act}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky info card */}
            <div className="lg:col-span-1">
              <div className="card-surface flex flex-col gap-5 lg:sticky lg:top-28">

                <div className="flex items-start gap-3">
                  <Calendar size={18} className="shrink-0 mt-0.5" style={{ color: "var(--color-fm2-gold)" }} />
                  <div className="flex flex-col">
                    <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>Date</span>
                    <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>
                      {formatDate(event.date)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="shrink-0 mt-0.5" style={{ color: "var(--color-fm2-gold)" }} />
                  <div className="flex flex-col">
                    <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>Time</span>
                    <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>
                      {event.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: "var(--color-fm2-gold)" }} />
                  <div className="flex flex-col">
                    <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>Venue</span>
                    <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>
                      {event.venue}
                    </span>
                    {event.address && (
                      <span className="text-xs mt-0.5" style={{ color: "var(--color-fm2-muted)" }}>
                        {event.address}, {event.city}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: "var(--color-fm2-border)" }}
                >
                  <span className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>Price</span>
                  <span className="font-display font-bold text-xl" style={{ color: "var(--color-fm2-white)" }}>
                    {event.ticketPrice === 0 ? "Free" : `₦${event.ticketPrice.toLocaleString()}`}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Ticket size={16} />}
                  onClick={() => setShowCheckoutNotice(true)}
                  className="justify-center"
                >
                  {event.ticketPrice === 0 ? "Reserve a Spot" : "Get Tickets"}
                </Button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---- MORE EVENTS ---- */}
      {otherEvents.length > 0 && (
        <section className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
          <div className="container-fm2 section-padding">
            <h2 className="font-display font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-fm2-white)" }}>
              More Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {otherEvents.map((other) => (
                <Link
                  key={other.id}
                  href={`/events/${other.slug}`}
                  className="card-surface overflow-hidden group hover:border-[#C9A84C]/40 transition-colors duration-300 !p-0"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${other.imageUrl})` }}
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <span className="text-xs font-medium" style={{ color: "var(--color-fm2-gold)" }}>
                      {formatDate(other.date)}
                    </span>
                    <h3 className="font-display font-bold text-base leading-snug" style={{ color: "var(--color-fm2-white)" }}>
                      {other.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- "COMING SOON" CHECKOUT NOTICE ---- */}
      {showCheckoutNotice && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(8,8,8,0.85)" }}
          onClick={() => setShowCheckoutNotice(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-surface max-w-sm w-full flex flex-col items-center text-center gap-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCheckoutNotice(false)}
              className="absolute top-4 right-4"
              style={{ color: "var(--color-fm2-muted)" }}
            >
              <X size={18} />
            </button>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              <Ticket size={20} style={{ color: "var(--color-fm2-gold)" }} />
            </div>
            <h3 className="font-display font-bold text-lg" style={{ color: "var(--color-fm2-white)" }}>
              Checkout Coming Soon
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
              Online ticket payments are being set up. In the meantime, contact our team directly to reserve your spot.
            </p>
            <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
              Contact Us
            </Button>
          </motion.div>
        </div>
      )}
    </>
  );
}