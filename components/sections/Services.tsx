// ============================================================
// FM2 EMPIRE — SERVICES SECTION
// What FM2 offers. Each service is a card with an icon,
// title, description, audience, and a CTA.
//
// Layout: 3-column grid on desktop, stacked on mobile.
// The cards animate in with a stagger — each one slightly
// after the last. Entertainment energy: bold, direct.
//
// The "featured" service gets a gold border treatment to
// draw the eye — typically the core talent development offer.
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import {
  Mic2,
  Film,
  Users,
  Calendar,
  Palette,
  Handshake,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------
// DATA
// ------------------------------------------------------------

const services = [
  {
    id: "talent",
    icon: Mic2,
    title: "Talent Development",
    description:
      "We identify, develop, and position artists and creatives for long-term relevance. From vocal coaching to brand strategy, we build careers with depth.",
    audience: "Artists, Musicians, Performers",
    ctaLabel: "Enroll as Talent",
    ctaHref: "#apply",
    isFeatured: true,
  },
  {
    id: "production",
    icon: Film,
    title: "Media Production",
    description:
      "Music videos, short films, podcasts, social content, and brand campaigns. We produce content that carries cultural weight and performs across platforms.",
    audience: "Artists, Brands, Creators",
    ctaLabel: "Request Production",
    ctaHref: "#apply",
    isFeatured: false,
  },
  {
    id: "internship",
    icon: Users,
    title: "Internship Program",
    description:
      "An immersive program for students and young professionals entering the creative industry. Real work, real mentorship, real results.",
    audience: "Students, Young Professionals",
    ctaLabel: "Apply for Internship",
    ctaHref: "#apply",
    isFeatured: false,
  },
  {
    id: "events",
    icon: Calendar,
    title: "Events & Experiences",
    description:
      "From intimate showcases to large-scale productions — we conceptualise, produce, and execute events that people remember. We also handle ticketing for partner organisations.",
    audience: "Organisations, Artists, Brands",
    ctaLabel: "Plan an Event",
    ctaHref: "#contact",
    isFeatured: false,
  },
  {
    id: "creative",
    icon: Palette,
    title: "Creative Services",
    description:
      "Got a project that needs the FM2 touch but you're not joining the roster? We work with independent clients on production, direction, and creative strategy.",
    audience: "Independent Clients, Brands",
    ctaLabel: "Request a Service",
    ctaHref: "#apply",
    isFeatured: false,
  },
  {
    id: "partnerships",
    icon: Handshake,
    title: "Partnerships",
    description:
      "We collaborate with organisations, brands, and institutions that align with our vision. Sponsorships, co-productions, licensing, and strategic alliances.",
    audience: "Brands, Organisations, Institutions",
    ctaLabel: "Partner with FM2",
    ctaHref: "#contact",
    isFeatured: false,
  },
];

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
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

export default function Services() {
  return (
    <section
      id="services"
      className="relative"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)",
        }}
      />

      <div className="container-fm2 section-padding">

        {/* ---- HEADER ---- */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">

          <div className="flex flex-col gap-6 max-w-xl">
            <SectionLabel text="What We Do" align="left" />
            <AnimatedText
              text="Built for Creatives. Designed for Impact."
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
              text="FM2 offers a full suite of creative services — from developing raw talent to producing broadcast-ready content and executing world-class events."
              as="p"
              animation="fade"
              delay={0.2}
              className="text-base leading-relaxed"
              style={{ color: "var(--color-fm2-muted)" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="shrink-0"
          >
            <Button href="#contact" variant="secondary" size="md">
              Discuss a Project
            </Button>
          </motion.div>

        </div>

        {/* ---- SERVICES GRID ---- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={cn(
                  "card-surface p-7 flex flex-col gap-5 group",
                  "transition-all duration-300 hover:-translate-y-1",
                  "hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
                  service.isFeatured
                    ? "border-[#C9A84C]/40 hover:border-[#C9A84C]"
                    : "hover:border-[#C9A84C]/30"
                )}
              >
                {/* Featured badge */}
                {service.isFeatured && (
                  <div className="self-start">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(201, 168, 76, 0.1)",
                        color: "var(--color-fm2-gold)",
                        border: "1px solid rgba(201, 168, 76, 0.3)",
                      }}
                    >
                      Core Offering
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[rgba(201,168,76,0.12)]"
                  style={{
                    backgroundColor: "rgba(201, 168, 76, 0.06)",
                    border: "1px solid rgba(201, 168, 76, 0.15)",
                  }}
                >
                  <Icon
                    size={20}
                    style={{ color: "var(--color-fm2-gold)" }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-xl leading-tight"
                  style={{ color: "var(--color-fm2-white)" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "var(--color-fm2-muted)" }}
                >
                  {service.description}
                </p>

                {/* Audience tag */}
                <div
                  className="text-xs font-medium tracking-wide pt-1 pb-3 border-b"
                  style={{
                    color: "var(--color-fm2-muted)",
                    borderColor: "var(--color-fm2-border)",
                  }}
                >
                  <span style={{ color: "var(--color-fm2-gold)" }}>
                    For:{" "}
                  </span>
                  {service.audience}
                </div>

                {/* CTA */}
                <Button
                  href={service.ctaHref}
                  variant={service.isFeatured ? "primary" : "ghost"}
                  size="sm"
                  className={cn(
                    "self-start",
                    !service.isFeatured &&
                      "hover:text-[#C9A84C] px-0"
                  )}
                >
                  {service.ctaLabel} →
                </Button>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}