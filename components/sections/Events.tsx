// ============================================================
// FM2 EMPIRE — EVENTS SECTION
// Upcoming and featured events. FM2 hosts their own events
// and also features/manages ticketing for third-party events.
//
// Layout: Featured event as a large hero card, followed by
// a horizontal scroll/grid of upcoming events. Each card
// shows date, title, venue, and a buy ticket CTA.
//
// Phase 1 note: ticketing CTA links out or shows "Coming Soon"
// until the Paystack ticketing system is built. The structure
// is final — only the CTA behaviour changes later.
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types/index";

// ------------------------------------------------------------
// PLACEHOLDER DATA
// Replace with real event data once FM2 confirms dates.
// ------------------------------------------------------------

const featuredEvent: Event = {
  id: "f1",
  title: "FM2 Empire Showcase 2026",
  description:
    "An evening celebrating the artists, creators, and talent shaping FM2's next chapter. Live performances, exclusive media premieres, and industry networking.",
  date: "2026-08-15",
  time: "6:00 PM",
  venue: "Eko Convention Centre",
  city: "Lagos",
  imageUrl: "/images/event-featured.jpg",
  ticketPrice: 15000,
  ticketUrl: "#",
  status: "upcoming",
  isFeatured: true,
  organiser: "FM2 Empire",
  isThirdParty: false,
};

const upcomingEvents: Event[] = [
  {
    id: "e1",
    title: "Sound & Story — Open Mic Night",
    description: "A platform for emerging voices in music and spoken word.",
    date: "2026-07-10",
    time: "7:00 PM",
    venue: "The Bridge Lagos",
    city: "Lagos",
    imageUrl: "/images/event-1.jpg",
    ticketPrice: 5000,
    ticketUrl: "#",
    status: "upcoming",
    isFeatured: false,
    organiser: "FM2 Empire",
    isThirdParty: false,
  },
  {
    id: "e2",
    title: "Creative Industry Mixer",
    description: "Networking event for creatives, brands, and investors.",
    date: "2026-07-22",
    time: "4:00 PM",
    venue: "Radisson Blu Ikeja",
    city: "Lagos",
    imageUrl: "/images/event-2.jpg",
    ticketPrice: 10000,
    ticketUrl: "#",
    status: "upcoming",
    isFeatured: false,
    organiser: "Partner Organisation",
    isThirdParty: true,
  },
  {
    id: "e3",
    title: "FM2 Talent Auditions — Round 2",
    description: "Open auditions for the next FM2 talent intake.",
    date: "2026-08-02",
    time: "10:00 AM",
    venue: "FM2 Studios",
    city: "Lagos",
    imageUrl: "/images/event-3.jpg",
    ticketPrice: 0,
    ticketUrl: "#",
    status: "upcoming",
    isFeatured: false,
    organiser: "FM2 Empire",
    isThirdParty: false,
  },
];

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function Events() {
  return (
    <section
      id="events"
      className="relative"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)",
        }}
      />

      <div className="container-fm2 section-padding">

        {/* ---- HEADER ---- */}
        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
          <SectionLabel text="Live & Upcoming" align="left" />
          <AnimatedText
            text="Step Into the Experience"
            as="h2"
            animation="reveal"
            delay={0.1}
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              color: "var(--color-fm2-white)",
            }}
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

        {/* ---- FEATURED EVENT — HERO CARD ---- */}
        <motion.div
          className="relative rounded-xl overflow-hidden mb-12 group"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <div
            className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[420px]"
            style={{
              backgroundColor: "var(--color-fm2-surface)",
              border: "1px solid var(--color-fm2-border)",
            }}
          >
            {/* Image side */}
            <div
              className="relative min-h-[280px] lg:min-h-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)",
                }}
              />
              <span
                className="absolute top-6 left-6 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-fm2-gold)",
                  color: "var(--color-fm2-black)",
                }}
              >
                Featured Event
              </span>
            </div>

            {/* Content side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center gap-5">
              <div className="flex items-center gap-4 text-sm">
                <span
                  className="flex items-center gap-2"
                  style={{ color: "var(--color-fm2-gold)" }}
                >
                  <Calendar size={15} />
                  {formatDate(featuredEvent.date)}
                </span>
                <span
                  className="flex items-center gap-2"
                  style={{ color: "var(--color-fm2-muted)" }}
                >
                  <MapPin size={15} />
                  {featuredEvent.venue}, {featuredEvent.city}
                </span>
              </div>

              <h3
                className="font-display font-bold leading-tight"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--color-fm2-white)",
                }}
              >
                {featuredEvent.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-fm2-muted)" }}
              >
                {featuredEvent.description}
              </p>

              <div className="flex items-center gap-4 mt-2">
                <Button
                  href={featuredEvent.ticketUrl}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight size={16} />}
                >
                  Get Tickets — ₦{featuredEvent.ticketPrice.toLocaleString()}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---- UPCOMING EVENTS GRID ---- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              className="card-surface overflow-hidden group hover:border-[#C9A84C]/40 transition-colors duration-300"
            >
              {/* Image placeholder */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)",
                }}
              >
                {event.isThirdParty && (
                  <span
                    className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full z-10"
                    style={{
                      backgroundColor: "rgba(8, 8, 8, 0.8)",
                      color: "var(--color-fm2-muted)",
                    }}
                  >
                    Partner Event
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <span
                  className="flex items-center gap-2 text-xs font-medium"
                  style={{ color: "var(--color-fm2-gold)" }}
                >
                  <Calendar size={13} />
                  {formatDate(event.date)}
                </span>

                <h3
                  className="font-display font-bold text-lg leading-snug"
                  style={{ color: "var(--color-fm2-white)" }}
                >
                  {event.title}
                </h3>

                <span
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "var(--color-fm2-muted)" }}
                >
                  <MapPin size={13} />
                  {event.venue}, {event.city}
                </span>

                <div
                  className="flex items-center justify-between pt-3 mt-1 border-t"
                  style={{ borderColor: "var(--color-fm2-border)" }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-fm2-white)" }}
                  >
                    {event.ticketPrice === 0
                      ? "Free Entry"
                      : `₦${event.ticketPrice.toLocaleString()}`}
                  </span>
                  <Button
                    href={event.ticketUrl}
                    variant="ghost"
                    size="sm"
                    className="px-0 hover:text-[#C9A84C]"
                  >
                    Details →
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}