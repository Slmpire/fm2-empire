// ============================================================
// FM2 EMPIRE — APPLY PAGE (route: /apply)
// One page, four paths. Visitor picks their category first,
// then the matching form loads below without a page reload.
// ============================================================

import type { Metadata } from "next";
import ApplyContent from "@/components/pages/ApplyContent";

export const metadata: Metadata = {
  title: "Apply / Get Involved",
  description:
    "Join FM2 Empire as an artist, intern, creative partner, or service client. Choose your path and apply directly.",
};

export default function ApplyPage() {
  return <ApplyContent />;
}