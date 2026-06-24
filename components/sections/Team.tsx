// ============================================================
// FM2 EMPIRE — TEAM SECTION (homepage)
// Pulls from lib/data.ts, uses real photos, each card links
// to its own dedicated profile page at /team/[slug].
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import { teamMembers } from "@/lib/data";

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

export default function Team() {
  return (
    <section id="team" className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)" }}
      />

      <div className="container-fm2 section-padding">

        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
          <SectionLabel text="The People" align="left" />
          <AnimatedText
            text="The Minds Behind the Empire"
            as="h2"
            animation="reveal"
            delay={0.1}
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", color: "var(--color-fm2-white)" }}
          />
          <AnimatedText
            text="FM2 is built by a team that understands both the art and the industry behind it."
            as="p"
            animation="fade"
            delay={0.2}
            className="text-base leading-relaxed"
            style={{ color: "var(--color-fm2-muted)" }}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={cardVariants}>
              <Link
                href={`/team/${member.slug}`}
                className="card-surface overflow-hidden group hover:border-[#C9A84C]/40 transition-colors duration-300 block !p-0"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 60%, rgba(8,8,8,0.6) 100%)" }}
                  />
                </div>

                <div className="p-5 flex flex-col gap-1">
                  <h3 className="font-display font-bold text-lg leading-snug" style={{ color: "var(--color-fm2-white)" }}>
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--color-fm2-gold)" }}>
                    {member.role}
                  </span>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--color-fm2-muted)" }}>
                    {member.bio}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}