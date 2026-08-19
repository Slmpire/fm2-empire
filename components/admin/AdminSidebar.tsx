// ============================================================
// FM2 EMPIRE — ADMIN SIDEBAR
// Left navigation for the entire admin panel.
// Active route is highlighted automatically.
// ============================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Film,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard",    href: "/admin/dashboard",    icon: LayoutDashboard },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Events",       href: "/admin/events",       icon: Calendar },
  { label: "Media",        href: "/admin/media",        icon: Film },
  { label: "Team",         href: "/admin/team",         icon: Users },
  { label: "Settings",     href: "/admin/settings",     icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col w-60 shrink-0 border-r"
      style={{
        backgroundColor: "#111111",
        borderColor: "#2A2A2A",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center px-6 h-16 border-b shrink-0"
        style={{ borderColor: "#2A2A2A" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <span
            className="font-bold text-lg tracking-tight"
            style={{ fontFamily: "Georgia, serif", color: "#F5F5F0" }}
          >
            FM2
            <span style={{ color: "#C9A84C" }}> Admin</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
              )}
              style={{
                backgroundColor: isActive
                  ? "rgba(201,168,76,0.1)"
                  : "transparent",
                color: isActive ? "#C9A84C" : "#888880",
                border: isActive
                  ? "1px solid rgba(201,168,76,0.2)"
                  : "1px solid transparent",
              }}
            >
              <Icon size={16} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom — link to public site */}
      <div
        className="px-3 py-4 border-t"
        style={{ borderColor: "#2A2A2A" }}
      >
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors duration-150"
          style={{ color: "#888880" }}
        >
          ↗ View Public Site
        </Link>
      </div>
    </aside>
  );
}