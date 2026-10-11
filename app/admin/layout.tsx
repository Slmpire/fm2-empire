// ============================================================
// FM2 EMPIRE — ADMIN LAYOUT (server component)
// Reads session server-side, passes role to client shell.
// Never "use client" here — session.ts needs server context.
// ============================================================

import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminLayoutShell from "@/components/admin/AdminLayoutShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If no session, middleware handles redirect — but this is
  // a safety net for the login page itself
  if (!session) {
    // Don't redirect if already on login page — middleware
    // allows that through without a session
    return (
      <div
        style={{
          minHeight:       "100vh",
          backgroundColor: "#080808",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          padding:         "1rem",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <AdminLayoutShell role={session.role} name={session.name}>
      {children}
    </AdminLayoutShell>
  );
}