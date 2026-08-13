// ============================================================
// FM2 EMPIRE — SUPABASE CLIENT
// Two separate clients for two separate use cases:
//
// supabase (anon key) — used in browser/client components.
//   Safe to expose publicly. RLS policies on the database
//   enforce what the anon key can and cannot do — currently
//   INSERT only on the applications table.
//
// createAdminClient() — uses the service role key.
//   SERVER SIDE ONLY. Never import in client components.
//   Used in /api/ routes for the admin panel.
//   Bypasses RLS — full read/write access.
// ============================================================

import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    "Missing Supabase environment variables. " +
    "Check your .env file and restart the dev server."
  );
}

// Public client — safe in browser and server components
export const supabase = createClient(supabaseUrl, supabaseAnon);

// Admin client factory — SERVER SIDE ONLY
// Call this inside API route handlers, never in components
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. " +
      "Add it to your .env file (server-side only, never NEXT_PUBLIC_)."
    );
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}