// ============================================================
// FM2 EMPIRE — ADMIN NOTES FORM
// Internal notes on an application — visible only to FM2
// team inside the admin panel. Never shown to applicants.
// Saves to Supabase via /api/admin/update-notes route.
// ============================================================

"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

type Props = {
  applicationId: string;
  initialNotes: string;
};

export default function AdminNotesForm({ applicationId, initialNotes }: Props) {
  const [notes,     setNotes]     = useState(initialNotes ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [error,     setError]     = useState("");

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/admin/update-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: applicationId, notes }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError("Failed to save notes. Try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: "#888880" }}
      >
        Internal Notes
      </label>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add internal notes about this applicant — visible only to the FM2 team..."
        rows={5}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          backgroundColor: "#111111",
          border: "1px solid #2A2A2A",
          borderRadius: "8px",
          color: "#F5F5F0",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          resize: "vertical",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-xs" style={{ color: "#C0392B" }}>{error}</p>
        ) : saved ? (
          <span
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "#27AE60" }}
          >
            <CheckCircle2 size={13} /> Notes saved
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={handleSave}
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "0.5rem 1rem",
            backgroundColor: isLoading ? "#2A2A2A" : "#C9A84C",
            color: isLoading ? "#888880" : "#080808",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading
            ? <Loader2 size={13} className="animate-spin" />
            : <Save size={13} />
          }
          Save Notes
        </button>
      </div>
    </div>
  );
}