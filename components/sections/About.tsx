// ============================================================
// FM2 EMPIRE — ABOUT SECTION
// "01" now sits in normal flow below "Who We Are" — no more
// overlap. Both columns stretch to equal height on desktop so
// they start AND end on the same horizontal line. Each card's
// content is vertically centered so the extra height reads as
// intentional breathing room, not empty dead space.
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import { Target, Eye, Zap, Globe } from "lucide-react";

// ------------------------------------------------------------
// DATA
// ------------------------------------------------------------

const values = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description:
      "Every production, every talent, every decision is rooted in intention. We build with direction.",
  },
  {
    icon: Eye,
    title: "Visionary",
    description:
      "We see the creative landscape not as it is, but as it can be. FM2 builds for the future.",
  },
  {
    icon: Zap,
    title: "Electric",
    description:
      "We bring energy to everything we touch — from studio sessions to stage productions.",
  },
  {
    icon: Globe,
    title: "Pan-African",
    description:
      "Rooted in Nigeria, reaching across the continent. African stories told on a global stage.",
  },
];

const marqueeItems = [
  "Talent Development",
  "Media Production",
  "Live Events",
  "Creative Direction",
  "Artist Management",
  "Cultural Impact",
  "Content Creation",
  "Brand Partnerships",
];

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
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

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-fm2-dark)" }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)",
        }}
      />

      <div className="container-fm2 section-padding">
        {/* items-start on mobile (natural stacking), items-stretch
            on desktop so both columns share the same top AND
            bottom edge. */}
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:items-stretch lg:gap-20 xl:gap-24">

          {/* LEFT COLUMN */}
          <div className="flex max-w-2xl flex-col gap-6 sm:gap-7 lg:gap-8">

            {/* "01" now sits below the label in normal flow —
                no absolute positioning, no overlap. */}
            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              <SectionLabel text="Who We Are" align="left" />
              <span
                className="select-none font-display font-bold leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6rem)",
                  color: "var(--color-fm2-surface)",
                }}
                aria-hidden="true"
              >
                01
              </span>
            </motion.div>

            <div className="max-w-xl">
              <AnimatedText
                text="More Than a Label. An Empire."
                as="h2"
                animation="reveal"
                delay={0.1}
                className="font-display font-bold leading-[1.08] tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  color: "var(--color-fm2-white)",
                }}
              />
            </div>

            <motion.div
              className="flex items-start gap-4 sm:gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              <span
                className="mt-1 block w-1 shrink-0 rounded-full"
                style={{
                  minHeight: "3.5rem",
                  backgroundColor: "var(--color-fm2-gold)",
                }}
              />
              <p
                className="max-w-xl font-display text-lg italic leading-relaxed sm:text-xl"
                style={{ color: "var(--color-fm2-gold)" }}
              >
                &ldquo;We exist to develop Africa&apos;s creative talent,
                produce world-class content, and build an ecosystem where
                art meets industry.&rdquo;
              </p>
            </motion.div>

            <div className="flex max-w-xl flex-col gap-1 sm:gap-1 pb-1">
              <AnimatedText
                text="FM2 Empire is a media, content, talent development, and creative ecosystem. We work with artists, creators, and brands to produce music, video, events, and digital content that carries cultural weight. We are not a shortcut — we are a system."
                as="p"
                animation="fade"
                delay={0.2}
                className="text-base leading-8"
                style={{ color: "var(--color-fm2-muted)" }}
              />

              <AnimatedText
                text="From talent enrollment and internship programs to media production, live events, and brand partnerships — FM2 is the infrastructure behind the creative voices defining Africa's next era."
                as="p"
                animation="fade"
                delay={0.3}
                className="text-base leading-8"
                style={{ color: "var(--color-fm2-muted)" }}
              />
            </div>

          </div>

          {/* RIGHT COLUMN — VALUES GRID */}
          {/* lg:h-full makes this wrapper match the stretched
              column height. The grid inside uses lg:grid-rows-2
              with that same full height, so the two rows of
              cards split the space evenly — top of row 1 lines
              up with "Who We Are", bottom of row 2 lines up
              with the last paragraph on the left. */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:h-full lg:grid-rows-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  variants={cardVariants}
                  className="group relative flex flex-col justify-center rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.015) 100%)",
                    borderColor: "rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at top left, rgba(201,168,76,0.08), transparent 40%)",
                    }}
                  />

                  <div
                    className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "rgba(201, 168, 76, 0.08)",
                      border: "1px solid rgba(201, 168, 76, 0.22)",
                    }}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                      style={{ color: "var(--color-fm2-gold)" }}
                    />
                  </div>

                  <h3
                    className="relative z-10 mt-5 font-display text-lg font-bold leading-tight sm:text-xl"
                    style={{ color: "var(--color-fm2-white)" }}
                  >
                    {value.title}
                  </h3>

                  <p
                    className="relative z-10 mt-2.5 text-sm leading-relaxed"
                    style={{ color: "var(--color-fm2-muted)" }}
                  >
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>

      {/* ---- MARQUEE STRIP ---- */}
      <div
        className="relative mt-10 overflow-hidden border-y py-4 sm:mt-12 sm:py-5"
        style={{ borderColor: "var(--color-fm2-border)" }}
      >
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 sm:w-24"
          style={{
            background:
              "linear-gradient(90deg, var(--color-fm2-dark), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 sm:w-24"
          style={{
            background:
              "linear-gradient(-90deg, var(--color-fm2-dark), transparent)",
          }}
        />

        <motion.div
          className="flex w-max gap-8 whitespace-nowrap sm:gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.18em] sm:gap-8 sm:text-sm"
              style={{ color: "var(--color-fm2-muted)" }}
            >
              {item}
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-fm2-gold)" }}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}