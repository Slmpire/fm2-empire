// ============================================================
// FM2 EMPIRE — EVENTS SECTION (homepage)
// Pulls from lib/data.ts. Clicking any event card or the
// featured event goes to its own detail page first — buying
// happens there, not directly from the homepage.
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import { formatDate } from "@/lib/utils";
import { featuredEvent, upcomingEvents } from "@/lib/data";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Events() {
  return (
    <section id="events" className="relative" style={{ backgroundColor: "var(--color-fm2-black)" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)" }}
      />

      <div className="container-fm2 section-padding">

        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
          <SectionLabel text="Live & Upcoming" align="left" />
          <AnimatedText
            text="Step Into the Experience"
            as="h2"
            animation="reveal"
            delay={0.1}
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", color: "var(--color-fm2-white)" }}
          />
          <AnimatedText
            text="From intimate showcases to large-scale productions, FM2 events bring people together around culture, talent, and creativity."
            as="p"
            animation="fade"
            delay={0.2}
            className="text-base leading-relaxed"
            style={{ color: "var(--color-fm2-muted)" }}
          />
        </div>

        {/* Featured event */}
        <motion.div
          className="relative rounded-xl overflow-hidden mb-12 group"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <Link
            href={`/events/${featuredEvent.slug}`}
            className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[420px] block"
            style={{ backgroundColor: "var(--color-fm2-surface)", border: "1px solid var(--color-fm2-border)" }}
          >
            <div className="relative min-h-[280px] lg:min-h-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${featuredEvent.imageUrl})` }}
              />
              <div className="absolute inset-0" style={{ background: "rgba(8,8,8,0.25)" }} />
              <span
                className="absolute top-6 left-6 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-fm2-gold)", color: "var(--color-fm2-black)" }}
              >
                Featured Event
              </span>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center gap-5">
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <span className="flex items-center gap-2" style={{ color: "var(--color-fm2-gold)" }}>
                  <Calendar size={15} /> {formatDate(featuredEvent.date)}
                </span>
                <span className="flex items-center gap-2" style={{ color: "var(--color-fm2-muted)" }}>
                  <MapPin size={15} /> {featuredEvent.venue}, {featuredEvent.city}
                </span>
              </div>

              <h3
                className="font-display font-bold leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--color-fm2-white)" }}
              >
                {featuredEvent.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
                {featuredEvent.description}
              </p>

              <span
                className="inline-flex items-center gap-2 text-sm font-semibold mt-2 transition-colors duration-200 group-hover:text-[#E8C97A]"
                style={{ color: "var(--color-fm2-gold)" }}
              >
                View Details & Tickets — ₦{featuredEvent.ticketPrice.toLocaleString()} <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Upcoming events grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {upcomingEvents.map((event) => (
            <motion.div key={event.id} variants={cardVariants}>
              <Link
                href={`/events/${event.slug}`}
                className="card-surface overflow-hidden group hover:border-[#C9A84C]/40 transition-colors duration-300 block !p-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                  />
                  {event.isThirdParty && (
                    <span
                      className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full z-10"
                      style={{ backgroundColor: "rgba(8, 8, 8, 0.8)", color: "var(--color-fm2-muted)" }}
                    >
                      Partner Event
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <span className="flex items-center gap-2 text-xs font-medium" style={{ color: "var(--color-fm2-gold)" }}>
                    <Calendar size={13} /> {formatDate(event.date)}
                  </span>

                  <h3 className="font-display font-bold text-lg leading-snug" style={{ color: "var(--color-fm2-white)" }}>
                    {event.title}
                  </h3>

                  <span className="flex items-center gap-2 text-xs" style={{ color: "var(--color-fm2-muted)" }}>
                    <MapPin size={13} /> {event.venue}, {event.city}
                  </span>

                  <div className="flex items-center justify-between pt-3 mt-1 border-t" style={{ borderColor: "var(--color-fm2-border)" }}>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-fm2-white)" }}>
                      {event.ticketPrice === 0 ? "Free Entry" : `₦${event.ticketPrice.toLocaleString()}`}
                    </span>
                    <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--color-fm2-gold)" }}>
                      Details <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}