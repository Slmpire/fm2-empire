// ============================================================
// FM2 EMPIRE — TEAM PROFILE CONTENT
// Full profile: photo, role, long bio, socials, and a "More
// from the Team" strip linking to other members' profiles.
// ============================================================

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import Button from "@/components/ui/Button";
import { teamMembers } from "@/lib/data";
import type { TeamMember } from "@/types/index";

export default function TeamProfileContent({ member }: { member: TeamMember }) {
  const otherMembers = teamMembers.filter((m) => m.slug !== member.slug);

  return (
    <>
      {/* ---- PROFILE HERO ---- */}
      <section className="relative pt-32" style={{ backgroundColor: "var(--color-fm2-black)" }}>
        <div className="container-fm2 section-padding">

          <Link
            href="/about#team"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-200 hover:text-[#C9A84C]"
            style={{ color: "var(--color-fm2-muted)" }}
          >
            <ArrowLeft size={15} /> Back to Team
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">

            {/* Photo column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div
                className="aspect-square rounded-2xl overflow-hidden mb-6"
                style={{ border: "1px solid var(--color-fm2-border)" }}
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {member.socials && (
                <div className="flex items-center gap-3">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                      style={{ backgroundColor: "var(--color-fm2-surface)", border: "1px solid var(--color-fm2-border)", color: "var(--color-fm2-muted)" }}
                    >
                      <Globe size={16} />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                      style={{ backgroundColor: "var(--color-fm2-surface)", border: "1px solid var(--color-fm2-border)", color: "var(--color-fm2-muted)" }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-4.22 2.5-7.17 3.33A4.48 4.48 0 0 0 12 7.5v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                      style={{ backgroundColor: "var(--color-fm2-surface)", border: "1px solid var(--color-fm2-border)", color: "var(--color-fm2-muted)" }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2c-1.1 0-2 .9-2 2v7h-4v-14h4v2c.7-1.3 2-2 3.5-2 2.2 0 4 1.8 4 4v8z" />
                        <rect x="2" y="9" width="4" height="12" rx="1" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            {/* Info column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              <span className="eyebrow">{member.role}</span>
              <h1
                className="font-display font-bold leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-fm2-white)" }}
              >
                {member.name}
              </h1>
              <p className="text-base sm:text-lg leading-8" style={{ color: "var(--color-fm2-muted)" }}>
                {member.longBio ?? member.bio}
              </p>

              <div className="pt-4">
                <Button href="/contact" variant="primary" size="md">
                  Get In Touch
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---- MORE FROM THE TEAM ---- */}
      <section className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
        <div className="container-fm2 section-padding">
          <h2
            className="font-display font-bold mb-10"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-fm2-white)" }}
          >
            More From the Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {otherMembers.map((other) => (
              <Link
                key={other.id}
                href={`/team/${other.slug}`}
                className="card-surface flex items-center gap-4 group hover:border-[#C9A84C]/40 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0" style={{ border: "1px solid var(--color-fm2-border)" }}>
                  <img src={other.imageUrl} alt={other.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="font-display font-bold text-sm" style={{ color: "var(--color-fm2-white)" }}>
                    {other.name}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-fm2-gold)" }}>
                    {other.role}
                  </span>
                </div>
                <ArrowRight
                  size={15}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
                  style={{ color: "var(--color-fm2-gold)" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}