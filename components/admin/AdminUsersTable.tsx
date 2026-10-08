// ============================================================
// FM2 EMPIRE — ADMIN USERS TABLE
// Only visible to super_admin in Settings.
// Lists all admin users with their role and status.
// Allows role changes and deactivating users.
// ============================================================

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ROLE_LABELS, ROLE_COLOURS } from "@/lib/rbac";
import type { AdminRole } from "@/lib/rbac";

type AdminUser = {
  id:         string;
  name:       string;
  email:      string;
  role:       string;
  is_active:  boolean;
  created_at: string;
};

const ROLE_OPTIONS: AdminRole[] = [
  "super_admin",
  "admin",
  "reviewer",
  "events_manager",
  "media_manager",
  "read_only",
];

export default function AdminUsersTable({
  users,
  currentUserId,
}: {
  users:         AdminUser[];
  currentUserId: string;
}) {
  const [updating, setUpdating] = useState<string | null>(null);
  const [error,    setError]    = useState("");

  const handleRoleChange = async (userId: string, newRole: AdminRole) => {
    setUpdating(userId);
    setError("");
    try {
      const res  = await fetch("/api/admin/update-user-role", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update role");
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUpdating(null);
    }
  };

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    setUpdating(userId);
    setError("");
    try {
      const res  = await fetch("/api/admin/update-user-role", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ userId, is_active: !isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update user");
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      {error && (
        <p style={{ padding: "0.75rem 1.25rem", fontSize: "0.813rem", color: "#C0392B", borderBottom: "1px solid #2A2A2A" }}>
          {error}
        </p>
      )}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2A2A2A", backgroundColor: "#111111" }}>
              {["Name", "Email", "Role", "Status", ""].map((h) => (
                <th key={h} style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888880" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const isCurrentUser = user.id === currentUserId;
              const isUpdating    = updating === user.id;
              const role          = user.role as AdminRole;

              return (
                <tr key={user.id} style={{ borderBottom: index < users.length - 1 ? "1px solid #2A2A2A" : "none" }}>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#F5F5F0" }}>{user.name}</span>
                      {isCurrentUser && <span style={{ fontSize: "0.65rem", color: "#C9A84C" }}>You</span>}
                    </div>
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "#888880" }}>{user.email}</span>
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    {isCurrentUser ? (
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "4px", backgroundColor: `${ROLE_COLOURS[role]}18`, color: ROLE_COLOURS[role], border: `1px solid ${ROLE_COLOURS[role]}35` }}>
                        {ROLE_LABELS[role]}
                      </span>
                    ) : (
                      <select
                        value={user.role}
                        disabled={isUpdating}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as AdminRole)}
                        style={{ padding: "0.25rem 0.5rem", backgroundColor: "#111111", border: "1px solid #2A2A2A", borderRadius: "6px", color: ROLE_COLOURS[role] ?? "#F5F5F0", fontSize: "0.75rem", cursor: "pointer", outline: "none" }}
                      >
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: user.is_active ? "#27AE60" : "#C0392B" }}>
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    {!isCurrentUser && (
                      <button
                        onClick={() => handleToggleActive(user.id, user.is_active)}
                        disabled={isUpdating}
                        style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.625rem", borderRadius: "6px", border: "none", cursor: isUpdating ? "not-allowed" : "pointer", backgroundColor: user.is_active ? "rgba(192,57,43,0.1)" : "rgba(39,174,96,0.1)", color: user.is_active ? "#C0392B" : "#27AE60" }}
                      >
                        {isUpdating ? <Loader2 size={12} className="animate-spin" /> : null}
                        {user.is_active ? "Deactivate" : "Activate"}
                      </button>
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