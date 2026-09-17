// ============================================================
// FM2 EMPIRE — CMS EVENT EDITOR FORM
// Create and edit events from the admin panel.
// No code knowledge needed.
// ============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Trash2, Plus, X } from "lucide-react";
import type { CMSEvent } from "@/lib/cms";

type Props = {
  item?: CMSEvent;
  isNew?: boolean;
};

const STATUS_OPTIONS = [
  { label: "Upcoming",  value: "upcoming" },
  { label: "Ongoing",   value: "ongoing" },
  { label: "Past",      value: "past" },
  { label: "Cancelled", value: "cancelled" },
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

export default function CMSEventForm({ item, isNew = false }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    slug:             item?.slug             ?? "",
    title:            item?.title            ?? "",
    description:      item?.description      ?? "",
    long_description: item?.long_description ?? "",
    date:             item?.date?.slice(0, 10) ?? "",
    time:             item?.time             ?? "",
    venue:            item?.venue            ?? "",
    address:          item?.address          ?? "",
    city:             item?.city             ?? "Lagos",
    image_url:        item?.image_url        ?? "",
    ticket_price:     item?.ticket_price     ?? 0,
    ticket_url:       item?.ticket_url       ?? "",
    status:           item?.status           ?? "upcoming",
    is_featured:      item?.is_featured      ?? false,
    organiser:        item?.organiser        ?? "FM2 Empire",
    is_third_party:   item?.is_third_party   ?? false,
    lineup:           item?.lineup           ?? [],
  });

  const [lineupInput, setLineupInput] = useState("");
  const [isSaving,    setIsSaving]    = useState(false);
  const [isDeleting,  setIsDeleting]  = useState(false);
  const [error,       setError]       = useState("");
  const [success,     setSuccess]     = useState("");

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addLineupItem = () => {
    if (!lineupInput.trim()) return;
    set("lineup", [...(form.lineup ?? []), lineupInput.trim()]);
    setLineupInput("");
  };

  const removeLineupItem = (index: number) => {
    set("lineup", (form.lineup ?? []).filter((_, i) => i !== index));
  };

  // Auto-generate slug from title
  const autoSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.date)          { setError("Date is required"); return; }
    if (!form.slug.trim())   { setError("Slug is required"); return; }

    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/cms/events", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, id: item?.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");

      setSuccess(isNew ? "Event created successfully." : "Changes saved successfully.");
      if (isNew) setTimeout(() => router.push("/admin/events"), 1200);
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
      const res = await fetch("/api/admin/cms/events", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: item.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete");
      router.push("/admin/events");
    } catch (err) {
      setError((err as Error).message);
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "12px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "720px" }}>

      {/* Basic Info */}
      <p style={sectionLabel}>Basic Information</p>

      <div>
        <label style={labelStyle}>Event Title <span style={{ color: "#C9A84C" }}>*</span></label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => {
            set("title", e.target.value);
            if (isNew) set("slug", autoSlug(e.target.value));
          }}
          placeholder="e.g. FM2 Empire Showcase 2026"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>
          URL Slug <span style={{ color: "#C9A84C" }}>*</span>
        </label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => set("slug", autoSlug(e.target.value))}
          placeholder="fm2-empire-showcase-2026"
          style={inputStyle}
        />
        <span style={helperStyle}>
          Auto-generated from the title. This becomes the event URL: /events/<strong>{form.slug || "your-slug"}</strong>
        </span>
      </div>

      <div>
        <label style={labelStyle}>Short Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="One-paragraph description shown on event cards..."
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div>
        <label style={labelStyle}>Full Description</label>
        <textarea
          value={form.long_description}
          onChange={(e) => set("long_description", e.target.value)}
          placeholder="Full event description shown on the event detail page..."
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {/* Date & Time */}
      <p style={sectionLabel}>Date & Time</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Date <span style={{ color: "#C9A84C" }}>*</span></label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Time</label>
          <input type="text" value={form.time} onChange={(e) => set("time", e.target.value)} placeholder="e.g. 6:00 PM" style={inputStyle} />
        </div>
      </div>

      {/* Location */}
      <p style={sectionLabel}>Location</p>

      <div>
        <label style={labelStyle}>Venue Name</label>
        <input type="text" value={form.venue} onChange={(e) => set("venue", e.target.value)} placeholder="e.g. Eko Convention Centre" style={inputStyle} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Street Address</label>
          <input type="text" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="e.g. Plot 1415, Victoria Island" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>City</label>
          <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Lagos" style={inputStyle} />
        </div>
      </div>

      {/* Media */}
      <p style={sectionLabel}>Media</p>

      <div>
        <label style={labelStyle}>Event Image URL</label>
        <input type="url" value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://..." style={inputStyle} />
        <span style={helperStyle}>Paste a direct image URL. Recommended: wide/landscape format (16:9).</span>
        {form.image_url && (
          <img src={form.image_url} alt="Preview" style={{ marginTop: "0.75rem", width: "100%", maxWidth: "320px", aspectRatio: "16/9", objectFit: "cover", borderRadius: "8px", border: "1px solid #2A2A2A" }} />
        )}
      </div>

      {/* Ticketing */}
      <p style={sectionLabel}>Ticketing</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Ticket Price (₦)</label>
          <input type="number" value={form.ticket_price} onChange={(e) => set("ticket_price", Number(e.target.value))} min={0} placeholder="0 = Free" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>External Ticket URL</label>
          <input type="url" value={form.ticket_url ?? ""} onChange={(e) => set("ticket_url", e.target.value)} placeholder="https://... (leave blank to use built-in checkout)" style={inputStyle} />
        </div>
      </div>

      {/* Settings */}
      <p style={sectionLabel}>Settings</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Status</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value)} style={inputStyle}>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Organiser</label>
          <input type="text" value={form.organiser ?? ""} onChange={(e) => set("organiser", e.target.value)} placeholder="FM2 Empire" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} style={{ width: "1rem", height: "1rem", accentColor: "#C9A84C" }} />
          <span style={{ fontSize: "0.875rem", color: "#F5F5F0" }}>Featured Event</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input type="checkbox" checked={form.is_third_party} onChange={(e) => set("is_third_party", e.target.checked)} style={{ width: "1rem", height: "1rem", accentColor: "#C9A84C" }} />
          <span style={{ fontSize: "0.875rem", color: "#F5F5F0" }}>Partner / Third-Party Event</span>
        </label>
      </div>

      {/* Lineup */}
      <p style={sectionLabel}>Lineup (Optional)</p>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <input
          type="text"
          value={lineupInput}
          onChange={(e) => setLineupInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLineupItem())}
          placeholder="Add a performer or act..."
          style={{ ...inputStyle, flex: 1 }}
        />
        <button
          type="button"
          onClick={addLineupItem}
          style={{ padding: "0 1rem", backgroundColor: "#C9A84C", border: "none", borderRadius: "8px", color: "#080808", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontWeight: 700, fontSize: "0.813rem", whiteSpace: "nowrap" }}
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {(form.lineup ?? []).length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {(form.lineup ?? []).map((act, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0.75rem", backgroundColor: "#111111", borderRadius: "6px", border: "1px solid #2A2A2A" }}>
              <span style={{ fontSize: "0.875rem", color: "#F5F5F0" }}>{act}</span>
              <button onClick={() => removeLineupItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888880", display: "flex" }}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Feedback */}
      {error   && <p style={{ fontSize: "0.813rem", color: "#C0392B", margin: 0 }}>{error}</p>}
      {success && <p style={{ fontSize: "0.813rem", color: "#27AE60", margin: 0 }}>{success}</p>}

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid #2A2A2A" }}>
        {!isNew && item ? (
          <button onClick={handleDelete} disabled={isDeleting}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.625rem 1rem", backgroundColor: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "8px", color: "#C0392B", fontSize: "0.813rem", fontWeight: 600, cursor: isDeleting ? "not-allowed" : "pointer" }}>
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete
          </button>
        ) : <span />}

        <button onClick={handleSave} disabled={isSaving}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.75rem 1.5rem", backgroundColor: isSaving ? "#888880" : "#C9A84C", border: "none", borderRadius: "8px", color: "#080808", fontSize: "0.875rem", fontWeight: 700, cursor: isSaving ? "not-allowed" : "pointer" }}>
          {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {isSaving ? "Saving..." : isNew ? "Create Event" : "Save Changes"}
        </button>
      </div>

    </div>
  );
}