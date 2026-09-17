import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { adminGetEvent } from "@/lib/cms";
import CMSEventForm from "@/components/admin/CMSEventForm";

export const metadata: Metadata = { title: "Edit Event" };

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item   = await adminGetEvent(id);
  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/events" className="flex items-center gap-2 text-sm w-fit" style={{ color: "#888880" }}>
        <ArrowLeft size={15} /> Back to Events
      </Link>
      <div>
        <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Edit Event</h2>
        <p className="text-sm" style={{ color: "#888880" }}>Changes save and appear on the site immediately.</p>
      </div>
      <CMSEventForm item={item} />
    </div>
  );
}