// ============================================================
// FM2 EMPIRE — ADMIN DASHBOARD
// Overview: total submissions, breakdown by status and type,
// recent activity feed. All data server-fetched on load.
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import {
  Inbox,
  Eye,
  Star,
  CheckCircle2,
  XCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { getDashboardStats } from "@/lib/admin";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

const TYPE_LABELS: Record<string, string> = {
  internship:        "Internship",
  talent_enrollment: "Talent Enrollment",
  service_request:   "Service Request",
  partnership:       "Partnership",
  collaboration:     "Collaboration",
  sponsorship:       "Sponsorship",
  general_inquiry:   "General Inquiry",
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

export default async function DashboardPage() {
  let stats;

  try {
    stats = await getDashboardStats();
  } catch {
    return (
      <div style={{ color: "#C0392B", padding: "2rem" }}>
        Failed to load dashboard data. Check your Supabase service role key.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* ---- STATS ROW ---- */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          label="Total"
          value={stats.total}
          icon={Inbox}
          accent
        />
        <StatsCard label="New"         value={stats.new}         icon={Inbox} />
        <StatsCard label="Reviewing"   value={stats.reviewing}   icon={Eye} />
        <StatsCard label="Shortlisted" value={stats.shortlisted} icon={Star} />
        <StatsCard label="Approved"    value={stats.approved}    icon={CheckCircle2} />
        <StatsCard label="Rejected"    value={stats.rejected}    icon={XCircle} />
      </div>

      {/* ---- CONTENT ROW ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent applications */}
        <div
          className="lg:col-span-2 rounded-xl border"
          style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "#2A2A2A" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#F5F5F0" }}>
              Recent Submissions
            </h2>
            <Link
              href="/admin/applications"
              className="flex items-center gap-1 text-xs transition-colors duration-150"
              style={{ color: "#C9A84C" }}
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex flex-col">
            {stats.recentApplications.length === 0 ? (
              <p className="px-5 py-8 text-sm text-center" style={{ color: "#888880" }}>
                No submissions yet. Share the apply page to get started.
              </p>
            ) : (
              stats.recentApplications.map((app, index) => (
                <Link
                  key={app.id}
                  href={`/admin/applications/${app.id}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors duration-150"
                  style={{
                    borderBottom:
                      index < stats.recentApplications.length - 1
                        ? "1px solid #2A2A2A"
                        : "none",
                  }}
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className="text-sm font-medium truncate"
                      style={{ color: "#F5F5F0" }}
                    >
                      {app.full_name}
                    </span>
                    <span className="text-xs" style={{ color: "#888880" }}>
                      {app.email} &nbsp;·&nbsp;{" "}
                      {TYPE_LABELS[app.type] ?? app.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full capitalize"
                      style={{
                        backgroundColor: `${STATUS_COLOURS[app.status] ?? "#888880"}20`,
                        color: STATUS_COLOURS[app.status] ?? "#888880",
                        border: `1px solid ${STATUS_COLOURS[app.status] ?? "#888880"}40`,
                      }}
                    >
                      {app.status}
                    </span>
                    <span className="text-xs" style={{ color: "#888880" }}>
                      {formatDate(app.submitted_at, { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Submissions by type */}
        <div
          className="rounded-xl border"
          style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
        >
          <div
            className="flex items-center px-5 py-4 border-b"
            style={{ borderColor: "#2A2A2A" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#F5F5F0" }}>
              By Category
            </h2>
          </div>

          <div className="flex flex-col gap-1 p-3">
            {Object.entries(stats.byType).length === 0 ? (
              <p className="px-2 py-6 text-sm text-center" style={{ color: "#888880" }}>
                No data yet
              </p>
            ) : (
              Object.entries(stats.byType)
                .sort(([, a], [, b]) => b - a)
                .map(([type, count]) => (
                  <Link
                    key={type}
                    href={`/admin/applications?type=${type}`}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-2">
                      <Users size={13} style={{ color: "#888880" }} />
                      <span className="text-sm" style={{ color: "#F5F5F0" }}>
                        {TYPE_LABELS[type] ?? type}
                      </span>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(201,168,76,0.1)",
                        color: "#C9A84C",
                      }}
                    >
                      {count}
                    </span>
                  </Link>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}