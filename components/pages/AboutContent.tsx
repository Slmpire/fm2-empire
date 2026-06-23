// ============================================================
// FM2 EMPIRE — ABOUT PAGE CONTENT
// The full story: mission, values, journey, and team — each
// team member links to their own profile page at /team/[slug].
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Target, Eye, Zap, Globe, ArrowRight } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { getInitials } from "@/lib/utils";
import { teamMembers } from "@/lib/data";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2400&auto=format&fit=crop";

const values = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description: "Every production, every talent, every decision is rooted in intention.",
  },
  {
    icon: Eye,
    title: "Visionary",
    description: "We see the creative landscape not as it is, but as it can be.",
  },
  {
    icon: Zap,
    title: "Electric",
    description: "We bring energy to everything we touch — studio to stage.",
  },
  {
    icon: Globe,
    title: "Pan-African",
    description: "Rooted in Nigeria, reaching across the continent.",
  },
];

const milestones = [
  { year: "Year 1", title: "FM2 Founded", description: "Started as a small production outfit working with independent artists in Lagos." },
  { year: "Year 2", title: "Talent Program Launched", description: "Formalised the talent development pipeline — coaching, branding, career planning." },
  { year: "Year 3", title: "First Major Showcase", description: "Hosted our first large-scale event, bringing the FM2 roster to a live stage." },
  { year: "Today", title: "Building the Ecosystem", description: "Expanding into media, events infrastructure, and a full creative platform." },
];

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutContent() {
  return (
    <>
      {/* ---- PAGE HERO ---- */}
      <section className="relative flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.7) 50%, var(--color-fm2-black) 100%)" }}
        />
        <div className="container-fm2 relative z-10 flex flex-col items-center text-center gap-5">
          <span className="eyebrow">Our Story</span>
          <AnimatedText
            text="Built for Talent. Built to Last."
            as="h1"
            animation="reveal"
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", color: "var(--color-fm2-white)" }}
          />
          <p className="max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            FM2 Empire exists to close the gap between raw creative talent
            and the infrastructure needed to sustain a real career.
          </p>
        </div>
      </section>

      {/* ---- MISSION ---- */}
      <section className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
        <div className="container-fm2 section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel text="Our Mission" align="left" />
              <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "var(--color-fm2-white)" }}>
                Africa&apos;s Creative Talent, Industry-Ready
              </h2>
              <p className="text-base leading-8" style={{ color: "var(--color-fm2-muted)" }}>
                FM2 Empire is a media, content, talent development, and creative
                ecosystem. We work with artists, creators, and brands to produce
                music, video, events, and digital content that carries cultural
                weight. We are not a shortcut — we are a system.
              </p>
              <p className="text-base leading-8" style={{ color: "var(--color-fm2-muted)" }}>
                Every artist who joins FM2 gets more than a production deal —
                they get a structured path: development, branding, content,
                and a platform to perform on. That&apos;s the gap most young
                creatives face, and it&apos;s the gap FM2 was built to close.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <motion.div key={value.title} variants={fadeVariants} className="card-surface flex flex-col gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      <Icon size={17} style={{ color: "var(--color-fm2-gold)" }} />
                    </div>
                    <h3 className="font-display font-bold text-base" style={{ color: "var(--color-fm2-white)" }}>
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- JOURNEY / TIMELINE ---- */}
      <section className="relative" style={{ backgroundColor: "var(--color-fm2-black)" }}>
        <div className="container-fm2 section-padding">
          <div className="flex flex-col items-center text-center gap-5 mb-14 max-w-xl mx-auto">
            <SectionLabel text="Our Journey" align="center" />
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "var(--color-fm2-white)" }}>
              From Studio Sessions to an Empire
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {milestones.map((milestone) => (
              <motion.div key={milestone.title} variants={fadeVariants} className="card-surface flex flex-col gap-2">
                <span className="font-display font-bold text-sm" style={{ color: "var(--color-fm2-gold)" }}>
                  {milestone.year}
                </span>
                <h3 className="font-display font-bold text-lg" style={{ color: "var(--color-fm2-white)" }}>
                  {milestone.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- TEAM ---- */}
      <section id="team" className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
        <div className="container-fm2 section-padding">
          <div className="flex flex-col items-center text-center gap-5 mb-14 max-w-xl mx-auto">
            <SectionLabel text="The People" align="center" />
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "var(--color-fm2-white)" }}>
              The Minds Behind the Empire
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={fadeVariants}>
                <Link
                  href={`/team/${member.slug}`}
                  className="card-surface flex flex-col items-center text-center gap-4 group hover:border-[#C9A84C]/40 transition-colors duration-300 block"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "2px solid rgba(201,168,76,0.25)" }}
                  >
                    <span className="font-display font-bold text-2xl" style={{ color: "var(--color-fm2-gold)" }}>
                      {getInitials(member.name)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-bold text-base" style={{ color: "var(--color-fm2-white)" }}>
                      {member.name}
                    </h3>
                    <span className="text-xs" style={{ color: "var(--color-fm2-gold)" }}>
                      {member.role}
                    </span>
                  </div>
                  <span
                    className="text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "var(--color-fm2-gold)" }}
                  >
                    View Profile <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- CLOSING CTA ---- */}
      <section className="relative" style={{ backgroundColor: "var(--color-fm2-black)" }}>
        <div className="container-fm2 section-padding">
          <div className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--color-fm2-white)" }}>
              Want to Be Part of the Story?
            </h2>
            <Button href="/#apply" variant="primary" size="lg">
              Join FM2
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}