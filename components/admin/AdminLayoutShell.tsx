// ============================================================
// FM2 EMPIRE — ADMIN LAYOUT SHELL (client component)
// Receives role + name from the server layout.
// Handles the sidebar + header + main content layout.
// Login page gets a clean centered layout via pathname check.
// ============================================================

"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import type { AdminRole } from "@/lib/rbac";

type Props = {
  children: React.ReactNode;
  role:     AdminRole;
  name:     string;
};

export default function AdminLayoutShell({ children, role, name }: Props) {
  const pathname = usePathname();
  const isLogin  = pathname === "/admin/login";

  if (isLogin) {
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
    <div
      style={{
        display:         "flex",
        minHeight:       "100vh",
        backgroundColor: "#080808",
      }}
    >
      <AdminSidebar role={role} name={name} />
      <div
        style={{
          flex:      1,
          display:   "flex",
          flexDirection: "column",
          minWidth:  0,
          overflow:  "hidden",
        }}
      >
        <AdminHeader />
        <main
          style={{
            flex:       1,
            padding:    "2rem",
            overflowY:  "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}