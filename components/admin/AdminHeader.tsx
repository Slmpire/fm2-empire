// ============================================================
// FM2 EMPIRE — ADMIN HEADER
// Top bar showing current page title and logout button.
// ============================================================

"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

const pageTitles: Record<string, string> = {
  "/admin/dashboard":    "Dashboard",
  "/admin/applications": "Applications",
  "/admin/events":       "Events",
  "/admin/media":        "Media",
  "/admin/team":         "Team",
  "/admin/settings":     "Settings",
};

export default function AdminHeader() {
  const pathname  = usePathname();
  const router    = useRouter();

  const title = Object.entries(pageTitles).find(([path]) =>
    pathname.startsWith(path)
  )?.[1] ?? "Admin";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <header
      className="flex items-center justify-between px-6 h-16 border-b shrink-0"
      style={{
        backgroundColor: "#111111",
        borderColor: "#2A2A2A",
      }}
    >
      <h1
        className="font-bold text-base"
        style={{ color: "#F5F5F0" }}
      >
        {title}
      </h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150"
        style={{
          color: "#888880",
          border: "1px solid #2A2A2A",
        }}
      >
        <LogOut size={13} />
        Sign Out
      </button>
    </header>
  );
}