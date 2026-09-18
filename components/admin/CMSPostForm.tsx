// ============================================================
// FM2 EMPIRE — CMS NEWS/BLOG POST EDITOR
// Write and publish news, announcements, and blog posts.
// Supports drafts (saved but not visible) and published posts.
// ============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Trash2, Eye } from "lucide-react";
import type { CMSPost } from "@/lib/cms";

type Props = {
  item?: CMSPost;
  isNew?: boolean;
};

const CATEGORY_OPTIONS = [
  { label: "News",           value: "news" },
  { label: "Announcement",   value: "announcement" },
  { label: "Event Update",   value: "event_update" },
  { label: "Behind the Scenes", value: "behind_scenes" },
  { label: "Artist Spotlight",  value: "artist_spotlight" },
  { label: "Press Release",     value: "press_release" },
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem",
  backgroundColor: "#111111", border: "1px solid #2A2A2A",
  borderRadius: "8px", color: "#F5F5F0",
  fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.75rem",
  fontWeight: 600, color: "#F5F5F0", marginBottom: "0.375rem",
};

const helperStyle: React.CSSProperties = {
  display: "block", fontSize: "0.7rem",
  color: "#888880", marginTop: "0.25rem",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "0.7rem", fontWeight: 600,
  letterSpacing: "0.1em", textTransform: "uppercase",
  color: "#888880", paddingBottom: "0.75rem",
  borderBottom: "1px solid #2A2A2A", marginBottom: "0.5rem",
};

