// ============================================================
// FM2 EMPIRE — ADMIN SETTINGS PAGE (role-aware)
// super_admin sees full user management.
// Others see env status and quick links only.
// ============================================================

import type { Metadata } from "next";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { getAdminSession } from "@/lib/session";
import { hasPermission, ROLE_LABELS, ROLE_COLOURS } from "@/lib/rbac";
import { createAdminClient } from "@/lib/supabase";
import AdminUsersTable from "@/components/admin/AdminUsersTable";

export const metadata: Metadata = { title: "Settings" };

function EnvCheck({ label, value }: { label: string; value: string | undefined }) {
  const isSet = !!value;
  return (
    <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#2A2A2A" }}>
      <span className="text-sm" style={{ color: "#F5F5F0" }}>{label}</span>
      <span className="flex items-center gap-2 text-xs font-medium" style={{ color: isSet ? "#27AE60" : "#C0392B" }}>
        {isSet ? <><CheckCircle2 size={14} /> Configured</> : <><XCircle size={14} /> Not set</>}
      </span>
    </div>
  );
}

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  const canManageUsers = session && hasPermission(session.role, "manage_admin_users");

  // Fetch admin users if super_admin
  let adminUsers: { id: string; name: string; email: string; role: string; is_active: boolean; created_at: string }[] = [];
  if (canManageUsers) {
    const client = createAdminClient();
    const { data } = await client
      .from("admin_users")
      .select("id, name, email, role, is_active, created_at")
      .order("created_at", { ascending: true });
    adminUsers = data ?? [];
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">

      <div>
        <h2 className="font-bold text-xl mb-1" style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}>Settings</h2>
        <p className="text-sm" style={{ color: "#888880" }}>
          Environment configuration, integrations, and team access.
        </p>
      </div>

      {/* Current session info */}
      {session && (
        <div className="rounded-xl border p-5 flex items-center gap-4" style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#C9A84C", fontFamily: "Georgia, serif" }}>
              {session.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold" style={{ color: "#F5F5F0" }}>{session.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "#888880" }}>{session.email}</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: "4px", backgroundColor: `${ROLE_COLOURS[session.role]}18`, color: ROLE_COLOURS[session.role], border: `1px solid ${ROLE_COLOURS[session.role]}35`, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {ROLE_LABELS[session.role]}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Admin user management — super_admin only */}
      {canManageUsers && (
        <div className="rounded-xl border" style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#2A2A2A" }}>
            <h3 className="text-sm font-semibold" style={{ color: "#F5F5F0" }}>Team Access</h3>
            <span className="text-xs" style={{ color: "#888880" }}>{adminUsers.length} user{adminUsers.length !== 1 ? "s" : ""}</span>
          </div>
          <AdminUsersTable users={adminUsers} currentUserId={session?.userId ?? ""} />
        </div>
      )}

      {/* Env status */}
      <div className="rounded-xl border p-5" style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}>
        <h3 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#888880" }}>Environment Variables</h3>
        <EnvCheck label="Supabase URL"              value={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        <EnvCheck label="Supabase Anon Key"         value={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY} />
        <EnvCheck label="Supabase Service Role Key" value={process.env.SUPABASE_SERVICE_ROLE_KEY} />
        <EnvCheck label="Gemini API Key"            value={process.env.GEMINI_API_KEY} />
        <EnvCheck label="Resend API Key"            value={process.env.RESEND_API_KEY} />
        <EnvCheck label="Paystack Secret Key"       value={process.env.PAYSTACK_SECRET_KEY} />
        <EnvCheck label="Site URL"                  value={process.env.NEXT_PUBLIC_SITE_URL} />
      </div>

      {/* Quick links */}
      <div className="rounded-xl border p-5" style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}>
        <h3 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#888880" }}>Quick Links</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "Supabase Dashboard",   href: "https://supabase.com/dashboard" },
            { label: "Resend Dashboard",      href: "https://resend.com/overview" },
            { label: "Paystack Dashboard",    href: "https://dashboard.paystack.com" },
            { label: "Google AI Studio",      href: "https://aistudio.google.com" },
            { label: "Vercel Dashboard",      href: "https://vercel.com/dashboard" },
            { label: "FM2 Public Site",       href: "/" },
          ].map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-150"
              style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A", color: "#F5F5F0", textDecoration: "none", fontSize: "0.875rem" }}>
              {link.label}
              <ExternalLink size={13} style={{ color: "#888880" }} />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}