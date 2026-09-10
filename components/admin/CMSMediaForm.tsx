// ============================================================
// FM2 EMPIRE — CMS MEDIA EDITOR FORM
// Used for both creating and editing media items.
// No code knowledge needed — fill the form, click save.
// ============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Trash2 } from "lucide-react";
import type { CMSMediaItem } from "@/lib/cms";

type Props = {
  item?: CMSMediaItem;
  isNew?: boolean;
};

const TYPE_OPTIONS = [
  { label: "Music",   value: "music" },
  { label: "Video",   value: "video" },
  { label: "Podcast", value: "podcast" },
  { label: "Series",  value: "series" },
  { label: "Show",    value: "show" },
  { label: "Photo",   value: "photo" },
];

const inputStyle: React.CSSProperties = {
  width:           "100%",
  padding:         "0.75rem 1rem",
  backgroundColor: "#111111",
  border:          "1px solid #2A2A2A",
  borderRadius:    "8px",
  color:           "#F5F5F0",
  fontSize:        "0.875rem",
  outline:         "none",
  boxSizing:       "border-box",
};

const labelStyle: React.CSSProperties = {
  display:       "block",
  fontSize:      "0.75rem",
  fontWeight:    600,
  color:         "#F5F5F0",
  marginBottom:  "0.375rem",
};

const helperStyle: React.CSSProperties = {
  display:    "block",
  fontSize:   "0.7rem",
  color:      "#888880",
  marginTop:  "0.25rem",
};

export default function CMSMediaForm({ item, isNew = false }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title:         item?.title         ?? "",
    description:   item?.description   ?? "",
    type:          item?.type          ?? "video",
    thumbnail_url: item?.thumbnail_url ?? "",
    external_url:  item?.external_url  ?? "",
    duration:      item?.duration      ?? "",
    release_date:  item?.release_date?.slice(0, 10) ?? "",
    is_premium:    item?.is_premium    ?? false,
    is_published:  item?.is_published  ?? true,
    sort_order:    item?.sort_order    ?? 0,
  });

  const [isSaving,   setIsSaving]   = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState("");

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.type)          { setError("Type is required"); return; }

    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/cms/media", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, id: item?.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");

      setSuccess(isNew ? "Media item created successfully." : "Changes saved successfully.");

      if (isNew) {
        setTimeout(() => router.push("/admin/media"), 1200);
      }
    } catch (err) {
      const e = err as Error;
      setError(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!item?.id) return;
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch("/api/admin/cms/media", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: item.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete");

      router.push("/admin/media");
    } catch (err) {
      const e = err as Error;
      setError(e.message);
      setIsDeleting(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1A1A1A",
        border:          "1px solid #2A2A2A",
        borderRadius:    "12px",
        padding:         "1.75rem",
        display:         "flex",
        flexDirection:   "column",
        gap:             "1.5rem",
        maxWidth:        "720px",
      }}
    >
      {/* Title */}
      <div>
        <label style={labelStyle}>
          Title <span style={{ color: "#C9A84C" }}>*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. FM2 Sessions — Episode 1"
          style={inputStyle}
        />
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Short description shown on media cards..."
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {/* Type + Duration row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>
            Content Type <span style={{ color: "#C9A84C" }}>*</span>
          </label>
          <select
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            style={inputStyle}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Duration</label>
          <input
            type="text"
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
            placeholder="e.g. 4:32 or Episode 1"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Thumbnail URL */}
      <div>
        <label style={labelStyle}>Thumbnail Image URL</label>
        <input
          type="url"
          value={form.thumbnail_url}
          onChange={(e) => set("thumbnail_url", e.target.value)}
          placeholder="https://images.unsplash.com/... or your own image URL"
          style={inputStyle}
        />
        <span style={helperStyle}>
          Paste a direct image URL. Use Unsplash, Cloudinary, or Google Drive (public link). Recommended size: 1280×720px.
        </span>
        {/* Thumbnail preview */}
        {form.thumbnail_url && (
          <div style={{ marginTop: "0.75rem" }}>
            <img
              src={form.thumbnail_url}
              alt="Thumbnail preview"
              style={{
                width:        "100%",
                maxWidth:     "320px",
                aspectRatio:  "16/9",
                objectFit:    "cover",
                borderRadius: "8px",
                border:       "1px solid #2A2A2A",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* External URL */}
      <div>
        <label style={labelStyle}>External Link (YouTube, Spotify, etc.)</label>
        <input
          type="url"
          value={form.external_url}
          onChange={(e) => set("external_url", e.target.value)}
          placeholder="https://youtube.com/watch?v=... or https://open.spotify.com/..."
          style={inputStyle}
        />
        <span style={helperStyle}>
          The link that opens when someone clicks Play. Paste the YouTube video URL, Spotify track URL, etc.
        </span>
      </div>

      {/* Release Date + Sort Order */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Release Date</label>
          <input
            type="date"
            value={form.release_date}
            onChange={(e) => set("release_date", e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Display Order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
            min={0}
            style={inputStyle}
          />
          <span style={helperStyle}>Lower number = appears first. 1 = top of the library.</span>
        </div>
      </div>

      {/* Toggles */}
      <div style={{ display: "flex", gap: "2rem" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={form.is_premium}
            onChange={(e) => set("is_premium", e.target.checked)}
            style={{ width: "1rem", height: "1rem", accentColor: "#C9A84C" }}
          />
          <span style={{ fontSize: "0.875rem", color: "#F5F5F0" }}>Premium Content</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => set("is_published", e.target.checked)}
            style={{ width: "1rem", height: "1rem", accentColor: "#C9A84C" }}
          />
          <span style={{ fontSize: "0.875rem", color: "#F5F5F0" }}>Published (visible on site)</span>
        </label>
      </div>

      {/* Feedback */}
      {error && (
        <p style={{ fontSize: "0.813rem", color: "#C0392B", margin: 0 }}>{error}</p>
      )}
      {success && (
        <p style={{ fontSize: "0.813rem", color: "#27AE60", margin: 0 }}>{success}</p>
      )}

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid #2A2A2A" }}>
        {!isNew && item ? (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              display:         "flex",
              alignItems:      "center",
              gap:             "6px",
              padding:         "0.625rem 1rem",
              backgroundColor: "rgba(192,57,43,0.1)",
              border:          "1px solid rgba(192,57,43,0.3)",
              borderRadius:    "8px",
              color:           "#C0392B",
              fontSize:        "0.813rem",
              fontWeight:      600,
              cursor:          isDeleting ? "not-allowed" : "pointer",
            }}
          >
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete
          </button>
        ) : <span />}

        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            display:         "flex",
            alignItems:      "center",
            gap:             "6px",
            padding:         "0.75rem 1.5rem",
            backgroundColor: isSaving ? "#888880" : "#C9A84C",
            border:          "none",
            borderRadius:    "8px",
            color:           "#080808",
            fontSize:        "0.875rem",
            fontWeight:      700,
            cursor:          isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {isSaving ? "Saving..." : isNew ? "Create Media Item" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}