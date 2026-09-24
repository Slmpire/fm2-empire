// ============================================================
// FM2 EMPIRE — ADMIN SIDEBAR
// Desktop: fixed left sidebar.
// Mobile: hidden by default, opens as a slide-in drawer
// triggered by the hamburger button in AdminHeader.
// ============================================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, FileText, Calendar, Film, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard",    href: "/admin/dashboard",    icon: LayoutDashboard },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Events",       href: "/admin/events",       icon: Calendar },
  { label: "Media",        href: "/admin/media",        icon: Film },
  { label: "Team",         href: "/admin/team",         icon: Users },
  { label: "News",         href: "/admin/news",         icon: FileText },
  { label: "Settings",     href: "/admin/settings",     icon: Settings },
];

export default function AdminSidebar() {
  const pathname          = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/admin/dashboard" && pathname.startsWith(href));

  const NavContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: "0 1.5rem", height: "4rem", display: "flex", alignItems: "center", borderBottom: "1px solid #2A2A2A", flexShrink: 0 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 700, fontSize: "1.125rem", fontFamily: "Georgia, serif", color: "#F5F5F0" }}>
            FM2 <span style={{ color: "#C9A84C" }}>Admin</span>
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "1rem 0.75rem", flex: 1 }}>
        {navItems.map((item) => {
          const Icon   = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display:         "flex",
                alignItems:      "center",
                gap:             "0.75rem",
                padding:         "0.625rem 0.75rem",
                borderRadius:    "8px",
                fontSize:        "0.875rem",
                fontWeight:      500,
                textDecoration:  "none",
                transition:      "all 150ms",
                backgroundColor: active ? "rgba(201,168,76,0.1)" : "transparent",
                color:           active ? "#C9A84C" : "#888880",
                border:          active ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
              }}
            >
              <Icon size={16} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* View public site */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid #2A2A2A" }}>
        <Link
          href="/"
          target="_blank"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "#888880", textDecoration: "none" }}
        >
          ↗ View Public Site
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col"
        style={{ width: "240px", minHeight: "100vh", backgroundColor: "#111111", borderRight: "1px solid #2A2A2A", flexShrink: 0 }}
      >
        <NavContent />
      </aside>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(true)}
        style={{
          position:        "fixed",
          top:             "1rem",
          left:            "1rem",
          zIndex:          200,
          width:           "2.5rem",
          height:          "2.5rem",
          backgroundColor: "#1A1A1A",
          border:          "1px solid #2A2A2A",
          borderRadius:    "8px",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          cursor:          "pointer",
          color:           "#F5F5F0",
        }}
        aria-label="Open admin menu"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden"
          onClick={() => setIsOpen(false)}
          style={{
            position:        "fixed",
            inset:           0,
            backgroundColor: "rgba(8,8,8,0.7)",
            zIndex:          150,
          }}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className="md:hidden"
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          bottom:          0,
          width:           "280px",
          backgroundColor: "#111111",
          borderRight:     "1px solid #2A2A2A",
          zIndex:          200,
          display:         "flex",
          flexDirection:   "column",
          transform:       isOpen ? "translateX(0)" : "translateX(-100%)",
          transition:      "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position:        "absolute",
            top:             "1rem",
            right:           "1rem",
            background:      "none",
            border:          "none",
            cursor:          "pointer",
            color:           "#888880",
            display:         "flex",
          }}
        >
          <X size={18} />
        </button>
        <NavContent />
      </aside>
    </>
  );
}