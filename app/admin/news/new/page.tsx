import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CMSPostForm from "@/components/admin/CMSPostForm";

export const metadata: Metadata = { title: "Write Post" };

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/news" className="flex items-center gap-2 text-sm w-fit" style={{ color: "#888880" }}>
        <ArrowLeft size={15} /> Back to Posts
      </Link>
      <div>
        <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Write a Post</h2>
        <p className="text-sm" style={{ color: "#888880" }}>Save as draft first, then publish when ready.</p>
      </div>
      <CMSPostForm isNew />
    </div>
  );
}