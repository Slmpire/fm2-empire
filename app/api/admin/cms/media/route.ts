// ============================================================
// FM2 EMPIRE — CMS MEDIA API ROUTE
// POST: create or update a media item
// DELETE: remove a media item
// Both require an authenticated admin session.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { adminSaveMedia, adminDeleteMedia } from "@/lib/cms";

async function getSession() {
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
  return session;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    // Clean up empty strings to null
    const cleaned = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, v === "" ? null : v])
    );

    const item = await adminSaveMedia(cleaned, id);
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("CMS media save error:", error);
    return NextResponse.json(
      { error: "Failed to save media item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await adminDeleteMedia(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CMS media delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete media item" },
      { status: 500 }
    );
  }
}