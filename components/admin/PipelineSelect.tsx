// ============================================================
// FM2 EMPIRE — PIPELINE SELECT
// Dropdown to move an application through stages.
// Updates Supabase via the /api/admin/update-status route.
// Shows a loading state while saving, success confirmation.
// ============================================================

"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const STAGES = [
  { value: "new",         label: "New",         color: "#C9A84C" },
  { value: "reviewing",   label: "Reviewing",   color: "#3498DB" },
  { value: "shortlisted", label: "Shortlisted", color: "#9B59B6" },
  { value: "approved",    label: "Approved",    color: "#27AE60" },
  { value: "rejected",    label: "Rejected",    color: "#C0392B" },
  { value: "on_hold",     label: "On Hold",     color: "#888880" },
];

type Props = {
  applicationId: string;
  currentStatus: string;
};

export default function PipelineSelect({ applicationId, currentStatus }: Props) {
  const [status,    setStatus]    = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [error,     setError]     = useState("");

  const currentStage = STAGES.find((s) => s.value === status);

  const handleChange = async (newStatus: string) => {
    if (newStatus === status) return;
    setIsLoading(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: applicationId, status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update");

      setStatus(newStatus);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError("Failed to update. Try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: "#888880" }}
      >
        Pipeline Stage
      </label>

      <div className="flex items-center gap-3">
        {/* Colour indicator */}
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: currentStage?.color ?? "#888880" }}
        />

        <select
          value={status}
          onChange={(e) => handleChange(e.target.value)}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "0.625rem 0.875rem",
            backgroundColor: "#111111",
            border: `1px solid ${currentStage?.color ?? "#2A2A2A"}40`,
            borderRadius: "8px",
            color: currentStage?.color ?? "#F5F5F0",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            outline: "none",
          }}
        >
          {STAGES.map((stage) => (
            <option key={stage.value} value={stage.value}>
              {stage.label}
            </option>
          ))}
        </select>

        {/* Feedback icon */}
        {isLoading && (
          <Loader2 size={16} className="animate-spin shrink-0" style={{ color: "#888880" }} />
        )}
        {saved && !isLoading && (
          <CheckCircle2 size={16} className="shrink-0" style={{ color: "#27AE60" }} />
        )}
      </div>

      {error && (
        <p className="text-xs" style={{ color: "#C0392B" }}>{error}</p>
      )}
    </div>
  );
}