// ============================================================
// FM2 EMPIRE — APPLICATION STATUS PAGE (route: /status)
// Applicants enter the email they applied with to see where
// their application currently stands in the FM2 pipeline.
// No login needed — just their email address.
// ============================================================

import type { Metadata } from "next";
import StatusContent from "@/components/pages/StatusContent";

export const metadata: Metadata = {
  title: "Check Application Status",
  description:
    "Check the current status of your FM2 Empire application by entering your email address.",
};

export default function StatusPage() {
  return <StatusContent />;
}