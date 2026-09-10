import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CMSMediaForm from "@/components/admin/CMSMediaForm";

export const metadata: Metadata = { title: "Add Media" };

export default function NewMediaPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/media"
        className="flex items-center gap-2 text-sm w-fit"
        style={{ color: "#888880" }}
      >
        <ArrowLeft size={15} /> Back to Media
      </Link>

      <div>
        <h2
          className="font-bold text-xl mb-1"
          style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}
        >
          Add Media Item
        </h2>
        <p className="text-sm" style={{ color: "#888880" }}>
          Fill in the details and click Create. It will appear on the site immediately.
        </p>
      </div>

      <CMSMediaForm isNew />
    </div>
  );
}