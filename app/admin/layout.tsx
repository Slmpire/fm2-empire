// ============================================================
// FM2 EMPIRE — ADMIN LAYOUT
// No html/body tags here — those live in the root layout.
// This just adds the sidebar + header shell around admin pages.
// Login page gets no sidebar — handled via pathname check.
// ============================================================

"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin  = pathname === "/admin/login";

  // Login page gets a clean centered layout — no sidebar
  if (isLogin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#080808",
      }}
    >
      <AdminSidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <AdminHeader />
        <main
          style={{
            flex: 1,
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}