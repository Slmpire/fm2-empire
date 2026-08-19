// ============================================================
// FM2 EMPIRE — ADMIN LAYOUT
// Wraps every /admin page except /admin/login.
// Sidebar left, main content right.
// Login page gets its own minimal layout via the conditional.
// ============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FM2 Admin",
    template: "%s | FM2 Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ margin: 0, backgroundColor: "#080808", color: "#F5F5F0" }}
      >
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <AdminSidebar />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
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