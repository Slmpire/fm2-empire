// ============================================================
// FM2 EMPIRE — ADMIN DATA FUNCTIONS
// SERVER SIDE ONLY. Uses the service role key to bypass RLS.
// Never import this in client components.
// All functions return typed data ready to render.
// ============================================================

import { createAdminClient } from "@/lib/supabase";

export type Application = {
  id: string;
  type: string;
  status: string;
  full_name: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  subject: string | null;
  message: string | null;
  data: Record<string, unknown>;
  notes: string | null;
  submitted_at: string;
  updated_at: string;
};

export type DashboardStats = {
  total: number;
  new: number;
  reviewing: number;
  shortlisted: number;
  approved: number;
  rejected: number;
  byType: Record<string, number>;
  recentApplications: Application[];
};

// ------------------------------------------------------------
// DASHBOARD STATS
// ------------------------------------------------------------

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) throw error;

  const applications = (data ?? []) as Application[];

  const byStatus = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const byType = applications.reduce(
    (acc, app) => {
      acc[app.type] = (acc[app.type] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    total: applications.length,
    new: byStatus["new"] ?? 0,
    reviewing: byStatus["reviewing"] ?? 0,
    shortlisted: byStatus["shortlisted"] ?? 0,
    approved: byStatus["approved"] ?? 0,
    rejected: byStatus["rejected"] ?? 0,
    byType,
    recentApplications: applications.slice(0, 5),
  };
}

// ------------------------------------------------------------
// GET ALL APPLICATIONS (with optional filters)
// ------------------------------------------------------------

export async function getApplications(filters?: {
  type?: string;
  status?: string;
  search?: string;
}): Promise<Application[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from("applications")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (filters?.type && filters.type !== "all") {
    query = query.eq("type", filters.type);
  }
  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }
  if (filters?.search) {
    query = query.or(
      `full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Application[];
}

// ------------------------------------------------------------
// GET SINGLE APPLICATION
// ------------------------------------------------------------

export async function getApplication(id: string): Promise<Application | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Application;
}

// ------------------------------------------------------------
// UPDATE APPLICATION STATUS
// ------------------------------------------------------------

export async function updateApplicationStatus(
  id: string,
  status: string
): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

// ------------------------------------------------------------
// UPDATE APPLICATION NOTES
// ------------------------------------------------------------

export async function updateApplicationNotes(
  id: string,
  notes: string
): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("applications")
    .update({ notes })
    .eq("id", id);

  if (error) throw error;
}