import type { Metadata } from "next";
import { adminGetAllEvents } from "@/lib/cms";
import AdminEventsManager from "@/components/admin/AdminEventsManager";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = { title: "Events" };

export default async function AdminEventsPage() {
  let events: Awaited<ReturnType<typeof adminGetAllEvents>> = [];

  try {
    events = await adminGetAllEvents();
  } catch {
    return <div style={{ color: "#C0392B" }}>Failed to load events. Check your Supabase service role key.</div>;
  }

  return <AdminEventsManager initialEvents={events} />;
}
