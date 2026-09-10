import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { adminGetMediaItem } from "@/lib/cms";
import CMSMediaForm from "@/components/admin/CMSMediaForm";

export const metadata: Metadata = { title: "Edit Media" };

export default async function EditMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id }  = await params;
  const item    = await adminGetMediaItem(id);

  if (!item) notFound();

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
          Edit Media Item
        </h2>
        <p className="text-sm" style={{ color: "#888880" }}>
          Changes save instantly and appear on the site immediately.
        </p>
      </div>

      <CMSMediaForm item={item} />
    </div>
  );
}