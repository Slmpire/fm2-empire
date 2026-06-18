// ============================================================
// FM2 EMPIRE — ABOUT SECTION
// Who FM2 is. This section needs to feel like a statement,
// not a paragraph. Bold, confident, editorial.
//
// Structure:
// - Left: large editorial number + section label + heading
// - Right: mission text + values grid + CTA
// - Bottom: full width marquee strip — entertainment energy
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
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
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
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
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-fm2-dark)" }}
    >
      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)",
        }}
      />

      <div className="container-fm2 section-padding">

        {/* ---- MAIN CONTENT GRID ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">

            {/* Large editorial background number */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              <span
                className="font-display font-bold select-none pointer-events-none absolute -top-8 -left-4 leading-none"
                style={{
                  fontSize: "clamp(6rem, 15vw, 12rem)",
                  color: "var(--color-fm2-surface)",
                  zIndex: 0,
                }}
                aria-hidden="true"
              >
                01
              </span>

              <div className="relative z-10 pt-8">
                <SectionLabel text="Who We Are" align="left" />
              </div>
            </motion.div>

            {/* Main heading */}
            <AnimatedText
              text="More Than a Label. An Empire."
              as="h2"
              animation="reveal"
              delay={0.1}
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                color: "var(--color-fm2-white)",
              }}
            />

            {/* Gold accent line + quote */}
            <motion.div
              className="flex gap-4 items-start"
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
                className="w-1 rounded-full shrink-0 mt-1"
                style={{
                  height: "auto",
                  minHeight: "3rem",
                  backgroundColor: "var(--color-fm2-gold)",
                }}
              />
              <p
                className="font-display italic text-xl leading-relaxed"
                style={{ color: "var(--color-fm2-gold)" }}
              >
                &ldquo;We exist to develop Africa&apos;s creative talent,
                produce world-class content, and build an ecosystem where
                art meets industry.&rdquo;
              </p>
            </motion.div>

            {/* Body copy */}
            <AnimatedText
              text="FM2 Empire is a media, content, talent development, and creative ecosystem. We work with artists, creators, and brands to produce music, video, events, and digital content that carries cultural weight. We are not a shortcut — we are a system."
              as="p"
              animation="fade"
              delay={0.2}
              className="leading-relaxed text-base"
              style={{ color: "var(--color-fm2-muted)" }}
            />

            <AnimatedText
              text="From talent enrollment and internship programs to media production, live events, and brand partnerships — FM2 is the infrastructure behind the creative voices defining Africa's next era."
              as="p"
              animation="fade"
              delay={0.3}
              className="leading-relaxed text-base"
              style={{ color: "var(--color-fm2-muted)" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button href="#services" variant="primary" size="md">
                What We Do
              </Button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN — Values grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
                  className="card-surface p-6 flex flex-col gap-4 group hover:border-[#C9A84C] transition-colors duration-300"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: "rgba(201, 168, 76, 0.08)",
                      border: "1px solid rgba(201, 168, 76, 0.2)",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{ color: "var(--color-fm2-gold)" }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-bold text-lg"
                    style={{ color: "var(--color-fm2-white)" }}
                  >
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
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
      {/* Continuous scrolling text strip — entertainment energy */}
      <div
        className="relative overflow-hidden border-y py-5 mt-8"
        style={{ borderColor: "var(--color-fm2-border)" }}
      >
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, var(--color-fm2-dark), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(-90deg, var(--color-fm2-dark), transparent)",
          }}
        />

        {/* Scrolling track */}
        <motion.div
          ref={marqueeRef}
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Duplicate items for seamless loop */}
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 text-sm font-semibold tracking-widest uppercase shrink-0"
              style={{ color: "var(--color-fm2-muted)" }}
            >
              {item}
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "var(--color-fm2-gold)" }}
              />
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  );
}