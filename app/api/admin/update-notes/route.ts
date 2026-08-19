// ============================================================
// FM2 EMPIRE — UPDATE APPLICATION NOTES API ROUTE
// Server-side only. Uses service role key to bypass RLS.
// Called by AdminNotesForm component.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { updateApplicationNotes } from "@/lib/admin";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
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
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, notes } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await updateApplicationNotes(id, notes ?? "");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update notes error:", error);
    return NextResponse.json(
      { error: "Failed to save notes" },
      { status: 500 }
    );
  }
}