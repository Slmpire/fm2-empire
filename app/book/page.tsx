// ============================================================
// FM2 EMPIRE — BOOKING PAGE (route: /book)
// Embeds Cal.com directly in the page so visitors can book
// a call without leaving the FM2 site.
// Two event types: Discovery Call (30min) and Project
// Consultation (60min). Toggle between them at the top.
// ============================================================

import type { Metadata } from "next";
import BookingContent from "@/components/pages/BookingContent";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Schedule a call with the FM2 Empire team — discovery calls and project consultations available.",
};

export default function BookPage() {
  return <BookingContent />;
}