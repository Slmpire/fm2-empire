import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { adminGetPost } from "@/lib/cms";
import CMSPostForm from "@/components/admin/CMSPostForm";

export const metadata: Metadata = { title: "Edit Post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item   = await adminGetPost(id);
  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/news" className="flex items-center gap-2 text-sm w-fit" style={{ color: "#888880" }}>
        <ArrowLeft size={15} /> Back to Posts
      </Link>
      <div>
        <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Edit Post</h2>
        <p className="text-sm" style={{ color: "#888880" }}>
          {item.is_published ? "This post is live. Changes save immediately." : "This is a draft — not visible to the public."}
        </p>
      </div>
      <CMSPostForm item={item} />
    </div>
  );
}