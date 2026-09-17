import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { adminGetTeamMember } from "@/lib/cms";
import CMSTeamForm from "@/components/admin/CMSTeamForm";

export const metadata: Metadata = { title: "Edit Team Member" };

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item   = await adminGetTeamMember(id);
  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/team" className="flex items-center gap-2 text-sm w-fit" style={{ color: "#888880" }}>
        <ArrowLeft size={15} /> Back to Team
      </Link>
      <div>
        <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Edit Team Member</h2>
        <p className="text-sm" style={{ color: "#888880" }}>Changes appear on the site immediately.</p>
      </div>
      <CMSTeamForm item={item} />
    </div>
  );
}