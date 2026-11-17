import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { adminSetFeaturedEvent } from "@/lib/cms";

async function getSession() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } }
  );
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const item = await adminSetFeaturedEvent(id);

    // Invalidate caches across the app so changes reflect instantly
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Set featured event error:", error);
    return NextResponse.json({ error: "Failed to set featured event" }, { status: 500 });
  }
}
