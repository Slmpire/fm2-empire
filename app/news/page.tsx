import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/cms";
import { formatDate } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, announcements, and updates from FM2 Empire.",
};

const CATEGORY_LABELS: Record<string, string> = {
  news:             "News",
  announcement:     "Announcement",
  event_update:     "Event Update",
  behind_scenes:    "Behind the Scenes",
  artist_spotlight: "Artist Spotlight",
  press_release:    "Press Release",
};

export default async function NewsPage() {
  let posts = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  return (
    <section className="relative pt-32" style={{ backgroundColor: "var(--color-fm2-black)" }}>
      <div className="container-fm2 section-padding">
        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
          <SectionLabel text="Latest" align="left" />
          <AnimatedText
            text="News & Updates"
            as="h1"
            animation="reveal"
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-fm2-white)" }}
          />
          <p className="text-base leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
            Announcements, releases, event updates, and stories from FM2 Empire.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm py-12 text-center" style={{ color: "var(--color-fm2-muted)" }}>
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="card-surface overflow-hidden group hover:border-[#C9A84C]/40 transition-colors duration-300 block !p-0"
              >
                {post.cover_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--color-fm2-gold)" }}
                    >
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                    {post.published_at && (
                      <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
                        · {formatDate(post.published_at, { day: "numeric", month: "short" })}
                      </span>
                    )}
                  </div>
                  <h2
                    className="font-display font-bold text-lg leading-snug"
                    style={{ color: "var(--color-fm2-white)" }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
                      {post.excerpt}
                    </p>
                  )}
                  <span className="text-xs font-semibold mt-1" style={{ color: "var(--color-fm2-gold)" }}>
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}