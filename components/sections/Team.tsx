// ============================================================
// FM2 EMPIRE — TEAM SECTION (reads from Supabase CMS)
// ============================================================

import Link from "next/link";
import { getActiveTeamMembers } from "@/lib/cms";
import { getInitials } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";

export default async function Team() {
  let members = [];
  try {
    members = await getActiveTeamMembers();
  } catch {
    members = [];
  }

  return (
    <section id="team" className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)" }} />

      <div className="container-fm2 section-padding">
        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
          <SectionLabel text="The People" align="left" />
          <AnimatedText text="The Minds Behind the Empire" as="h2" animation="reveal" delay={0.1} className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", color: "var(--color-fm2-white)" }} />
          <AnimatedText text="FM2 is built by a team that understands both the art and the industry behind it." as="p" animation="fade" delay={0.2} className="text-base leading-relaxed" style={{ color: "var(--color-fm2-muted)" }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((member) => (
            <Link
              key={member.id}
              href={`/team/${member.slug}`}
              className="card-surface overflow-hidden group hover:border-[#C9A84C]/40 transition-colors duration-300 block !p-0"
            >
              <div className="relative aspect-square overflow-hidden">
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "rgba(201,168,76,0.08)" }}>
                    <span className="font-display font-bold text-4xl" style={{ color: "var(--color-fm2-gold)", opacity: 0.6 }}>
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(8,8,8,0.6) 100%)" }} />
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-display font-bold text-lg leading-snug" style={{ color: "var(--color-fm2-white)" }}>{member.name}</h3>
                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--color-fm2-gold)" }}>{member.role}</span>
                {member.bio && <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--color-fm2-muted)" }}>{member.bio}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}