export default function CMSPostForm({ item, isNew = false }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    slug:         item?.slug         ?? "",
    title:        item?.title        ?? "",
    excerpt:      item?.excerpt      ?? "",
    content:      item?.content      ?? "",
    cover_image:  item?.cover_image  ?? "",
    category:     item?.category     ?? "news",
    author_name:  item?.author_name  ?? "FM2 Empire",
    is_published: item?.is_published ?? false,
  });

  const [isSaving,   setIsSaving]   = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState("");

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const autoSlug = (title: string) =>
    title.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSave = async (publish?: boolean) => {
    setError("");
    setSuccess("");

    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.slug.trim())  { setError("Slug is required"); return; }
    if (!form.content.trim()) { setError("Content cannot be empty"); return; }

    const payload = {
      ...form,
      is_published:  publish !== undefined ? publish : form.is_published,
      published_at:  publish ? new Date().toISOString() : (item?.published_at ?? null),
      id:            item?.id,
    };

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/cms/posts", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");

      if (publish) {
        setForm((prev) => ({ ...prev, is_published: true }));
        setSuccess("Post published — it is now live on the site.");
      } else {
        setSuccess(isNew ? "Draft saved." : "Changes saved.");
      }

      if (isNew && data.item?.id) {
        setTimeout(() => router.push(`/admin/news/${data.item.id}/edit`), 1200);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!item?.id) return;
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch("/api/admin/cms/posts", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: item.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete");
      router.push("/admin/news");
    } catch (err) {
      setError((err as Error).message);
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px" }}>

      {/* Status banner */}
      <div style={{ padding: "0.75rem 1rem", borderRadius: "8px", backgroundColor: form.is_published ? "rgba(39,174,96,0.08)" : "rgba(201,168,76,0.08)", border: `1px solid ${form.is_published ? "rgba(39,174,96,0.25)" : "rgba(201,168,76,0.25)"}`, fontSize: "0.813rem", color: form.is_published ? "#27AE60" : "#C9A84C", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "currentColor", flexShrink: 0 }} />
        {form.is_published ? "Published — visible on the site" : "Draft — not visible to the public yet"}
      </div>

      {/* Main editor */}
      <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "12px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        <p style={sectionLabel}>Post Details</p>

        <div>
          <label style={labelStyle}>Title <span style={{ color: "#C9A84C" }}>*</span></label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (isNew) set("slug", autoSlug(e.target.value));
            }}
            placeholder="Post title..."
            style={{ ...inputStyle, fontSize: "1.125rem", fontWeight: 600 }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>URL Slug <span style={{ color: "#C9A84C" }}>*</span></label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", autoSlug(e.target.value))}
              placeholder="post-url-slug"
              style={inputStyle}
            />
            <span style={helperStyle}>Public URL: /news/<strong>{form.slug || "your-slug"}</strong></span>
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} style={inputStyle}>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            placeholder="Short summary shown on the news listing page and in social shares..."
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
          <span style={helperStyle}>Keep under 160 characters for best SEO results.</span>
        </div>

        <div>
          <label style={labelStyle}>Cover Image URL</label>
          <input
            type="url"
            value={form.cover_image}
            onChange={(e) => set("cover_image", e.target.value)}
            placeholder="https://... (direct image link)"
            style={inputStyle}
          />
          {form.cover_image && (
            <img src={form.cover_image} alt="Cover preview" style={{ marginTop: "0.75rem", width: "100%", maxWidth: "400px", aspectRatio: "16/9", objectFit: "cover", borderRadius: "8px", border: "1px solid #2A2A2A" }} />
          )}
        </div>

        <div>
          <label style={labelStyle}>Author Name</label>
          <input
            type="text"
            value={form.author_name}
            onChange={(e) => set("author_name", e.target.value)}
            placeholder="FM2 Empire"
            style={inputStyle}
          />
        </div>

        <p style={{ ...sectionLabel, marginTop: "0.5rem" }}>Content</p>

        {/* Content editor */}
        <div>
          <label style={labelStyle}>Post Body <span style={{ color: "#C9A84C" }}>*</span></label>
          <textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            placeholder={`Write your post content here...

You can use simple formatting:
# Heading 1
## Heading 2
**Bold text**
_Italic text_

Just write naturally — the content will be displayed as clean paragraphs on the site.`}
            rows={20}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", lineHeight: 1.8 }}
          />
          <span style={helperStyle}>
            Tip: Use # for headings, **text** for bold, _text_ for italic. Each blank line creates a new paragraph.
          </span>
        </div>

        {/* Feedback */}
        {error   && <p style={{ fontSize: "0.813rem", color: "#C0392B", margin: 0 }}>{error}</p>}
        {success && <p style={{ fontSize: "0.813rem", color: "#27AE60", margin: 0 }}>{success}</p>}

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid #2A2A2A", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {!isNew && item && (
              <button onClick={handleDelete} disabled={isDeleting}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.625rem 1rem", backgroundColor: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "8px", color: "#C0392B", fontSize: "0.813rem", fontWeight: 600, cursor: isDeleting ? "not-allowed" : "pointer" }}>
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete
              </button>
            )}
            {!isNew && form.is_published && (
              <a href={`/news/${form.slug}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.625rem 1rem", backgroundColor: "#111111", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#888880", fontSize: "0.813rem", fontWeight: 600, textDecoration: "none" }}>
                <Eye size={14} /> View Live
              </a>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* Save as draft */}
            <button onClick={() => handleSave(false)} disabled={isSaving}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.75rem 1.25rem", backgroundColor: "#111111", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#F5F5F0", fontSize: "0.875rem", fontWeight: 600, cursor: isSaving ? "not-allowed" : "pointer" }}>
              {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {form.is_published ? "Save Changes" : "Save Draft"}
            </button>

            {/* Publish */}
            {!form.is_published && (
              <button onClick={() => handleSave(true)} disabled={isSaving}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.75rem 1.5rem", backgroundColor: "#C9A84C", border: "none", borderRadius: "8px", color: "#080808", fontSize: "0.875rem", fontWeight: 700, cursor: isSaving ? "not-allowed" : "pointer" }}>
                {isSaving ? <Loader2 size={15} className="animate-spin" /> : "🚀"}
                Publish Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}