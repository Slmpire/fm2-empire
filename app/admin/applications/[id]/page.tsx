// ============================================================
// FM2 EMPIRE — APPLICATION DETAIL PAGE
// Full view of a single application. Shows every submitted
// field, pipeline stage selector, and internal notes form.
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Globe, Calendar } from "lucide-react";
import { getApplication } from "@/lib/admin";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import PipelineSelect from "@/components/admin/PipelineSelect";
import AdminNotesForm from "@/components/admin/AdminNotesForm";

export const metadata: Metadata = { title: "Application Detail" };

const TYPE_LABELS: Record<string, string> = {
  internship:        "Internship Application",
  talent_enrollment: "Talent Enrollment",
  service_request:   "Service Request",
  partnership:       "Partnership Proposal",
  collaboration:     "Collaboration Request",
  sponsorship:       "Sponsorship Inquiry",
  general_inquiry:   "General Inquiry",
  contact:           "Contact Form",
};

function DataRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div
      className="flex flex-col gap-1 py-3 border-b"
      style={{ borderColor: "#2A2A2A" }}
    >
      <span
        className="text-xs font-semibold tracking-wide uppercase"
        style={{ color: "#888880" }}
      >
        {label}
      </span>
      <span className="text-sm leading-relaxed" style={{ color: "#F5F5F0" }}>
        {value}
      </span>
    </div>
  );
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplication(id);

  if (!application) notFound();

  const data = application.data as Record<string, string>;

  return (
    <div className="flex flex-col gap-6 max-w-5xl">

      {/* Back link */}
      <Link
        href="/admin/applications"
        className="flex items-center gap-2 text-sm w-fit transition-colors duration-150"
        style={{ color: "#888880" }}
      >
        <ArrowLeft size={15} /> Back to Applications
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#C9A84C" }}
          >
            {TYPE_LABELS[application.type] ?? application.type}
          </span>
          <h1
            className="font-bold text-2xl"
            style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}
          >
            {application.full_name}
          </h1>
          <span className="text-sm flex items-center gap-1.5" style={{ color: "#888880" }}>
            <Calendar size={13} />
            Submitted {formatDate(application.submitted_at)}
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — submission data */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Contact info */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: "#F5F5F0" }}>
              Contact Information
            </h2>

            <div className="flex flex-col gap-3">
              
              <a  href={`mailto:${application.email}`}
                className="flex items-center gap-3 text-sm"
                style={{ color: "#C9A84C" }}
              >
                <Mail size={14} /> {application.email}
              </a>

              {application.phone && (
                
                 <a  href={`tel:${application.phone}`}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "#888880" }}
                >
                  <Phone size={14} /> {application.phone}
                </a>
              )}

              {application.organisation && (
                <span className="flex items-center gap-3 text-sm" style={{ color: "#888880" }}>
                  <Globe size={14} /> {application.organisation}
                </span>
              )}
            </div>
          </div>

          {/* Submission fields */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
          >
            <h2 className="text-sm font-semibold mb-2" style={{ color: "#F5F5F0" }}>
              Submission Details
            </h2>

            {/* Common fields */}
            <DataRow label="Subject"      value={application.subject} />
            <DataRow label="Message"      value={application.message} />

            {/* Type-specific fields from data JSONB */}
            <DataRow label="University"         value={data?.university} />
            <DataRow label="Course"             value={data?.course} />
            <DataRow label="Level"              value={data?.year} />
            <DataRow label="Department"         value={data?.department} />
            <DataRow label="Stage Name"         value={data?.stageName} />
            <DataRow label="Category"           value={data?.category} />
            <DataRow label="Genre / Niche"      value={data?.genre} />
            <DataRow label="City"               value={data?.city} />
            <DataRow label="Service Needed"     value={data?.serviceNeeded} />
            <DataRow label="Budget"             value={data?.budget} />
            <DataRow label="Timeline"           value={data?.timeline} />
            <DataRow label="Referral Source"    value={data?.referralSource} />
            <DataRow label="Website"            value={data?.website} />

            {/* Bio / Cover Letter */}
            {data?.bio && (
              <div
                className="flex flex-col gap-1 py-3 border-b"
                style={{ borderColor: "#2A2A2A" }}
              >
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "#888880" }}
                >
                  Bio
                </span>
                <p className="text-sm leading-7 whitespace-pre-wrap" style={{ color: "#F5F5F0" }}>
                  {data.bio}
                </p>
              </div>
            )}

            {data?.coverLetter && (
              <div className="flex flex-col gap-1 py-3">
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "#888880" }}
                >
                  Cover Letter
                </span>
                <p className="text-sm leading-7 whitespace-pre-wrap" style={{ color: "#F5F5F0" }}>
                  {data.coverLetter}
                </p>
              </div>
            )}

            {/* Project description */}
            {data?.projectDescription && (
              <div className="flex flex-col gap-1 py-3">
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "#888880" }}
                >
                  Project Description
                </span>
                <p className="text-sm leading-7 whitespace-pre-wrap" style={{ color: "#F5F5F0" }}>
                  {data.projectDescription}
                </p>
              </div>
            )}
          </div>

          {/* Links */}
          {(data?.portfolioUrl || data?.resumeUrl || data?.instagram ||
            data?.youtube || data?.spotify || data?.tiktok) && (
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
            >
              <h2 className="text-sm font-semibold mb-4" style={{ color: "#F5F5F0" }}>
                Links & Social
              </h2>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Portfolio",  url: data?.portfolioUrl },
                  { label: "CV / Resume", url: data?.resumeUrl },
                  { label: "Instagram",  url: data?.instagram },
                  { label: "YouTube",    url: data?.youtube },
                  { label: "Spotify",    url: data?.spotify },
                  { label: "TikTok",     url: data?.tiktok },
                  { label: "Website",    url: data?.website },
                ]
                  .filter((l) => l.url)
                  .map((link) => (
                    
                    <a  key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm transition-colors duration-150"
                      style={{ color: "#C9A84C" }}
                    >
                      <Globe size={13} />
                      {link.label}: {link.url}
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — actions */}
        <div className="flex flex-col gap-5">

          {/* Pipeline stage */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
          >
            <PipelineSelect
              applicationId={application.id}
              currentStatus={application.status}
            />
          </div>

          {/* Internal notes */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
          >
            <AdminNotesForm
              applicationId={application.id}
              initialNotes={application.notes ?? ""}
            />
          </div>

          {/* Quick actions */}
          <div
            className="rounded-xl border p-5 flex flex-col gap-3"
            style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
          >
            <h3
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#888880" }}
            >
              Quick Actions
            </h3>
            
            <a  href={`mailto:${application.email}`}
              style={{
                display: "block",
                padding: "0.625rem 1rem",
                backgroundColor: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "8px",
                color: "#C9A84C",
                fontSize: "0.813rem",
                fontWeight: 600,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              ✉ Email Applicant
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}