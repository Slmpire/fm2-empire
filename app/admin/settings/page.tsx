// ============================================================
// FM2 EMPIRE — ADMIN SETTINGS PAGE
// Shows current environment config status and quick links.
// Expanding this into full settings management comes later.
// ============================================================

import type { Metadata } from "next";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Settings" };

function EnvCheck({ label, value }: { label: string; value: string | undefined }) {
  const isSet = !!value;
  return (
    <div
      className="flex items-center justify-between py-3 border-b"
      style={{ borderColor: "#2A2A2A" }}
    >
      <span className="text-sm" style={{ color: "#F5F5F0" }}>
        {label}
      </span>
      <span
        className="flex items-center gap-2 text-xs font-medium"
        style={{ color: isSet ? "#27AE60" : "#C0392B" }}
      >
        {isSet
          ? <><CheckCircle2 size={14} /> Configured</>
          : <><XCircle size={14} /> Not set</>
        }
      </span>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">

      <div>
        <h2
          className="font-bold text-xl mb-1"
          style={{ color: "#F5F5F0", fontFamily: "Georgia, serif" }}
        >
          Settings
        </h2>
        <p className="text-sm" style={{ color: "#888880" }}>
          Environment configuration and integration status.
        </p>
      </div>

      {/* Env status */}
      <div
        className="rounded-xl border p-5"
        style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
      >
        <h3
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "#888880" }}
        >
          Environment Variables
        </h3>
        <EnvCheck
          label="Supabase URL"
          value={process.env.NEXT_PUBLIC_SUPABASE_URL}
        />
        <EnvCheck
          label="Supabase Anon Key"
          value={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
        />
        <EnvCheck
          label="Supabase Service Role Key"
          value={process.env.SUPABASE_SERVICE_ROLE_KEY}
        />
        <EnvCheck
          label="Gemini API Key"
          value={process.env.GEMINI_API_KEY}
        />
        <EnvCheck
          label="Resend API Key"
          value={process.env.RESEND_API_KEY}
        />
        <EnvCheck
          label="Site URL"
          value={process.env.NEXT_PUBLIC_SITE_URL}
        />
      </div>

      {/* Quick links */}
      <div
        className="rounded-xl border p-5"
        style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
      >
        <h3
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "#888880" }}
        >
          Quick Links
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "Supabase Dashboard",   href: "https://supabase.com/dashboard" },
            { label: "Resend Dashboard",      href: "https://resend.com/overview" },
            { label: "Google AI Studio",      href: "https://aistudio.google.com" },
            { label: "Vercel Dashboard",      href: "https://vercel.com/dashboard" },
            { label: "FM2 Public Site",       href: "/" },
            { label: "FM2 Apply Page",        href: "/apply" },
          ].map((link) => (
            
             <a key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-150"
              style={{
                backgroundColor: "#111111",
                border: "1px solid #2A2A2A",
                color: "#F5F5F0",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              {link.label}
              <ExternalLink size={13} style={{ color: "#888880" }} />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}