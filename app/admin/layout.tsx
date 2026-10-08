// ============================================================
// FM2 EMPIRE — ADMIN LAYOUT (role-aware)
// Reads the admin session server-side and passes role + name
// to the sidebar so it can filter nav items appropriately.
// Redirects to login if session is missing.
// ============================================================

"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import type { AdminRole } from "@/lib/rbac";

type Props = {
  children:  React.ReactNode;
  role:      AdminRole;
  name:      string;
};

function AdminShell({ children, role, name }: Props) {
  const pathname = usePathname();
  const isLogin  = pathname === "/admin/login";

  if (isLogin) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#080808", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#080808" }}>
      <AdminSidebar role={role} name={name} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// The actual layout export — server component reads session
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Get the current path from headers to allow login page through
  const { headers } = await import("next/headers");
  const headersList = await headers();
  const pathname    = headersList.get("x-pathname") ?? "";

  // Allow login page without session
  if (pathname === "/admin/login") {
    return (
      <html lang="en">
        <body style={{ margin: 0, backgroundColor: "#080808", fontFamily: "Arial, sans-serif" }}>
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            {children}
          </div>
        </body>
      </html>
    );
  }

  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#080808", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <AdminSidebar role={session.role} name={session.name} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
            <AdminHeader />
            <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}