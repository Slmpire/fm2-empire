// ============================================================
// FM2 EMPIRE — TEAM SECTION
// The people behind FM2. Builds trust and gives the brand
// a human face. Clean grid of cards — photo, name, role,
// short bio, and social link.
//
// Phase 1 note: imageUrl values are placeholders. Replace
// with real team photos once FM2 provides them (see the
// asset request list from earlier in this conversation).
// ============================================================

"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import { getInitials } from "@/lib/utils";
import type { TeamMember } from "@/types/index";

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-7.9 1.5 4 4 0 0 1 7.9-1.5z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// ------------------------------------------------------------
// PLACEHOLDER DATA
// Replace with real FM2 team members and photos.
// ------------------------------------------------------------

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Founder Name",
    role: "Founder & Creative Director",
    bio: "Leads the overall creative vision and direction of FM2 Empire across all productions and talent initiatives.",
    imageUrl: "/images/team-1.jpg",
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "2",
    name: "Co-Founder Name",
    role: "Head of Talent Development",
    bio: "Oversees artist onboarding, mentorship programs, and long-term career development for FM2 talent.",
    imageUrl: "/images/team-2.jpg",
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "3",
    name: "Team Member Name",
    role: "Head of Media Production",
    bio: "Directs music videos, podcasts, and original content across the FM2 media library.",
    imageUrl: "/images/team-3.jpg",
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "4",
    name: "Team Member Name",
    role: "Events & Partnerships Lead",
    bio: "Manages FM2's live events calendar and strategic partnerships with brands and organisations.",
    imageUrl: "/images/team-4.jpg",
    socials: { instagram: "https://instagram.com" },
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

export default function Team() {
  return (
    <section
      id="team"
      className="relative"
      style={{ backgroundColor: "var(--color-fm2-dark)" }}
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
          <SectionLabel text="The People" align="left" />
          <AnimatedText
            text="The Minds Behind the Empire"
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
            text="FM2 is built by a team that understands both the art and the industry behind it."
            as="p"
            animation="fade"
            delay={0.2}
            className="text-base leading-relaxed"
            style={{ color: "var(--color-fm2-muted)" }}
          />
        </div>

        {/* ---- TEAM GRID ---- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className="group relative rounded-lg overflow-hidden bg-[color:var(--color-fm2-card)]"
            >
              {/* Media / avatar */}
              <div className="relative">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-white text-xl">
                    {getInitials(member.name)}
                  </div>
                )}

                {/* Social icon overlay */}
                {member.socials?.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on Instagram`}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundColor: "var(--color-fm2-gold)",
                      color: "var(--color-fm2-black)",
                    }}
                  >
                    <InstagramIcon size={14} />
                  </a>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-2">
                <h3
                  className="font-display font-bold text-lg leading-snug"
                  style={{ color: "var(--color-fm2-white)" }}
                >
                  {member.name}
                </h3>
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "var(--color-fm2-gold)" }}
                >
                  {member.role}
                </span>
                <p
                  className="text-sm leading-relaxed mt-1"
                  style={{ color: "var(--color-fm2-muted)" }}
                >
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}