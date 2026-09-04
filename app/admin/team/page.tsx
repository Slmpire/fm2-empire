// ============================================================
// FM2 EMPIRE — ADMIN TEAM PAGE
// Made fully compatible with server components — no event
// handlers on img tags. Avatar display simplified.
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { teamMembers } from "@/lib/data";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Team" };

export default function AdminTeamPage() {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="font-bold text-xl mb-1"
            style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}
          >
            Team Members
          </h2>
          <p className="text-sm" style={{ color: "#888880" }}>
            Edit member details in{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{ backgroundColor: "#2A2A2A", color: "#C9A84C" }}
            >
              lib/data.ts
            </code>{" "}
            — replace placeholder names, bios, and photos with real FM2 content.
          </p>
        </div>
        <Link
          href="/about#team"
          target="_blank"
          className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            color: "#888880",
          }}
        >
          <ExternalLink size={13} /> View Public
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-start gap-4 rounded-xl border p-5"
            style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
          >
            {/* Avatar — initials only, no img tag with onError */}
            <div
              className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(201,168,76,0.08)",
                border:          "1px solid rgba(201,168,76,0.2)",
                minWidth:        "3rem",
              }}
            >
              <span
                style={{
                  fontWeight:  700,
                  fontSize:    "0.875rem",
                  color:       "#C9A84C",
                  fontFamily:  "Georgia, serif",
                }}
              >
                {getInitials(member.name)}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span
                className="font-bold text-sm"
                style={{ color: "#F5F5F0" }}
              >
                {member.name}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "#C9A84C" }}
              >
                {member.role}
              </span>
              <p
                className="text-xs leading-relaxed mt-1"
                style={{
                  color:     "#888880",
                  overflow:  "hidden",
                  display:   "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                } as React.CSSProperties}
              >
                {member.bio}
              </p>

              {/* Social links */}
              {member.socials && (
                <div className="flex gap-3 mt-2">
                  {member.socials.instagram && (
                    
                     <a href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs"
                      style={{ color: "#C9A84C" }}
                    >
                      Instagram ↗
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Profile link */}
            <Link
              href={`/team/${member.slug}`}
              target="_blank"
              className="shrink-0"
              style={{ color: "#C9A84C" }}
            >
              <ExternalLink size={14} />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}