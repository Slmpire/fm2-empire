// ============================================================
// FM2 EMPIRE — ADMIN MEDIA PAGE
// Lists all media items from lib/data.ts.
// Full upload/edit via Supabase + Cloudinary comes later.
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Music, Film, Mic, Image as ImageIcon } from "lucide-react";
import { mediaItems } from "@/lib/data";
import type { MediaType } from "@/types/index";

export const metadata: Metadata = { title: "Media" };

const TYPE_ICONS: Record<MediaType, React.ElementType> = {
  music: Music,
  video: Film,
  podcast: Mic,
  series: Film,
  show: Film,
  photo: ImageIcon,
};

const TYPE_COLOURS: Record<string, string> = {
  music:   "#C9A84C",
  video:   "#3498DB",
  podcast: "#9B59B6",
  series:  "#E67E22",
  show:    "#1ABC9C",
  photo:   "#27AE60",
};

export default function AdminMediaPage() {
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
            All published media items. Edit content in{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{ backgroundColor: "#2A2A2A", color: "#C9A84C" }}
            >
              lib/data.ts
            </code>{" "}
            until the full media CMS is built.
          </p>
        </div>
        <Link
          href="/media"
          target="_blank"
          className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-colors duration-150"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            color: "#888880",
          }}
        >
          <ExternalLink size={13} /> View Library
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {(["music", "video", "podcast", "series", "photo", "show"] as MediaType[]).map((type) => {
          const count = mediaItems.filter((m) => m.type === type).length;
          const Icon = TYPE_ICONS[type];
          return (
            <div
              key={type}
              className="flex flex-col items-center gap-2 p-3 rounded-lg"
              style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}
            >
              <Icon size={16} style={{ color: TYPE_COLOURS[type] ?? "#888880" }} />
              <span className="text-xl font-bold" style={{ color: "#F5F5F0" }}>
                {count}
              </span>
              <span className="text-xs capitalize" style={{ color: "#888880" }}>
                {type}
              </span>
            </div>
          );
        })}
      </div>

      {/* Media list */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "#2A2A2A" }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2A2A2A", backgroundColor: "#111111" }}>
              {["Title", "Type", "Premium", "Published", "Link"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#888880",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mediaItems.map((item, index) => {
              const Icon = TYPE_ICONS[item.type];
              return (
                <tr
                  key={item.id}
                  style={{
                    borderBottom:
                      index < mediaItems.length - 1 ? "1px solid #2A2A2A" : "none",
                  }}
                >
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#F5F5F0" }}>
                        {item.title}
                      </span>
                      {item.duration && (
                        <span style={{ fontSize: "0.75rem", color: "#888880" }}>
                          {item.duration}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span
                      className="flex items-center gap-1.5 text-xs font-medium capitalize"
                      style={{ color: TYPE_COLOURS[item.type] ?? "#888880" }}
                    >
                      <Icon size={12} /> {item.type}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span style={{ fontSize: "0.8rem", color: item.isPremium ? "#C9A84C" : "#888880" }}>
                      {item.isPremium ? "Yes" : "No"}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span style={{ fontSize: "0.8rem", color: item.isPublished ? "#27AE60" : "#C0392B" }}>
                      {item.isPublished ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    {item.externalUrl && (
                      
                       <a href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "#C9A84C" }}
                      >
                        <ExternalLink size={12} /> Open
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}