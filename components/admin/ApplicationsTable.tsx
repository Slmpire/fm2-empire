// ============================================================
// FM2 EMPIRE — APPLICATIONS TABLE
// Sortable, filterable table of all submissions.
// Client component so filters update without page reload.
// ============================================================

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, ArrowUpDown } from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import type { Application } from "@/lib/admin";

const TYPE_LABELS: Record<string, string> = {
  internship:        "Internship",
  talent_enrollment: "Talent",
  service_request:   "Service",
  partnership:       "Partnership",
  collaboration:     "Collaboration",
  sponsorship:       "Sponsorship",
  general_inquiry:   "Inquiry",
  contact:           "Contact",
};

const STATUS_COLOURS: Record<string, string> = {
  new:         "#C9A84C",
  reviewing:   "#3498DB",
  shortlisted: "#9B59B6",
  approved:    "#27AE60",
  rejected:    "#C0392B",
  on_hold:     "#888880",
};

const ALL_TYPES = [
  "all",
  "internship",
  "talent_enrollment",
  "service_request",
  "partnership",
  "collaboration",
  "sponsorship",
  "general_inquiry",
];

const ALL_STATUSES = [
  "all",
  "new",
  "reviewing",
  "shortlisted",
  "approved",
  "rejected",
  "on_hold",
];

type Props = {
  applications: Application[];
  initialType?: string;
};

export default function ApplicationsTable({ applications, initialType = "all" }: Props) {
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField,  setSortField]  = useState<"submitted_at" | "full_name">("submitted_at");
  const [sortDir,    setSortDir]    = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let result = [...applications];

    if (typeFilter !== "all")
      result = result.filter((a) => a.type === typeFilter);
    if (statusFilter !== "all")
      result = result.filter((a) => a.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.full_name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.organisation ?? "").toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      const cmp  = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [applications, typeFilter, statusFilter, search, sortField, sortDir]);

  const toggleSort = (field: "submitted_at" | "full_name") => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filterBtnStyle = (active: boolean) => ({
    padding: "0.375rem 0.875rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 500,
    cursor: "pointer",
    border: `1px solid ${active ? "#C9A84C" : "#2A2A2A"}`,
    backgroundColor: active ? "rgba(201,168,76,0.1)" : "#1A1A1A",
    color: active ? "#C9A84C" : "#888880",
    whiteSpace: "nowrap" as const,
  });

  return (
    <div className="flex flex-col gap-5">

      {/* Search + status filters */}
      <div className="flex flex-col gap-3">
        <div className="relative max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#888880" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
            style={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #2A2A2A",
              color: "#F5F5F0",
              outline: "none",
            }}
          />
        </div>

        {/* Type filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ALL_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              style={filterBtnStyle(typeFilter === t)}
            >
              {t === "all" ? "All Types" : (TYPE_LABELS[t] ?? t)}
            </button>
          ))}
        </div>

        {/* Status filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={filterBtnStyle(statusFilter === s)}
            >
              {s === "all" ? "All Statuses" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs" style={{ color: "#888880" }}>
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>

      {/* Table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "#2A2A2A" }}
      >
        {filtered.length === 0 ? (
          <p className="text-sm text-center py-12" style={{ color: "#888880" }}>
            No submissions match your filters.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2A2A2A", backgroundColor: "#111111" }}>
                {[
                  { label: "Name", field: "full_name" as const },
                  { label: "Type", field: null },
                  { label: "Status", field: null },
                  { label: "Date", field: "submitted_at" as const },
                  { label: "", field: null },
                ].map(({ label, field }) => (
                  <th
                    key={label}
                    onClick={field ? () => toggleSort(field) : undefined}
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#888880",
                      cursor: field ? "pointer" : "default",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {label}
                      {field && <ArrowUpDown size={11} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, index) => (
                <tr
                  key={app.id}
                  style={{
                    borderBottom:
                      index < filtered.length - 1 ? "1px solid #2A2A2A" : "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#F5F5F0" }}>
                        {app.full_name}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#888880" }}>
                        {app.email}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#888880" }}>
                      {TYPE_LABELS[app.type] ?? app.type}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.625rem",
                        borderRadius: "9999px",
                        textTransform: "capitalize",
                        backgroundColor: `${STATUS_COLOURS[app.status] ?? "#888880"}20`,
                        color: STATUS_COLOURS[app.status] ?? "#888880",
                        border: `1px solid ${STATUS_COLOURS[app.status] ?? "#888880"}40`,
                      }}
                    >
                      {app.status.replace("_", " ")}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#888880", whiteSpace: "nowrap" }}>
                      {formatDate(app.submitted_at, { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <Link
                      href={`/admin/applications/${app.id}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        color: "#C9A84C",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      View <ArrowRight size={12} />
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