// ============================================================
// FM2 EMPIRE — UPDATE ADMIN USER ROLE API ROUTE
// Only super_admin can call this.
// Updates role or is_active status of another admin user.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { hasPermission } from "@/lib/rbac";
import { createAdminClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session || !hasPermission(session.role, "manage_admin_users")) {
      return NextResponse.json(
        { error: "Only Super Admins can manage user roles." },
        { status: 403 }
      );
    }

    const { userId, role, is_active } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Prevent super_admin from demoting themselves
    if (userId === session.userId && role && role !== "super_admin") {
      return NextResponse.json(
        { error: "You cannot change your own role." },
        { status: 400 }
      );
    }

    const client  = createAdminClient();
    const updates: Record<string, unknown> = {};

    if (role !== undefined)      updates.role      = role;
    if (is_active !== undefined) updates.is_active = is_active;

    const { error } = await client
      .from("admin_users")
      .update(updates)
      .eq("id", userId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update user role error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}