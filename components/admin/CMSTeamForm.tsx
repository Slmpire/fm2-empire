// ============================================================
// FM2 EMPIRE — CMS TEAM MEMBER EDITOR FORM
// Create and edit team member profiles from the admin panel.
// ============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Trash2 } from "lucide-react";
import type { CMSTeamMember } from "@/lib/cms";

type Props = {
  item?: CMSTeamMember;
  isNew?: boolean;
};

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

export default function CMSTeamForm({ item, isNew = false }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    slug:       item?.slug       ?? "",
    name:       item?.name       ?? "",
    role:       item?.role       ?? "",
    bio:        item?.bio        ?? "",
    long_bio:   item?.long_bio   ?? "",
    image_url:  item?.image_url  ?? "",
    instagram:  item?.instagram  ?? "",
    twitter:    item?.twitter    ?? "",
    linkedin:   item?.linkedin   ?? "",
    sort_order: item?.sort_order ?? 0,
    is_active:  item?.is_active  ?? true,
  });

  const [isSaving,   setIsSaving]   = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState("");

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const autoSlug = (name: string) =>
    name.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!form.name.trim()) { setError("Name is required"); return; }
    if (!form.role.trim()) { setError("Role is required"); return; }
    if (!form.slug.trim()) { setError("Slug is required"); return; }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/cms/team", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, id: item?.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");

      setSuccess(isNew ? "Team member created." : "Changes saved.");
      if (isNew) setTimeout(() => router.push("/admin/team"), 1200);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!item?.id) return;
    if (!confirm(`Remove "${item.name}" from the team? This cannot be undone.`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch("/api/admin/cms/team", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: item.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete");
      router.push("/admin/team");
    } catch (err) {
      setError((err as Error).message);
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "12px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "720px" }}>

      <p style={sectionLabel}>Personal Details</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Full Name <span style={{ color: "#C9A84C" }}>*</span></label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => {
              set("name", e.target.value);
              if (isNew) set("slug", autoSlug(e.target.value));
            }}
            placeholder="e.g. Pelumi Ogunleye"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Role / Title <span style={{ color: "#C9A84C" }}>*</span></label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            placeholder="e.g. Head of Talent Development"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>
          URL Slug <span style={{ color: "#C9A84C" }}>*</span>
        </label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => set("slug", autoSlug(e.target.value))}
          placeholder="pelumi-ogunleye"
          style={inputStyle}
        />
        <span style={helperStyle}>
          Auto-generated from name. Becomes the profile URL: /team/<strong>{form.slug || "their-name"}</strong>
        </span>
      </div>

      <div>
        <label style={labelStyle}>Short Bio</label>
        <textarea
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          placeholder="One or two sentences shown on team cards..."
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div>
        <label style={labelStyle}>Full Bio</label>
        <textarea
          value={form.long_bio}
          onChange={(e) => set("long_bio", e.target.value)}
          placeholder="Full biography shown on the individual profile page..."
          rows={6}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <p style={sectionLabel}>Photo</p>

      <div>
        <label style={labelStyle}>Profile Photo URL</label>
        <input
          type="url"
          value={form.image_url}
          onChange={(e) => set("image_url", e.target.value)}
          placeholder="https://... (direct image link)"
          style={inputStyle}
        />
        <span style={helperStyle}>
          Paste a direct image URL. Square photos work best (1:1 ratio). Upload to Google Drive, Cloudinary, or Imgur and paste the public link.
        </span>
        {form.image_url && (
          <img
            src={form.image_url}
            alt="Preview"
            style={{ marginTop: "0.75rem", width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%", border: "2px solid rgba(201,168,76,0.3)" }}
          />
        )}
      </div>

      <p style={sectionLabel}>Social Links</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Instagram</label>
          <input type="url" value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://instagram.com/..." style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Twitter / X</label>
          <input type="url" value={form.twitter} onChange={(e) => set("twitter", e.target.value)} placeholder="https://twitter.com/..." style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>LinkedIn</label>
          <input type="url" value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." style={inputStyle} />
        </div>
      </div>

      <p style={sectionLabel}>Settings</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Display Order</label>
          <input type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} min={0} style={inputStyle} />
          <span style={helperStyle}>Lower number = appears first.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingTop: "1.5rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} style={{ width: "1rem", height: "1rem", accentColor: "#C9A84C" }} />
            <span style={{ fontSize: "0.875rem", color: "#F5F5F0" }}>Visible on site</span>
          </label>
        </div>
      </div>

      {error   && <p style={{ fontSize: "0.813rem", color: "#C0392B", margin: 0 }}>{error}</p>}
      {success && <p style={{ fontSize: "0.813rem", color: "#27AE60", margin: 0 }}>{success}</p>}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid #2A2A2A" }}>
        {!isNew && item ? (
          <button onClick={handleDelete} disabled={isDeleting}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.625rem 1rem", backgroundColor: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "8px", color: "#C0392B", fontSize: "0.813rem", fontWeight: 600, cursor: isDeleting ? "not-allowed" : "pointer" }}>
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Remove
          </button>
        ) : <span />}

        <button onClick={handleSave} disabled={isSaving}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.75rem 1.5rem", backgroundColor: isSaving ? "#888880" : "#C9A84C", border: "none", borderRadius: "8px", color: "#080808", fontSize: "0.875rem", fontWeight: 700, cursor: isSaving ? "not-allowed" : "pointer" }}>
          {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {isSaving ? "Saving..." : isNew ? "Add Team Member" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}