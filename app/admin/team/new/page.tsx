import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CMSTeamForm from "@/components/admin/CMSTeamForm";

export const metadata: Metadata = { title: "Add Team Member" };

export default function NewTeamMemberPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/team" className="flex items-center gap-2 text-sm w-fit" style={{ color: "#888880" }}>
        <ArrowLeft size={15} /> Back to Team
      </Link>
      <div>
        <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Add Team Member</h2>
        <p className="text-sm" style={{ color: "#888880" }}>Fill in the details. They appear on the site immediately once saved.</p>
      </div>
      <CMSTeamForm isNew />
    </div>
  );
}