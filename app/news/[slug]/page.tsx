import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/cms";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post     = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title:       post.title,
    description: post.excerpt ?? undefined,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  news:             "News",
  announcement:     "Announcement",
  event_update:     "Event Update",
  behind_scenes:    "Behind the Scenes",
  artist_spotlight: "Artist Spotlight",
  press_release:    "Press Release",
};

// Simple markdown-ish renderer — no external library needed
function renderContent(content: string): string {
  return content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("# "))
        return `<h1 style="font-family:Georgia,serif;font-size:2rem;font-weight:700;color:#F5F5F0;margin:2rem 0 1rem">${trimmed.slice(2)}</h1>`;
      if (trimmed.startsWith("## "))
        return `<h2 style="font-family:Georgia,serif;font-size:1.5rem;font-weight:700;color:#F5F5F0;margin:1.75rem 0 0.75rem">${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("### "))
        return `<h3 style="font-family:Georgia,serif;font-size:1.25rem;font-weight:700;color:#F5F5F0;margin:1.5rem 0 0.5rem">${trimmed.slice(4)}</h3>`;

      // Inline formatting
      const parsed = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#F5F5F0;font-weight:700">$1</strong>')
        .replace(/_(.*?)_/g,       '<em style="color:#C9A84C;font-style:italic">$1</em>');

      return `<p style="font-size:1rem;line-height:1.85;color:#888880;margin:0 0 1.25rem">${parsed}</p>`;
    })
    .join("\n");
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post     = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="relative pt-32" style={{ backgroundColor: "var(--color-fm2-black)" }}>

      {/* Cover image */}
      {post.cover_image && (
        <div
          className="w-full"
          style={{ maxHeight: "480px", overflow: "hidden" }}
        >
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full object-cover"
            style={{ maxHeight: "480px" }}
          />
        </div>
      )}

      <div className="container-fm2 py-14 max-w-3xl">
        <Link
          href="/news"
          className="flex items-center gap-2 text-sm mb-8 w-fit transition-colors duration-200 hover:text-[#C9A84C]"
          style={{ color: "var(--color-fm2-muted)" }}
        >
          <ArrowLeft size={15} /> Back to News
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-fm2-gold)" }}
          >
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
          {post.published_at && (
            <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
              · {formatDate(post.published_at)}
            </span>
          )}
          <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
            · By {post.author_name}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", color: "var(--color-fm2-white)" }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className="text-lg leading-relaxed mb-8 pb-8 border-b"
            style={{ color: "rgba(245,245,240,0.8)", borderColor: "var(--color-fm2-border)" }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        {post.content && (
          <div
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />
        )}

        {/* Footer */}
        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: "var(--color-fm2-border)" }}
        >
          <Link
            href="/news"
            className="text-sm font-semibold transition-colors duration-200 hover:text-[#E8C97A]"
            style={{ color: "var(--color-fm2-gold)" }}
          >
            ← More from FM2 Empire
          </Link>
        </div>
      </div>
    </section>
  );
}