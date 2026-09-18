import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { adminGetAllPosts } from "@/lib/cms";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "News & Posts" };

const CATEGORY_LABELS: Record<string, string> = {
  news:             "News",
  announcement:     "Announcement",
  event_update:     "Event Update",
  behind_scenes:    "Behind the Scenes",
  artist_spotlight: "Artist Spotlight",
  press_release:    "Press Release",
};

export default async function AdminNewsPage() {
  let posts: Awaited<ReturnType<typeof adminGetAllPosts>> = [];

  try {
    posts = await adminGetAllPosts();
  } catch {
    return <div style={{ color: "#C0392B" }}>Failed to load posts.</div>;
  }

  const published = posts.filter((p) => p.is_published);
  const drafts    = posts.filter((p) => !p.is_published);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>News & Posts</h2>
          <p className="text-sm" style={{ color: "#888880" }}>
            {published.length} published · {drafts.length} draft{drafts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/news/new" className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg font-semibold" style={{ backgroundColor: "#C9A84C", color: "#080808" }}>
          <Plus size={13} /> Write Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", backgroundColor: "#1A1A1A", borderRadius: "12px", border: "1px solid #2A2A2A" }}>
          <p style={{ color: "#888880", fontSize: "0.875rem", marginBottom: "1rem" }}>No posts yet.</p>
          <Link href="/admin/news/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "0.625rem 1.25rem", backgroundColor: "#C9A84C", borderRadius: "8px", color: "#080808", fontSize: "0.813rem", fontWeight: 700, textDecoration: "none" }}>
            <Plus size={14} /> Write First Post
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div key={post.id} className="rounded-xl border p-5 flex items-start justify-between gap-4" style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}>
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-sm" style={{ color: "#F5F5F0" }}>{post.title}</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: "4px", backgroundColor: post.is_published ? "rgba(39,174,96,0.1)" : "rgba(201,168,76,0.1)", color: post.is_published ? "#27AE60" : "#C9A84C" }}>
                    {post.is_published ? "Published" : "Draft"}
                  </span>
                  <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "4px", backgroundColor: "#2A2A2A", color: "#888880" }}>
                    {CATEGORY_LABELS[post.category] ?? post.category}
                  </span>
                </div>
                {post.excerpt && (
                  <p className="text-xs leading-relaxed" style={{ color: "#888880" }}>{post.excerpt}</p>
                )}
                <div className="flex gap-4 text-xs" style={{ color: "#888880" }}>
                  <span>By {post.author_name}</span>
                  {post.published_at && <span>Published {formatDate(post.published_at, { day: "numeric", month: "short", year: "numeric" })}</span>}
                  {!post.published_at && <span>Created {formatDate(post.created_at, { day: "numeric", month: "short" })}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {post.is_published && (
                  <Link href={`/news/${post.slug}`} target="_blank" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#888880", textDecoration: "none" }}>
                    <Eye size={13} />
                  </Link>
                )}
                <Link href={`/admin/news/${post.id}/edit`} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#C9A84C" }}>
                  <Pencil size={12} /> Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}