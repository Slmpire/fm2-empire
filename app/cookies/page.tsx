// ============================================================
// FM2 EMPIRE — COOKIE POLICY PAGE (route: /cookies)
// ============================================================

import type { Metadata } from "next";
import CookiePolicyContent from "@/components/pages/CookiePolicyContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How FM2 Empire uses cookies and how you can control them.",
};

export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}