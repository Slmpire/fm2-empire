// ============================================================
// FM2 EMPIRE — ADMIN MEDIA PAGE
// Now reads from Supabase instead of lib/data.ts.
// Each item links to its edit page. Add button at top.
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ExternalLink, Pencil } from "lucide-react";
import { adminGetAllMedia } from "@/lib/cms";

export const metadata: Metadata = { title: "Media" };

const TYPE_COLOURS: Record<string, string> = {
  music:   "#C9A84C",
  video:   "#3498DB",
  podcast: "#9B59B6",
  series:  "#E67E22",
  show:    "#1ABC9C",
  photo:   "#27AE60",
};

export default async function AdminMediaPage() {
  let mediaItems: Awaited<ReturnType<typeof adminGetAllMedia>> = [];

  try {
    mediaItems = await adminGetAllMedia();
  } catch {
    return (
      <div style={{ color: "#C0392B" }}>
        Failed to load media. Check your Supabase service role key.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="font-bold text-xl mb-1"
            style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}
          >
            Media Library
          </h2>
          <p className="text-sm" style={{ color: "#888880" }}>
            {mediaItems.length} item{mediaItems.length !== 1 ? "s" : ""} — click any row to edit, or add a new one.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/media"
            target="_blank"
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
            style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", color: "#888880" }}
          >
            <ExternalLink size={13} /> View Public
          </Link>
          <Link
            href="/admin/media/new"
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: "#C9A84C", color: "#080808" }}
          >
            <Plus size={13} /> Add Media
          </Link>
        </div>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "#2A2A2A" }}
      >
        {mediaItems.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ color: "#888880", fontSize: "0.875rem", marginBottom: "1rem" }}>
              No media items yet.
            </p>
            <Link
              href="/admin/media/new"
              style={{
                display:         "inline-flex",
                alignItems:      "center",
                gap:             "6px",
                padding:         "0.625rem 1.25rem",
                backgroundColor: "#C9A84C",
                borderRadius:    "8px",
                color:           "#080808",
                fontSize:        "0.813rem",
                fontWeight:      700,
                textDecoration:  "none",
              }}
            >
              <Plus size={14} /> Add Your First Media Item
            </Link>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2A2A2A", backgroundColor: "#111111" }}>
                {["#", "Title", "Type", "Premium", "Status", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding:       "0.75rem 1rem",
                      textAlign:     "left",
                      fontSize:      "0.7rem",
                      fontWeight:    600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color:         "#888880",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mediaItems.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: index < mediaItems.length - 1 ? "1px solid #2A2A2A" : "none",
                  }}
                >
                  <td style={{ padding: "0.875rem 1rem", color: "#888880", fontSize: "0.75rem" }}>
                    {item.sort_order}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {item.thumbnail_url && (
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          style={{
                            width:        "48px",
                            height:       "30px",
                            objectFit:    "cover",
                            borderRadius: "4px",
                            border:       "1px solid #2A2A2A",
                            flexShrink:   0,
                          }}
                        />
                      )}
                      <div>
                        <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 500, color: "#F5F5F0" }}>
                          {item.title}
                        </p>
                        {item.duration && (
                          <p style={{ margin: 0, fontSize: "0.7rem", color: "#888880" }}>
                            {item.duration}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span
                      style={{
                        fontSize:        "0.7rem",
                        fontWeight:      600,
                        textTransform:   "capitalize",
                        color:           TYPE_COLOURS[item.type] ?? "#888880",
                        backgroundColor: `${TYPE_COLOURS[item.type] ?? "#888880"}15`,
                        padding:         "0.2rem 0.5rem",
                        borderRadius:    "4px",
                      }}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.8rem", color: item.is_premium ? "#C9A84C" : "#888880" }}>
                    {item.is_premium ? "Yes" : "No"}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span
                      style={{
                        fontSize:        "0.7rem",
                        fontWeight:      600,
                        color:           item.is_published ? "#27AE60" : "#C0392B",
                        backgroundColor: item.is_published ? "rgba(39,174,96,0.1)" : "rgba(192,57,43,0.1)",
                        padding:         "0.2rem 0.5rem",
                        borderRadius:    "4px",
                      }}
                    >
                      {item.is_published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Link
                      href={`/admin/media/${item.id}/edit`}
                      style={{
                        display:    "flex",
                        alignItems: "center",
                        gap:        "4px",
                        fontSize:   "0.75rem",
                        color:      "#C9A84C",
                        textDecoration: "none",
                      }}
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}