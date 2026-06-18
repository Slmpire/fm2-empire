// ============================================================
// FM2 EMPIRE — ROOT PAGE
// Redirects the root URL "/" to the marketing landing page.
// This pattern keeps the app router clean — the marketing
// layout lives in app/(marketing)/ as its own route group,
// which later lets us add /admin, /dashboard, /portal as
// completely separate layouts without any interference.
// ============================================================

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/");
}