// ============================================================
// FM2 EMPIRE — ADMIN APPLICATIONS LIST
// Shows all submissions with filters and search.
// ============================================================

import type { Metadata } from "next";
import { getApplications } from "@/lib/admin";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

export const metadata: Metadata = { title: "Applications" };

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string }>;
}) {
  const params = await searchParams;

  let applications;
  try {
    applications = await getApplications();
  } catch {
    return (
      <div style={{ color: "#C0392B" }}>
        Failed to load applications. Check your Supabase service role key.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2
          className="font-bold text-xl mb-1"
          style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}
        >
          All Submissions
        </h2>
        <p className="text-sm" style={{ color: "#888880" }}>
          Every application, enrollment, service request, and inquiry in one place.
        </p>
      </div>

      <ApplicationsTable
        applications={applications}
        initialType={params.type ?? "all"}
      />
    </div>
  );
}