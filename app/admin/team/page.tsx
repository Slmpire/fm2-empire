import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ExternalLink, Pencil } from "lucide-react";
import { adminGetAllTeamMembers } from "@/lib/cms";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Team" };

export default async function AdminTeamPage() {
  let members: Awaited<ReturnType<typeof adminGetAllTeamMembers>> = [];

  try {
    members = await adminGetAllTeamMembers();
  } catch {
    return <div style={{ color: "#C0392B" }}>Failed to load team members.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Team Members</h2>
          <p className="text-sm" style={{ color: "#888880" }}>{members.length} member{members.length !== 1 ? "s" : ""}.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/about#team" target="_blank" className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", color: "#888880" }}>
            <ExternalLink size={13} /> View Public
          </Link>
          <Link href="/admin/team/new" className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg font-semibold" style={{ backgroundColor: "#C9A84C", color: "#080808" }}>
            <Plus size={13} /> Add Member
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.length === 0 ? (
          <div style={{ gridColumn: "1/-1", padding: "3rem", textAlign: "center", backgroundColor: "#1A1A1A", borderRadius: "12px", border: "1px solid #2A2A2A" }}>
            <p style={{ color: "#888880", fontSize: "0.875rem", marginBottom: "1rem" }}>No team members yet.</p>
            <Link href="/admin/team/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "0.625rem 1.25rem", backgroundColor: "#C9A84C", borderRadius: "8px", color: "#080808", fontSize: "0.813rem", fontWeight: 700, textDecoration: "none" }}>
              <Plus size={14} /> Add First Member
            </Link>
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="flex items-start gap-4 rounded-xl border p-5" style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}>
              <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", minWidth: "3rem" }}>
                {member.image_url ? (
                  <img src={member.image_url} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#C9A84C" }}>{getInitials(member.name)}</span>
                )}
              </div>

              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm" style={{ color: "#F5F5F0" }}>{member.name}</span>
                  {!member.is_active && (
                    <span style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem", borderRadius: "4px", backgroundColor: "rgba(192,57,43,0.1)", color: "#C0392B" }}>Hidden</span>
                  )}
                </div>
                <span className="text-xs font-medium" style={{ color: "#C9A84C" }}>{member.role}</span>
                <p className="text-xs leading-relaxed mt-1" style={{ color: "#888880", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}>
                  {member.bio}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/team/${member.slug}`} target="_blank" style={{ color: "#888880", display: "flex" }}><ExternalLink size={13} /></Link>
                <Link href={`/admin/team/${member.id}/edit`} className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#C9A84C" }}>
                  <Pencil size={12} /> Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}