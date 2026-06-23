// ============================================================
// FM2 EMPIRE — CONTACT PAGE (route: /contact)
// ============================================================

import type { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with FM2 Empire — questions, partnerships, or service requests.",
};

export default function ContactPage() {
  return <ContactContent />;
}