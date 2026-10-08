// ============================================================
// FM2 EMPIRE — SESSION HELPER
// Gets the current admin user's role from the database.
// Used by server components and API routes to check permissions
// before rendering or allowing actions.
// ============================================================

import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import type { AdminRole } from "@/lib/rbac";

export type AdminSession = {
  userId:    string;
  email:     string;
  name:      string;
  role:      AdminRole;
  isActive:  boolean;
};

// ------------------------------------------------------------
// GET CURRENT ADMIN SESSION
// Call this at the top of any admin server component or
// API route that needs to know who is logged in and what
// role they have.
// Returns null if not authenticated or not in admin_users.
// ------------------------------------------------------------

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const supabase    = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    // Get the admin_users record for this user
    const adminClient = createAdminClient();
    const { data: adminUser, error } = await adminClient
      .from("admin_users")
      .select("id, name, email, role, is_active")
      .eq("id", session.user.id)
      .single();

    if (error || !adminUser) return null;
    if (!adminUser.is_active)  return null;

    return {
      userId:   adminUser.id,
      email:    adminUser.email,
      name:     adminUser.name,
      role:     adminUser.role as AdminRole,
      isActive: adminUser.is_active,
    };
  } catch {
    return null;
  }
}