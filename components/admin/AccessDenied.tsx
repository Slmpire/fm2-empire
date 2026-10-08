// ============================================================
// FM2 EMPIRE — ACCESS DENIED COMPONENT
// Shown when a role tries to access a page or action they
// don't have permission for. Clean, informative, not harsh.
// ============================================================

import Link from "next/link";
import { ShieldX } from "lucide-react";

type Props = {
  message?: string;
};

export default function AccessDenied({
  message = "You don't have permission to access this page.",
}: Props) {
  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        padding:        "4rem 2rem",
        gap:            "1.25rem",
        minHeight:      "400px",
      }}
    >
      <div
        style={{
          width:           "56px",
          height:          "56px",
          borderRadius:    "50%",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          backgroundColor: "rgba(192,57,43,0.1)",
          border:          "1px solid rgba(192,57,43,0.3)",
        }}
      >
        <ShieldX size={24} style={{ color: "#C0392B" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h2
          style={{
            margin:     0,
            fontSize:   "1.25rem",
            fontWeight: 700,
            color:      "#F5F5F0",
            fontFamily: "Georgia, serif",
          }}
        >
          Access Restricted
        </h2>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#888880", maxWidth: "320px" }}>
          {message}
        </p>
      </div>

      <Link
        href="/admin/dashboard"
        style={{
          display:         "inline-flex",
          alignItems:      "center",
          gap:             "6px",
          padding:         "0.625rem 1.25rem",
          backgroundColor: "#1A1A1A",
          border:          "1px solid #2A2A2A",
          borderRadius:    "8px",
          color:           "#F5F5F0",
          fontSize:        "0.813rem",
          fontWeight:      600,
          textDecoration:  "none",
        }}
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}