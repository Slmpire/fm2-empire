import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CMSEventForm from "@/components/admin/CMSEventForm";

export const metadata: Metadata = { title: "Add Event" };

export default function NewEventPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/events" className="flex items-center gap-2 text-sm w-fit" style={{ color: "#888880" }}>
        <ArrowLeft size={15} /> Back to Events
      </Link>
      <div>
        <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Add Event</h2>
        <p className="text-sm" style={{ color: "#888880" }}>Fill in the details and click Create. It appears on the site immediately.</p>
      </div>
      <CMSEventForm isNew />
    </div>
  );
}