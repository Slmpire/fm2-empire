// ============================================================
// FM2 EMPIRE — ADMIN ROOT
// Redirects straight to the dashboard.
// ============================================================

import { redirect } from "next/navigation";

export default function AdminRoot() {
  redirect("/admin/dashboard");
}